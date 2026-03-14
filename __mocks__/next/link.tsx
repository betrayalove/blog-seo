import type { ReactNode } from "react";

interface MockLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function MockLink({ href, children, ...rest }: MockLinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
