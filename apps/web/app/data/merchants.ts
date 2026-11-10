export type Merchant = {
  name: string
  slug: string
  category: string
  description: string
  destinationUrl: string
  logo?: string
}

export const merchants: Merchant[] = [
  {
    name: "FansEdge",
    slug: "fansedge",
    category: "Fashion & Apparel",
    description: "Sports apparel, fan gear and merchandise.",
    destinationUrl: "/api/v1/go/fansedge",
    logo: "/images/merchants/fansedge-logo.ico",
  },
  {
    name: "SHEIN",
    slug: "shein",
    category: "Fashion & Apparel",
    description: "Fashion, accessories and lifestyle collections.",
    destinationUrl: "/api/v1/go/shein",
    logo: "/images/merchants/shein-logo.svg",
  },
  {
    name: "Athleta",
    slug: "athleta",
    category: "Fashion & Apparel",
    description: "Activewear and performance clothing.",
    destinationUrl: "/api/v1/go/athleta",
    logo: "/images/merchants/athleta-logo.svg",
  },
  {
    name: "Columbia",
    slug: "columbia",
    category: "Fashion & Apparel",
    description: "Outdoor clothing, footwear and equipment.",
    destinationUrl: "/api/v1/go/columbia",
    logo: "/images/merchants/columbia-logo.svg",
  },
  {
    name: "ABT",
    slug: "abt",
    category: "Electronics & Technology",
    description: "Electronics, appliances and technology.",
    destinationUrl: "/api/v1/go/abt",
    logo: "/images/merchants/abt-logo.svg",
  },
  {
    name: "Fire Maple Gear",
    slug: "firemaplegear",
    category: "Electronics & Technology",
    description: "Portable camping stoves, cookware and outdoor cooking equipment.",
    destinationUrl: "https://yazing.com/deals/firemaplegear/KennethMuiruri",
  },
  {
    name: "HostGator",
    slug: "hostgator",
    category: "Software & Business",
    description: "Web hosting and online business services.",
    destinationUrl: "/api/v1/go/hostgator",
    logo: "/images/merchants/hostgator-wordmark.png",
  },
  {
    name: "CyberGhost VPN",
    slug: "cyberghostvpn",
    category: "Software & Business",
    description: "Online privacy and VPN services.",
    destinationUrl: "/api/v1/go/cyberghostvpn",
    logo: "/images/merchants/cyberghostvpn-logo.png",
  },
  {
    name: "Homebase",
    slug: "joinhomebase",
    category: "Software & Business",
    description: "Employee scheduling and workforce tools.",
    destinationUrl: "/api/v1/go/joinhomebase",
  },
  {
    name: "AmigoSIM",
    slug: "amigosim",
    category: "Mobile & Connectivity",
    description: "Mobile connectivity and SIM services.",
    destinationUrl: "/api/v1/go/amigosim",
  },
  {
    name: "Consumer Cellular",
    slug: "consumercellular",
    category: "Mobile & Connectivity",
    description: "Mobile plans and wireless services.",
    destinationUrl: "/api/v1/go/consumercellular",
  },
  {
    name: "Priceline",
    slug: "priceline",
    category: "Travel & Transport",
    description: "Travel bookings and accommodation.",
    destinationUrl: "/api/v1/go/priceline",
  },
  {
    name: "Budget",
    slug: "budget",
    category: "Travel & Transport",
    description: "Car rental and travel transportation.",
    destinationUrl: "/api/v1/go/budget",
  },
  {
    name: "Hill's Pet",
    slug: "hillspet",
    category: "Pets & Animals",
    description: "Pet nutrition and food products.",
    destinationUrl: "/api/v1/go/hillspet",
  },
  {
    name: "PetCareSupplies",
    slug: "petcaresupplies",
    category: "Pets & Animals",
    description: "Pet care products and supplies.",
    destinationUrl: "/api/v1/go/petcaresupplies",
  },
  {
    name: "BODi",
    slug: "bodi",
    category: "Health & Wellness",
    description: "Fitness and wellness programmes.",
    destinationUrl: "/api/v1/go/bodi",
  },
  {
    name: "EcoWise Vitamins",
    slug: "ecowisevitamins",
    category: "Health & Wellness",
    description: "Vitamins and wellness products.",
    destinationUrl: "/api/v1/go/ecowisevitamins",
  },
  {
    name: "GiftCards.com",
    slug: "giftcards.com",
    category: "Entertainment & Gifts",
    description: "Gift cards and gifting options.",
    destinationUrl: "/api/v1/go/giftcards.com",
  },
  {
    name: "StubHub",
    slug: "stubhub",
    category: "Entertainment & Gifts",
    description: "Tickets for live events and entertainment.",
    destinationUrl: "/api/v1/go/stubhub",
  },
  {
    name: "Gardenreet",
    slug: "gardenreet",
    category: "Home & Lifestyle",
    description: "Home and lifestyle shopping.",
    destinationUrl: "/api/v1/go/gardenreet",
  },
]


