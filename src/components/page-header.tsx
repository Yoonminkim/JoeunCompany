import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageHeaderProps = {
  title: string;
  description: string;
  path: string;
};

/** 서브페이지 상단: 빵부스러기 + h1 + 설명 (+ BreadcrumbList JSON-LD) */
export function PageHeader({ title, description, path }: PageHeaderProps) {
  return (
    <section className="bg-linear-to-br from-brand-900 to-brand-700 text-white">
      <JsonLd data={breadcrumbJsonLd([{ name: title, path }])} />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <nav aria-label="현재 위치" className="text-sm text-blue-200">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                {siteConfig.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
