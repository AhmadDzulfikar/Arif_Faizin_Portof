"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-serif selection:bg-primary/20">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">

          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contact</h1>
            <p className="text-lg text-muted-foreground mb-6">Let's start a conversation.</p>
            <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
          </motion.div>

          {/* Primary Methods */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* WhatsApp */}
            <motion.div variants={itemVariants} className="group flex flex-col items-start p-8 bg-card border border-border/60 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">WhatsApp</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">Fastest response for quick questions and direct messaging.</p>

              <a
                href="https://wa.me/6285215243740"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
              >
                Chat on WhatsApp <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="group flex flex-col items-start p-8 bg-card border border-border/60 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Email</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">For formal inquiries, academic collaborations, and documentation.</p>

              <a
                href="mailto:akhmadshunhaji@ptiq.ac.id"
                className="mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-all duration-300"
              >
                Send Email <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Secondary Enquiries */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Speaking */}
            <motion.div variants={itemVariants} className="p-8 bg-card border border-border/60 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-foreground">Invitations & Seminars</h3>
              <p className="text-muted-foreground bg-transparent text-sm leading-relaxed mb-4">
                Available for academic speaking engagements, workshops, and religious seminars.
              </p>
              <a href="mailto:akhmadshunhaji@ptiq.ac.id" className="text-primary font-medium text-sm hover:underline decoration-1 underline-offset-4 inline-flex items-center gap-1">
                Request Invitation <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Collaboration */}
            <motion.div variants={itemVariants} className="p-8 bg-card border border-border/60 rounded-xl shadow-sm hover:border-primary/30 transition-colors">
              <h3 className="text-lg font-bold mb-3 text-foreground">Collaboration & Partnerships</h3>
              <p className="text-muted-foreground bg-transparent text-sm leading-relaxed mb-4">
                Open to joint research, book writing projects, and educational development programs.
              </p>
              <a href="https://wa.me/6285215243740" className="text-primary font-medium text-sm hover:underline decoration-1 underline-offset-4 inline-flex items-center gap-1">
                Discuss Partnership <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>

          {/* Location & Social */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Location */}
            <motion.div variants={itemVariants} className="md:col-span-2 flex items-center gap-5 p-6 bg-card border border-border/60 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">UIN Sayyid Ali Rahmatullah</h3>
                <p className="text-sm text-muted-foreground">Tulungagung, Jawa Timur 🇮🇩</p>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="md:col-span-1 flex items-center justify-center gap-4 p-6 bg-card border border-border/60 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <a
                href="/#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="/#"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-[#E4405F] hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </motion.div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
