import { useEffect, useState } from "react";
import styles from "./BloomLoader.module.css";

export default function BloomLoader({ onFinish = () => {}, totalDuration = 2000 }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpen(true), 800); // start reveal
    const finishTimer = setTimeout(() => onFinish(), totalDuration);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish, totalDuration]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300  ${
        isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-widest">
          <span className={styles.bloomText}>BLOOM</span>
        </h1>

        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>

      <div className={`${styles.revealCircle} ${isOpen ? styles.revealOpen : ""}`} />
    </div>
  );
}
