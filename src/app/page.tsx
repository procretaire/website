import Image from "next/image";
import meta from "@/data/metadata.json";
import styles from "./page.module.css";
import Link from "next/link";

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
          <Link href="/about" aria-label={`${meta.site.title}'s about page`}>
            <Image
              src="/icon0.svg"
              alt="Procretaire logo"
              className={styles.logo}
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.kicker}>Coming soon</p>
          <h1 className={styles.title}>Procretaire</h1>
          <h2 className={styles.tagline}>{meta.site.tagline}</h2>
          <p className={styles.subtitle}>
            We are crafting something refined. The full experience lands soon.
          </p>
        </div>
      </section>
    </main>
  );
}
