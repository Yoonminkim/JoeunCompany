import { ContactCta } from "@/components/contact-cta";
import { PageHeader } from "@/components/page-header";
import { ServiceCard } from "@/components/service-card";
import { createMetadata } from "@/lib/seo";
import { getServicesByCategory } from "@/lib/services";

const title = "제품·서비스";
const description =
  "반도체 장비 후처리, 알루미늄·SUS403 제품 주문제작, 용접, 샌딩, 크린룸 제품(헤어캡·마스크·면봉·장갑 등)을 취급합니다.";

export const metadata = createMetadata({
  title,
  description,
  path: "/services",
  keywords: [
    "반도체 장비 후처리",
    "알루미늄 주문제작",
    "SUS403",
    "용접",
    "샌딩",
    "크린룸 제품",
    "조은상사",
  ],
});

export default function ServicesPage() {
  const groups = getServicesByCategory();

  return (
    <>
      <PageHeader title={title} description={description} path="/services" />

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`category-${group.id}`}>
            <h2
              id={`category-${group.id}`}
              className="text-2xl font-bold text-slate-900"
            >
              {group.label}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{group.description}</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.services.map((service) => (
                <li key={service.slug}>
                  <ServiceCard service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ContactCta />
    </>
  );
}
