import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a className={styles.logo} href="/">
            <span>BurnRate AI</span>
          </a>

          <div className={styles.navLinks}>
            <button className={`${styles.navTab} ${styles.active}`}>
              Home
            </button>
            <button className={styles.navTab}>Audit Form</button>
            <button className={styles.navTab}>Sample Report</button>
          </div>

          <button className={styles.navCta}>
            Run Free Audit →
          </button>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          FREE AI SPEND AUDIT 
        </div>

        <h1 className={styles.heading}>
          Find out what your AI tools
          <br />
          <span>are actually costing you.</span>
        </h1>

        <p className={styles.subheading}>
          BurnRate analyzes your AI stack in 60 seconds.
          No signup required. No integrations. Just answers.
        </p>

        <div className={styles.heroButtons}>
          <button className={styles.primaryBtn}>
            Run Your Free Audit →
          </button>

          <button className={styles.secondaryBtn}>
            See a sample report
          </button>
        </div>
      </section>
    </main>
  );
}