export interface CategoryOption {
  value: string;
  label: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  cta: string;
}

export interface Translations {
  nav: {
    registerInterest: string;
    placeBid: string;
    about: string;
    acquisitions: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta1: string;
    cta2: string;
    footnote: string;
  };
  categories: {
    eyebrow: string;
    headline: string;
    body: string;
    items: CategoryItem[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    body: string;
    form: {
      name: string;
      email: string;
      phone: string;
      category: string;
      categoryOptions: CategoryOption[];
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successBody: string;
      errorTitle: string;
      errorBody: string;
    };
  };
  footer: {
    tagline: string;
    legal: {
      privacy: string;
      terms: string;
      cookies: string;
    };
    links: {
      careers: string;
      about: string;
      contact: string;
    };
    social: {
      instagram: string;
      linkedin: string;
    };
    copyright: string;
    disclaimer: string;
  };
}

export const en: Translations = {
  nav: {
    registerInterest: "Register Interest",
    placeBid: "Place a Bid",
    about: "About",
    acquisitions: "Acquisitions",
  },
  hero: {
    eyebrow: "Private Acquisitions",
    headline: "For those who\nacquire without\nannouncement.",
    subheadline:
      "Blackford facilitates private transactions across real estate, motorcars, timepieces, and luxury goods — conducted with the discretion your acquisitions deserve.",
    cta1: "Register Interest",
    cta2: "Place a Bid",
    footnote: "By invitation and application only.",
  },
  categories: {
    eyebrow: "Areas of Acquisition",
    headline: "A considered range\nof categories.",
    body: "Each discipline is managed by specialists with deep market knowledge and access to provenance-verified inventory unavailable through conventional channels.",
    items: [
      {
        id: "real-estate",
        title: "Real Estate",
        description:
          "Residences and estates of distinction, transacted privately across prime global markets. From Mayfair to the Côte d'Azur.",
        cta: "Request a Callback",
      },
      {
        id: "automobiles",
        title: "Automobiles",
        description:
          "Provenance-documented motorcars — from significant modern classics to historically important competition vehicles.",
        cta: "Request a Callback",
      },
      {
        id: "luxury-goods",
        title: "Luxury Goods",
        description:
          "Objects of enduring craft and material rarity, from the great ateliers of Paris, Milan, and London.",
        cta: "Request a Callback",
      },
      {
        id: "timepieces",
        title: "Timepieces",
        description:
          "Important watches from the great ateliers of Geneva, Le Brassus, and La Chaux-de-Fonds — offered privately to serious collectors.",
        cta: "Request a Callback",
      },
    ],
  },
  contact: {
    eyebrow: "Make Contact",
    headline: "Begin a\nconversation.",
    body: "Our team responds to all enquiries within one business day. All communications are handled with absolute discretion.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Telephone",
      category: "Area of Interest",
      categoryOptions: [
        { value: "", label: "Select a category" },
        { value: "real-estate", label: "Real Estate" },
        { value: "automobiles", label: "Automobiles" },
        { value: "luxury-goods", label: "Luxury Goods" },
        { value: "timepieces", label: "Timepieces" },
        { value: "other", label: "Other" },
      ],
      message: "Your Enquiry",
      messagePlaceholder: "Please describe your interest or requirement.",
      submit: "Send Enquiry",
      submitting: "Sending…",
      successTitle: "Enquiry received.",
      successBody:
        "A member of our team will be in touch within one business day. A confirmation has been sent to your email.",
      errorTitle: "Something went wrong.",
      errorBody: "Please try again or contact us directly.",
    },
  },
  footer: {
    tagline: "Private transactions, conducted properly.",
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      cookies: "Cookie Policy",
    },
    links: {
      careers: "Careers",
      about: "About Blackford",
      contact: "Contact",
    },
    social: {
      instagram: "Instagram",
      linkedin: "LinkedIn",
    },
    copyright: "© {year} Blackford. All rights reserved.",
    disclaimer:
      "Blackford operates as a private transaction facilitator. All transactions are subject to our terms and applicable law.",
  },
};
