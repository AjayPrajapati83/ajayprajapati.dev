import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendMessage } from '../../utils/emailService'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')
    try {
      await sendMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      console.error('Email send failed:', err)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--text-muted)',
    padding: '0.75rem 0',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '0.85rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    cursor: 'text',
  }

  const labelStyle = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginBottom: '0.25rem',
    display: 'block',
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle} htmlFor="contact-name">{`> name:`}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-teal)'
            e.target.style.boxShadow = '0 1px 0 0 var(--accent-teal)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--text-muted)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle} htmlFor="contact-email">{`> email:`}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-teal)'
            e.target.style.boxShadow = '0 1px 0 0 var(--accent-teal)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--text-muted)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle} htmlFor="contact-message">{`> message:`}</label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '100px',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-teal)'
            e.target.style.boxShadow = '0 1px 0 0 var(--accent-teal)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--text-muted)'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-cursor-hover
        className="btn-terminal"
        style={{
          width: '100%',
          justifyContent: 'center',
          opacity: status === 'sending' ? 0.6 : 1,
        }}
      >
        {status === 'sending' ? '[ sending... ]' : '[ ./send-message.sh ]'}
      </motion.button>

      {/* Status messages */}
      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.8rem',
            color: '#22C55E',
            padding: '0.75rem',
            background: 'rgba(34, 197, 94, 0.1)',
            borderRadius: '4px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }}
        >
          [200 OK] Message delivered successfully.
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.8rem',
            color: 'var(--accent-red)',
            padding: '0.75rem',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '4px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          [500 ERROR] Transmission failed. Retry?
        </motion.div>
      )}
    </form>
  )
}
