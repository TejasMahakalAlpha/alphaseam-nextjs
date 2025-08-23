"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ works in app router
import styles from "./Header.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

// ✅ Correct image references (from public/images)
const logoWhite = "/image/logowhite.png";
const logoBlack = "/image/logoblack.png";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // ✅ replaces useRouter().pathname

  // Determine if the current page is the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setMenuOpen(false);
  }, [pathname]);

  // Dynamically apply 'scrolled' class based on scroll position or if not on home page
  const headerClasses = `${styles["header-v2"]} ${
    scrolled || !isHomePage ? styles.scrolled : ""
  }`;

  // Choose logo based on scroll position or if not on home page
  const logoToShow = scrolled || !isHomePage ? logoBlack : logoWhite;

  return (
    <header className={headerClasses}>
      <div className={styles["header-container-v2"]}>
        <Link href="/" className={styles["logo-link-v2"]}>
          {/* ✅ Next.js Image with public folder assets */}
          <Image
            src={logoToShow}
            alt="Alphaseam Logo"
            className={styles["logo-img-v2"]}
            width={150}
            height={45}
            priority
          />
        </Link>

        <nav
          className={`${styles["nav-links-v2"]} ${
            menuOpen ? styles.active : ""
          }`}
        >
          <Link
            href="/"
            className={pathname === "/" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={pathname === "/about" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/services"
            className={pathname === "/services" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/career"
            className={pathname === "/career" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            Career
          </Link>
          <Link
            href="/blog"
            className={pathname === "/blog" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className={pathname === "/projects" ? styles.active : ""}
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={`${styles["contact-link-btn"]} ${
              pathname === "/contact" ? styles.active : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div
          className={styles["menu-toggle-v2"]}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
