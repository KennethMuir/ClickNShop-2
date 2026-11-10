import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { merchants } from "../data/merchants"

export const metadata: Metadata = {
  title: "ClickNShop – Brands",
  description:
    "Browse verified brands and merchants across fashion, electronics, travel, wellness and more.",
}

type Brand = {
  name: string
  slug: string
  category: string
  description: string
  logo: string
  merchantCount: number
}

const brands: Brand[] = [
  {
    name: "Fashion & Apparel",
    slug: "fashion-and-apparel",
    category: "Fashion & Apparel",
    description: "Clothing, footwear, accessories and everyday style.",
    logo: "/fashion-brands.webp",
    merchantCount: 11,
  },
  {
    name: "Electronics & Technology",
    slug: "electronics-and-technology",
    category: "Electronics & Technology",
    description: "Electronics, gadgets and technology essentials.",
    logo: "/tech-brands.webp",
    merchantCount: 3,
  },
  {
    name: "Software & Business",
    slug: "software-and-business",
    category: "Software & Business",
    description: "Business tools, hosting and digital services.",
    logo: "/software-brands.webp",
    merchantCount: 6,
  },
  {
    name: "Mobile & Connectivity",
    slug: "mobile-and-connectivity",
    category: "Mobile & Connectivity",
    description: "Mobile services, connectivity and travel SIMs.",
    logo: "/mobile-brands.webp",
    merchantCount: 3,
  },
  {
    name: "Travel & Transport",
    slug: "travel-and-transport",
    category: "Travel & Transport",
    description: "Flights, accommodation and car rental.",
    logo: "/travel-brands.webp",
    merchantCount: 4,
  },
  {
    name: "Pets & Animals",
    slug: "pets-and-animals",
    category: "Pets & Animals",
    description: "Pet supplies, nutrition and animal care.",
    logo: "/pets-brands.webp",
    merchantCount: 3,
  },
  {
    name: "Health & Wellness",
    slug: "health-and-wellness",
    category: "Health & Wellness",
    description: "Wellness, fitness and lifestyle products.",
    logo: "/wellness-brands.webp",
    merchantCount: 3,
  },
  {
    name: "Entertainment & Gifts",
    slug: "entertainment-and-gifts",
    category: "Entertainment & Gifts",
    description: "Experiences, tickets, gifts and digital creativity.",
    logo: "/gifts-brands.webp",
    merchantCount: 4,
  },
  {
    name: "Home & Lifestyle",
    slug: "home-and-lifestyle",
    category: "Home & Lifestyle",
    description: "Discover products for your home and everyday life.",
    logo: "/home-brands.webp",
    merchantCount: 1,
  },
]

/* ==========================================================
   Brands grid – each brand displays a logo image, name and
   description.  Logos link to the shop page filtered by
   category so visitors can browse the associated merchants.
   ========================================================== */


function MerchantDirectory() {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-950">
          All merchants
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Explore all {merchants.length} merchants currently listed on ClickNShop.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {merchants.map((merchant) => (
          <a
            key={merchant.slug}
            href={merchant.destinationUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-14 w-full items-center justify-center">
              {merchant.logo ? (
                <Image
                  src={merchant.logo}
                  alt={`${merchant.name} logo`}
                  width={190}
                  height={60}
                  unoptimized
                  className="max-h-12 max-w-[160px] object-contain"
                />
              ) : (
                <span className="text-lg font-extrabold text-slate-800">
                  {merchant.name}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">
              {merchant.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {merchant.category}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
function BrandsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {brands.map((brand) => {
        const Logo = brand.logo

        return (
          <Link
            key={brand.slug}
            href={`/shop?category=${brand.slug}`}
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Image
              src={Logo}
              alt={brand.name} branding
              width={280}
              height={140}
              className="aspect-square w-full h-object object-cover group-hover:opacity-90 transition-opacity"
              priority={false}
            />
            <div className="p-5">
              <h3 className="font-medium text-slate-900 truncate">
                {brand.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                {brand.description}
              </p>
              <p className="mt-3 text-xs font-bold text-indigo-600">
                {brand.merchantCount} merchants
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

/* ==========================================================
   Page layout
   ========================================================== */

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500">
              <ShoppingBag size={23} />
            </span>
            <span className="text-xl font-black tracking-tight">
              Click<span className="text-indigo-600">N</span>Shop
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <Link href="/brands" className="hover:text-indigo-600">Brands</Link>
            <Link href="/deals" className="hover:text-indigo-600">Deals</Link>
            <Link href="/advertiser" className="hover:text-indigo-600">Advertise</Link>
          </nav>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Browse Brands
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 max-w-2xl mx-auto">
            Discover verified brands and merchants across fashion,
            electronics, travel, wellness and more.  Each brand page
            showcases the merchants that match your interest.
          </p>
        </div>

        <MerchantDirectory />

        <BrandsGrid />

        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Explore all categories ›
            <Link href="/shop?view=categories" className="font-medium text-indigo-600 hover:underline">
              Shop by category
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
