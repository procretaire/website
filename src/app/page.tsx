import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.glowWrap}>
        <div className={`${styles.glow} ${styles.glowOne}`} />
        <div className={`${styles.glow} ${styles.glowTwo}`} />
        <div className={`${styles.glow} ${styles.glowThree}`} />
      </div>

      <section className={styles.hero}>
        <div className={styles.logoWrap}>
          <img
            src="/icon0.svg"
            alt="Procretaire logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.textBlock}>
          <p className={styles.kicker}>Coming soon</p>
          <h1 className={styles.title}>Procretaire</h1>
          <p className={styles.subtitle}>
            We are crafting something refined. The full experience lands soon.
          </p>
        </div>
      </section>
    </main>
  );
}
