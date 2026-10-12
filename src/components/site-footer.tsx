import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { contact } = siteConfig;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-base font-bold text-slate-900">
            {siteConfig.name}{" "}
            <span className="text-sm font-medium text-slate-500">
              {siteConfig.nameEn}
            </span>
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            반도체 장비 후처리, 금속 주문제작, 크린룸 제품을 취급합니다.
          </p>
        </div>

        <nav aria-label="푸터 메뉴">
          <p className="text-sm font-semibold text-slate-900">바로가기</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {(contact.phone || contact.email || contact.address) && (
          <address className="text-sm not-italic leading-6 text-slate-600">
            <p className="text-sm font-semibold text-slate-900">연락처</p>
            <ul className="mt-2 space-y-1.5">
              {contact.phone && (
                <li>
                  전화{" "}
                  <a href={`tel:${contact.phone}`} className="hover:text-brand-600">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  이메일{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-brand-600"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.address && <li>{contact.address}</li>}
            </ul>
          </address>
        )}
      </div>

      <div className="border-t border-slate-200">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-slate-500">
          © {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
