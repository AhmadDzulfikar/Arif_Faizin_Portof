"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from "lucide-react"
import { useSession } from "next-auth/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const PAGE_SIZE = 12
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

type PostItem = {
  id: number | string
  slug: string
  title: string
  content?: string
  imageUrl?: string | null
  createdAt: string // ISO
}

type ListResponse = {
  items: PostItem[]
  total: number
  page?: number
  pageCount?: number
}

function toExcerpt(input?: string, maxLen = 180) {
  const text = (input || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!text) return ""
  return text.length <= maxLen ? text : text.slice(0, maxLen - 1).trim() + "…"
}

export default function BlogPage() {
  const { data: session } = useSession()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostItem[]>([])
  const [error, setError] = useState<string | null>(null)

  // Fetch posts
  useEffect(() => {
    let alive = true
      ; (async () => {
        setLoading(true)
        setError(null)
        try {
          const res = await fetch(`/api/posts?page=${currentPage}&pageSize=${PAGE_SIZE}`, {
            cache: "no-store",
          })
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Fetch /api/posts failed (${res.status}): ${text.slice(0, 180)}...`);
          }
          const data: ListResponse = await res.json();
          if (!alive) return
          setPosts(data.items ?? [])
          const pages = data.pageCount ?? Math.max(1, Math.ceil((data.total ?? 0) / PAGE_SIZE))
          setTotalPages(pages || 1)
        } catch (e: any) {
          if (!alive) return
          setError(e?.message ?? "Failed to load posts")
          setPosts([])
          setTotalPages(1)
        } finally {
          if (alive) setLoading(false)
        }
      })()
    return () => {
      alive = false
    }
  }, [currentPage])

  const currentBlogs = useMemo(
    () =>
      posts.map((p, i) => ({
        id: p.id ?? `${p.slug}-${i}`,
        slug: p.slug,
        title: p.title,
        excerpt: toExcerpt(p.content),
        image: p.imageUrl || "/placeholder.png",
        date: p.createdAt,
      })),
    [posts]
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-serif selection:bg-primary/20">
      <Navbar />

      <main className="pt-32 pb-16">
        {/* Header Section */}
        <section className="container mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
            <div className="max-w-2xl">
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                Arif Faizin Blog
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              >
                Thoughts on Islamic education, management, and community service.
              </motion.p>
            </div>

            {session?.user && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link
                  href="/blog/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-secondary transition-colors"
                >
                  <Plus size={18} />
                  Add Blog
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="container mx-auto px-6 md:px-12">
          {loading ? (
            <div className="text-center text-muted-foreground py-20 animate-pulse">Loading stories...</div>
          ) : error ? (
            <div className="text-center text-destructive py-20">Error: {error}</div>
          ) : currentBlogs.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">No posts found.</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentBlogs.map((blog, idx) => {
                // Feature the first post on the grid
                const isFeatured = idx === 0;

                return (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE_OUT }}
                    className={`group cursor-pointer flex flex-col gap-4 ${isFeatured ? 'lg:col-span-2' : ''}`}
                  >
                    <Link href={`/blog/${blog.slug}`} className={`block h-full ${isFeatured ? 'flex flex-col md:flex-row gap-6 md:gap-8' : ''}`}>

                      {/* Image Card */}
                      <div className={`
                        relative overflow-hidden rounded-xl bg-muted shadow-sm border border-border/50 transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1
                        ${isFeatured ? 'w-full md:w-1/2 min-h-[300px] md:min-h-full' : 'w-full aspect-[16/10]'}
                      `}>
                        <motion.img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Soft overlay on hover */}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                      </div>

                      {/* Content */}
                      <div className={`flex flex-col justify-center ${isFeatured ? 'w-full md:w-1/2 pt-4 md:pt-0' : 'pt-2'}`}>

                        <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-3 font-medium uppercase tracking-wider">
                          <span>
                            {new Date(blog.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          {/* Optional Category Tag if data existed */}
                          <span className="w-1 h-1 bg-border rounded-full" />
                          <span>Blog</span>
                        </div>

                        <h2 className={`font-bold text-foreground font-serif leading-tight group-hover:text-primary transition-colors duration-300 ${isFeatured ? 'text-3xl md:text-4xl mb-4' : 'text-xl md:text-2xl mb-3'}`}>
                          {blog.title}
                        </h2>

                        <p className={`text-muted-foreground leading-relaxed font-serif ${isFeatured ? 'text-lg line-clamp-4 mb-6' : 'text-base line-clamp-3 mb-4'}`}>
                          {blog.excerpt}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-primary font-semibold text-sm group-hover:underline decoration-1 underline-offset-4">
                          Read Story <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </section>

        {/* Pagination */}
        <div className="container mx-auto px-6 md:px-12 pt-20 pb-8 separator">
          <div className="w-full h-px bg-border mb-8" />
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className="p-2 rounded-full border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={loading}
                  className={`w-10 h-10 rounded-full font-medium font-serif flex items-center justify-center transition-all duration-300 ${currentPage === page
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              className="p-2 rounded-full border border-border text-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
