"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  AboutHero,
  FocusValues,
  RolesTabs,
  CareerTimeline,
  AboutCTA
} from "@/components/about-components"

export default function AboutPage() {
  return (
    <main className="bg-[#F6F4EF] min-h-screen font-serif">
      <Navbar currentPage="ABOUT" />

      <AboutHero />
      <FocusValues />
      <RolesTabs />
      <CareerTimeline />
      <AboutCTA />

      <Footer />
    </main>
  )
}

