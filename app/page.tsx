import Link from "next/link";
import { site } from "@/content/site";
import { allProjects, featuredProjects } from "@/lib/content";
import { Feature } from "@/components/features/Feature";
import { HandLandmarks } from "@/components/diagrams/HandLandmarks";
import { HeroLight } from "@/components/HeroLight";
import { Chars, HeroIntro } from "@/components/HeroIntro";
import { LinkList } from "@/components/LinkList";
import { ProjectRail } from "@/components/ProjectRail";
import { RoboticsPanel } from "@/components/RoboticsPanel";
import { Paras } from "@/components/T";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const featured = featuredProjects();
  const [first, last] = site.name.split(" ");

  return (
    <>
      <HeroLight className="hero">
        <HeroIntro className="wrap hero__grid" labelledBy="hero-title">
          <div className="hero__text">
            <p className="label hero__kicker">
              <span className="pulse" aria-hidden="true" />
              <span className="sr-only">{site.role}</span>
              <Chars text={site.role} step={16} className="type" />
              <span
                className="caret"
                aria-hidden="true"
                style={{ "--caret-delay": `${site.role.length * 16}ms` } as React.CSSProperties}
              />
            </p>
            <h1 id="hero-title" className="hero__name">
              <span className="sr-only">{site.name}</span>
              <span className="rise" aria-hidden="true"><Chars text={first} start={120} step={45} /></span>
              <span className="rise hero__name-2" aria-hidden="true">
                <Chars text={last} start={120 + first.length * 45 + 60} step={45} />
              </span>
            </h1>
            <div className="hero__intro">
              <Paras items={site.intro} />
            </div>
            <div className="hero__ctas">
              <Link href="/#work" className="btn btn--primary">Selected work <span aria-hidden="true">↓</span></Link>
              <Link href="/#contact" className="btn btn--ghost">Contact</Link>
            </div>
          </div>

          <figure className="hero__visual">
            <div className="hero__instrument">
              <span className="tick tick--tl" aria-hidden="true" />
              <span className="tick tick--tr" aria-hidden="true" />
              <span className="tick tick--bl" aria-hidden="true" />
              <span className="tick tick--br" aria-hidden="true" />
              <div className="hero__readout label" aria-hidden="true">
                <span>Hand model · 21 pts</span>
                <span>Not live</span>
              </div>
              <HandLandmarks
                className="hand--hero"
                highlight={[4, 8, 12, 16, 20]}
                title="Illustration of a hand-landmark model: 21 numbered points joined into a hand skeleton"
              />
            </div>
            <figcaption className="caption">
              <span className="caption__index">Fig. 00</span>
              <span className="caption__kind">Illustration</span>
              <span>MediaPipe&rsquo;s hand-landmark layout — the vision library behind the robotic hand.</span>
            </figcaption>
          </figure>
        </HeroIntro>
      </HeroLight>

      <section id="work" className="section wrap" aria-labelledby="work-title">
        <Reveal stagger className="s-head">
          <p className="label"><span className="label__n">01</span> Selected projects</p>
          <h2 id="work-title" className="s-title">
            Things I&rsquo;ve built, <em>and how they work.</em>
          </h2>
        </Reveal>
        <div className="features">
          {featured.map((p, i) => (
            <Feature key={p.slug} project={p} n={i + 1} />
          ))}
        </div>
      </section>

      <section className="section section--compact wrap" aria-labelledby="more-title">
        <Reveal stagger className="s-head s-head--small">
          <p className="label"><span className="label__n">02</span> More</p>
          <h2 id="more-title" className="s-title s-title--small">Competition robotics &amp; index</h2>
        </Reveal>
        <Reveal stagger className="more">
          <RoboticsPanel />
          <ProjectRail projects={allProjects()} />
        </Reveal>
      </section>

      <section id="about" className="section wrap" aria-labelledby="about-title">
        <Reveal stagger className="about">
          <p className="label"><span className="label__n">03</span> About</p>
          <h2 id="about-title" className="about__title">About me</h2>
          <div className="about__cols">
            <div>
              <p className="label">Background</p>
              <div className="about__body"><Paras items={site.about} /></div>
            </div>
            <div>
              <p className="label">Where I&rsquo;m headed</p>
              <div className="about__body"><Paras items={site.aspirations} /></div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="contact" className="section contact wrap" aria-labelledby="contact-title">
        <Reveal stagger>
          <p className="label"><span className="label__n">04</span> Contact</p>
          <h2 id="contact-title" className="contact__title">
            Get in <em>touch.</em>
          </h2>
          <LinkList links={site.contact} />
        </Reveal>
      </section>
    </>
  );
}
