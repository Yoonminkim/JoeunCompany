import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { createMetadata, serviceJsonLd } from "@/lib/seo";
import {
  getRelatedServices,
  getService,
  processSteps,
  serviceCategories,
  servicePath,
  services,
} from "@/lib/services";

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

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHeader
        title={service.name}
        description={service.subtitle}
        path={path}
        parent={{ name: "제품·서비스", path: "/services" }}
        eyebrow={
          serviceCategories[service.category].label !== service.name
            ? serviceCategories[service.category].label
            : undefined
        }
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-3">
        <div className="space-y-14 lg:col-span-2">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              {service.name} 안내
            </h2>
            <div className="mt-4 space-y-4 leading-8 text-slate-700">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          {service.products && service.products.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900">취급 품목</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.products.map((product) => (
                  <li
                    key={product.name}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-slate-900">
                {section.heading}
              </h2>
              {section.body && (
                <p className="mt-4 leading-8 text-slate-700">{section.body}</p>
              )}
              {section.items && (
                <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-7 text-slate-700">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {!isCleanroom && (
            <section>
              <h2 className="text-2xl font-bold text-slate-900">진행 안내</h2>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <span className="text-sm font-bold text-brand-600">
                      STEP {index + 1}
                    </span>
                    <h3 className="mt-1 font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          {related.length > 0 && (
            <nav aria-label="함께 보면 좋은 제품·서비스">
              <h2 className="text-lg font-bold text-slate-900">
                함께 보면 좋은 항목
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={servicePath(item.slug)}
                      className="block rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md"
                    >
                      <span className="font-semibold text-slate-900">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-sm text-slate-600">
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
            className="inline-block text-sm font-semibold text-brand-600 hover:underline"
          >
            ← 제품·서비스 전체 보기
          </Link>
        </aside>
      </div>

      <ContactCta />
    </>
  );
}
