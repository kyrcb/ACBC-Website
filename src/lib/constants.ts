export const SITE_CONFIG = {
  name: "Anchored in Christ Baptist Camp",
  shortName: "ACBC",
  tagline: "Anchored in Christ. Grounded in Truth. Growing in Faith.",
  email: "anchoredinchristbc@gmail.com",
  phone: "+63 928 783 0552",
  location: "Ligao City, Albay, Philippines, 4504",
  mailingAddress: {
    recipient: "Anchor Baptist Missions International",
    street: "3232 Hendersonville Hwy.",
    city: "Pisgah Forest, NC 28768",
    memo: "Philippines Youth Camp",
  },
  givingUrl:
    "https://give.tithe.ly/?formId=66e61e77-5d42-11ee-90fc-1260ab546d11&locationId=91c75237-4218-44b2-9f8c-8b7dcd8e2642&fundId=06511e89-2c68-4f59-bdab-3fbd09431fc4",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Join ACBC 2026", href: "/join-2026", cta: true },
  ],
};

/**
 * Image paths — drop your files into public/images/ and they wire up automatically.
 *
 * Logo:
 *   public/images/logo.png
 *
 * Hero background rows (6 photos each, landscape/horizontal preferred):
 *   public/images/hero-row-1/photo-1.jpg  …  photo-6.jpg   ← top row, scrolls left
 *   public/images/hero-row-2/photo-1.jpg  …  photo-6.jpg   ← middle row, scrolls right
 *   public/images/hero-row-3/photo-1.jpg  …  photo-6.jpg   ← bottom row, scrolls left
 *
 * General gallery (about page, future use):
 *   public/images/gallery/photo-1.jpg  …  photo-3.jpg
 */
export const IMAGES = {
  logo: "/images/logo.png",

  heroBackground: {
    row1: Array.from({ length: 6 }, (_, i) => `/images/hero-row-1/photo-${i + 1}.jpg`),
    row2: Array.from({ length: 6 }, (_, i) => `/images/hero-row-2/photo-${i + 1}.jpg`),
    row3: Array.from({ length: 6 }, (_, i) => `/images/hero-row-3/photo-${i + 1}.jpg`),
  },

  gallery: Array.from({ length: 3 }, (_, i) => `/images/gallery/photo-${i + 1}.jpg`),

  join2026: {
    themeBg: "/images/join-2026/theme-bg.png",
  },
};
