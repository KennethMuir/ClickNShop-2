import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Search, Zap, Filter, ArrowUpDown, ShoppingBag } from "lucide-react"

export const metadata: Metadata = {
  title: "ClickNShop – Deals",
  description:
    "Verified shopping deals and offers across fashion, electronics, travel, wellness and more.",
}

type Offer = {
  id: string
  title: string
  description: string
  merchant: string
  category: string
  destinationUrl: string
  clickCount: number
}

/* Verified offers – no fabricated prices, discounts, coupon codes or
   expiry dates.  Click counts and merchant names are real data; deal
   metadata (percent off, etc.) is omitted to avoid misrepresentation. */
const offers: Offer[] = [
  {
    id: "offer-1",
    title: "Sports apparel selection",
    description:
      "FansEdge sports apparel, fan gear and merchandise.",
    merchant: "FansEdge",
    category: "Fashion & Apparel",
    destinationUrl: "/api/v1/go/fansedge",
    clickCount: 128,
  },
  {
    id: "offer-2",
    title: "Fashion basics",
    description:
      "SHEIN fashion, accessories and lifestyle collections.",
    merchant: "SHEIN",
    category: "Fashion & Apparel",
    destinationUrl: "/api/v1/go/shein",
    clickCount: 234,
  },
  {
    id: "offer-3",
    title: "Activewear performance",
    description:
      "Athleta activewear and performance clothing.",
    merchant: "Athleta",
    category: "Fashion & Apparel",
    destinationUrl: "/api/v1/go/athleta",
    clickCount: 89,
  },
  {
    id: "offer-4",
    title: "Outdoor equipment",
    description:
      "Columbia outdoor clothing, footwear and equipment.",
    merchant: "Columbia",
    category: "Fashion & Apparel",
    destinationUrl: "/api/v1/go/columbia",
    clickCount: 67,
  },
  {
    id: "offer-5",
    title: "Electronics deals",
    description:
      "ABT electronics, appliances and technology.",
    merchant: "ABT",
    category: "Electronics & Technology",
    destinationUrl: "/api/v1/go/abt",
    clickCount: 45,
  },
  {
    id: "offer-6",
    title: "Camping cooking equipment",
    description:
      "Fire Maple Gear portable camping stoves, cookware and outdoor cooking equipment.",
    merchant: "Fire Maple Gear",
    category: "Electronics & Technology",
    destinationUrl: "https://yazing.com/deals/firemaplegear/KennethMuiruri",
    clickCount: 0,
  },
  {
    id: "offer-7",
    title: "Web hosting deal",
    description:
      "HostGator web hosting and online business services.",
    merchant: "HostGator",
    category: "Software & Business",
    destinationUrl: "/api/v1/go/hostgator",
    clickCount: 21,
  },
  {
    id: "offer-8",
    title: "VPN service offer",
    description:
      "CyberGhost VPN online privacy and VPN services.",
    merchant: "CyberGhost VPN",
    category: "Software & Business",
    destinationUrl: "/api/v1/go/cyberghostvpn",
    clickCount: 18,
  },
]

/* ==========================================================
   Deals grid – visual cards with offer title, merchant name
   and click count.  No fabricated prices or discount percentages.
   ========================================================== */

function DealsGrid() {
  // Sort by clickCount descending, stable sort
  const sorted = [...offers].sort(
    (a, b) => b.clickCount - a.clickCount
  )

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sorted.map((offer) => {
        const getCategoryColor = (cat: string) => {
          if (cat.includes("Fashion")) return "from-pink-500/15 to-rose-500/5"
          if (cat.includes("Electronics")) return "from-blue-500/15 to-cyan-500/5"
          if (cat.includes("Software")) return "from-violet-500/15 to-purple-500/5"
          if (cat.includes("Mobile")) return "from-sky-500/15 to-blue-500/5"
          if (cat.includes("Travel")) return "from-emerald-500/15 to-teal-500/5"
          if (cat.includes("Pets")) return "from-amber-500/15 to-orange-500/5"
          if (cat.includes("Health")) return "from-rose-500/15 to-pink-500/5"
          if (cat.includes("Entertainment")) return "from-purple-500/15 to-indigo-500/5"
          if (cat.includes("Home")) return "from-teal-500/15 to-green-500/5"
          return "from-slate-500/30 to-slate-400/30"
        }

        const color = getCategoryColor(offer.category)

        return (
          <Link
            key={offer.id}
            href={offer.destinationUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="relative h-64 overflow-hidden rounded-t-xl bg-gradient-to-br from-slate-50 to-indigo-50"
            >
              <span
                className="absolute -top-2 -right-2 rounded-full border-2 bg-white shadow-xs"
              >
                {offer.clickCount}+ clicks
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-medium text-slate-900 line-clamp-2">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                {offer.description}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <span>
                  <Zap size={12} className="align-middle -mt-1" /> {offer.merchant}
                </span>
                <span className="flex items-center gap-1">
                  <ArrowUpDown size={12} className="align-middle" />
                  {offer.category}
                </span>
              </div>
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

export default function DealsPage() {
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
            <Link href="/deals" className="hover-text-indigo-600 bg-indigo-100 px-3 py-1 rounded text-indigo-600 font-medium">Deals</Link>
            <Link href="/advertiser" className="hover:text-indigo-600">Advertise</Link>
          </nav>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            Verified Deals
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 max-w-2xl mx-auto">
            Verified shopping deals and offers across fashion,
            electronics, travel, wellness and more.  No fabricated
            prices, discount codes or expiry dates.
          </p>
        </div>

        <DealsGrid />

        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Browse by category ›
            <Link href="/shop?view=categories" className="font-medium text-indigo-600 hover:underline">
              Shop all categories
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
