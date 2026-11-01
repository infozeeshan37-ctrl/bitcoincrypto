import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { authors, getAuthorBySlug } from "@/lib/authorsData";
import { articles } from "@/lib/blogData";
import { 
  Award, 
  CheckCircle2, 
  Mail, 
  Github, 
  Twitter, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PersonJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found | BitcoinCrypto.tech",
    };
  }

  return {
    title: `${author.name} - ${author.role} | BitcoinCrypto.tech`,
    description: author.bio,
    alternates: {
      canonical: `/authors/${author.slug}`,
    },
    openGraph: {
      title: `${author.name} | Quantitative Research Profile`,
      description: author.bio,
      url: `https://www.bitcoincrypto.tech/authors/${author.slug}`,
      type: "profile",
      images: [
        {
          url: "https://www.bitcoincrypto.tech/favicon.ico",
          alt: `${author.name} - ${author.role}`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${author.name} | BitcoinCrypto.tech`,
      description: author.bio,
    },
  };
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const authorArticles = articles.filter((a) => a.authorSlug === author.slug);

  const sameAsList: string[] = [];
  if (author.socialLinks?.twitter) sameAsList.push(author.socialLinks.twitter);
  if (author.socialLinks?.github) sameAsList.push(author.socialLinks.github);
  if (author.socialLinks?.linkedin) sameAsList.push(author.socialLinks.linkedin);

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-slate-950 transition-colors">
      <PersonJsonLd
        name={author.name}
        jobTitle={author.role}
        description={author.bio}
        url={`https://www.bitcoincrypto.tech/authors/${author.slug}`}
        image={author.avatarUrl}
        sameAs={sameAsList}
        knowsAbout={author.areasOfExpertise}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Authors", href: "/authors" },
            { label: author.name },
          ]}
        />

        {/* Back Link */}
        <Link
          href="/authors"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Author Directory
        </Link>

        {/* Author Profile Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-3xl flex items-center justify-center border border-amber-500/20 shadow-inner shrink-0">
                {author.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified Editorial Author
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {author.name}
                </h1>
                <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {author.role}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {author.title}
                </div>
              </div>
            </div>

            {/* Social Links */}
            {author.socialLinks && (
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                {author.socialLinks.email && (
                  <a
                    href={`mailto:${author.socialLinks.email}`}
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
                    title="Email Author"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {author.socialLinks.github && (
                  <a
                    href={author.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
                    title="X / Twitter"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {author.bio}
          </p>

          {/* Credentials Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" /> Professional Credentials &amp; Background
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {author.credentials.map((cred, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas of Expertise */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
              Areas of Quantitative Research &amp; Market Expertise
            </div>
            <div className="flex flex-wrap gap-2">
              {author.areasOfExpertise.map((exp, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Extended Biography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            About {author.name}
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {author.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Published Research Papers */}
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Published Research &amp; Analysis
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peer-reviewed quantitative articles authored by {author.name}
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 font-bold">
              {authorArticles.length} Papers
            </span>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {authorArticles.map((article) => (
                <div
                  key={article.slug}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition group"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 dark:text-slate-400">{article.publishedAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition"
                    >
                      Read Research <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                New research papers authored by {author.name} are currently undergoing mathematical audit and editorial review.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Browse All Research Desk Papers →
              </Link>
            </div>
          )}
        </section>

        {/* Editorial Standards CTA */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              All research published by our team adheres to our published <strong className="text-slate-900 dark:text-white">Editorial Policy &amp; Primary Sources Mandate</strong>.
            </div>
          </div>
          <Link
            href="/editorial-policy"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
          >
            Review Policy →
          </Link>
        </div>

      </div>
    </div>
  );
}
