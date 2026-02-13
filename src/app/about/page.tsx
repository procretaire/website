import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Floatenu from "@/components/Floatenu";
import styles from "./page.module.css";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function AboutPage() {
  return (
    <>
    <AnimatedBackground />
    <Header />
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.header}>
          <div className={styles.logoWrap}>
            <img
              src="/icon0.svg"
              alt="Procretaire logo"
              className={styles.logo}
              />
          </div>
          <p className={styles.kicker}>About</p>
          <h1 className={styles.title}>About Procretaire</h1>
          <p className={styles.intro}>
            Procretaire is a branding and web development studio for individuals and
            small businesses ready to look professional online.
          </p>
        </div>

        <div className={styles.body}>
          <p>
            We help you create a professional online presence by designing, developing,
            and deploying websites that feel cohesive and easy to use. Every project
            blends clear branding with practical build quality, so your business looks
            polished and works flawlessly across devices.
          </p>
          <p>
            Our services cover brand foundations, visual identity, and modern web
            development. Whether you need a new site or a complete refresh, we handle the
            entire journey from concept to launch.
          </p>
        </div>

        <div className={styles.footer}>
          <p>Based in the Philippines.</p>
          <p>Available for select collaborations in 2026.</p>
        </div>
      </section>
    </main>
    <Floatenu />
    <Footer />
    </>
  );
}
