import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "문의하기";
const description =
  "반도체 장비 후처리, 주문제작, 용접·샌딩, 크린룸 제품에 대한 문의는 조은상사로 연락해 주세요.";

export const metadata = createMetadata({
  title,
  description,
  path: "/contact",
});

export default function ContactPage() {
  const { phone, email, address } = siteConfig.contact;
  const hasContact = Boolean(phone || email || address);

  return (
    <>
      <PageHeader title={title} description={description} path="/contact" />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">온라인 문의</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            아래 양식을 작성해 주시면 확인 후 입력하신 이메일로 답변드립니다.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <aside>
          <h2 className="text-2xl font-bold text-slate-900">연락처</h2>

          {hasContact ? (
            <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
              {phone && (
                <div className="py-4">
                  <dt className="text-sm font-semibold text-slate-500">전화</dt>
                  <dd className="mt-1">
                    <a
                      href={`tel:${phone}`}
                      className="text-brand-600 hover:underline"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
              {email && (
                <div className="py-4">
                  <dt className="text-sm font-semibold text-slate-500">
                    이메일
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${email}`}
                      className="break-all text-brand-600 hover:underline"
                    >
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {address && (
                <div className="py-4">
                  <dt className="text-sm font-semibold text-slate-500">주소</dt>
                  <dd className="mt-1 text-slate-900">{address}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              연락처 정보는 준비 중입니다.
            </p>
          )}
        </aside>
      </section>
    </>
  );
}
