import styles from "./Footer.module.css";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.brand}>
					<img src="/icon0.svg" alt="Procretaire logo" className={styles.logo} />
					<span>Procretaire</span>
				</div>
				<p className={styles.copy}>
					© {year} Procretaire. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
