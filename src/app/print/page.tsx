import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { PrintButton } from "@/components/print-button";
import { aboutIntro, getCompanyOverview } from "@/lib/company";
import { createMetadata } from "@/lib/seo";
import {
  capabilities,
  getServicesByCategory,
  images,
  processSteps,
  type Service,
  type ServiceImage,
} from "@/lib/services";
import { profilePdf, siteConfig } from "@/lib/site";

const title = "회사소개서 (인쇄·PDF용)";
const description =
  "조은상사 홈페이지의 전체 내용을 한 권으로 묶은 인쇄용 페이지입니다. PDF로 저장하거나 인쇄할 수 있습니다.";

export const metadata: Metadata = {
  ...createMetadata({ title, description, path: "/print" }),
  // 다른 페이지와 내용이 겹치는 인쇄용 사본이므로 검색에는 노출하지 않습니다.
  robots: { index: false, follow: false },
};

/** 문서 안의 이미지는 PDF 에 원본 화질로 담기도록 최적화 없이, 바로 불러옵니다. */
function DocImage({
  image,
  className = "",
  cover = false,
}: {
  image: ServiceImage;
  className?: string;
  /** true 이면 부모 상자를 가득 채우도록 잘라서 맞춥니다. (부모에 높이/비율 지정 필요) */
  cover?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      unoptimized
      loading="eager"
      className={`w-full ${cover ? "h-full object-cover" : "h-auto"} ${className}`}
    />
  );
}

function DocHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="border-t-2 border-ink pt-4">
      <p className="label">{eyebrow}</p>
      <h2 id={id} className="mt-1 text-2xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 border-t border-line">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 border-b border-line py-2 text-[13px] leading-6"
        >
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ServiceBlock({
  service,
  categoryLabel,
}: {
  service: Service;
  categoryLabel: string;
}) {
  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className="break-before-page"
    >
      {/* .label 은 영문·숫자 전용이라, 한글 분류명은 별도 스타일을 씁니다. */}
      <p className="text-xs font-semibold tracking-wide text-accent">
        {categoryLabel}
      </p>
      <h2
        id={`${service.slug}-title`}
        className="mt-2 text-3xl font-bold tracking-tight"
      >
        {service.name}
      </h2>
      <p className="mt-2 text-[15px] text-ink-soft">{service.subtitle}</p>

      <div className="mt-5 aspect-[21/8] overflow-hidden bg-paper-deep">
        <DocImage image={service.image} cover />
      </div>

      <div className="mt-5 space-y-2.5 text-[13px] leading-[1.8]">
        {service.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {service.products && service.products.length > 0 && (
        <div className="mt-8">
          <h3 className="border-t border-ink pt-3 text-lg font-bold">
            취급 품목
          </h3>
          <ul className="mt-4 grid grid-cols-3 gap-x-4 gap-y-6">
            {service.products.map((product) => (
              <li key={product.name} className="break-inside-avoid">
                {product.image && (
                  <DocImage image={product.image} className="bg-paper-deep" />
                )}
                <h4 className="mt-2 text-sm font-semibold">{product.name}</h4>
                <p className="mt-1 text-xs leading-5 text-ink-soft">
                  {product.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.sections.map((section) => (
        <div key={section.heading} className="mt-6 break-inside-avoid">
          <h3 className="border-t border-ink pt-3 text-lg font-bold">
            {section.heading}
          </h3>
          {section.body && (
            <p className="mt-3 text-[13px] leading-[1.8]">{section.body}</p>
          )}
          {section.items && <BulletList items={section.items} />}
        </div>
      ))}
    </section>
  );
}

export default function PrintPage() {
  const { phone, fax, email, address } = siteConfig.contact;
  const groups = getServicesByCategory();
  const overview = getCompanyOverview();

  const contactRows = [
    { label: "TEL", value: phone },
    { label: "FAX", value: fax },
    { label: "EMAIL", value: email },
    { label: "ADDRESS", value: address },
    { label: "WEB", value: siteConfig.url.replace(/^https?:\/\//, "") },
  ].filter((row) => row.value);

  return (
    <>
      {/* 화면에서만 보이는 안내 막대: 인쇄/PDF 에는 포함되지 않습니다. */}
      <div className="border-b border-line bg-paper print:hidden">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
          <div className="max-w-xl">
            <p className="label">Print · PDF</p>
            <p className="mt-1 text-sm leading-6 text-ink-soft">
              홈페이지 전체 내용을 한 권으로 묶은 페이지입니다. &lsquo;PDF로
              저장&rsquo;을 누르면 인쇄 창이 열리고, 대상(프린터)을 &lsquo;PDF로
              저장&rsquo;으로 고르면 파일이 만들어집니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrintButton className="inline-flex cursor-pointer items-center gap-3 bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-deep">
              PDF로 저장 · 인쇄
            </PrintButton>
            <a
              href={profilePdf.path}
              download={profilePdf.downloadName}
              className="inline-flex items-center border border-ink px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-paper"
            >
              PDF 파일 받기
            </a>
          </div>
        </Container>
      </div>

      <div className="px-4 py-8 print:p-0 sm:px-6">
        <article className="profile mx-auto w-full max-w-[210mm] bg-white px-[12mm] py-[14mm] shadow-[0_1px_0_rgb(27_23_48/0.06),0_18px_40px_-24px_rgb(27_23_48/0.35)] print:max-w-none print:p-0 print:shadow-none">
          {/* 표지 */}
          <section className="flex min-h-[245mm] flex-col break-after-page">
            <div className="flex items-center justify-between">
              <Logo className="h-9 w-auto" priority />
              <span className="label">Company Profile</span>
            </div>

            <div className="mt-20">
              <p className="text-xl font-semibold text-accent">
                {siteConfig.name}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-[1.15] tracking-tight">
                쉴드 세정·정밀세척,
                <br />
                금속 주문제작,
                <br />
                크린룸 관련 제품.
              </h1>
              <p className="mt-8 max-w-lg text-[15px] leading-7 text-ink-soft">
                {siteConfig.description}
              </p>
            </div>

            <DocImage image={images.homeBanner} className="mt-12" />

            <dl className="mt-auto border-t-2 border-ink pt-6">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 py-1.5 text-sm"
                >
                  <dt className="label pt-0.5">{row.label}</dt>
                  <dd className="font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 회사소개 + 취급 범위 */}
          <section aria-labelledby="about-title" className="break-after-page">
            <DocHeading
              id="about-title"
              eyebrow="01 / About"
              title={`${siteConfig.name}를 소개합니다`}
            />
            <p className="mt-5 text-[14px] leading-[1.9]">{aboutIntro}</p>

            <div className="mt-12">
              <DocHeading eyebrow="02 / Profile" title="회사 개요" />
              <dl className="mt-4 border-t border-line">
                {overview.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[7rem_1fr] gap-6 border-b border-line py-3 text-[13px]"
                  >
                    <dt className="font-semibold text-ink-soft">{row.label}</dt>
                    <dd className="font-medium leading-6">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-12">
              <DocHeading eyebrow="03 / Scope" title="취급 범위" />
              <dl className="mt-4 border-t border-line">
                {capabilities.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[7rem_1fr] gap-6 border-b border-line py-3.5"
                  >
                    <dt>
                      <span className="label block">{item.label}</span>
                      <span className="mt-0.5 block text-sm font-semibold">
                        {item.title}
                      </span>
                    </dt>
                    <dd className="text-[15px] font-medium leading-7">
                      {item.values.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* 제품·서비스 한눈에 보기 */}
          <section aria-labelledby="services-title">
            <DocHeading id="services-title" eyebrow="04 / Services" title="제품·서비스" />
            <div className="mt-6 space-y-8">
              {groups.map((group, index) => (
                <div key={group.id} className="break-inside-avoid">
                  <p className="label">
                    Category {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{group.label}</h3>
                  <p className="mt-1 text-[13px] text-ink-soft">
                    {group.description}
                  </p>
                  <ul className="mt-3 border-t border-line">
                    {group.services.map((service) => (
                      <li
                        key={service.slug}
                        className="border-b border-line py-3"
                      >
                        <p className="text-[15px] font-semibold">
                          {service.name}
                        </p>
                        <p className="mt-1 text-[13px] leading-6 text-ink-soft">
                          {service.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 제품·서비스 상세 (항목마다 새 쪽에서 시작) */}
          {groups.flatMap((group) =>
            group.services.map((service) => (
              <ServiceBlock
                key={service.slug}
                service={service}
                categoryLabel={group.label}
              />
            )),
          )}

          {/* 진행 안내 + 문의 */}
          <section aria-labelledby="contact-title" className="break-before-page">
            <DocHeading id="contact-title" eyebrow="05 / Process" title="작업 진행 안내" />
            <ol className="mt-5 grid grid-cols-2 gap-px bg-line">
              {processSteps.map((step, index) => (
                <li key={step.title} className="break-inside-avoid bg-white p-5">
                  <span className="font-mono text-sm font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-6 text-ink-soft">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-14">
              <DocHeading eyebrow="06 / Contact" title="문의하기" />
              <p className="mt-4 text-[13px] leading-7 text-ink-soft">
                도면·사진·수량·희망 납기를 알려 주시면 확인 후 안내해 드립니다.
                온라인 문의는 홈페이지의 &lsquo;문의하기&rsquo; 페이지에서 남기실 수
                있습니다.
              </p>
              <dl className="mt-4 border-t border-line">
                {contactRows.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-3.5"
                  >
                    <dt className="label pt-1">{row.label}</dt>
                    <dd
                      className={
                        row.label === "TEL"
                          ? "text-2xl font-bold tabular-nums"
                          : "font-medium"
                      }
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
