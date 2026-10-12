import Link from "next/link";

export function ContactCta() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            크린룸 제품, 반도체 후처리 상담이 필요하신가요?
          </h2>
          <p className="mt-2 text-slate-600">
            필요한 사양과 수량을 알려 주시면 확인 후 안내드립니다.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
        >
          문의하기
        </Link>
      </div>
    </section>
  );
}
