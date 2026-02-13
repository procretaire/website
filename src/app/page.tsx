import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import meta from "@/data/metadata.json";
import styles from "./page.module.css";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <>
    <AnimatedBackground />
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
          <Typewriter items={meta.site.tagline} typingSpeedMin={300} className={styles.tagline} />
          <p className={styles.subtitle}>
            We are crafting something refined.<br />
            The full experience lands soon.
          </p>
        </div>
      </section>
    </main>
  </>
  );
}
