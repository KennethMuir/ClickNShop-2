"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { CategoryTemplate } from "@/components/category-template"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

import { Shirt as ShirtIcon, Laptop as LaptopIcon, Globe2 as Globe2Icon, Smartphone as SmartphoneIcon, Plane as PlaneIcon, PawPrint as PawPrintIcon, Heart as HeartIcon, Gift as GiftIcon, House as HouseIcon } from "lucide-react"

type CategoryIcon =
  | typeof ShirtIcon
  | typeof LaptopIcon
  | typeof Globe2Icon
  | typeof SmartphoneIcon
  | typeof PlaneIcon
  | typeof PawPrintIcon
  | typeof HeartIcon
  | typeof GiftIcon
  | typeof HouseIcon

type CategoryData = {
  name: string
  slug: string
  title: string
  description: string
  merchantCount: number
  icon: CategoryIcon
  gradient: string
  heroImage?: string
}

type Merchant = {
  name: string
  slug: string
  category: string
  description: string
  destinationUrl: string
}

type SponsoredMerchant = {
  name: string
  slug: string
  category: string
  description: string
  destinationUrl: string
}

const categoriesData: CategoryData[] = [
  {
    name: "fashion-and-apparel",
    slug: "fashion-and-apparel",
    title: "Fashion & Apparel",
    description:
      "Clothing, footwear, accessories and everyday style.",
    merchantCount: 11,
    icon: ShirtIcon,
    gradient: "from-pink-500/15 to-rose-500/5",
    heroImage: "/fashion-hero.webp",
  },
  {
    name: "electronics-and-technology",
    slug: "electronics-and-technology",
    title: "Electronics & Technology",
    description:
      "Electronics, gadgets and technology essentials.",
    merchantCount: 3,
    icon: LaptopIcon,
    gradient: "from-blue-500/15 to-cyan-500/5",
    heroImage: "/tech-hero.webp",
  },
  {
    name: "software-and-business",
    slug: "software-and-business",
    title: "Software & Business",
    description:
      "Business tools, hosting and digital services.",
    merchantCount: 6,
    icon: Globe2Icon,
    gradient: "from-violet-500/15 to-purple-500/5",
    heroImage: "/software-hero.webp",
  },
  {
    name: "mobile-and-connectivity",
    slug: "mobile-and-connectivity",
    title: "Mobile & Connectivity",
    description:
      "Mobile services, connectivity and travel SIMs.",
    merchantCount: 3,
    icon: SmartphoneIcon,
    gradient: "from-sky-500/15 to-blue-500/5",
    heroImage: "/mobile-hero.webp",
  },
  {
    name: "travel-and-transport",
    slug: "travel-and-transport",
    title: "Travel & Transport",
    description:
      "Flights, accommodation and car rental.",
    merchantCount: 4,
    icon: PlaneIcon,
    gradient: "from-emerald-500/15 to-teal-500/5",
    heroImage: "/travel-hero.webp",
  },
  {
    name: "pets-and-animals",
    slug: "pets-and-animals",
    title: "Pets & Animals",
    description:
      "Pet supplies, nutrition and animal care.",
    merchantCount: 3,
    icon: PawPrintIcon,
    gradient: "from-amber-500/15 to-orange-500/5",
    heroImage: "/pets-hero.webp",
  },
  {
    name: "health-and-wellness",
    slug: "health-and-wellness",
    title: "Health & Wellness",
    description:
      "Wellness, fitness and lifestyle products.",
    merchantCount: 3,
    icon: HeartIcon,
    gradient: "from-rose-500/15 to-pink-500/5",
    heroImage: "/wellness-hero.webp",
  },
  {
    name: "entertainment-and-gifts",
    slug: "entertainment-and-gifts",
    title: "Entertainment & Gifts",
    description:
      "Experiences, tickets, gifts and digital creativity.",
    merchantCount: 4,
    icon: GiftIcon,
    gradient: "from-purple-500/15 to-indigo-500/5",
    heroImage: "/gifts-hero.webp",
  },
  {
    name: "home-and-lifestyle",
    slug: "home-and-lifestyle",
    title: "Home & Lifestyle",
    description:
      "Discover products for your home and everyday life.",
    merchantCount: 1,
    icon: HouseIcon,
    gradient: "from-teal-500/15 to-green-500/5",
    heroImage: "/home-hero.webp",
  },
]

function useCategoryInfo(category: string) {
  const categoryInfo = categoriesData.find(
    (c) => c.name === category || c.slug === category
  )
  return {
    title: categoryInfo?.title || "Shopping Category",
    description:
      categoryInfo?.description ||
      "Explore shopping opportunities and discover merchants.",
    merchantCount:
      categoryInfo?.merchantCount || 0,
    heroImage: categoryInfo?.heroImage,
    gradient: categoryInfo?.gradient || "from-indigo-500/15 to-purple-500/5",
    icon: categoryInfo?.icon || ShirtIcon,
  }
}

/* Category hero – shows a category-specific hero image or a
   navy-purple gradient background. */
function CategoryHero({
  title,
  description,
  heroImage,
  gradient,
}: {
  title: string
  description: string
  heroImage?: string
  gradient: string
}) {
  return (
    <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden bg-[#0b1534]">
      <div className="absolute inset-0">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            className="w-full h-[450px] object-cover sm:h-[550px] lg:h-[650px]"
            priority={false}
          />
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black/80"
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-8 pb-12 sm:pb-16">
          <div className="flex items-center gap-2 mb-6">
            <ShirtIcon className="h-5 w-5 text-indigo-400" />
            <span className="text-xl font-black tracking-tight text-white">
              {title}
            </span>
          </div>

          <p className="text-lg text-slate-300 sm:text-base max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================
   Page composition
   ========================================================== */

export default function ShopPage({
  defaultMerchants,
}: {
  defaultMerchants?: Merchant[]
} = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""

  const {
    title,
    description,
    merchantCount,
    heroImage,
    gradient,
    icon,
  } = useCategoryInfo(category)

  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOffers() {
      if (!category) {
        setMerchants([])
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`/api/v1/offers?category=${category}&featured=true`)
        if (!res.ok) throw new Error("Failed to fetch offers")
        const data = await res.json()
        setMerchants(
          data.map((o: any) => ({
            name: o.merchant?.name || o.affiliateProgram?.program?.network?.name || "Unknown",
            slug: o.slug,
            category: o.category?.name || category,
            description: o.description || "",
            destinationUrl: `/api/v1/go/${o.affiliateProgram?.program?.network?.slug || ''}${o.slug}`,
          }))
        )
      } catch (err) {
        console.error("Error fetching offers:", err)
        setMerchants(
          defaultMerchants ||
            [
              {
                name: "FansEdge",
                slug: "fansedge",
                category: title,
                description: "Sports apparel, fan gear and merchandise.",
                destinationUrl: "/",
              },
              {
                name: "SHEIN",
                slug: "shein",
                category: title,
                description: "Fashion, accessories and lifestyle collections.",
                destinationUrl: "/",
              },
              {
                name: "Athleta",
                slug: "athleta",
                category: title,
                description: "Activewear and performance clothing.",
                destinationUrl: "/",
              },
            ]
        )
      } finally {
        setLoading(false)
      }
    }
    fetchOffers()
  }, [category, defaultMerchants])

  const [sponsoredMerchants, setSponsoredMerchants] = useState<
    SponsoredMerchant[]
  >([])

  useEffect(() => {
    async function fetchSponsored() {
      try {
        const res = await fetch(`/api/v1/offers?featured=true&sponsor=true`)
        if (!res.ok) throw new Error("Failed to fetch sponsored merchants")
        const data = await res.json()
        setSponsoredMerchants(
          data.map((o: any) => ({
            name: o.merchant?.name || "Featured Merchant",
            slug: o.slug,
            category: o.category?.name || title,
            description: o.description || "Sponsored placement",
            destinationUrl: `/api/v1/go/${o.affiliateProgram?.program?.network?.slug || ''}${o.slug}`,
          }))
        )
      } catch (err) {
        console.error("Error fetching sponsored:", err)
        setSponsoredMerchants([
          {
            name: "Featured Merchant",
            slug: "featured",
            category: title,
            description: "Sponsored placement",
            destinationUrl: "/",
          },
        ])
      }
    }
    fetchSponsored()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="flex min-h-64 items-center justify-center py-12">
          <span className="text-gray-500">Loading merchants...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <CategoryHero
        title={title}
        description={description}
        heroImage={heroImage}
        gradient={gradient}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoryTemplate
            category={{
              name: title,
              slug: category,
              description: description,
              merchantCount: merchantCount,
              icon: icon,
              gradient: gradient,
            }}
            merchants={merchants}
            sponsoredMerchants={sponsoredMerchants}
            showFilters={true}
            showSponsored={true}
          />
        </div>
      </section>
    </main>
  )
}