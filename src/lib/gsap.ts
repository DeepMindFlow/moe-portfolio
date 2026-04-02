import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register all plugins once at the module level
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Shared ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
})

export { gsap, ScrollTrigger }
