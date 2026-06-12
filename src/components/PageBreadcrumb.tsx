import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbEntry[];
  /**
   * When true, render inside a section-container with subtle top padding so
   * it can be placed directly under the header on any page.
   */
  withContainer?: boolean;
  className?: string;
}

/**
 * Reusable wayfinding breadcrumb. Always prepends "Home" linking to /.
 * The final item is rendered as the active page.
 */
const PageBreadcrumb = ({ items, withContainer = false, className }: PageBreadcrumbProps) => {
  const crumbs = (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <span key={`${item.label}-${index}`} className="contents">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );

  if (!withContainer) return crumbs;

  return (
    <div className="section-container pt-6 md:pt-8">
      {crumbs}
    </div>
  );
};

export default PageBreadcrumb;