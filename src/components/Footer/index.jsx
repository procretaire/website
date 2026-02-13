"use client";

import { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import meta from "@/data/metadata.json";
export default function Footer() {
	const [year, setYear] = useState(() => new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.brand}>
					<img src="/icon0.svg" alt="Procretaire logo" className={styles.logo} />
					<span>Procretaire</span>
				</div>
				<p className={styles.copy}>
					© {year} <Link href="/" aria-label={meta.site.title}>{meta.site.title}</Link>. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
