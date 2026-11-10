"use client"

import Image from "next/image"
import { useState } from "react"

const slides = [
  {
    image: "/images/clicknshop-hero-right-reference.png",
    alt: "Original ClickNShop shopper campaign artwork",
    eyebrow: "WELCOME TO CLICKNShop",
    title: "Discover. Explore. Shop.",
    description:
      "Explore trusted brands, discover exciting products and find shopping opportunities across fashion, technology, travel, lifestyle and more.",
    cta: "Search brands and products",
    href: "/shop",
    original: true,
  },
  {
    image: "/images/hero-fashion-new.jpg",
    alt: "Fashion shopping and clothing inspiration",
    eyebrow: "FASHION & STYLE",
    title: "Find your next favourite look.",
    description:
      "Discover fashion brands, explore fresh styles and find shopping opportunities for every occasion.",
    cta: "Explore fashion",
    href: "/shop?q=fashion",
    original: false,
  },
  {
    image: "/images/hero-technology-new.jpg",
    alt: "Modern technology and electronics",
    eyebrow: "TECHNOLOGY & ELECTRONICS",
    title: "Discover technology that moves you.",
    description:
      "Explore electronics, useful devices and technology brands in one convenient place.",
    cta: "Explore technology",
    href: "/shop?q=technology",
    original: false,
  },
  {
    image: "/images/hero-software-new.jpg",
    alt: "Modern software and digital workspace",
    eyebrow: "SOFTWARE & BUSINESS",
    title: "Find smarter digital tools.",
    description:
      "Discover software, business services and digital solutions for work and everyday life.",
    cta: "Explore software",
    href: "/shop?q=software",
    original: false,
  },
  {
    image: "/images/hero-mobile-travel-new.jpg",
    alt: "Mobile connectivity and travel inspiration",
    eyebrow: "MOBILE & TRAVEL",
    title: "Explore more possibilities.",
    description:
      "Discover mobile services, travel opportunities and brands that help you stay connected.",
    cta: "Explore opportunities",
    href: "/shop?q=travel",
    original: false,
  },
]

export default function ScrollHero() {
  const [activeSlide, setActiveSlide] = useState(0)


  return (
    <section
      aria-label="ClickNShop featured shopping discoveries"
      className="relative"
    >
      <div className="flex h-[290px] items-center justify-center overflow-hidden bg-white">
        <div
          className="relative mx-auto h-[290px] w-full max-w-[1480px] overflow-hidden rounded-none bg-[#10113c] text-white sm:rounded-xl"
          aria-live="polite"
        >
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.image}
                className="relative h-full w-full shrink-0"
              >
              {slide.original ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10113c] via-[#21145a] to-[#4930a0]" />
                  <div className="absolute right-0 top-0 hidden h-full w-[50.6%] lg:block">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority
                      sizes="749px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 lg:hidden">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover object-right"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#10113c] via-[#10113c]/90 to-[#10113c]/30" />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080f27]/95 via-[#101a3b]/75 to-[#101a3b]/20" />
                </>
              )}

              <div className="relative z-10 flex h-full max-w-[720px] flex-col items-start justify-center px-5 py-5 sm:px-8 lg:px-10">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8bd45] sm:text-xs">
                  {slide.eyebrow}
                </p>

                <h2 className="max-w-[650px] text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-[2.65rem]">
                  {slide.original ? (
                    <>
                      Discover. Explore.{" "}
                      <span className="text-[#e8bd45]">Shop.</span>
                    </>
                  ) : (
                    slide.title
                  )}
                </h2>

                <p className="mt-2 max-w-[570px] text-xs leading-5 text-white/85 sm:text-sm">
                  {slide.description}
                </p>

                {slide.original ? (
                  <form
                    action="/shop"
                    method="GET"
                    role="search"
                    className="mt-4 flex w-full max-w-[510px] items-center rounded-lg bg-white p-1.5 shadow-lg"
                  >
                    <label htmlFor="scroll-hero-search" className="sr-only">
                      Search brands, products and categories
                    </label>
                    <input
                      id="scroll-hero-search"
                      name="q"
                      type="search"
                      placeholder="Search brands, products or categories..."
                      className="h-9 min-w-0 flex-1 bg-transparent px-3 text-xs text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
                    />
                    <button
                      type="submit"
                      className="h-9 rounded-md bg-[#e8bd45] px-5 text-xs font-extrabold text-[#151538] transition hover:bg-amber-300 sm:text-sm"
                    >
                      Search
                    </button>
                  </form>
                ) : (
                  <a
                    href={slide.href}
                    className="mt-4 inline-flex h-10 items-center rounded-md bg-[#e8bd45] px-5 text-xs font-extrabold text-[#151538] transition hover:bg-amber-300 sm:text-sm"
                  >
                    {slide.cta}
                  </a>
                )}

                {slide.original && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium text-white/85 sm:text-xs">
                    <span>✓ Multiple shopping categories</span>
                    <span>✓ Transparent affiliate links</span>
                    <span>✓ Discover different brands</span>
                  </div>
                )}
              </div>
            </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#10113c]/65 text-3xl text-white shadow-lg transition hover:bg-[#10113c]"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next banner"
            onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
            className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#10113c]/65 text-3xl text-white shadow-lg transition hover:bg-[#10113c]"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to banner ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-7 bg-[#e8bd45]" : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}








