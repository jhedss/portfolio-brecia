import React, { useState } from 'react'

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h4>{title}</h4>
          <button className="btn small" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)
  const [readme, setReadme] = useState(null)
  const [loading, setLoading] = useState(false)

  const openGithubPreview = async () => {
    // If the URL is a GitHub repo page, try to fetch the raw README
    if (project.url.includes('github.com')) {
      setOpen(true)
      setLoading(true)
      // Extract owner/repo from URL
      try {
        const parts = project.url.replace(/https?:\/\//, '').split('/')
        const owner = parts[1] || parts[0]
        const repo = parts[2]
        if (!owner || !repo) throw new Error('invalid')

        // Try common branches
        const branches = ['main', 'master']
        let found = false
        for (const b of branches) {
          const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${b}/README.md`
          try {
            const res = await fetch(rawUrl)
            if (res.ok) {
              const text = await res.text()
              setReadme({ text, rawUrl })
              found = true
              break
            }
          } catch (e) {
            // continue to next branch
          }
        }
        if (!found) {
          setReadme({ text: null })
        }
      } catch (e) {
        setReadme({ text: null })
      } finally {
        setLoading(false)
      }
    } else {
      // Not a GitHub URL — open in new tab
      window.open(project.url, '_blank', 'noopener')
    }
  }

  const handleOpenExtern = () => {
    window.open(project.url, '_blank', 'noopener')
  }

  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p className="desc">{project.description}</p>
      <div className="tags">
        {project.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="card-actions">
        <button className="btn" onClick={handleOpenExtern}>View</button>
        <button className="btn outline" onClick={openGithubPreview}>GitHub</button>
      </div>

      <Modal open={open} onClose={() => { setOpen(false); setReadme(null) }} title={project.title + ' — GitHub'}>
        {loading && <p>Loading README…</p>}
        {!loading && readme && readme.text && (
          <div className="readme-wrap">
            <a className="link" href={project.url} target="_blank" rel="noreferrer">Open on GitHub</a>
            <pre className="readme-pre">{readme.text}</pre>
          </div>
        )}
        {!loading && readme && readme.text === null && (
          <div>
            <p>README not found or could not be loaded inside the site.</p>
            <p>
              <button className="btn" onClick={handleOpenExtern}>Open on GitHub</button>
            </p>
          </div>
        )}
      </Modal>
    </article>
  )
}
