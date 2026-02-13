"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Typewriter.module.css";

interface TypewriterProps {
  items: string[];
  className?: string;
  typingSpeedMin?: number;
  typingSpeedMax?: number;
}

export default function Typewriter({ 
  items = [], 
  className,
  typingSpeedMin = 50,
  typingSpeedMax = 150
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [itemIndex, setItemIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate random typing speed
  const getRandomTypingSpeed = () => {
    return Math.random() * (typingSpeedMax - typingSpeedMin) + typingSpeedMin;
  };

  // Track visibility using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Typing and deleting animation
  useEffect(() => {
    if (!isVisible || items.length === 0) return;

    const currentItem = items[itemIndex];
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentItem.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentItem.slice(0, displayText.length + 1));
        }, getRandomTypingSpeed()); // Randomized typing speed
      } else {
        // Pause before deletion
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000); // Pause duration
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50); // Deletion speed
      } else {
        // Move to next item
        setIsDeleting(false);
        setItemIndex((prev) => (prev + 1) % items.length);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [displayText, itemIndex, isDeleting, isVisible, items, typingSpeedMin, typingSpeedMax]);

  return (
    <div ref={containerRef} className={`${styles.typewriter} ${className || ""}`}>
      <span className={styles.text}>{displayText}</span>
      <span className={styles.cursor} />
    </div>
  );
}
