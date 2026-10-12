import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageHeaderProps = {
  title: string;
  description: string;
  path: string;
  /** 상위 페이지. 있으면 빵부스러기가 홈 / 상위 / 현재 순서가 됩니다. */
  parent?: { name: string; path: string };
  /** h1 위에 표시하는 작은 분류 라벨 */
  eyebrow?: string;
};

/** 서브페이지 상단: 빵부스러기 + h1 + 설명 (+ BreadcrumbList JSON-LD) */
export function PageHeader({
  title,
  description,
  path,
  parent,
  eyebrow,
}: PageHeaderProps) {
  const trail = [...(parent ? [parent] : []), { name: title, path }];

  return (
    <section className="bg-linear-to-br from-brand-900 to-brand-700 text-white">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <nav aria-label="현재 위치" className="text-sm text-blue-200">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                {siteConfig.name}
              </Link>
            </li>
            {parent && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={parent.path} className="hover:text-white">
                    {parent.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {title}
            </li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-6 text-sm font-semibold tracking-wide text-blue-200">
            {eyebrow}
          </p>
        )}
        <h1
          className={`${eyebrow ? "mt-2" : "mt-4"} text-3xl font-bold tracking-tight sm:text-4xl`}
        >
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
