import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="mono">Built with Next.js · Set in Space Grotesk, Inter &amp; JetBrains Mono</span>
      </div>
    </footer>
  );
}
