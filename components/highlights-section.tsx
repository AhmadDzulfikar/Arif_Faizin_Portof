"use client"

import { motion } from "framer-motion"
import { BookOpen, Users, GraduationCap } from "lucide-react"

const highlights = [
    {
        title: "Academic Leadership",
        text: "Ketua STAI Fatahillah Serpong & Kaprodi Magister MPI Universitas PTIQ Jakarta.",
        icon: GraduationCap
    },
    {
        title: "Community Service",
        text: "Ketua APTIKIS Jakarta–Banten (2024-2027) & Rois Syuriah MWC NU Kramatjati.",
        icon: Users
    },
    {
        title: "Prolific Author",
        text: "Penulis buku manajemen pendidikan transformatif & spiritualitas.",
        icon: BookOpen
    }
]

export function HighlightsSection() {
    return (
        <section className="py-16 bg-[var(--background)]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.title}
                            className="group p-8 bg-[var(--card)] rounded-xl shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="mb-4 text-[var(--primary)] group-hover:scale-110 transition-transform duration-300 origin-left">
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-[var(--muted-foreground)] font-serif leading-relaxed">
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
