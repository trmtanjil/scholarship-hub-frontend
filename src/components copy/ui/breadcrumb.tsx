import React from "react";

export const Breadcrumb = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav aria-label="Breadcrumb" className={className} {...props}>
    {children}
  </nav>
);

export const BreadcrumbList = ({ children, className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className={`${className ?? ""} flex items-center gap-2`} {...props}>
    {children}
  </ol>
);

export const BreadcrumbItem = ({ children, className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={className} {...props}>
    {children}
  </li>
);

export const BreadcrumbLink = ({ children, href = "#", className, ...props }: { href?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} className={`text-sm text-muted-foreground ${className ?? ""}`} {...props}>
    {children}
  </a>
);

export const BreadcrumbSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={`mx-2 text-muted-foreground ${className ?? ""}`} {...props}>
    /
  </span>
);

export const BreadcrumbPage = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={`text-sm font-medium ${className ?? ""}`} {...props}>
    {children}
  </span>
);

export default Breadcrumb;
