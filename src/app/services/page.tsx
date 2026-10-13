import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ServiceRow } from "@/components/service-row";
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

      <Container className="space-y-20 py-20">
        {groups.map((group, index) => (
          <section key={group.id} aria-labelledby={`category-${group.id}`}>
            <SectionHeading
              id={`category-${group.id}`}
              eyebrow={`Category ${String(index + 1).padStart(2, "0")}`}
              title={group.label}
            />
            <p className="reveal mt-3 text-ink-soft">{group.description}</p>
            <ul className="mt-6 border-t border-line">
              {group.services.map((service) => (
                <li key={service.slug} className="reveal">
                  <ServiceRow service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <ContactCta />
    </>
  );
}
