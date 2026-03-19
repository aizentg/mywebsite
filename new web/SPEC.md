# Nitesh Bhandari Portfolio — SPEC.md

## Concept & Vision

A digital garden that grows from Himalayan soil. This portfolio feels like opening a weathered sketchbook found in a Kathmandu bookshop — intimate, hand-crafted, deeply personal. Where code meets canvas meets mountain mist. Not a gold jewelry shop, but a monk's creative retreat.

## Design Language

### Aesthetic Direction
**Reference:** Traditional Nepali thankas, Himalayan mountain photography, organic rice-paper textures, Sketchbook illustrations, Muted Kathmandu tea houses

### Color Palette
- **Primary:** `#8B4513` (Saddle Brown - earth, wood, tea)
- **Secondary:** `#2F4F4F` (Dark Slate - Himalayan stone)
- **Accent:** `#CD853F` (Peru - terracotta, clay)
- **Background:** `#FAF6F0` (Rice Paper Cream)
- **Background Alt:** `#EDE8DF` (Warm Parchment)
- **Text Primary:** `#2D2926` (Charcoal Ink)
- **Text Secondary:** `#6B5B4F` (Faded Ink)
- **Muted Sage:** `#8B9A7D` (Mountain moss)
- **Dusty Rose:** `#B08B8B` (Temple clay)

### Typography
- **Display:** 'Playfair Display' (serif, elegant but warm) — fallback: Georgia
- **Body:** 'Source Serif 4' (readable, literary) — fallback: serif
- **Accent:** 'Kalpurush' / 'Noto Sans Devanagari' for any Nepali text
- **Mono:** 'JetBrains Mono' for code/terminal elements

### Spatial System
- Base unit: 8px
- Section padding: 80px-120px vertical
- Content max-width: 1200px
- Generous whitespace — breathing room like mountain air

### Motion Philosophy
- Slow, organic transitions (400-600ms ease)
- Subtle parallax on scroll
- Fade-up reveals like morning mist clearing
- No jarring or fast animations — meditative pace

### Visual Assets
- SVG mountain silhouettes (Himalayan peaks)
- Hand-drawn style dividers (brush strokes)
- Subtle paper texture overlays
- Mandala patterns but muted, not gold
- Buddhist prayer flag colors as accents (maroon, saffron, green, blue)

## Layout & Structure

### Page Flow
1. **Hero** — Full viewport, mountain silhouette background, minimal text, floating elements
2. **About** — Split layout with sketch-style stats, typewriter terminal
3. **Projects** — Masonry/grid with hover reveals, actual filtering
4. **Gallery** — Filterable grid with lightbox, paintings + photography
5. **Music** — Vinyl player with working controls, waveform visualization
6. **Blog** — Editorial layout with featured + sidebar
7. **Contact** — Minimal form with validation

### Responsive Strategy
- Mobile-first
- Collapsing sections on mobile
- Touch-friendly interactions

## Features & Interactions

### Animated Stats Counter
- Numbers animate from 0 to target when scrolled into view
- Duration: 2 seconds with easing
- Triggers once on intersection

### Music Player
- Play/pause toggle with visual feedback
- Track selection from playlist
- Animated waveform bars when "playing"
- Vinyl rotation animation
- Drag-to-scratch on vinyl disc

### Gallery Lightbox
- Filter by category (All, Paintings, Photography)
- Keyboard navigation (arrows, escape)
- Smooth transitions

### Project Cards
- Hover reveals description
- Click opens modal with full details (or scrolls to expanded view)
- Category tags

### Contact Form
- Client-side validation
- Success/error states
- Animated feedback

### Smooth Scroll
- All anchor navigation
- Section reveal on scroll

## Component Inventory

### Navigation
- Fixed top, glass-morphism effect
- Logo: Initials "NB" in display font
- Links: minimal, uppercase tracking
- Mobile: hamburger menu with slide-in

### Hero Section
- Mountain SVG silhouette background
- Name with gradient text
- Animated floating elements
- Vinyl record decoration (subtle)

### About Section
- Stats with animated counters
- Terminal block with typing effect
- Skills as subtle tags
- Portrait placeholder or sketch

### Project Cards
- Glass-morphism cards
- Hover: lift + shadow + reveal description
- Category indicator
- Tech stack tags

### Gallery Items
- Aspect ratio boxes
- Hover: overlay with title
- Filter tabs

### Music Player
- Large vinyl with rotation
- Track list with active indicator
- Waveform visualizer
- Play controls

### Contact Form
- Minimal inputs with bottom border
- Validation messages
- Submit button with loading state

## Technical Approach

- **Framework:** React + Vite + TypeScript
- **Styling:** Tailwind CSS with custom config
- **Animations:** CSS transitions + Intersection Observer API
- **State:** React useState/useEffect (no external state management needed)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Playfair Display, Source Serif 4, JetBrains Mono)
