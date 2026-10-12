import Link from "next/link";
import { servicePath, services, type Service } from "@/lib/services";

/** 번호가 붙은 목록 행. 카드 그리드 대신 문서 목차 같은 형태로 보여 줍니다. */
export function ServiceRow({ service }: { service: Service }) {
  const number = String(
    services.findIndex((item) => item.slug === service.slug) + 1,
  ).padStart(2, "0");

  return (
    <Link
      href={servicePath(service.slug)}
      className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line px-1 py-6 transition-colors hover:bg-paper-deep sm:grid-cols-[4rem_minmax(0,1.05fr)_minmax(0,1.3fr)_auto] sm:gap-x-8 sm:px-3"
    >
      <span className="pt-1 font-mono text-sm font-medium text-accent">
        {number}
      </span>
      <span>
        <span className="block text-lg font-semibold tracking-tight sm:text-xl">
          {service.name}
        </span>
        <span className="mt-1 block text-sm text-ink-soft">
          {service.subtitle}
        </span>
      </span>
      <span className="hidden pt-1 text-sm leading-6 text-ink-soft sm:block">
        {service.summary}
      </span>
      <span
        aria-hidden="true"
        className="pt-0.5 text-xl transition-transform group-hover:translate-x-1 group-hover:text-accent"
      >
        →
      </span>
    </Link>
  );
}
