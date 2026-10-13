import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import {
  getRelatedServices,
  getService,
  processSteps,
  serviceCategories,
  servicePath,
  services,
} from "@/lib/services";
import { siteConfig } from "@/lib/site";

// 빌드 시 모든 상세 페이지를 미리 생성합니다. (목록에 없는 slug 는 아래에서 404 처리)
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return createMetadata({
    title: service.seo.title ?? service.name,
    description: service.seo.description ?? service.summary,
    path: servicePath(service.slug),
    keywords: service.seo.keywords,
    image: service.seo.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = servicePath(service.slug);
  const related = getRelatedServices(service);
  const isCleanroom = service.category === "cleanroom";
  const categoryLabel = serviceCategories[service.category].label;
  const { phone } = siteConfig.contact;

  // 섹션 번호(01, 02 ...)를 렌더 순서대로 매깁니다.
  let sectionNumber = 0;
  const nextEyebrow = (name: string) =>
    `${String(++sectionNumber).padStart(2, "0")} / ${name}`;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHeader
        title={service.name}
        description={service.subtitle}
        path={path}
        parent={{ name: "제품·서비스", path: "/services" }}
        eyebrow={categoryLabel !== service.name ? categoryLabel : undefined}
      />

      <Container className="pt-12">
        <Photo image={service.image} priority />
      </Container>

      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="space-y-16 lg:col-span-8">
          <section>
            <SectionHeading
              eyebrow={nextEyebrow("Overview")}
              title={`${service.name} 안내`}
            />
            <div className="reveal mt-6 space-y-5 text-[17px] leading-9">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {service.products && service.products.length > 0 && (
            <section>
              <SectionHeading eyebrow={nextEyebrow("Items")} title="취급 품목" />
              <ul className="mt-6 border-t border-line">
                {service.products.map((product) => (
                  <li
                    key={product.name}
                    className="reveal grid grid-cols-[7rem_minmax(0,1fr)] gap-5 border-b border-line py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                      {product.image && (
                        <Image
                          src={product.image.src}
                          alt={product.image.alt}
                          fill
                          sizes="(min-width: 640px) 160px, 112px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="mt-2 leading-7 text-ink-soft">
                        {product.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service.sections.map((section) => (
            <section key={section.heading}>
              <SectionHeading
                eyebrow={nextEyebrow("Details")}
                title={section.heading}
              />
              {section.body && (
                <p className="reveal mt-6 text-[17px] leading-9">
                  {section.body}
                </p>
              )}
              {section.items && (
                <ul className="mt-5 border-t border-line">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="reveal flex gap-4 border-b border-line py-4 leading-7"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {!isCleanroom && (
            <section>
              <SectionHeading
                eyebrow={nextEyebrow("Process")}
                title="진행 안내"
              />
              <ol className="mt-6 grid gap-px bg-line sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <li key={step.title} className="reveal bg-paper p-6">
                    <span className="font-mono text-sm font-medium text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-28">
            <div className="reveal border-t-2 border-accent bg-paper-deep p-6">
              <p className="label">Inquiry</p>
              <p className="mt-2 font-semibold">{service.name} 문의</p>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="mt-4 block text-2xl font-bold tabular-nums transition-colors hover:text-accent"
                >
                  {phone}
                </a>
              )}
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-3 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep"
              >
                온라인 문의
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {related.length > 0 && (
              <nav aria-label="함께 보면 좋은 제품·서비스" className="reveal">
                <p className="label">Related</p>
                <h2 className="mt-1 text-lg font-bold">함께 보면 좋은 항목</h2>
                <ul className="mt-4 border-t border-ink">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={servicePath(item.slug)}
                        className="group block border-b border-line py-4 transition-colors hover:bg-paper-deep"
                      >
                        <span className="flex items-baseline justify-between gap-3 font-semibold">
                          {item.name}
                          <span
                            aria-hidden="true"
                            className="transition-transform group-hover:translate-x-1 group-hover:text-accent"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-ink-soft">
                          {item.subtitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <Link
              href="/services"
              className="inline-block text-sm font-semibold text-accent hover:underline"
            >
              ← 제품·서비스 전체 보기
            </Link>
          </div>
        </aside>
      </Container>

      <ContactCta />
    </>
  );
}
