import Link from "next/link";
import { Container } from "./container";
import { JsonLd } from "./json-ld";
import { heroDelay } from "@/lib/motion";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageHeaderProps = {
  title: string;
  description: string;
  path: string;
  /** 상위 페이지. 있으면 빵부스러기가 홈 / 상위 / 현재 순서가 됩니다. */
  parent?: { name: string; path: string };
  /** h1 위에 표시하는 분류 라벨 */
  eyebrow?: string;
};

/** 서브페이지 상단: 빵부스러기 + h1 + 설명 + 눈금자 (+ BreadcrumbList JSON-LD) */
export function PageHeader({
  title,
  description,
  path,
  parent,
  eyebrow,
}: PageHeaderProps) {
  const trail = [...(parent ? [parent] : []), { name: title, path }];

  return (
    <section className="border-b border-line">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Container className="pb-12 pt-8 sm:pb-16">
        <nav
          aria-label="현재 위치"
          className="hero-in text-sm text-ink-soft"
          style={heroDelay(0)}
        >
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <li>
              <Link href="/" className="hover:text-accent">
                {siteConfig.name}
              </Link>
            </li>
            {parent && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={parent.path} className="hover:text-accent">
                    {parent.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">
              {title}
            </li>
          </ol>
        </nav>

        {eyebrow && (
          <p
            className="hero-in mt-12 flex items-center gap-3 text-sm font-semibold text-accent"
            style={heroDelay(1)}
          >
            <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
            {eyebrow}
          </p>
        )}
        <h1
          className={`hero-in ${eyebrow ? "mt-4" : "mt-12"} max-w-4xl text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl`}
          style={heroDelay(2)}
        >
          {title}
        </h1>
        <p
          className="hero-in mt-5 max-w-2xl text-lg leading-8 text-ink-soft"
          style={heroDelay(3)}
        >
          {description}
        </p>
      </Container>
      <div className="ruler" aria-hidden="true" />
    </section>
  );
}
