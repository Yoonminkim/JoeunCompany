import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";
import { LogoMark } from "./logo-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${siteConfig.name} 홈`}
        >
          <LogoMark />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            {siteConfig.name}
          </span>
          <span className="hidden text-xs font-medium text-slate-500 sm:inline">
            {siteConfig.nameEn}
          </span>
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-700">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="py-1 transition-colors hover:text-brand-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
