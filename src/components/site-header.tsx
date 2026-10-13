import Link from "next/link";
import { servicePath, services } from "@/lib/services";
import { navigation, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";
import { NavDropdown } from "./nav-dropdown";

/** 하위 목록을 펼쳐 보여 줄 메뉴 (현재는 제품·서비스) */
const SUBMENU_HREF = "/services";

export function SiteHeader() {
  const { phone } = siteConfig.contact;

  const serviceItems = services.map((service) => ({
    href: servicePath(service.slug),
    name: service.name,
    subtitle: service.subtitle,
  }));

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
              {navigation.map((item) =>
                item.href === SUBMENU_HREF ? (
                  <NavDropdown
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    items={serviceItems}
                    allLabel="제품·서비스 전체 보기 →"
                  />
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block border-b-2 border-transparent py-1.5 transition-colors hover:border-accent hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
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
