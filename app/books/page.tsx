"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"


const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Using the same data but ensuring author name is updated to Arif Faizin
const booksData = [
  {
    id: 1,
    slug: "aku-kamu-dan-dia",
    title: "Aku, Kamu, DIA",
    author: "Arif Faizin",
    year: "2023",
    shortDescription: "Ajakan pelan-pelan untuk berhenti sebentar dari ramainya hari, lalu bertanya dengan jujur: sebenarnya, hidupku sedang ke mana?",
    fullDescription: "Buku 'Aku, Kamu, DIA' terasa seperti ajakan pelan-pelan untuk berhenti sebentar dari ramainya hari...",
    image: "/aku_kamu_dan_dia.webp",
  },
  {
    id: 2,
    slug: "integrasi-filsafat-islam",
    title: "Integrasi Filsafat Islam dalam Pengembangan Pendidikan",
    author: "Arif Faizin",
    year: "2022",
    shortDescription: "Peta besar yang membuat kita paham: pendidikan bukan cuma soal metode mengajar, tapi soal arah hidup.",
    fullDescription: "Buku Integrasi Filsafat Islam dalam Pengembangan Pendidikan ini terasa seperti 'peta besar'...",
    image: "/integrasi_filsafat_islam_.webp",
  },
  {
    id: 3,
    slug: "manajemen-cinta-dalam-pendidikan",
    title: "Manajemen Cinta dalam Pendidikan",
    author: "Arif Faizin",
    year: "2021",
    shortDescription: "Napas baru untuk ruang kelas—mengingatkan bahwa pendidikan yang hebat selalu punya unsur yang sering hilang: rasa manusia.",
    fullDescription: "Buku Manajemen Cinta dalam Pendidikan ini terasa seperti 'napas baru' untuk ruang kelas...",
    image: "/manajemen_cinta_dalam_pendidikan.webp",
  },
  {
    id: 4,
    slug: "manajemen-cinta-sebagai-hidden-curriculum",
    title: "Manajemen Cinta sebagai Hidden Curriculum di Madrasah",
    author: "Arif Faizin",
    year: "2021",
    shortDescription: "Membuka tirai yang selama ini diam-diam menentukan 'warna' sebuah madrasah.",
    fullDescription: "Buku 'Manajemen Cinta sebagai Hidden Curriculum di Madrasah' terasa seperti membuka tirai...",
    image: "/manajemen_cinta_sebagai_hidden.webp",
  },
  {
    id: 5,
    slug: "konsep-dasar-manajemen-cinta",
    title: "Konsep Dasar Manajemen Cinta dalam Pendidikan",
    author: "Arif Faizin",
    year: "2020",
    shortDescription: "Pegangan ringkas yang merapikan cinta jadi konsep yang bisa dipahami cepat.",
    fullDescription: "Buku 'Konsep Dasar Manajemen Cinta dalam Pendidikan' terasa seperti 'pegangan ringkas'...",
    image: "/konsep_dasar_manajemen_cinta.webp",
  },
]

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

export default function BooksPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const featuredBook = booksData[0]

  return (
    <main className="min-h-screen bg-[#F6F4EF] font-serif selection:bg-[var(--primary)] selection:text-white">
      <Navbar currentPage="BOOKS" />

      {/* --- A) PAGE HEADER --- */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 bg-[var(--background)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diagonal-lines-sm" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M-1,1 l2,-2 M0,20 l20,-20 M19,21 l2,-2" stroke="var(--primary)" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonal-lines-sm)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h1 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-3" variants={fadeInUp}>
              Books
            </motion.h1>
            <motion.p className="text-xl text-[var(--muted-foreground)] italic" variants={fadeInUp}>
              Selected works and publications.
            </motion.p>
            <motion.div className="h-1 w-20 bg-[var(--primary)] mt-6 rounded-full" variants={fadeInUp} />
          </motion.div>
        </div>
      </section>



      {/* --- C) FEATURED BOOK --- */}

      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 relative aspect-[3/4] md:aspect-auto">
                <Image
                  src={featuredBook.image}
                  alt={featuredBook.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-white space-y-6">
                <div className="inline-block px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-widest rounded-full w-fit">
                  Featured Book
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">{featuredBook.title}</h2>
                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed max-w-2xl">{featuredBook.shortDescription}</p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href={`/books/${featuredBook.slug}`}>
                    <button className="px-8 py-3 bg-[var(--primary)] text-white font-medium rounded-md shadow-lg hover:bg-[var(--secondary)] transition-all duration-300 hover:-translate-y-1">
                      View Details
                    </button>
                  </Link>
                  {/* Secondary action if needed */}
                  {/* <button className="px-8 py-3 border border-[var(--border)] text-[var(--foreground)] font-medium rounded-md hover:bg-[var(--background)] transition-all duration-300">
                            Get the Book
                         </button> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* --- D) ALL BOOKS GRID --- */}
      <section className="py-12 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-[var(--foreground)] mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            All Books
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {booksData.map((book) => (
              <motion.div
                key={book.id}
                variants={fadeInUp}
                className="group"
                onMouseEnter={() => setHoveredId(book.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/books/${book.slug}`}>
                  <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    {/* Cover */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-[var(--background)]">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium px-6 py-2 border border-white/30 rounded-full backdrop-blur-sm">View Details</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-bold text-[var(--foreground)] line-clamp-2 leading-tight group-hover:text-[var(--primary)] transition-colors">
                        {book.title}
                      </h3>
                      <div className="flex justify-between items-center text-xs text-[var(--muted-foreground)] uppercase tracking-wide">
                        <span>{book.year}</span>
                        <span>{book.author}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </section>

      <Footer />
    </main>
  )
}