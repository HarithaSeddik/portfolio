"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "/experience" },
  { label: "Beyond", href: "#beyond" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border/50"
      style={{ viewTransitionName: "site-header" }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-heading text-lg font-semibold tracking-tight text-ink"
        >
          haritha.
        </a>

        {/* Desktop nav */}
        <ul className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.href.startsWith("/") ? (
                <Link
                  href={item.href}
                  transitionTypes={["nav-forward"]}
                  className="nav-link text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="nav-link text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-bg px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.href.startsWith("/") ? (
                  <Link
                    href={item.href}
                    transitionTypes={["nav-forward"]}
                    className="text-muted transition-colors hover:text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-muted transition-colors hover:text-ink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
