"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Briefcase, MapPin, GraduationCap, Award, BookOpen, Users } from "lucide-react"

// --- Animation Variants ---
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT }
    }
}

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

// --- SECTION A replacement: About Hero (Image + Long Text) ---
export function AboutHero() {
    const bioParagraphs = [
        "Perjalanan akademis saya dimulai dari pendidikan dasar di Blitar hingga menyelesaikan studi doktoral di Universitas Negeri Jakarta pada tahun 2013. Sebelumnya, saya menempuh pendidikan sarjana di IAIN Sunan Kalijaga dan magister di UNISLA. Latar belakang pendidikan ini dilengkapi dengan pengalaman nyantri di berbagai pesantren besar seperti PPMH Tlogo, PP Tarbiyatul Falah Pakunden, dan PP Al Munawwir Krapyak Yogyakarta yang membentuk fondasi keilmuan serta karakter saya hari ini.",
        "Karier profesional saya dedikasikan untuk dunia pendidikan dan pelayanan publik. Saat ini saya aktif sebagai Dosen Pascasarjana S2 Ekonomi Syariah di UIN SATU Tulungagung sejak tahun 2019. Sebelumnya, saya dipercaya mengemban amanah sebagai Sekretaris Jurusan PGMI di institusi yang sama. Pengalaman birokrasi saya juga terasah saat bertugas sebagai Penghulu di KUA dan URAIS Kemenag. Kombinasi pengalaman akademis dan birokrasi ini memberi saya perspektif luas dalam mengelola lembaga pendidikan serta memahami dinamika sosial masyarakat secara mendalam dan komprehensif.",
        "Selain dunia kampus, saya sangat aktif berkhidmat di Nahdlatul Ulama. Amanah yang pernah saya emban meliputi Wakil Ketua Tanfidziah PCNU Kabupaten Blitar dan Ketua Lakpesdam. Saya juga pernah memimpin Badan Aset NU serta aktif di GP Ansor dan IPNU. Dedikasi ini adalah wujud komitmen saya untuk terus memberdayakan umat dan merawat tradisi keagamaan yang moderat di tengah masyarakat.",
        "Saya juga aktif menuangkan pemikiran melalui tulisan. Karya saya antara lain buku Transformasi Manajemen Pesantren Salafiyah Lirboyo serta menjadi Editor in Chief Jurnal Pendidikan Taallum. Menulis bagi saya adalah upaya mengabadikan gagasan dan berkontribusi pada pengembangan literasi akademik yang lebih luas.",
        "Di luar aktivitas tersebut, saya terlibat dalam organisasi lintas sektoral seperti MUI, DMI, dan IPHI. Semua ini saya lakukan sebagai bentuk pengabdian tanpa henti kepada agama dan bangsa."
    ]

    return (
        <section className="relative pt-32 pb-16 px-6 md:px-12 bg-[var(--background)] overflow-hidden">
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

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    className="bg-[var(--card)] rounded-xl shadow-lg border border-[var(--border)] p-8 md:p-12"
                    initial="hidden" animate="visible" variants={staggerContainer}
                >
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                        {/* Left: Image (40-45%) */}
                        <motion.div
                            className="w-full md:w-[40%] flex-shrink-0"
                            variants={fadeInUp}
                        >
                            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src="/author-portrait.png"
                                    alt="Arif Faizin"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Right: Text (55-60%) */}
                        <motion.div
                            className="w-full md:w-[60%] space-y-6"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp}>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] mb-2">About</h1>
                                <p className="text-xl text-[var(--muted-foreground)] font-serif italic">Mengenal lebih dekat Arif Faizin.</p>
                            </motion.div>

                            <div className="h-px w-full bg-[var(--border)]" />

                            <div className="space-y-6 text-lg leading-relaxed text-[var(--foreground)] font-serif">
                                {bioParagraphs.map((text, idx) => (
                                    <motion.p key={idx} variants={fadeInUp}>
                                        {text}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


// --- SECTION C: Focus & Values ---
export function FocusValues() {
    const values = [
        { title: "Pendidikan & Pesantren", text: "Mengintegrasikan tradisi keilmuan pesantren dengan manajemen pendidikan modern.", icon: GraduationCap },
        { title: "Khidmah Organisasi", text: "Dedikasi panjang mengabdi di NU dan organisasi keagamaan untuk kemaslahatan umat.", icon: Users },
        { title: "Literasi Akademik", text: "Aktif membangun tradisi intelektual melalui penulisan buku dan pengelolaan jurnal ilmiah.", icon: BookOpen },
    ]

    return (
        <section className="py-16 px-6 md:px-12 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto">
                <motion.div className="text-center mb-12" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
                    <h2 className="text-3xl font-serif font-bold text-[var(--foreground)]">Focus & Values</h2>
                    <div className="w-16 h-1 bg-[var(--accent)] mx-auto mt-4 rounded-full opacity-60" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-[var(--card)] p-8 rounded-xl shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow duration-300 group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="mb-4 text-[var(--primary)] bg-[var(--primary)]/10 w-12 h-12 rounded-lg flex items-center justify-center group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3">{item.title}</h3>
                            <p className="text-[var(--muted-foreground)] font-serif leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- SECTION D: Roles (Tabs) ---
const rolesData = {
    Academic: [
        { title: "Dosen Pascasarjana S2 Ekonomi Syariah", inst: "UIN SATU Tulungagung (2019-Sekarang)", desc: "Mengampu mata kuliah dan membimbing mahasiswa tingkat lanjut." },
        { title: "Dosen FTIK", inst: "UIN SATU Tulungagung (2015-Sekarang)", desc: "Pengajar aktif di Fakultas Tarbiyah dan Ilmu Keguruan." },
        { title: "Sekjur PGMI", inst: "FTIK UIN Satu Tulungagung (2017-2022)", desc: "Mengelola administrasi dan pengembangan akademik jurusan." },
        { title: "Editor In Chief", inst: "Jurnal Pendidikan Ta'allum (2015-Sekarang)", desc: "Memimpin redaksi jurnal ilmiah terakreditasi." },
    ],
    Organization: [
        { title: "Wakil Ketua Tanfidziah", inst: "PCNU Kab. Blitar (2012-2023)", desc: "Mengawal kebijakan organisasi di tingkat cabang." },
        { title: "Ketua Badan Aset NU/BPPAB", inst: "PCNU Kab. Blitar (2013-2023)", desc: "Mengelola dan menginventarisasi aset organisasi." },
        { title: "BPP UNU Blitar", inst: "Universitas Nahdlatul Ulama Blitar (2018-2022)", desc: "Badan Pelaksana Penyelenggara perguruan tinggi NU." },
        { title: "Ketua Lakpesdam", inst: "Kab. Blitar (2007-2012)", desc: "Lembaga Kajian dan Pengembangan Sumber Daya Manusia." },
    ],
    Community: [
        { title: "Pengurus Aktif", inst: "MUI, DMI, IPHI", desc: "Berkhidmat di Majelis Ulama, Dewan Masjid, dan Ikatan Persaudaraan Haji." },
        { title: "Penghulu di KUA", inst: "Kementerian Agama (2005-2007)", desc: "Melayani masyarakat dalam pencatatan pernikahan." },
        { title: "Staf URAIS", inst: "Kemenag (2007-2009)", desc: "Uurusan Agama Islam dan Pembinaan Syariah." },
    ]
}

export function RolesTabs() {
    const [activeTab, setActiveTab] = useState<keyof typeof rolesData>("Academic")
    const tabs = Object.keys(rolesData) as Array<keyof typeof rolesData>

    return (
        <section className="py-16 px-6 md:px-12 bg-[var(--background)]">
            <div className="max-w-5xl mx-auto">
                <motion.div className="mb-10 text-center" initial="hidden" whileInView="visible" variants={fadeInUp} viewport={{ once: true }}>
                    <h2 className="text-3xl font-serif font-bold text-[var(--foreground)]">Amanah & Peran</h2>
                </motion.div>

                {/* Tabs Header */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-serif font-medium transition-all duration-300 text-sm tracking-wide uppercase ${activeTab === tab
                                ? "bg-[var(--primary)] text-white shadow-md"
                                : "bg-white text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {rolesData[activeTab].map((role, i) => (
                                <div key={i} className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm hover:border-[var(--primary)] transition-colors group">
                                    <h3 className="text-lg font-bold font-serif text-[var(--foreground)] group-hover:text-[var(--primary)]">{role.title}</h3>
                                    <p className="text-[var(--secondary)] text-sm font-medium mb-2 uppercase tracking-wider">{role.inst}</p>
                                    <p className="text-[var(--muted-foreground)] text-sm font-serif">{role.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}

// --- SECTION E: Timeline ---
const milestones = [
    { year: "2001", title: "Lulus S1 IAIN Sunan Kalijaga", desc: "Menyelesaikan pendidikan sarjana di Yogyakarta." },
    { year: "2005", title: "Penghulu di KUA", desc: "Memulai pengabdian di Kementerian Agama (hingga 2007)." },
    { year: "2007", title: "Lulus S2 UNISLA", desc: "Meraih gelar Magister Agama." },
    { year: "2007", title: "Ketua Lakpesdam Kab. Blitar", desc: "Memimpin lembaga kajian NU (hingga 2012)." },
    { year: "2012", title: "Wakil Ketua Tanfidziah PCNU", desc: "Amanah kepemimpinan di PCNU Kab. Blitar." },
    { year: "2013", title: "Doktoral (S3) UNJ", desc: "Lulus program doktoral Manajemen Pendidikan Universitas Negeri Jakarta." },
    { year: "2015", title: "Dosen FTIK UIN SATU", desc: "Memulai karir dosen di UIN Sayyid Ali Rahmatullah Tulungagung." },
    { year: "2017", title: "Sekjur PGMI", desc: "Menjabat Sekretaris Jurusan PGMI FTIK UIN Satu (hingga 2022)." },
    { year: "2019", title: "Dosen Pascasarjana S2", desc: "Mengajar di program Pascasarjana Ekonomi Syariah." },
]

export function CareerTimeline() {
    return (
        <section className="py-20 px-6 md:px-12 bg-[var(--background)]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-[var(--foreground)] text-center mb-16">Perjalanan Karir</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {milestones.map((milestone, i) => (
                        <motion.div
                            key={i}
                            className="flex gap-6 items-start"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="flex-shrink-0">
                                <span className="block px-3 py-1 bg-[var(--background)] border border-[var(--primary)] text-[var(--primary)] text-sm font-bold rounded font-serif shadow-sm">
                                    {milestone.year}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-1">{milestone.title}</h3>
                                <p className="text-[var(--muted-foreground)] font-serif leading-relaxed">{milestone.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- SECTION F: CTA Strip ---
export function AboutCTA() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[var(--background)] border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    className="bg-[var(--card)] p-10 rounded-2xl shadow-xl border border-[var(--border)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-serif font-bold text-[var(--foreground)] mb-4">Ingin Berkolaborasi?</h2>
                    <p className="text-lg text-[var(--muted-foreground)] font-serif mb-8 max-w-lg mx-auto">
                        Silakan hubungi untuk diskusi mengenai pendidikan, ekonomi syariah, atau undangan kegiatan.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-10 py-3 bg-[var(--primary)] text-white font-serif font-medium rounded-full shadow-lg hover:bg-[var(--secondary)] hover:-translate-y-1 transition-all duration-300"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
