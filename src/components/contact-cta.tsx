import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./container";

/** 페이지 하단 문의 유도 영역. 전화번호를 가장 크게 보여 줍니다. */
export function ContactCta() {
  const { phone } = siteConfig.contact;

  return (
    <section className="bg-brand-dark text-paper">
      <Container className="grid items-end gap-10 py-16 md:grid-cols-12">
        <div className="reveal md:col-span-7">
          <p className="label !text-accent-light">Contact</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.25] tracking-tight sm:text-4xl">
            후처리, 주문제작, 크린룸 제품
            <br />
            상담이 필요하신가요?
          </h2>
          <p className="mt-4 text-paper/70">
            필요한 사양과 수량을 알려 주시면 확인 후 안내드립니다.
          </p>
        </div>

        <div className="reveal md:col-span-5 md:text-right">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="block text-3xl font-bold tracking-tight tabular-nums transition-colors hover:text-accent-light sm:text-4xl"
            >
              {phone}
            </a>
          )}
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-3 bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-light"
          >
            온라인 문의하기
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
