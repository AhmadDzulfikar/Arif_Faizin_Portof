"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const EASE_OUT = [0.16, 1, 0.3, 1]

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASE_OUT }
    }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
}

export function HeroSection() {
    return (
        <section className="relative w-full">
            {/* 1) HERO MAIN AREA */}
            <div className="relative w-full min-h-[85vh] flex items-center bg-[var(--background)] overflow-hidden">

                {/* Subtle Diagonal Pattern Background */}
                <div className="absolute inset-0 z-0 opacity-30 select-none pointer-events-none overflow-hidden">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="diagonal-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M-1,1 l2,-2 M0,40 l40,-40 M39,41 l2,-2" stroke="var(--primary)" strokeWidth="1" opacity="0.1" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonal-lines)" />
                    </svg>
                    {/* Abstract Shape Right */}
                    <div className="absolute -right-20 top-1/4 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-3xl" />
                </div>

                <div className="container relative z-10 mx-auto px-6 md:px-12 pt-20">
                    <motion.div
                        className="max-w-3xl"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Name/Heading */}
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold font-serif text-[var(--foreground)] tracking-tight leading-tight mb-4"
                            variants={fadeInUp}
                        >
                            ARIF <br />
                            <span className="text-[var(--primary)]">FAIZIN</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="text-lg md:text-2xl font-serif text-[var(--muted-foreground)] mb-8 max-w-2xl leading-relaxed"
                            variants={fadeInUp}
                        >
                            Pendidik, Penulis, & Penggerak Sosial. <br className="hidden md:block" />
                            Ikhtiar menghadirkan pendidikan yang lebih manusiawi.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
                            <Link href="#about-detail">
                                <button className="px-8 py-3 bg-[var(--primary)] text-white font-serif font-medium rounded-md shadow-lg hover:bg-[var(--secondary)] transition-all duration-300 transform hover:-translate-y-1">
                                    Read More
                                </button>
                            </Link>
                            <Link href="/books">
                                <button className="px-8 py-3 border border-[var(--primary)] text-[var(--primary)] font-serif font-medium rounded-md hover:bg-[var(--primary)]/5 transition-all duration-300">
                                    Explore Books
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* 2) OVERLAPPING PROFILE CARD */}
            <div className="relative z-20 -mt-24 md:-mt-32 px-4 mb-20" id="about-detail">
                <motion.div
                    className="max-w-5xl mx-auto bg-[var(--card)] rounded-xl shadow-2xl overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start border border-[var(--border)]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: EASE_OUT }}
                >
                    {/* Portrait */}
                    <div className="relative flex-shrink-0 w-full md:w-1/3 aspect-[3/4] md:aspect-[4/5] rounded-lg overflow-hidden shadow-lg group">
                        <Image
                            src="/author-portrait.webp"
                            alt="Arif Faizin Portrait"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg" />
                    </div>

                    {/* About Content */}
                    <div className="flex-1 space-y-6">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[var(--primary)]">
                            Mengenal Arif Faizin
                        </h3>

                        <div className="space-y-4 text-[var(--foreground)] font-serif text-lg leading-relaxed">
                            <p>
                                Ketua Program Studi Magister Manajemen Pendidikan Islam (MPI) Universitas PTIQ Jakarta dan Ketua STAI Fatahillah Serpong, Banten. Fokus saya adalah memastikan pendidikan berjalan dengan ritme yang sehat: kurikulumnya relevan, layanan akademiknya rapi, dan mutu pembelajarannya terus bergerak naik.
                            </p>
                            <p>
                                Dipercaya sebagai Ketua APTIKIS Jakarta–Banten (2024-2027) dan Rois Syuriah MWC NU Kramatjati. Semua amanah ini bertemu di satu titik: ikhtiar agar pendidikan dan pelayanan publik berjalan lebih manusiawi.
                            </p>
                        </div>

                        {/* Highlights Chips */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {[
                                { label: "Education", icon: "🎓" },
                                { label: "Khidmah", icon: "🤝" },
                                { label: "Books", icon: "📚" }
                            ].map((chip) => (
                                <div key={chip.label} className="flex items-center gap-2 px-4 py-2 border border-[var(--primary)]/30 rounded-full bg-[var(--primary)]/5 text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-white transition-colors cursor-default">
                                    <span>{chip.icon}</span>
                                    {chip.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
