import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  const { phone, fax, email, address } = siteConfig.contact;
  const hasContact = Boolean(phone || fax || email || address);

  const rows = [
    { label: "TEL", value: phone, href: phone ? `tel:${phone}` : undefined },
    { label: "FAX", value: fax },
    {
      label: "EMAIL",
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    { label: "ADDRESS", value: address },
  ].filter((row) => row.value);

  return (
    <footer className="border-t border-line bg-paper-deep">
      <Container className="grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-9 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-7 text-ink-soft">
            반도체 장비 후처리, 금속 주문제작, 크린룸 관련 제품을 취급합니다.
          </p>
        </div>

        <nav aria-label="푸터 메뉴" className="md:col-span-3">
          <p className="label">Menu</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {hasContact && (
          <address className="not-italic md:col-span-4">
            <p className="label">Contact</p>
            <dl className="mt-4 space-y-3 text-sm">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[4.5rem_1fr] gap-3"
                >
                  <dt className="label pt-0.5 !text-[10px]">{row.label}</dt>
                  <dd className="leading-6">
                    {row.href ? (
                      <a href={row.href} className="hover:text-accent">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </address>
        )}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="text-xs text-ink-soft">
            © {siteConfig.name}. All rights reserved.
          </p>
          <p className="label !text-[10px]">Joeun Company · JJ</p>
        </Container>
      </div>
    </footer>
  );
}
