import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbJsonLd, BreadcrumbItem } from "@/components/seo/JsonLd";

export interface BreadcrumbLink {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbLink[] }) {
  const jsonLdItems: BreadcrumbItem[] = [
    { name: "Home", url: "https://www.bitcoincrypto.tech" },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `https://www.bitcoincrypto.tech${item.href}` : "https://www.bitcoincrypto.tech",
    })),
  ];

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition"
          title="Return to Home"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition truncate max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
