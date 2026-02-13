"use client";

import { useState } from "react";
import styles from "./Floatenu.module.css";

const menuItems = [
  { label: "Route", href: "#route", icon: "→" },
  { label: "Bundler", href: "#bundler", icon: "◉" },
  { label: "Route Info", href: "#route-info", icon: "ℹ" },
  { label: "Preference", href: "#preference", icon: "⚙" },
];

export default function Floatenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.floatenu}>
      <div
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}
        role="menu"
      >
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={styles.menuItem}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 24 24"
          className={styles.triggerIcon}
          aria-hidden="true"
        >
          <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
        </svg>
      </button>
    </div>
  );
}
