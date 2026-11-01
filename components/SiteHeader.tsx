import Link from "next/link";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="site-header__name">
          <span className="site-header__mark" aria-hidden="true" />
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="site-header__nav">
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/#robotics">Robotics</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
