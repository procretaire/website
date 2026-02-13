"use client";

import { useEffect, useState } from "react";
import styles from "./Darkmode.module.css";

const STORAGE_KEY = "procretaire-theme";

function getPreferredTheme() {
	if (typeof window === "undefined") {
		return "light";
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") {
		return stored;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export default function DarkmodeToggle() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const preferred = getPreferredTheme();
		setTheme(preferred);
		document.documentElement.classList.toggle("dark", preferred === "dark");
	}, []);

	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		window.localStorage.setItem(STORAGE_KEY, nextTheme);
		document.documentElement.classList.toggle("dark", nextTheme === "dark");
	};

	return (
		<button
			type="button"
			className={styles.toggle}
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
		>
			<span className={styles.iconWrap} aria-hidden="true">
				<span className={styles.sun}>
					<svg viewBox="0 0 24 24" role="presentation">
						<path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5-3.5a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1Zm-15 0a1 1 0 0 1 1 1v.5a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1Zm12.02-5.02a1 1 0 0 1 1.41 0l.35.35a1 1 0 1 1-1.41 1.41l-.35-.35a1 1 0 0 1 0-1.41Zm-9.9 9.9a1 1 0 0 1 1.41 0l.35.35a1 1 0 1 1-1.41 1.41l-.35-.35a1 1 0 0 1 0-1.41Zm9.9 1.41a1 1 0 0 1 0-1.41l.35-.35a1 1 0 1 1 1.41 1.41l-.35.35a1 1 0 0 1-1.41 0Zm-9.9-9.9a1 1 0 0 1 0-1.41l.35-.35a1 1 0 1 1 1.41 1.41l-.35.35a1 1 0 0 1-1.41 0Zm5.4 11.02a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-.5a1 1 0 0 1 1-1Z" />
					</svg>
				</span>
				<span className={styles.moon}>
					<svg viewBox="0 0 24 24" role="presentation">
						<path d="M12.76 3.6a1 1 0 0 1 .86.11 1 1 0 0 1 .45.73 7.1 7.1 0 0 0 8.33 7.93 1 1 0 0 1 1.16 1.2 9.5 9.5 0 1 1-10.8-10.8ZM9.74 6.3a7.5 7.5 0 1 0 8.95 8.95A9.1 9.1 0 0 1 9.74 6.3Z" />
					</svg>
				</span>
			</span>
		</button>
	);
}
