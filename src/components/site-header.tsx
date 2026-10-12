import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteHeader() {
  const { phone } = siteConfig.contact;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
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
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="border-b-2 border-transparent py-1.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
