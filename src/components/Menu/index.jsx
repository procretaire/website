import meta from "@/data/metadata.json";
import styles from "./Menu.module.css";

const navItems = meta.navigation?.primary ?? [];

export default function Menu() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {navItems.map((item) => (
        <a key={item.label} href={item.href} className={styles.navLink}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
