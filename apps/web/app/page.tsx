import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ScrollHero from "./components/ScrollHero"
import { merchants } from "./data/merchants"
import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  CheckCircle2,
  ChevronRight,
  Compass,
  Globe2,
  Heart,
  Laptop,
  Mail,
  Megaphone,
  PawPrint,
  Plane,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserRound,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Tag,
  Shirt,
  Gift,
  House,
} from "lucide-react"

export const metadata: Metadata = {
  title: "ClickNShop | Discover brands. Explore products. Shop with confidence.",
  description:
    "Discover trusted brands, explore products, compare shopping opportunities and find deals across fashion, technology, travel, lifestyle and more.",
  keywords: [
    "online shopping",
    "shopping discovery",
    "affiliate deals",
    "fashion deals",
    "electronics",
    "travel deals",
    "online brands",
    "ClickNShop",
  ],
  openGraph: {
    title: "ClickNShop | Discover brands. Explore products.",
    description:
      "Explore brands, discover shopping opportunities and shop with confidence.",
    type: "website",
  },
}

type Category = {
  name: string
  slug: string
  description: string
  merchantCount: number
  icon: typeof Shirt
  gradient: string
  heroImage?: string
}

const categories: Category[] = [
  {
    name: "Fashion & Apparel",
    slug: "fashion-and-apparel",
    description: "Clothing, footwear, accessories and everyday style.",
    merchantCount: 11,
    icon: Shirt,
    gradient: "from-pink-500/15 to-rose-500/5",
    heroImage: "/images/fashion-hero.webp",
  },
  {
    name: "Electronics & Technology",
    slug: "electronics-and-technology",
    description: "Electronics, gadgets and technology essentials.",
    merchantCount: 3,
    icon: Laptop,
    gradient: "from-blue-500/15 to-cyan-500/5",
    heroImage: "/images/tech-hero.webp",
  },
  {
    name: "Software & Business",
    slug: "software-and-business",
    description: "Business tools, hosting and digital services.",
    merchantCount: 6,
    icon: Globe2,
    gradient: "from-violet-500/15 to-purple-500/5",
    heroImage: "/images/software-hero.webp",
  },
  {
    name: "Mobile & Connectivity",
    slug: "mobile-and-connectivity",
    description: "Mobile services, connectivity and travel SIMs.",
    merchantCount: 3,
    icon: Smartphone,
    gradient: "from-sky-500/15 to-blue-500/5",
    heroImage: "/images/mobile-hero.webp",
  },
  {
    name: "Travel & Transport",
    slug: "travel-and-transport",
    description: "Flights, accommodation and car rental.",
    merchantCount: 4,
    icon: Plane,
    gradient: "from-emerald-500/15 to-teal-500/5",
    heroImage: "/images/travel-hero.webp",
  },
  {
    name: "Pets & Animals",
    slug: "pets-and-animals",
    description: "Pet supplies, nutrition and animal care.",
    merchantCount: 3,
    icon: PawPrint,
    gradient: "from-amber-500/15 to-orange-500/5",
    heroImage: "/images/pets-hero.webp",
  },
  {
    name: "Health & Wellness",
    slug: "health-and-wellness",
    description: "Wellness, fitness and lifestyle products.",
    merchantCount: 3,
    icon: Heart,
    gradient: "from-rose-500/15 to-pink-500/5",
    heroImage: "/images/wellness-hero.webp",
  },
  {
    name: "Entertainment & Gifts",
    slug: "entertainment-and-gifts",
    description: "Experiences, tickets, gifts and digital creativity.",
    merchantCount: 4,
    icon: Gift,
    gradient: "from-purple-500/15 to-indigo-500/5",
    heroImage: "/images/gifts-hero.webp",
  },
  {
    name: "Home & Lifestyle",
    slug: "home-and-lifestyle",
    description: "Discover products for your home and everyday life.",
    merchantCount: 1,
    icon: House,
    gradient: "from-teal-500/15 to-green-500/5",
    heroImage: "/images/home-hero.webp",
  },
]

/* Discovery cards – curated shopping themes. */
const discoveryCards = [
  {
    title: "Refresh your wardrobe",
    description:
      "Explore fashion brands, everyday essentials and clothing collections.",
    category: "Fashion & Apparel",
    slug: "fashion-and-apparel",
    icon: Shirt,
    gradient: "from-fuchsia-600 to-purple-700",
    image: "/images/fashion-hero.webp",
  },
  {
    title: "Upgrade your technology",
    description:
      "Discover electronics, gadgets and useful technology products.",
    category: "Electronics & Technology",
    slug: "electronics-and-technology",
    icon: Laptop,
    gradient: "from-blue-600 to-indigo-700",
    image: "/images/tech-hero.webp",
  },
  {
    title: "Plan your next journey",
    description:
      "Explore travel services, accommodation and transportation.",
    category: "Travel & Transport",
    slug: "travel-and-transport",
    icon: Plane,
    gradient: "from-emerald-600 to-teal-700",
    image: "/images/travel-hero.webp",
  },
]

/* Featured merchant cards – the first 8 merchants from the central list. */
const featuredMerchants = merchants.slice(0, 8)

/* ==========================================================
   Shared component: SectionHeading
   ========================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkText,
}: {
  eyebrow: string
  title: string
  description: string
  href?: string
  linkText?: string
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      {href && linkText && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-700 transition hover:text-indigo-900"
        >
          {linkText}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  )
}

/* ==========================================================
   Hero banner – full-bleed with decorative gradient and
   optional hero image.  The image is marked with
   `fill` + `object-cover` so it always covers the area
   regardless of viewport height.
   ========================================================== */

function CategoriesGrid() {
  return (
    <section className="bg-white px-4 pb-7 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Browse by interest
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
              Explore our shopping categories
            </h2>
          </div>
          <Link
            href="/shop?view=categories"
            className="inline-flex shrink-0 items-center gap-2 text-xs font-bold text-indigo-700 transition hover:text-indigo-900 sm:text-sm"
          >
            View all categories
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="relative h-20 overflow-hidden bg-slate-100">
                <img
                  src={category.heroImage}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex min-h-10 items-center justify-between gap-2 px-3 py-1.5">
                <div className="min-w-0">
                  <span className="block truncate text-xs font-bold text-slate-900 transition group-hover:text-indigo-700 sm:text-sm">
                    {category.name}
                  </span>
                  <span className="block text-[11px] text-slate-500">
                    {category.merchantCount} merchants
                  </span>
                </div>
                <ChevronRight
                  size={17}
                  className="shrink-0 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-indigo-700"
                />
              </div>
            </Link>
          ))}

          <Link
            href="/shop?view=categories"
            className="flex min-h-[122px] items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-fuchsia-600 px-4 text-center text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Compass size={21} />
            <span className="text-sm font-extrabold">View all categories</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
/* ==========================================================
   Curated discovery collections (3 themes)
   ========================================================== */

function DiscoveryCollections() {
  return (
    <section className="bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">
              Discover and explore
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
              Find brands worth exploring
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-700 transition hover:text-indigo-900"
          >
            Explore the shop
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {discoveryCards.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.slug}
                  href={`/shop?category=${item.slug}`}
                  className="group relative isolate min-h-[230px] overflow-hidden rounded-2xl bg-gradient-to-br text-white shadow-md transition hover:-translate-y-1"
                >
                  <Image
                    src={item.image}
                    alt={item.category}
                    fill
                    sizes="(max-width: 1024px) 100vw, 20vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#080f27] via-[#080f27]/55 to-transparent" />

                  <div className="relative z-10 flex min-h-[230px] flex-col justify-end p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/15 backdrop-blur">
                      <Icon size={21} />
                    </span>
                    <p className="mt-4 text-base font-extrabold leading-tight">
                      {item.title}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold">
                      Discover now
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-base font-extrabold text-slate-950">
                Featured merchants
              </h3>
              <Link
                href="/shop"
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {featuredMerchants.map((merchant) => (
                <a
                  key={merchant.slug}
                  href={merchant.destinationUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  aria-label={`Visit ${merchant.name}`}
                  className="flex min-h-[76px] items-center justify-center rounded-xl border border-slate-200 bg-white px-2 py-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                >
                  {merchant.logo ? (
                    <Image
                      src={merchant.logo}
                      alt={`${merchant.name} logo`}
                      width={180}
                      height={56}
                      unoptimized
                      className="h-10 max-w-[150px] object-contain"
                    />
                  ) : (
                    <span className="text-sm font-extrabold tracking-tight text-slate-800">
                      {merchant.name}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <p className="mt-3 text-[11px] leading-5 text-slate-500">
              Explore these merchants directly. Some links may earn ClickNShop
              an affiliate commission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   More merchants – alphabetical list (placeholder until API-backed
   directory is connected). These are merchant names only – no
   fabricated URLs or prices.
   ========================================================== */
function MoreMerchants() {
  return (
    <section className="border-y border-slate-100 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              More to discover
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-slate-950">
              Explore more names in our merchant network
            </h2>
          </div>
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-700"
          >
            View merchant directory
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {merchants.map((merchant) => (
            <span
              key={merchant.slug}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600"
            >
              {merchant.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   Advertiser/promotional section
   ========================================================== */

function AdvertiserSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#080f27] via-[#17265a] to-[#4936a8] px-4 py-9 text-white sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full border border-amber-300/20" />
      <div className="pointer-events-none absolute -right-10 -top-16 -z-10 h-56 w-56 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-40 w-40 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1480px] items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-300">
            <Megaphone size={14} />
            Advertising opportunities
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-[2.7rem]">
            Put your brand
            <span className="block text-amber-300">in front of shoppers.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Promote your business through sponsored listings, featured
            placements, category sponsorships and advertising campaigns on
            ClickNShop.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/advertisers"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
            >
              Advertise with us
              <ArrowUpRight size={17} />
            </Link>
            <Link
              href="/advertisers"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore advertising
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: BadgePercent,
              title: "Sponsored listings",
              detail: "Prominent brand placements",
            },
            {
              icon: Store,
              title: "Featured brands",
              detail: "Brand discovery opportunities",
            },
            {
              icon: Megaphone,
              title: "Campaigns",
              detail: "Promotional advertising",
            },
            {
              icon: Compass,
              title: "Category exposure",
              detail: "Reach relevant shoppers",
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm"
              >
                <Icon size={21} className="text-amber-300" />
                <p className="mt-3 text-sm font-extrabold">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  {item.detail}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
/* ==========================================================
   Newsletter section
   ========================================================== */

function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl rounded-3xl border border-indigo-100 bg-white p-7 shadow-xl shadow-indigo-900/5 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
            <Mail size={25} />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Stay in the loop
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Discover more. Stay inspired.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Get updates about new brands, shopping opportunities and
            featured discoveries.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-800"
          >
            Explore ClickNShop
            <ArrowRight size={17} />
          </Link>

          <p className="mt-4 text-xs text-slate-400">
            Newsletter subscriptions will be enabled when the subscription
            endpoint is connected.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   Affiliate disclosure
   ========================================================== */

function AffiliateDisclosure() {
  return (
    <section className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-start">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <ShieldCheck size={22} />
        </span>
        <div>
          <h2 className="font-extrabold text-slate-950">
            Our affiliate disclosure
          </h2>
          <p className="mt-2 max-w-5xl text-sm leading-7 text-slate-600">
            ClickNShop participates in affiliate marketing programmes. Some
            links on this website are affiliate links. If you click one of
            these links and make a qualifying purchase or complete an
            eligible action, we may earn a commission at no additional cost
            to you. Affiliate relationships do not mean that every
            placement is sponsored. Sponsored listings and paid
            advertisements are identified separately. Product prices,
            promotions, availability, shipping and merchant terms are
            determined by the respective merchants and may change.
          </p>
          <Link
            href="/affiliate-disclosure"
            className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-indigo-700 hover:text-indigo-900"
          >
            Read our full disclosure
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   Footer
   ========================================================== */

function Footer() {
  return (
    <footer className="bg-[#09132e] px-4 pb-8 pt-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500">
                <ShoppingBag size={23} />
              </span>
              <span className="text-xl font-black tracking-tight">
                Click<span className="text-indigo-300">N</span>Shop
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Discover brands. Explore products. Shop with confidence.
              Your destination for shopping discovery.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/shop" className="hover:text-white">
                  Shop all
                </Link>
              </li>
              <li>
                <Link href="/shop?view=categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=popular" className="hover:text-white">
                  Popular discoveries
                </Link>
              </li>
              <li>
                <Link href="/shop?view=merchants" className="hover:text-white">
                  Merchant directory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold">Business</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/advertisers" className="hover:text-white">
                  Advertise with us
                </Link>
              </li>
              <li>
                <Link href="/advertisers" className="hover:text-white">
                  Sponsored placements
                </Link>
              </li>
              <li>
                <Link href="/advertisers" className="hover:text-white">
                  Campaign opportunities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold">Information</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">About ClickNShop</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">Terms of service</Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white">
                  Affiliate disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ClickNShop. All rights reserved.
          </p>
          <p>
            ClickNShop is an independent shopping discovery and advertising
            platform.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ==========================================================
   Page composition
   ========================================================== */

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">
      {/* Navigation */}
      <header className="relative z-20 h-[63px] border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between gap-5">
          <Link href="/" aria-label="ClickNShop home" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171849] text-white">
              <ShoppingBag size={19} strokeWidth={1.8} />
            </span>
            <span className="text-[21px] font-extrabold tracking-tight text-[#171849]">
              Click<span className="text-[#6d5ce7]">N</span>Shop
            </span>
          </Link>
          <nav aria-label="Main navigation" className="flex h-full shrink-0 items-center gap-7 text-[13px] font-semibold text-slate-600">
            <Link href="/" className="relative flex h-full items-center text-[#6252d8] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-t-full after:bg-[#6d5ce7]">Home</Link>
            <Link href="/shop" className="transition hover:text-[#6252d8]">Shop</Link>
            <Link href="/shop?sort=popular" className="transition hover:text-[#6252d8]">Popular</Link>
            <Link href="/shop?view=categories" className="transition hover:text-[#6252d8]">Categories</Link>
            <Link href="/advertisers" className="transition hover:text-[#6252d8]">Advertise</Link>
          </nav>
          <form action="/shop" method="GET" className="flex h-[36px] min-w-[180px] max-w-[370px] flex-1 items-center rounded-md border border-[#e9e6f7] bg-[#f7f6fc] px-3">
            <Search size={16} className="shrink-0 text-[#77718f]" />
            <input type="search" name="q" aria-label="Search products and brands" placeholder="Search products, brands and more..." className="h-full w-full bg-transparent pl-2 text-[12px] text-slate-800 outline-none placeholder:text-slate-400" />
          </form>
          <div className="flex shrink-0 items-center gap-5 text-[#25234c]">
            <Link href="/shop?view=wishlist" aria-label="Wishlist" className="transition hover:text-[#6d5ce7]"><Heart size={19} strokeWidth={1.8} /></Link>
            <Link href="/account" aria-label="Account" className="transition hover:text-[#6d5ce7]"><UserRound size={19} strokeWidth={1.8} /></Link>
            <Link href="/shop?view=cart" aria-label="Shopping cart" className="relative transition hover:text-[#6d5ce7]">
              <ShoppingCart size={20} strokeWidth={1.8} />
              <span className="absolute -right-2 -top-2 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#e34b58] px-1 text-[9px] font-bold leading-none text-white">0</span>
            </Link>
          </div>
        </div>
      </header>
      {/* Hero */}
      <ScrollHero />

      {/* Categories */}
      <CategoriesGrid />

      {/* Discovery collections */}
      <DiscoveryCollections />

      {/* Featured merchant discovery */}



      {/* Advertiser section */}
      <AdvertiserSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Affiliate disclosure */}
      <AffiliateDisclosure />

      {/* Footer */}
      <Footer />
    </main>
  )
}



