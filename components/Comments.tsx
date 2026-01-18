"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MessageCircle, Reply, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";

// Admin info for auto-fill when logged in
const ADMIN_NAME = "Akhmad Shunhaji";
const ADMIN_EMAIL = "akhmadshunhaji@ptiq.ac.id";

// Comment node type (matches API response)
interface CommentNode {
  id: number;
  name: string;
  email?: string;
  content: string;
  createdAt: string;
  parentId: number | null;
  replies: CommentNode[];
  isAuthor?: boolean;
}

interface CommentsProps {
  slug: string;
}

// Max indentation depth for display
const MAX_DISPLAY_DEPTH = 4;
const INDENT_PX = 24;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Comment Form Component
function CommentForm({
  onSubmit,
  onCancel,
  loading,
  isReply = false,
  isLoggedIn = false,
}: {
  onSubmit: (name: string, email: string, content: string) => Promise<void>;
  onCancel?: () => void;
  loading: boolean;
  isReply?: boolean;
  isLoggedIn?: boolean;
}) {
  const [name, setName] = useState(isLoggedIn ? ADMIN_NAME : "");
  const [email, setEmail] = useState(isLoggedIn ? ADMIN_EMAIL : "");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const finalName = isLoggedIn ? ADMIN_NAME : name;
    const finalEmail = isLoggedIn ? ADMIN_EMAIL : email;

    if (!finalName.trim() || finalName.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    if (!finalEmail.trim() || !finalEmail.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!content.trim() || content.length < 3) {
      setError("Comment must be at least 3 characters");
      return;
    }

    try {
      await onSubmit(finalName.trim(), finalEmail.trim(), content.trim());
      // Clear form on success
      setContent("");
      if (!isLoggedIn) {
        setName("");
        setEmail("");
      }
    } catch (e: any) {
      setError(e?.message || "Failed to post comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-serif">
      <div>
        <textarea
          placeholder="Write your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 h-32 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none transition-shadow duration-200"
          disabled={loading}
          maxLength={2000}
        />
        <div className="text-right text-xs text-muted-foreground mt-1">
          {content.length}/2000
        </div>
      </div>

      {/* Show name/email fields only for non-logged-in users */}
      {!isLoggedIn && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow duration-200"
              disabled={loading}
              maxLength={60}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Email <span className="text-destructive">*</span>{" "}
              <span className="text-xs font-normal opacity-70">(not displayed)</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow duration-200"
              disabled={loading}
            />
          </div>
        </div>
      )}

      {/* Show logged-in user info */}
      {isLoggedIn && (
        <div className="flex items-center gap-2 text-sm text-foreground bg-primary/5 p-2 rounded-md border border-primary/10 inline-block">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            {ADMIN_NAME.charAt(0)}
          </div>
          <span>Posting as <span className="text-primary font-semibold">{ADMIN_NAME}</span></span>
        </div>
      )}

      {/* Honeypot field (hidden) */}
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {error && <p className="text-sm text-destructive font-medium bg-destructive/5 p-2 rounded border border-destructive/20">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isReply ? "Reply" : "Post Comment"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-full bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// Single Comment Component
function CommentItem({
  comment,
  depth,
  onReply,
  replyingToId,
  onSubmitReply,
  onCancelReply,
  replyLoading,
  isLoggedIn,
}: {
  comment: CommentNode;
  depth: number;
  onReply: (id: number) => void;
  replyingToId: number | null;
  onSubmitReply: (name: string, email: string, content: string) => Promise<void>;
  onCancelReply: () => void;
  replyLoading: boolean;
  isLoggedIn: boolean;
}) {
  const [showReplies, setShowReplies] = useState(true);
  const actualDepth = Math.min(depth, MAX_DISPLAY_DEPTH - 1);
  const hasReplies = comment.replies && comment.replies.length > 0;

  // Check if this comment is from the author (admin)
  const isAuthorComment = comment.isAuthor || comment.name === ADMIN_NAME;

  return (
    <div
      className="relative font-serif"
      style={{
        marginLeft: depth > 0 ? INDENT_PX : 0,
      }}
    >
      {/* Thread line for nested comments */}
      {depth > 0 && (
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-primary/20 transition-colors"
          style={{ left: -INDENT_PX / 2 }}
        />
      )}

      <div
        className={`py-5 group ${depth > 0 ? "pl-4 border-l-2 border-border/50 hover:border-primary/20 transition-colors" : "border-b border-border/50 last:border-0"
          }`}
      >
        {/* Comment Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${isAuthorComment
              ? "bg-primary text-primary-foreground ring-2 ring-background shadow-md"
              : "bg-muted text-foreground border border-border"
            }`}>
            {comment.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${isAuthorComment ? "text-primary" : "text-foreground"}`}>
                {comment.name}
              </span>
              {isAuthorComment && (
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                  Author
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground/80 font-medium">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>

        {/* Comment Content */}
        <div
          className="text-muted-foreground leading-relaxed whitespace-pre-wrap break-words ml-12 text-sm md:text-base"
          style={{ wordBreak: "break-word" }}
        >
          {comment.content}
        </div>

        {/* Reply Button */}
        <div className="ml-12 mt-3 flex items-center gap-4">
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wide text-muted-foreground hover:text-primary transition-colors"
          >
            <Reply className="w-3.5 h-3.5" />
            Reply
          </button>

          {hasReplies && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {showReplies ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Hide replies
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  Show {comment.replies.length} replies
                </>
              )}
            </button>
          )}
        </div>

        {/* Reply Form */}
        {replyingToId === comment.id && (
          <div className="ml-0 sm:ml-12 mt-4 p-5 bg-muted/30 rounded-xl border border-border">
            <p className="text-sm text-foreground/80 mb-4 font-medium flex items-center gap-2">
              <Reply className="w-4 h-4 text-primary" />
              Replying to <span className="text-primary font-bold">{comment.name}</span>
            </p>
            <CommentForm
              onSubmit={onSubmitReply}
              onCancel={onCancelReply}
              loading={replyLoading}
              isReply
              isLoggedIn={isLoggedIn}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {hasReplies && showReplies && (
        <div className="space-y-0 mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              replyingToId={replyingToId}
              onSubmitReply={onSubmitReply}
              onCancelReply={onCancelReply}
              replyLoading={replyLoading}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Comments Component
export default function Comments({ slug }: CommentsProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const [comments, setComments] = useState<CommentNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyLoading, setReplyLoading] = useState(false);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${slug}/comments`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load comments");
      }

      setComments(data.items || []);
      setError(null);
    } catch (e: any) {
      setError(e?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Submit new top-level comment
  const handleSubmitComment = useCallback(
    async (name: string, email: string, content: string) => {
      setSubmitting(true);
      try {
        const res = await fetch(`/api/posts/${slug}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, content }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error(
              `Too many comments. Please wait ${data.retryAfter || 60} seconds.`
            );
          }
          const msg =
            data.error === "validation"
              ? Object.values(data.issues?.fieldErrors || {})
                .flat()
                .join(", ") || "Validation failed"
              : data.error || "Failed to post comment";
          throw new Error(msg);
        }

        // Add new comment to list
        if (data.comment) {
          setComments((prev) => [...prev, data.comment]);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [slug]
  );

  // Submit reply
  const handleSubmitReply = useCallback(
    async (name: string, email: string, content: string) => {
      if (!replyingToId) return;

      setReplyLoading(true);
      try {
        const res = await fetch(`/api/posts/${slug}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            content,
            parentId: replyingToId,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error(
              `Too many comments. Please wait ${data.retryAfter || 60} seconds.`
            );
          }
          const msg =
            data.error === "validation"
              ? Object.values(data.issues?.fieldErrors || {})
                .flat()
                .join(", ") || "Validation failed"
              : data.error || "Failed to post reply";
          throw new Error(msg);
        }

        // Refetch to get updated tree
        await fetchComments();
        setReplyingToId(null);
      } finally {
        setReplyLoading(false);
      }
    },
    [slug, replyingToId, fetchComments]
  );

  const totalComments = comments.reduce((acc, c) => {
    const countReplies = (node: CommentNode): number => {
      let count = 1;
      for (const reply of node.replies) {
        count += countReplies(reply);
      }
      return count;
    };
    return acc + countReplies(c);
  }, 0);

  return (
    <div className="mt-20 font-serif">
      {/* Section Header */}
      <div className="border-b border-border pb-6 mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary" />
          Comments <span className="text-muted-foreground ml-1 font-normal text-2xl">({totalComments})</span>
        </h2>
      </div>

      {/* Comment Form */}
      <div className="mb-16 bg-card rounded-xl p-6 border border-border/50 shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Leave a Reply
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Share your thoughts on this article.
        </p>
        {!isLoggedIn && (
          <p className="text-xs text-muted-foreground mb-4">
            Required fields are marked <span className="text-destructive">*</span>
          </p>
        )}
        <CommentForm onSubmit={handleSubmitComment} loading={submitting} isLoggedIn={isLoggedIn} />
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-destructive/5 rounded-xl border border-destructive/20">
          <p className="text-destructive font-medium mb-2">{error}</p>
          <button
            onClick={fetchComments}
            className="text-sm text-primary hover:underline font-bold uppercase tracking-wide"
          >
            Try again
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-16 bg-muted/20 rounded-xl border border-dashed border-border/60">
          <p className="text-muted-foreground text-lg mb-2">No comments yet.</p>
          <p className="text-sm text-muted-foreground/60">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={0}
              onReply={setReplyingToId}
              replyingToId={replyingToId}
              onSubmitReply={handleSubmitReply}
              onCancelReply={() => setReplyingToId(null)}
              replyLoading={replyLoading}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
