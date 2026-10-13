"use client";

import Link from "next/link";
import { useState } from "react";

type NavDropdownItem = {
  href: string;
  name: string;
  subtitle: string;
};

/**
 * 상단 메뉴의 하위 목록 드롭다운.
 *
 * - 마우스를 올리거나 키보드로 포커스하면 CSS 만으로 펼쳐집니다. (JS 없이도 동작)
 * - 목록의 항목이나 상위 메뉴를 클릭하면 팝업이 닫힙니다.
 *   페이지 이동 후에도 마우스가 메뉴 위에 남아 있어 계속 열려 보이는 문제를 막기 위해
 *   `data-dismissed` 를 켜고, 마우스가 메뉴를 벗어나거나 다시 포커스될 때 해제합니다.
 */
export function NavDropdown({
  href,
  label,
  items,
  allLabel,
}: {
  href: string;
  label: string;
  items: NavDropdownItem[];
  allLabel: string;
}) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <li
      className="nav-item group/nav relative"
      data-dismissed={dismissed ? "true" : undefined}
      onMouseLeave={() => setDismissed(false)}
      onFocus={() => setDismissed(false)}
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest("a")) return;
        setDismissed(true);
        // 클릭한 링크에 남은 포커스 때문에 :focus-within 으로 다시 열리지 않게 합니다.
        (document.activeElement as HTMLElement | null)?.blur();
      }}
    >
      <Link
        href={href}
        className="flex items-center gap-1.5 border-b-2 border-transparent py-1.5 transition-colors hover:border-accent hover:text-accent group-focus-within/nav:border-accent group-focus-within/nav:text-accent"
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className="nav-caret hidden h-1.5 w-2.5 fill-none stroke-current stroke-[1.6] transition-transform duration-200 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180 md:block"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </Link>

      {/* 모바일은 마우스 호버가 없으므로 링크만 유지합니다. */}
      <div className="nav-panel invisible absolute right-0 top-full z-50 hidden w-[25rem] translate-y-1 pt-4 opacity-0 transition-[opacity,visibility,translate] delay-100 duration-200 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-focus-within/nav:delay-0 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100 group-hover/nav:delay-0 motion-reduce:transition-none md:block">
        <div className="border border-t-2 border-line border-t-accent bg-paper shadow-[0_28px_48px_-28px_rgba(27,23,48,0.4)]">
          <p className="label px-5 pb-1 pt-4">Services</p>
          <ul className="pb-2">
            {items.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group/item grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-5 py-3 transition-colors hover:bg-paper-deep focus-visible:bg-paper-deep"
                >
                  <span className="font-mono text-xs font-medium text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold transition-colors group-hover/item:text-accent">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-ink-soft">
                      {item.subtitle}
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
            href={href}
            className="block border-t border-line px-5 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-paper-deep"
          >
            {allLabel}
          </Link>
        </div>
      </div>
    </li>
  );
}
