"use client";

import DarkmodeToggle from "@/components/Darkmode";
import Menu from "@/components/Menu";
import styles from "./Header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<a href="/" className={styles.brand}>
					<span className={styles.logoWrap} aria-hidden="true">
						<img src="/icon0.svg" alt="" className={styles.logo} />
					</span>
					<span className={styles.brandName}>Procretaire</span>
				</a>

				<div className={styles.actions}>
					<Menu />
					<DarkmodeToggle />
				</div>
			</div>
		</header>
	);
}
