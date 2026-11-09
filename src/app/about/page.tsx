import { ContactCta } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { aboutIntro, getCompanyOverview } from "@/lib/company";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "회사소개";
const description =
  "조은상사(JoeunCompany)는 쉴드 세정·정밀세척, 금속 제품 주문제작, 크린룸 관련 제품을 통해 반도체 산업 현장을 지원합니다.";

export const metadata = createMetadata({
  title,
  description,
  path: "/about",
});

const overview = getCompanyOverview();

export default function AboutPage() {
  return (
    <>
      <PageHeader title={title} description={description} path="/about" />

      <Container className="grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="About" title={`${siteConfig.name}을 소개합니다`} />
        </div>
        <p className="reveal text-[17px] leading-9 lg:col-span-7 lg:pt-6">
          {aboutIntro}
        </p>
      </Container>

      <section className="border-t border-line bg-paper-deep py-20">
        <Container>
          <SectionHeading eyebrow="Profile" title="회사 개요" />
          <dl className="mt-6 border-t border-line">
            {overview.map((row) => (
              <div
                key={row.label}
                className="reveal grid gap-1 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-8"
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
