import Link from "next/link";
import { servicePath, services } from "@/lib/services";
import { navigation, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

/** 하위 목록을 펼쳐 보여 줄 메뉴 (현재는 제품·서비스) */
const SUBMENU_HREF = "/services";

export function SiteHeader() {
  const { phone } = siteConfig.contact;

  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-3.5">
        <Link
          href="/"
          className="block"
          aria-label={`${siteConfig.name} 홈`}
        >
          <Logo className="h-8 w-auto sm:h-9" priority />
        </Link>

        <div className="flex items-center gap-8">
          <nav aria-label="주요 메뉴">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navigation.map((item) => {
                const hasSubmenu = item.href === SUBMENU_HREF;

                return (
                  <li key={item.href} className="group/nav relative">
                    <Link
                      href={item.href}
                      className="flex items-center gap-1.5 border-b-2 border-transparent py-1.5 transition-colors hover:border-accent hover:text-accent group-focus-within/nav:border-accent group-focus-within/nav:text-accent"
                    >
                      {item.label}
                      {hasSubmenu && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 10 6"
                          className="hidden h-1.5 w-2.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180 md:block"
                        >
                          <path d="M1 1l4 4 4-4" />
                        </svg>
                      )}
                    </Link>

                    {hasSubmenu && (
                      /* 마우스를 올리거나 키보드로 포커스하면 하위 목록이 펼쳐집니다. (모바일은 링크만) */
                      <div className="invisible absolute right-0 top-full z-50 hidden w-[25rem] translate-y-1 pt-4 opacity-0 transition-[opacity,visibility,translate] delay-100 duration-200 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-focus-within/nav:delay-0 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-hover/nav:delay-0 motion-reduce:transition-none md:block">
                        <div className="border border-t-2 border-line border-t-accent bg-paper shadow-[0_28px_48px_-28px_rgba(27,23,48,0.4)]">
                          <p className="label px-5 pb-1 pt-4">Services</p>
                          <ul className="pb-2">
                            {services.map((service, index) => (
                              <li key={service.slug}>
                                <Link
                                  href={servicePath(service.slug)}
                                  className="group/item grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-5 py-3 transition-colors hover:bg-paper-deep focus-visible:bg-paper-deep"
                                >
                                  <span className="font-mono text-xs font-medium text-accent">
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                  <span>
                                    <span className="block text-[15px] font-semibold transition-colors group-hover/item:text-accent">
                                      {service.name}
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-5 text-ink-soft">
                                      {service.subtitle}
                                    </span>
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className="-translate-x-1 text-sm text-accent opacity-0 transition duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                  >
                                    →
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={SUBMENU_HREF}
                            className="block border-t border-line px-5 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-paper-deep"
                          >
                            제품·서비스 전체 보기 →
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {phone && (
            <a
              href={`tel:${phone}`}
              className="hidden items-center gap-2.5 border border-ink px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:bg-accent hover:text-white lg:flex"
            >
              <span className="label !text-current">TEL</span>
              {phone}
            </a>
          )}
        </div>
      </Container>
    </header>
  );
}
