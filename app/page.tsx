"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { HighlightsSection } from "@/components/highlights-section"
import { BooksSection } from "@/components/books-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-[#F6F4EF] min-h-screen">
      <Navbar />
      <HeroSection />
      <HighlightsSection />
      <BooksSection />
      <Footer />
    </main>
  )
}
