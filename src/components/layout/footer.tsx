const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/HarithaSeddik",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/HarithaSeddik",
  },
  {
    label: "Email",
    href: "mailto:akkad.haritha@gmail.com",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-sm text-muted">
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-faint">
          &copy; {new Date().getFullYear()} Haritha Akkad
        </p>
        <p className="font-mono text-xs text-faint">
          built with claude code
        </p>
      </div>
    </footer>
  );
}
