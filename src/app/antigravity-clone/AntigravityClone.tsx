"use client";

import * as React from "react";
import { AntigravityParticles } from "./AntigravityParticles";
import styles from "./antigravity-clone.module.css";

const Chevron = () => <span className={styles.symbol}>keyboard_arrow_down</span>;

const AppleIcon = () => (
  <svg className={styles.buttonIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M16.7 12.4c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.5-.4 6.3 1.1 8.4.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.7.7 2.8.7 1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5 0-.1-2.5-1-2.6-3.2ZM14.7 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2Z"
    />
  </svg>
);

const products = [
  {
    title: "Antigravity 2.0",
    body: "Your command center to manage multiple local agents in parallel. Group conversations into Projects, operate across multiple workspaces, and automate routine tasks with scheduled messages.",
    media: "https://antigravity.google/assets/image/product/new-chat.png",
  },
  {
    title: "Antigravity CLI",
    body: "The lightweight, fast, terminal-first surface to work with Antigravity agents. Run autonomous coding agents, execute shell commands directly, and manage background subagents all from your keyboard.",
    media: "https://antigravity.google/assets/image/landing/antigravity-cli.png",
  },
  {
    title: "Antigravity SDK",
    body: "Prototype custom agents leveraging Antigravity's harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations.",
    media: "https://antigravity.google/assets/image/landing/feature-3.jpg",
  },
  {
    title: "Antigravity IDE",
    body: "The fully-featured, agentic IDE. Complete with the agent manager, artifacts, and a deep understanding of your codebase.",
    media: "https://antigravity.google/assets/image/product/editor.jpg",
  },
];

const useCases = [
  {
    title: "Full stack developer",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-fullstack.jpg",
  },
  {
    title: "Enterprise developer",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-enterprise.jpg",
  },
  {
    title: "Frontend developer",
    image: "https://antigravity.google/assets/image/landing/landing-thumbnail-frontend.jpg",
  },
];

const blogs = [
  ["Google Antigravity @ I/O 2026", "May 19, 2026", "Product"],
  ["Introducing Google Antigravity 2.0", "May 19, 2026", "Product"],
  ["Google Antigravity Built an OS (and more)", "May 19, 2026", "Product"],
  ["Google Antigravity CLI", "May 19, 2026", "Product"],
  ["Google Antigravity SDK", "May 19, 2026", "Product"],
  ["Google Antigravity in Gemini Enterprise", "May 19, 2026", "Enterprise"],
  ["Gemini 3.5 Flash in Google Antigravity", "May 19, 2026", "Product"],
  ["Introducing Google Antigravity", "Nov 18, 2025", "Product"],
];

export function AntigravityClone() {
  const icons = [
    "plus_code",
    "check_circle",
    "developer_mode_tv",
    "keyboard_command_key",
    "dashboard_customize",
    "keyboard_tab",
    "terminal",
    "keyboard_return",
    "commit",
    "spark",
    "code",
    "pen_spark",
    "refresh",
    "file_copy",
    "device_hub",
    "deployed_code",
    "data_object",
    "code_blocks",
    "folder",
    "search_spark",
    "merge",
  ];

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <a className={styles.brand} href="#">
          <span className={styles.mark} aria-hidden="true">
            <span />
            <span />
          </span>
          <span>Google Antigravity</span>
        </a>
        <nav className={styles.navItems} aria-label="Primary">
          <a href="#">
            Products <Chevron />
          </a>
          <a href="#">
            Use Cases <Chevron />
          </a>
          <a href="#">Pricing</a>
          <a href="#">Blog</a>
          <a href="#">
            Resources <Chevron />
          </a>
        </nav>
        <a className={styles.navDownload} href="#">
          Download <span className={styles.symbol}>download</span>
        </a>
        <button className={styles.menuButton} aria-label="Open menu">
          <span className={styles.symbol}>menu</span>
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <AntigravityParticles />
          <div className={styles.heroLogo}>
            <span className={styles.mark} aria-hidden="true">
              <span />
              <span />
            </span>
            <span>Google Antigravity</span>
          </div>
          <h1>
            <span className={styles.heroTitleText}>Experience liftoff with the next-gen agent platform</span>
          </h1>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#">
              <AppleIcon />
              Download for MacOS
            </a>
            <a className={styles.secondaryButton} href="#">
              Explore use cases
            </a>
          </div>
        </section>

        <section className={styles.agentIntro}>
          <ul className={styles.iconCloud} aria-hidden="true">
            {icons.map((icon, index) => (
              <li key={`${icon}-${index}`} className={styles.symbol}>
                {icon}
              </li>
            ))}
          </ul>
          <p>Google Antigravity is our agentic development platform, allowing anyone to build in the agent-first era.</p>
        </section>

        <section className={styles.productStrip} aria-label="Products">
          {products.map((product) => (
            <article key={product.title}>
              <div>
                <h2>{product.title}</h2>
                <p>{product.body}</p>
              </div>
              <div
                className={styles.productMedia}
                style={{ backgroundImage: `url(${product.media})` }}
                aria-hidden="true"
              />
            </article>
          ))}
          <a href="#" className={styles.productLink}>
            Explore Product <span className={styles.symbol}>keyboard_arrow_right</span>
          </a>
        </section>

        <section className={styles.useCaseSection}>
          <div className={styles.sectionCopy}>
            <h2>Built for developers for the agent-first era</h2>
            <p>
              Google Antigravity is built for user trust, whether you&apos;re a professional developer
              working in a large enterprise codebase, a hobbyist vibe-coding in their spare time, or anyone in between.
            </p>
          </div>
          <div className={styles.useCaseGrid}>
            {useCases.map((item) => (
              <article key={item.title} className={styles.useCaseCard}>
                <div
                  className={styles.useCaseImage}
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden="true"
                />
                <div className={styles.useCaseLabel}>
                  <span>{item.title}</span>
                  <span className={styles.symbol}>play_arrow</span>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.carouselNav} aria-hidden="true">
            <button disabled className={styles.symbol}>keyboard_arrow_left</button>
            <button className={styles.symbol}>keyboard_arrow_right</button>
          </div>
        </section>

        <section className={styles.solutionGrid}>
          <article>
            <div className={styles.miniParticles} aria-hidden="true" />
            <p>Available at no charge</p>
            <h2>For developers</h2>
            <span>Achieve new heights</span>
            <a href="#">Download</a>
          </article>
          <article>
            <div className={styles.miniParticles} aria-hidden="true" />
            <p>Now Available!</p>
            <h2>For organizations</h2>
            <span>Level up your entire team</span>
            <a href="#">Read More</a>
          </article>
        </section>

        <section className={styles.blogSection}>
          <div className={styles.blogHeader}>
            <h2>Latest Blogs</h2>
            <a href="#">View blog</a>
          </div>
          <div className={styles.blogList}>
            {blogs.map(([title, date, tag]) => (
              <a href="#" key={title}>
                <span>{title}</span>
                <small>{date}</small>
                <small>{tag}</small>
                <span className={styles.readLink}>
                  Read blog <span className={styles.symbol}>keyboard_arrow_right</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.downloadBand}>
          <h2>Download Google Antigravity for MacOS</h2>
          <div>
            <a href="#">Download for Apple Silicon</a>
            <a href="#">Download for Intel</a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <h2>Experience liftoff</h2>
        <nav aria-label="Footer">
          {["Download", "Product", "Docs", "Changelog", "Press", "Releases", "Blog", "Pricing", "Use Cases"].map((item) => (
            <a href="#" key={item}>{item}</a>
          ))}
        </nav>
        <div>
          <a href="#">Google</a>
          <a href="#">About Google</a>
          <a href="#">Google Products</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
