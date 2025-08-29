"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import styles from "./service.module.css";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// For icons, run: npm install react-icons
import {
  FaSitemap, FaLaptopCode, FaCogs, FaDatabase, FaCloud, FaShieldAlt,
  FaProjectDiagram, FaUsers, FaSmile
} from "react-icons/fa";

const ServicesPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  // Data for the page sections
  const services = [
    { icon: <FaSitemap />, title: "SAP ERP Solutions", description: "End-to-end implementation and support of SAP S/4HANA." },
    { icon: <FaLaptopCode />, title: "Custom Development", description: "Intelligent applications designed for your unique business needs." },
    { icon: <FaCogs />, title: "System Integration", description: "Seamless integration of systems to optimize performance." },
  ];

  const skills = [
    { icon: <FaDatabase />, title: "Data Analytics" },
    { icon: <FaCloud />, title: "Cloud Solutions" },
    { icon: <FaShieldAlt />, title: "Cyber Security" },
    { icon: <FaProjectDiagram />, title: "DevOps" },
  ];
  
  const stats = [
    { icon: <FaProjectDiagram />, value: "50+", label: "Projects Done" },
    { icon: <FaUsers />, value: "18+", label: "Global Clients" },
    { icon: <FaSmile />, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div className={styles["services-page"]}>
      <Head>
        <title>Our Services | Alphaseam</title>
        <meta name="description" content="Explore our comprehensive technology services from SAP solutions to custom development." />
      </Head>

      {/* ======== Hero Section ======== */}
      <section className={styles["services-hero-section"]}>
        <h1 data-aos="fade-down">Our Services</h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Discover the range of solutions we provide to transform your business.
        </p>
      </section>

      {/* ======== Services Grid Section ======== */}
      <section className={styles["services-grid-section"]}>
        <h2 className={styles["h2-title"]} data-aos="fade-up">Core Offerings</h2>
        <div className={styles["services-grid"]} data-aos="fade-up" data-aos-delay="200">
          {services.map((service, index) => (
            <div key={index} className={styles["service-card-3d"]}>
              <div className={styles["service-card-content"]}>
                <div className={styles["service-icon"]}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======== Skills Section (Hexagons) ======== */}
      <section className={styles["skills-section-v2"]}>
        <h2 className={styles["h2-title"]} data-aos="fade-up">Our Technical Expertise</h2>
        <div className={styles["skills-hexagon-grid"]} data-aos="fade-up" data-aos-delay="200">
          {skills.map((skill, index) => (
            <div key={index} className={styles["hexagon-wrapper"]}>
              <div className={styles["hexagon"]}>
                <div className={styles["hexagon-icon"]}>{skill.icon}</div>
                <div className={styles["hexagon-title"]}>{skill.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======== Stats Section ======== */}
      <section className={styles["stats-section"]}>
        <h2 className={styles["h2-title"]} data-aos="fade-up">Our Achievements</h2>
        <div className={styles["stats-grid"]} data-aos="fade-up" data-aos-delay="200">
           {stats.map((stat, index) => (
             <div key={index} className={styles["stat-card"]}>
                <div className={styles["stat-icon"]}>{stat.icon}</div>
                <div className={styles["stat-value"]}>{stat.value}</div>
                <div className={styles["stat-label"]}>{stat.label}</div>
             </div>
           ))}
        </div>
      </section>

      {/* ======== CTA Section ======== */}
      <section className={styles["consultation-cta-section"]}>
        <div className={styles["consultation-content"]} data-aos="zoom-in">
          <h2 className={styles["h2-title"]}>Need Expert Consultation?</h2>
          <p>
            Let’s discuss how Alphaseam can deliver tailored solutions for your business.
          </p>
          <Link href="/contact" className={styles["glowing-btn"]}>
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;