import { ContactCta } from "@/components/contact-cta";
import { PageHeader } from "@/components/page-header";
import { createMetadata } from "@/lib/seo";
import { productCategories } from "@/lib/site";

const title = "크린룸 관련 제품";
const description =
  "반도체를 비롯한 청정 환경 현장에서 사용하는 크린룸(클린룸) 관련 제품을 공급합니다. 필요한 품목과 규격을 문의해 주세요.";

export const metadata = createMetadata({
  title,
  description,
  path: "/products",
  keywords: ["크린룸 제품", "클린룸 제품", "크린룸 관련 제품", "크린룸 용품"],
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader title={title} description={description} path="/products" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold text-slate-900">제품 분류</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <li
              key={category.name}
              className="rounded-xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {category.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {category.description}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-6 text-slate-500">
          취급 품목과 규격은 문의해 주시면 자세히 안내드립니다.
        </p>
      </section>

      <ContactCta />
    </>
  );
}
