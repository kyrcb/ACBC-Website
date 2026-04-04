export const SITE_CONFIG = {
  name: "Anchored in Christ Baptist Camp",
  shortName: "ACBC",
  tagline: "Anchored in Christ. Grounded in Truth. Growing in Faith.",
  email: "anchoredinchristbc@gmail.com",
  phone: "+63 9-- --- ----",
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
    { label: "Contact", href: "/contact" },
  ],
};

/**
 * Image paths — drop your files into public/images/ and update these paths.
 *
 * Logo:      public/images/logo.png         (the circular badge logo)
 * Hero bg:   public/images/camp-hero.jpg    (camp photo for hero background)
 * Camp imgs: public/images/camp-*.jpg       (gallery / about section photos)
 */
export const IMAGES = {
  logo: "/images/logo.png",
  campHero: "/images/camp-hero.jpg",
  campGallery: [
    "/images/camp-1.jpg",
    "/images/camp-2.jpg",
    "/images/camp-3.jpg",
  ],
};
