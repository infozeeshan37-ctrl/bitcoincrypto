import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Award, ShieldCheck, ArrowRight, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { authors, Author, getAuthorBySlug } from "@/lib/authorsData";

interface AuthorBioBoxProps {
  authorSlug?: string;
  reviewedBySlug?: string;
}

export default function AuthorBioBox({ authorSlug = "research-desk", reviewedBySlug = "zeeshan-ahmed" }: AuthorBioBoxProps) {
  const author: Author = getAuthorBySlug(authorSlug) || authors[0];
  const reviewer: Author = getAuthorBySlug(reviewedBySlug) || authors[0];

  return (
    <div className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>E-E-A-T Verified Quantitative Research &amp; Peer Review</span>
        </div>
        <Link
          href="/editorial-policy"
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition underline"
        >
          Our Editorial Standards →
        </Link>
      </div>

      {/* Main Author Information */}
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border border-slate-300 dark:border-slate-700 shadow-inner">
          <Image
            src={author.avatarUrl}
            alt={`${author.name} - ${author.role}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 64px, 80px"
          />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                Written By
              </div>
              <Link
                href={`/authors/${author.slug}`}
                className="text-lg font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition inline-flex items-center gap-1.5"
              >
                <span>{author.name}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </Link>
            </div>

            <Link
              href={`/authors/${author.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>View Full Bio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {author.role} • <span className="font-mono text-slate-500">{author.title}</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Credentials and Reviewer Note */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
        
        {/* Credentials */}
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
            Author Credentials &amp; Focus:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {author.credentials.slice(0, 2).map((cred, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
              >
                ✓ {cred}
              </span>
            ))}
          </div>
        </div>

        {/* Fact-Checked & Peer Reviewed By */}
        <div className="space-y-1.5 bg-white dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 dark:text-slate-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Fact-Checked &amp; Audited by Quantitative Desk</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Technically reviewed by <Link href={`/authors/${reviewer.slug}`} className="font-bold text-slate-900 dark:text-white hover:underline">{reviewer.name}</Link> ({reviewer.role}) to verify mathematical formulas, historical data integrity, and compliance with non-financial advice standards.
          </p>
        </div>

      </div>

    </div>
  );
}
