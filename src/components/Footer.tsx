"use client";

import React, { useEffect } from 'react';
import Link from 'next/link'; // Use next/link for internal navigation
import { FaLinkedinIn, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import styles from './Footer.module.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
  }, []);

  return (
    <footer className={styles['footer-v2']} data-aos="fade-up">
      <div className={styles['footer-content-v2']}>
        <div className={`${styles['footer-column']} ${styles['about-us']}`}>
          <h3 className={styles['footer-title']}>Alphaseam Enterprises</h3>
          <p>Innovating with precision, we deliver cutting-edge SAP and digital solutions to accelerate your business transformation.</p>
          <div className={styles['footer-socials-v2']}>
            <a href="https://www.linkedin.com/company/alphaseam-enterprises-llp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className={`${styles['footer-column']} ${styles['quick-links']}`}>
          <h4 className={styles['footer-subtitle']}>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/career">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={`${styles['footer-column']} ${styles['contact-info']}`}>
          <h4 className={styles['footer-subtitle']}>Contact Us</h4>
          <a href="mailto:info@alphaseam.com" className={styles['contact-item']}>
            <FaEnvelope />
            <span>info@alphaseam.com</span>
          </a>
          <a href="tel:+917387182811" className={styles['contact-item']}>
            <FaPhoneAlt />
            <span>+91 7387182811</span>
          </a>
        </div>
      </div>

      <div className={styles['footer-bottom-v2']}>
        <p>&copy; {new Date().getFullYear()} Alphaseam Enterprises Pvt. Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
