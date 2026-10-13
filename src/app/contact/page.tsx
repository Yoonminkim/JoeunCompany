import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "문의하기";
const description =
  "쉴드 세정·정밀세척, 주문제작, 용접·샌딩·용사코팅, 크린룸 관련 제품에 대한 문의는 조은상사로 연락해 주세요.";

export const metadata = createMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  const { phone, fax, email, address } = siteConfig.contact;
  const mapQuery = encodeURIComponent(address);

  const rows = [
    { label: "TEL", value: phone, href: phone ? `tel:${phone}` : undefined },
    { label: "FAX", value: fax },
    {
      label: "EMAIL",
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    { label: "ADDRESS", value: address },
  ].filter((row) => row.value);

  return (
    <>
      <PageHeader title={title} description={description} path="/contact" />

      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="Online inquiry" title="온라인 문의" />
          <p className="reveal mt-4 text-sm leading-6 text-ink-soft">
            아래 양식을 작성해 주시면 확인 후 입력하신 이메일로 답변드립니다.
          </p>
          <div className="reveal mt-8">
            <ContactForm />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <SectionHeading eyebrow="Contact" title="연락처" />

          {rows.length > 0 ? (
            <dl className="mt-4 border-t border-line">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="reveal grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-5"
                >
                  <dt className="label pt-1.5">{row.label}</dt>
                  <dd>
                    {row.href ? (
                      <a
                        href={row.href}
                        className={`break-all transition-colors hover:text-accent ${
                          row.label === "TEL"
                            ? "text-2xl font-bold tabular-nums"
                            : "font-medium"
                        }`}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="font-medium leading-7">{row.value}</span>
                    )}
                    {row.label === "ADDRESS" && (
                      <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <a
                          href={`https://map.naver.com/p/search/${mapQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent hover:underline"
                        >
                          네이버 지도
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-accent hover:underline"
                        >
                          구글 지도
                        </a>
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 text-sm text-ink-soft">
              연락처 정보는 준비 중입니다.
            </p>
          )}
        </aside>
      </Container>
    </>
  );
}
