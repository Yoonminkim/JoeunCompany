import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

const title = "회사소개";
const description =
  "조은상사(JoeunCompany, JJ)는 반도체 장비 후처리, 금속 제품 주문제작, 크린룸 제품을 통해 반도체 산업 현장을 지원합니다.";

export const metadata = createMetadata({
  title,
  description,
  path: "/about",
});

const { phone, fax, address } = siteConfig.contact;

const overview = [
  { label: "상호", value: siteConfig.name },
  { label: "영문명", value: siteConfig.nameEn },
  { label: "약칭", value: "JJ" },
  { label: "사업 분야", value: services.map((s) => s.name).join(", ") },
  ...(address ? [{ label: "소재지", value: address }] : []),
  ...(phone ? [{ label: "전화", value: phone }] : []),
  ...(fax ? [{ label: "팩스", value: fax }] : []),
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title={title} description={description} path="/about" />

      <Container className="grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="About" title={`${siteConfig.name}을 소개합니다`} />
        </div>
        <p className="text-[17px] leading-9 lg:col-span-7 lg:pt-6">
          {siteConfig.name}({siteConfig.nameEn})은 반도체 장비 후처리와
          알루미늄·SUS403 제품 주문제작, 용접, 샌딩, 그리고 크린룸 제품을
          취급하는 기업입니다. 청정도와 마감 상태가 중요한 반도체 산업
          현장에서 필요한 제품과 작업을 제공하기 위해 노력합니다.
        </p>
      </Container>

      <section className="border-t border-line bg-paper-deep py-20">
        <Container>
          <SectionHeading eyebrow="Profile" title="회사 개요" />
          <dl className="mt-6 border-t border-line">
            {overview.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <dt className="text-sm font-semibold text-ink-soft">
                  {row.label}
                </dt>
                <dd className="font-medium leading-7">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
