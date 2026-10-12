import Image from "next/image";
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
      className="group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-start gap-x-4 border-b border-line px-1 py-6 transition-colors hover:bg-paper-deep sm:grid-cols-[3rem_9rem_minmax(0,1fr)_minmax(0,1.25fr)_auto] sm:items-center sm:gap-x-7 sm:px-3"
    >
      <span className="pt-1 font-mono text-sm font-medium text-accent sm:pt-0">
        {number}
      </span>

      <span className="relative hidden h-16 w-36 overflow-hidden bg-paper-deep sm:block">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="144px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </span>

      <span>
        <span className="block text-lg font-semibold tracking-tight sm:text-xl">
          {service.name}
        </span>
        <span className="mt-1 block text-sm text-ink-soft">
          {service.subtitle}
        </span>
      </span>

      <span className="hidden text-sm leading-6 text-ink-soft sm:block">
        {service.summary}
      </span>

      <span
        aria-hidden="true"
        className="pt-0.5 text-xl transition-transform group-hover:translate-x-1 group-hover:text-accent sm:pt-0"
      >
        →
      </span>
    </Link>
  );
}
