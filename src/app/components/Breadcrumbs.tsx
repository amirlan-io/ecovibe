import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

const SITE_URL = "https://www.ecovibe.kz";

export interface BreadcrumbItem {
  label: string;
  /** Путь без домена, например "/generalnaya-uborka". Опустите для текущей (последней) страницы. */
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Хлебные крошки + BreadcrumbList JSON-LD. Ставится первым блоком на внутренних
 * страницах (не на главной — для неё в этом нет смысла, это корень сайта). */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const { pathname } = useLocation();
  const allItems: BreadcrumbItem[] = [{ label: "Главная", to: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      // The last item (current page) usually has no `to` — fall back to the
      // actual current path, not the site root, or the schema would claim
      // every page's last breadcrumb points at "/".
      item: `${SITE_URL}${item.to ?? pathname}`,
    })),
  };

  return (
    <nav aria-label="Хлебные крошки" className={`bg-gray-50 ${className}`}>
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 text-xs text-gray-500 sm:px-6 sm:text-sm lg:px-8">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />}
              {isLast || !item.to ? (
                <span aria-current="page" className="font-medium text-gray-700">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="transition-colors hover:text-green-700">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  );
}
