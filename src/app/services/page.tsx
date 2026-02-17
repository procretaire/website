import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Floatenu from "@/components/Floatenu";
import AnimatedBackground from "@/components/AnimatedBackground";
import styles from "./page.module.css";
import meta from "@/data/metadata.json";

export default function Services() {
    return (
        <>
            <AnimatedBackground />
            <Header />
            <main className={styles.main}>
                <div className={styles.glowWrap} aria-hidden="true">
                    <div className={`${styles.glow} ${styles.glowOne}`} />
                    <div className={`${styles.glow} ${styles.glowTwo}`} />
                    <div className={`${styles.glow} ${styles.glowThree}`} />
                </div>

                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <p className={styles.kicker}>Services</p>
                        <h1 className={styles.title}>A polished online presence for people and small teams.</h1>
                        <p className={styles.lead}>
                            We design, develop, and deploy professional websites with your own domain name, then
                            set up a branded email address so every message feels official.
                        </p>
                        <div className={styles.badges}>
                            <span className={styles.badge}>Design</span>
                            <span className={styles.badge}>Development</span>
                            <span className={styles.badge}>Deployment</span>
                            <span className={styles.badge}>Email setup</span>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>What we do</h2>
                    <div className={styles.cards}>
                        <article className={styles.card}>
                            <h3 className={styles.cardTitle}>Websites, end to end</h3>
                            <p className={styles.cardText}>
                                Design, build, and launch a modern website tailored to your brand, including domain
                                configuration and deployment so you can go live fast.
                            </p>
                            <p className={styles.cardNote}>Best for portfolios, boutiques, and small teams.</p>
                        </article>
                        <article className={styles.card}>
                            <h3 className={styles.cardTitle}>Professional email</h3>
                            <p className={styles.cardText}>
                                Set up a polished email address on your domain. No more @gmail.com or @hotmail.com,
                                just a clean, trustworthy inbox that matches your brand.
                            </p>
                            <p className={styles.cardNote}>Delivered with setup guidance for your devices.</p>
                        </article>
                    </div>
                </section>

                <section className={styles.sectionAlt}>
                    <div className={styles.requestWrap}>
                        <div>
                            <h2 className={styles.sectionTitle}>What we need from you</h2>
                            <p className={styles.sectionIntro}>
                                Send these items so we can prepare a precise quote and direction.
                            </p>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>Your logo in high resolution.</li>
                                <li className={styles.listItem}>Brand guidelines or visual references.</li>
                                <li className={styles.listItem}>A short prompt with your preferences and goals.</li>
                            </ul>
                        </div>
                        <div className={styles.highlight}>
                            <h3 className={styles.highlightTitle}>No brand kit yet?</h3>
                            <p className={styles.highlightText}>
                                We can help you craft a logo, guidelines, and copy direction for an additional fee.
                            </p>
                            <p className={styles.highlightFoot}>
                                We will outline the add-on scope clearly before you commit.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.cta}>
                        <div>
                            <h2 className={styles.ctaTitle}>Ready for a quote?</h2>
                            <p className={styles.ctaText}>
                                Tell us about your business, share your materials, and we will reply with a tailored
                                proposal.
                            </p>
                        </div>
                        <a className={styles.ctaButton} href={`mailto:${meta.contact.email}`}>
                            Request a quote
                        </a>
                    </div>
                </section>
            </main>
            <Floatenu />
            <Footer />
        </>
    );
}