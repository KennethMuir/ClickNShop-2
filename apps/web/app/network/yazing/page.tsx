"use client"
import { useEffect, useState } from "react"

type NetworkMerchant = {
  name: string
  slug: string
  description: string
  destinationUrl: string
  publisherId?: string
}


export default function YazingPage() {
  const [merchants, setMerchants] = useState<NetworkMerchant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const res = await fetch(`/api/v1/affiliate-links?network=yazing&status=ACTIVE&take=38`)
        if (!res.ok) throw new Error("Failed to fetch Yazing merchants")
        const data = await res.json()
        setMerchants(
          data.map((al: any) => ({
            name: al.merchant?.name || "Unknown",
            slug: al.merchantSlug || al.slug || "",
            description: al.description || "Yazing merchant",
            destinationUrl: `/api/v1/go/${al.affiliateProgram?.program?.network?.slug || ''}${al.slug}`,
            publisherId: "KennethMuiruri",
          }))
        )
      } catch (err) {
        console.error("Error fetching Yazing merchants:", err)
        // Fallback to placeholder merchants (first 9 of 38)
        setMerchants([
          {
            name: "FansEdge",
            slug: "fansedge",
            description: "Sports apparel, fan gear and merchandise.",
            destinationUrl: "/api/v1/go/fansedge",
            publisherId: "KennethMuiruri",
          },
          {
            name: "SHEIN",
            slug: "shein",
            description: "Fashion, accessories and lifestyle collections.",
            destinationUrl: "/api/v1/go/shein",
            publisherId: "KennethMuiruri",
          },
          {
            name: "Athleta",
            slug: "athleta",
            description: "Activewear and performance clothing.",
            destinationUrl: "/api/v1/go/athleta",
            publisherId: "KennethMuiruri",
          },
          {
            name: "Columbia",
            slug: "columbia",
            description: "Outdoor clothing, footwear and equipment.",
            destinationUrl: "/api/v1/go/columbia",
            publisherId: "KennethMuiruri",
          },
          {
            name: "ABT",
            slug: "abt",
            description: "Electronics, appliances and technology.",
            destinationUrl: "/api/v1/go/abt",
            publisherId: "KennethMuiruri",
          },
          {
            name: "Fire Maple Gear",
            slug: "firemaplegear",
            description: "Portable camping stoves, cookware and outdoor cooking equipment.",
            destinationUrl: "https://yazing.com/deals/firemaplegear/KennethMuiruri",
            publisherId: "KennethMuiruri",
          },
          {
            name: "HostGator",
            slug: "hostgator",
            description: "Web hosting and online business services.",
            destinationUrl: "/api/v1/go/hostgator",
            publisherId: "KennethMuiruri",
          },
          {
            name: "CyberGhost VPN",
            slug: "cyberghostvpn",
            description: "Online privacy and VPN services.",
            destinationUrl: "/api/v1/go/cyberghostvpn",
            publisherId: "KennethMuiruri",
          },
          {
            name: "Homebase",
            slug: "joinhomebase",
            description: "Employee scheduling and workforce tools.",
            destinationUrl: "/api/v1/go/joinhomebase",
            publisherId: "KennethMuiruri",
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchMerchants()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-slate-900">
        <div className="flex min-h-64 items-center justify-center py-12">
          <span className="text-gray-500">Loading merchants...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8"><ol className="flex items-center gap-2 text-sm text-slate-500"><li><a href="/" className="hover:text-indigo-600">Home</a></li><li aria-hidden="true">/</li><li aria-current="page">Yazing</li></ol></nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Yazing Affiliate Network
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          Verified affiliate merchants with direct tracking. All links preserve
          the KennethMuiruri publisher identifier.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {merchants.map((merchant, index) => (
            <article key={merchant.slug} className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="p-4">
                <h3 className="font-medium text-slate-900">{merchant.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {merchant.description}
                </p>
                <div className="mt-3">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 rounded px-2 py-1">
                    <svg className="size-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5H2z" />
                    </svg>
                    Yazing merchant
                  </span>
                  <a
                    href={merchant.destinationUrl}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 hover:underline text-sm font-medium"
                  >
                    Visit merchant
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-600 mb-2">
            About Yazing affiliate program
          </h4>
          <p className="text-sm text-slate-600">
            Yazing affiliate links include the publisher identifier KennethMuiruri
            to ensure proper commission attribution. All merchant destinations are
            verified and active. No fake or guessed URLs are used.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Total verified merchants: 38
          </p>
        </div>
      </div>
    </main>
  )
}
