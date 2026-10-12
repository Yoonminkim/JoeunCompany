import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "문의하기";
const description =
  "크린룸 관련 제품과 반도체 후처리에 대한 문의는 조은상사로 연락해 주세요.";

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

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900">연락처</h2>

        {hasContact ? (
          <dl className="mt-6 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
            {phone && (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-semibold text-slate-500">전화</dt>
                <dd className="col-span-2">
                  <a href={`tel:${phone}`} className="text-brand-600 hover:underline">
                    {phone}
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-semibold text-slate-500">이메일</dt>
                <dd className="col-span-2">
                  <a
                    href={`mailto:${email}`}
                    className="text-brand-600 hover:underline"
                  >
                    {email}
                  </a>
                </dd>
              </div>
            )}
            {address && (
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-semibold text-slate-500">주소</dt>
                <dd className="col-span-2 text-slate-900">{address}</dd>
              </div>
            )}
          </dl>
        ) : (
          <p className="mt-4 text-slate-600">
            연락처 정보는 준비 중입니다.
          </p>
        )}
      </section>
    </>
  );
}
