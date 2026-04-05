import { COMMUNITY_POSTS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function CommunitySection() {
  const { ref, inView } = useInView();
  const [liked, setLiked] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(COMMUNITY_POSTS.map((p) => [p.id, p.likes])),
  );

  function handleLike(id: number) {
    setLiked((prev) => {
      const isLiked = prev.includes(id);
      setLikeCounts((counts) => ({
        ...counts,
        [id]: counts[id] + (isLiked ? -1 : 1),
      }));
      return isLiked ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }

  return (
    <section
      id="community"
      ref={ref}
      className="py-16"
      style={{ background: "var(--becat-bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: "var(--becat-accent-light)",
              color: "var(--becat-accent)",
            }}
          >
            💬 Community
          </span>
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Cat Lover Community
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Share your stories, ask questions, and connect with fellow cat
            enthusiasts
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mb-8">
          {COMMUNITY_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border flex flex-col sm:flex-row gap-4 transition-all hover:shadow-card"
              style={{
                borderColor: "var(--becat-border)",
                boxShadow: "0 2px 12px rgba(58,42,34,0.06)",
              }}
              data-ocid={`community.item.${i + 1}`}
            >
              {/* Author avatar */}
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: "var(--becat-accent)" }}
                >
                  {post.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3
                    className="text-base font-bold font-display leading-snug"
                    style={{ color: "var(--becat-text)" }}
                  >
                    {post.title}
                  </h3>
                </div>
                <p
                  className="text-sm line-clamp-2 mb-3"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--becat-text-muted)" }}
                  >
                    @{post.author}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--becat-text-muted)" }}
                  >
                    {post.date}
                  </span>
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium transition-all active:scale-90"
                      style={{
                        color: liked.includes(post.id)
                          ? "#e11d48"
                          : "var(--becat-text-muted)",
                      }}
                      data-ocid={`community.toggle.${i + 1}`}
                    >
                      <Heart
                        size={14}
                        fill={liked.includes(post.id) ? "#e11d48" : "none"}
                        className="transition-transform active:scale-125"
                      />
                      {likeCounts[post.id].toLocaleString()}
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: "var(--becat-text-muted)" }}
                    >
                      <MessageCircle size={14} />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center rounded-3xl p-8"
          style={{ background: "var(--becat-section-bg)" }}
        >
          <div className="text-4xl mb-3">🐾</div>
          <h3
            className="text-xl font-bold font-display mb-2"
            style={{ color: "var(--becat-text)" }}
          >
            Join the Cat Lover Community
          </h3>
          <p
            className="text-sm mb-5"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Share your cat stories, get advice, and connect with thousands of
            cat enthusiasts
          </p>
          <button
            type="button"
            className="px-8 py-3 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "var(--becat-accent)" }}
            data-ocid="community.primary_button"
          >
            Join the Community 🐱
          </button>
        </motion.div>
      </div>
    </section>
  );
}
