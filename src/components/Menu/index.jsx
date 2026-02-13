import styles from "./Menu.module.css";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

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
