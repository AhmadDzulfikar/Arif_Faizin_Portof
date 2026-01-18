"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Comments from "@/components/Comments"

type Post = {
  id: number | string
  slug: string
  title: string
  content: string
  imageUrl?: string | null
  createdAt: string // ISO
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: session } = useSession()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
      ; (async () => {
        setLoading(true)
        setError(null)
        try {
          const res = await fetch(`/api/posts/${slug}`, { cache: "no-store" })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data: Post = await res.json()
          if (!alive) return
          setPost(data ?? null)
        } catch (e: any) {
          if (!alive) return
          setError(e?.message ?? "Failed to load")
          setPost(null)
        } finally {
          if (alive) setLoading(false)
        }
      })()
    return () => {
      alive = false
    }
  }, [slug])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground animate-pulse">Loading story...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-4">Blog Not Found</h1>
          {error && <p className="text-sm text-destructive mb-6">Error: {error}</p>}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const coverUrl = post.imageUrl || "/placeholder.png"

  return (
    <article className="min-h-screen bg-background text-foreground font-serif selection:bg-primary/20">
      {/* Top Navigation Bar */}
      <motion.div
        className="pt-8 px-6 md:px-12 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            <span className="group-hover:underline underline-offset-4 decoration-primary/50">Back to Blog</span>
          </Link>

          {session?.user && (
            <Link
              href={`/blog/${post.slug}/edit`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Pencil size={16} />
              Edit Blog
            </Link>
          )}
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        className="max-w-5xl mx-auto px-4 md:px-6 mb-12"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-lg border border-border/50 bg-muted">
          <img src={coverUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="max-w-3xl mx-auto px-6 md:px-8 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          {post.title}
        </motion.h1>

        {/* Meta */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 text-sm md:text-base text-muted-foreground mb-12 pb-8 border-b border-border"
        >
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="w-1 h-1 bg-primary/40 rounded-full" />
          <span className="font-medium text-foreground/80">Akhmad Shunhaji</span>
        </motion.div>

        {/* Body */}
        {/* Note: Overriding global .tiptap styles to match theme */}
        <motion.div
          variants={itemVariants}
          className="
            tiptap prose prose-lg prose-slate max-w-none 
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground 
            prose-p:text-muted-foreground prose-p:leading-relaxed 
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:italic
            prose-img:rounded-lg prose-img:shadow-md
            marker:text-primary
            [&_*]:!text-inherit
          "
          style={{ color: 'var(--foreground)' }}
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full h-px bg-border my-16" />

        {/* Comments Section */}
        <Comments slug={post.slug} />
      </motion.div>
    </article>
  )
}
