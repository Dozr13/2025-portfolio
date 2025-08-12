"use client"

import { createContact } from "@/app/actions/public/contact"
import { Icon, type IconName } from "@/components/ui/Icon"
import { AnimatePresence, motion } from "framer-motion"
import { useRef, useState } from "react"

const contactInfo: {
  icon: IconName
  label: string
  value: string
  href?: string
}[] = [
    {
      icon: "mail",
      label: "Email",
      value: "wadejp8@gmail.com",
      href: "mailto:wadejp8@gmail.com"
    },
    {
      icon: "phone",
      label: "Phone",
      value: "(720) 641-7170",
      href: "tel:+17206417170"
    },
    {
      icon: "map-pin",
      label: "Location",
      value: "Meridian, Idaho"
    }
  ]

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// Rate limiting helper
const RATE_LIMIT_KEY = 'contact_form_last_submission'
const RATE_LIMIT_DURATION = 60000

export const Contact = ({ immediate = false }: { immediate?: boolean }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Honeypot field (hidden from users, bots will fill it)
  const [honeypot, setHoneypot] = useState('')
  const submissionTimeRef = useRef<number>(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): string | null => {




    // Honeypot check (if filled, it's likely a bot) - but be lenient for false positives
    if (honeypot && honeypot.trim().length > 0) {

      // Only block if it looks like bot behavior (long strings or common spam patterns)
      if (honeypot.length > 10 || /http|www\.|\.com|\.net|\.org/i.test(honeypot)) {

        return 'Invalid form submission. Please try again.'
      }
      // For short values, just log but don't block (could be auto-fill)

    }

    // Rate limiting check
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY)
    if (lastSubmission) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission)
      if (timeSinceLastSubmission < RATE_LIMIT_DURATION) {
        const secondsLeft = Math.ceil((RATE_LIMIT_DURATION - timeSinceLastSubmission) / 1000)

        return `Please wait ${secondsLeft} seconds before submitting again.`
      }
    }

    // Enhanced validation
    if (formData.name.length < 2 || formData.name.length > 50) {

      return 'Name must be between 2 and 50 characters.'
    }

    if (formData.subject.length < 5 || formData.subject.length > 100) {

      return 'Subject must be between 5 and 100 characters.'
    }

    if (formData.message.length < 10 || formData.message.length > 1000) {

      return 'Message must be between 10 and 1000 characters.'
    }

    // Time-based validation (temporarily reduced for testing)
    const timeSpent = Date.now() - submissionTimeRef.current

    if (timeSpent < 1000) { // Reduced from 3000ms to 1000ms for easier testing

      return 'Please take your time filling out the form.'
    }

    // Email format validation (additional check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {

      return 'Please enter a valid email address.'
    }

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setStatusMessage('')

    // Validate form
    const validationError = validateForm()
    if (validationError) {
      setStatus('error')
      setStatusMessage(validationError)
      setTimeout(() => {
        setStatus('idle')
        setStatusMessage('')
      }, 5000)
      return
    }

    try {
      // First, save to database via server action
      await createContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        source: 'Portfolio Contact Form'
      })

      // If database save is successful, send email notification
      const emailjsModule = await import('@emailjs/browser')
      const emailjs = emailjsModule.default || emailjsModule

      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        to_email: 'wadejp8@gmail.com',
        sent_date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        }),
        user_agent: navigator.userAgent,
        page_url: window.location.href
      }

      // Send email notification (non-blocking, if this fails contact is still saved)
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            ...templateParams,
            to_email: 'wadejp8@gmail.com',
            auto_reply: 'true',
            reply_to_email: formData.email.trim(),
            reply_to: formData.email.trim(),
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )

      } catch (emailError) {
        console.warn('Email notification failed, but contact was saved:', emailError)
      }

      // Store submission timestamp for rate limiting
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString())

      setStatus('success')
      setStatusMessage('Thank you! Your message has been received. I\'ll get back to you within 48 hours!')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setHoneypot('')

    } catch (error: unknown) {
      setStatus('error')
      setStatusMessage('Failed to send message. Please try again or contact me directly at wadejp8@gmail.com')
      console.error('Contact submission error:', error)
    }

    // Auto-hide status message after 7 seconds
    setTimeout(() => {
      setStatus('idle')
      setStatusMessage('')
    }, 7000)
  }

  // Track when user starts filling the form
  const handleFirstInput = () => {
    if (submissionTimeRef.current === 0) {
      submissionTimeRef.current = Date.now()
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div>
        <motion.div
          initial={immediate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-title mb-6 leading-tight pb-1">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to say hello, I&apos;d love to hear from
            you. I&apos;m always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={immediate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get In Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m always interested in new opportunities and exciting projects. Let&apos;s talk!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-border transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
                    <Icon
                      name={info.icon}
                      size="md"
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={immediate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-background border border-border">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="fax" // Less likely to trigger auto-fill than "website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  height: 0,
                  width: 0,
                  border: 'none',
                  background: 'transparent'
                }}
                tabIndex={-1}
                autoComplete="nope" // More explicit than "off"
                aria-hidden="true"
              />

              {/* Status Message - Fixed height container to prevent jumping */}
              <div className="h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {status === 'idle' ? (
                    <motion.div
                      key="chat-header"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-center"
                    >
                      <h3 className="text-lg font-bold gradient-text-title">
                        Let&apos;s Chat! 💬
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ready to bring your ideas to life
                      </p>
                    </motion.div>
                  ) : statusMessage && (
                    <motion.div
                      key="status-message"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-full p-4 rounded-lg flex items-center gap-3 ${status === 'success'
                        ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                        : status === 'error'
                          ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                          : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                        }`}
                    >
                      <Icon
                        name={status === 'success' ? 'check-circle' : status === 'error' ? 'alert-circle' : 'loader'}
                        size="md"
                        className={status === 'loading' ? 'animate-spin' : ''}
                      />
                      <p className="text-sm font-medium">{statusMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={handleFirstInput}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                    disabled={status === 'loading'}
                    maxLength={50}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleFirstInput}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={handleFirstInput}
                  placeholder="Project collaboration"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  required
                  disabled={status === 'loading'}
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleFirstInput}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  required
                  disabled={status === 'loading'}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={status !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all group ${status === 'loading'
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
              >
                {status === 'loading' ? (
                  <>
                    <Icon
                      name="loader"
                      size="md"
                      className="animate-spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon
                      name="send"
                      size="md"
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 