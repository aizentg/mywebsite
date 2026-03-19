import { useState, useEffect, useRef } from 'react'
import './App.css'

// Types
interface Track {
  id: number
  title: string
  artist: string
  duration: string
}

interface Project {
  id: number
  category: string
  name: string
  description: string
  tags: string[]
  link: string
}

interface GalleryItem {
  id: number
  title: string
  medium: string
  year: string
  category: 'painting' | 'photography'
}

interface BlogPost {
  id: number
  date: string
  title: string
  excerpt: string
  featured?: boolean
}

// Data
const tracks: Track[] = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
  { id: 2, title: 'Comfortably Numb', artist: 'Pink Floyd', duration: '6:23' },
  { id: 3, title: 'Hotel California', artist: 'Eagles', duration: '6:30' },
  { id: 4, title: 'Wish You Were Here', artist: 'Pink Floyd', duration: '5:34' },
  { id: 5, title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02' },
]

const projects: Project[] = [
  { id: 1, category: 'AI/ML', name: 'Neural Style Transfer', description: 'Deep learning model that transfers artistic styles between images using convolutional neural networks.', tags: ['PyTorch', 'CNN', 'Python'], link: '#' },
  { id: 2, category: 'NLP', name: 'Nepali Sentiment Analyzer', description: 'Sentiment analysis pipeline for Nepali text using transformer models and custom tokenization.', tags: ['Transformers', 'NLP', 'Nepali'], link: '#' },
  { id: 3, category: 'Web', name: 'Generative Mandala', description: 'Real-time generative art creating traditional Nepali mandala patterns with p5.js.', tags: ['p5.js', 'Generative Art', 'JavaScript'], link: '#' },
  { id: 4, category: 'Research', name: 'Low-Resource NMT', description: 'Neural machine translation system for Nepali-English using transfer learning techniques.', tags: ['Seq2Seq', 'Research', 'Python'], link: '#' },
  { id: 5, category: 'Vision', name: 'Himalayan Super Resolution', description: 'GAN-based image super-resolution fine-tuned on Himalayan landscape photography.', tags: ['GANs', 'Computer Vision'], link: '#' },
  { id: 6, category: 'Web', name: 'Portfolio System', description: 'This very portfolio — built with React, TypeScript, and a love for craft.', tags: ['React', 'TypeScript', 'CSS'], link: '#' },
]

const galleryItems: GalleryItem[] = [
  { id: 1, title: 'Mountain Dawn', medium: 'Oil on Canvas', year: '2024', category: 'painting' },
  { id: 2, title: 'Boudhanath Stupa', medium: 'Digital Photography', year: '2024', category: 'photography' },
  { id: 3, title: 'Monsoon Abstract', medium: 'Watercolor', year: '2023', category: 'painting' },
  { id: 4, title: 'Patan Durbar', medium: 'Film Photography', year: '2024', category: 'photography' },
  { id: 5, title: 'Self Portrait', medium: 'Charcoal', year: '2024', category: 'painting' },
  { id: 6, title: 'Thamel Streets', medium: 'Digital Photography', year: '2023', category: 'photography' },
]

const blogPosts: BlogPost[] = [
  { id: 1, date: 'March 2025', title: 'Why I Paint to Understand Machine Learning', excerpt: 'The way a model learns to see reminds me of learning to paint — the slow accumulation of what matters, what to ignore, where attention should rest.', featured: true },
  { id: 2, date: 'February 2025', title: 'Shooting Film in Kathmandu', excerpt: 'The streets of Thamel have a grain that digital cannot replicate.' },
  { id: 3, date: 'January 2025', title: 'Vinyl vs Streaming', excerpt: 'It is not just warmth. It is the ritual, the commitment, the side B.' },
]

const stats = [
  { value: 12, label: 'Projects Built', suffix: '+' },
  { value: 47, label: 'Artworks Created', suffix: '' },
  { value: 230, label: 'Photos Taken', suffix: '+' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(tracks[0])
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'painting' | 'photography'>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [countersAnimated, setCountersAnimated] = useState(false)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const aboutRef = useRef<HTMLElement>(null)

  // Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Scroll spy for active section
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'gallery', 'music', 'blog', 'contact']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersAnimated) {
          setCountersAnimated(true)
          stats.forEach((stat, index) => {
            let start = 0
            const end = stat.value
            const duration = 2000
            const increment = end / (duration / 16)
            
            const animate = () => {
              start += increment
              if (start < end) {
                setAnimatedValues(prev => {
                  const newValues = [...prev]
                  newValues[index] = Math.floor(start)
                  return newValues
                })
                requestAnimationFrame(animate)
              } else {
                setAnimatedValues(prev => {
                  const newValues = [...prev]
                  newValues[index] = end
                  return newValues
                })
              }
            }
            animate()
          })
        }
      },
      { threshold: 0.5 }
    )

    if (aboutRef.current) observer.observe(aboutRef.current)
    return () => observer.disconnect()
  }, [countersAnimated])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') navigateLightbox(1)
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, lightboxIndex])

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setMobileMenuOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter)

  const navigateLightbox = (dir: number) => {
    setLightboxIndex((prev) => (prev + dir + filteredGallery.length) % filteredGallery.length)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error')
      return
    }
    setFormStatus('success')
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setFormStatus('idle')
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-vinyl">
          <div className="loader-label"></div>
        </div>
        <p>Loading</p>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
          NB
        </a>
        
        <button 
          className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {['about', 'projects', 'gallery', 'music', 'blog', 'contact'].map((section) => (
            <li key={section}>
              <a 
                href={`#${section}`}
                className={activeSection === section ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(section) }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section - Deep Crimson */}
      <section id="hero" className="hero">
        <div className="hero-bg-pattern"></div>
        
        <div className="hero-content">
          <span className="hero-eyebrow">Creative Technologist · Nepal</span>
          <h1 className="hero-title">
            Nitesh
            <em>Bhandari</em>
          </h1>
          <p className="hero-subtitle">AI/ML Student · Artist · Builder</p>
          <p className="hero-desc">
            I write code that thinks, paint things that breathe, and listen to records that remember.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
              Get in Touch
            </button>
          </div>
        </div>

        <div className="hero-vinyl">
          <div className="vinyl-record">
            <div className="vinyl-grooves"></div>
            <div className="vinyl-label">
              <span className="vinyl-label-title">NOW PLAYING</span>
              <span className="vinyl-label-track">Side A</span>
            </div>
          </div>
          <div className="vinyl-tonearm">
            <div className="tonearm-base"></div>
            <div className="tonearm-arm"></div>
            <div className="tonearm-head"></div>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => scrollTo('about')}>
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* About Section - Clean White */}
      <section id="about" className="about" ref={aboutRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">About</span>
            <h2 className="section-title">Building at the intersection of <em>art and code</em></h2>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a student of <strong>Artificial Intelligence & Machine Learning</strong>, 
                but that's only one layer. I paint, photograph, code, and collect vinyl records.
              </p>
              <p>
                Born and rooted in <strong>Kathmandu, Nepal</strong>, I'm shaped by the textures 
                of ancient temples and modern algorithms. My work honors that richness — the ornate, 
                the coded, the deeply human.
              </p>
              
              <div className="about-terminal">
                <div className="terminal-dots">
                  <span></span><span></span><span></span>
                </div>
                <code>
                  <span className="c">// whoami</span><br/>
                  <span className="k">name:</span> <span className="v">"Nitesh Bhandari"</span><br/>
                  <span className="k">location:</span> <span className="v">"Kathmandu, Nepal"</span><br/>
                  <span className="k">focus:</span> <span className="v">"AI/ML, Creative Coding"</span><br/>
                  <span className="k">tools:</span> <span className="v">["Python", "PyTorch", "React", "p5.js"]</span>
                </code>
              </div>

              <div className="skills">
                {['Machine Learning', 'Computer Vision', 'NLP', 'React', 'Painting', 'Photography'].map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-number">
                    {animatedValues[index]}{stat.suffix}
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Dark */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Projects</span>
            <h2 className="section-title">Things I've <em>built</em></h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article key={project.id} className="project-card">
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="project-category">{project.category}</span>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="project-link" aria-label={`View ${project.name}`}>
                  <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Warm Cream */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">Art & <em>Photography</em></h2>
          </div>

          <div className="gallery-tabs">
            {(['all', 'painting', 'photography'] as const).map((tab) => (
              <button
                key={tab}
                className={`gallery-tab ${galleryFilter === tab ? 'active' : ''}`}
                onClick={() => setGalleryFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => { setLightboxIndex(index); setLightboxOpen(true) }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                <div className="gallery-placeholder">
                  <div className="gallery-pattern"></div>
                </div>
                <div className="gallery-overlay">
                  <span className="gallery-view">View</span>
                </div>
                <div className="gallery-info">
                  <span className="gallery-medium">{item.medium} · {item.year}</span>
                  <h4 className="gallery-title">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="lightbox" onClick={() => setLightboxOpen(false)}>
            <button className="lightbox-close" aria-label="Close">×</button>
            <button 
              className="lightbox-nav lightbox-prev" 
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
              aria-label="Previous"
            >←</button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-image">
                <div className="lightbox-pattern"></div>
              </div>
              <div className="lightbox-info">
                <span>{filteredGallery[lightboxIndex]?.medium}</span>
                <h3>{filteredGallery[lightboxIndex]?.title}</h3>
              </div>
            </div>
            <button 
              className="lightbox-nav lightbox-next" 
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
              aria-label="Next"
            >→</button>
          </div>
        )}
      </section>

      {/* Music Section - Very Dark */}
      <section id="music" className="music">
        <div className="music-bg-lines"></div>
        
        <div className="container">
          <div className="section-header">
            <span className="section-label">Music</span>
            <h2 className="music-title">What I Listen To</h2>
            <p className="music-subtitle">Classic rock, grunge, psychedelic — the records that shaped how I think.</p>
          </div>

          <div className="music-player">
            <div className="player-vinyl-wrap">
              <div className={`player-vinyl ${isPlaying ? 'spinning' : ''}`}>
                <div className="player-vinyl-grooves"></div>
                <div className="player-vinyl-label">
                  <span className="pv-side">A</span>
                  <span className="pv-rpm">33⅓</span>
                </div>
              </div>
              <div className={`player-tonearm ${isPlaying ? 'playing' : ''}`}>
                <div className="tonearm-pivot"></div>
                <div className="tonearm-stick"></div>
                <div className="tonearm-cartridge"></div>
              </div>
              <button 
                className="play-button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>
            </div>

            <div className="player-info">
              <div className="now-playing">
                <span className="np-label">NOW PLAYING</span>
                <h3 className="np-title">{currentTrack.title}</h3>
                <p className="np-artist">{currentTrack.artist}</p>
                <div className={`np-waveform ${isPlaying ? 'active' : ''}`}>
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="wave-bar" style={{ animationDelay: `${i * 0.1}s` }}></span>
                  ))}
                </div>
              </div>

              <ul className="track-list">
                {tracks.map((track, index) => (
                  <li 
                    key={track.id}
                    className={`track-item ${currentTrack.id === track.id ? 'active' : ''}`}
                    onClick={() => { setCurrentTrack(track); setIsPlaying(true) }}
                  >
                    <span className="track-num">{String(index + 1).padStart(2, '0')}</span>
                    <div className="track-info">
                      <span className="track-title">{track.title}</span>
                      <span className="track-artist">{track.artist}</span>
                    </div>
                    <span className="track-duration">{track.duration}</span>
                    {currentTrack.id === track.id && <span className="track-playing">●</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Light */}
      <section id="blog" className="blog">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Blog</span>
            <h2 className="section-title">Thoughts & <em>Writings</em></h2>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className={`blog-card ${post.featured ? 'featured' : ''}`}>
                {post.featured && <span className="blog-featured-tag">Featured</span>}
                <span className="blog-date">{post.date}</span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a href="#" className="blog-link">Read More →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Deep Red */}
      <section id="contact" className="contact">
        <div className="contact-mandala"></div>
        
        <div className="container">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's <em>Connect</em></h2>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <p>
                Whether it's a collaboration, a commission, or just wanting to talk 
                about music and machines — I'm always glad to connect.
              </p>
              
              <div className="contact-links">
                <a href="mailto:hello@niteshbhandari.com" className="contact-link">
                  <span className="contact-icon">✉</span>
                  <div>
                    <span className="contact-label">Email</span>
                    <span className="contact-value">hello@niteshbhandari.com</span>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
                <a href="https://github.com/niteshbhandari" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">◈</span>
                  <div>
                    <span className="contact-label">GitHub</span>
                    <span className="contact-value">github.com/niteshbhandari</span>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
                <a href="https://instagram.com/nitesh.bhandari" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span className="contact-icon">◎</span>
                  <div>
                    <span className="contact-label">Instagram</span>
                    <span className="contact-value">@nitesh.bhandari</span>
                  </div>
                  <span className="contact-arrow">→</span>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className={`btn btn-submit ${formStatus === 'success' ? 'success' : ''}`}
              >
                {formStatus === 'success' ? 'Sent!' : 'Send Message'}
              </button>
              {formStatus === 'error' && (
                <p className="form-error">Please fill in all fields</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 Nitesh Bhandari · Kathmandu, Nepal</p>
          <p>Built with curiosity</p>
        </div>
      </footer>

      {/* Back to top */}
      <button 
        className={`back-to-top ${activeSection !== 'hero' ? 'visible' : ''}`}
        onClick={() => scrollTo('hero')}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  )
}

export default App
