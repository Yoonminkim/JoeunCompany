import Link from "next/link";
import { servicePath, type Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={servicePath(service.slug)}
      className="block h-full rounded-xl border border-slate-200 p-6 transition-shadow hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">
        {service.subtitle}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
        자세히 보기 →
      </span>
    </Link>
  );
}
