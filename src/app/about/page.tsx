"use client";

import React, { useEffect } from "react";
import Head from "next/head";
import styles from "./about.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaLightbulb,
  FaUsers,
  FaAward,
  FaGlobe,
  FaHandshake,
  FaStar,
} from "react-icons/fa";

// Video from public/videos
const bgVideo = "/video/bg10.mp4";

// Type definitions
interface CoreValue {
  icon: JSX.Element;
  title: string;
  desc: string;
}

interface JourneyItem {
  year: string;
  title: string;
  desc: string;
}

// Data
const coreValues: CoreValue[] = [
  {
    icon: <FaHandshake />,
    title: "Integrity",
    desc: "We build trust through absolute transparency and unwavering ethical practices in every interaction.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    desc: "We constantly embrace change, challenge the status quo, and strive to continuously improve our solutions.",
  },
  {
    icon: <FaStar />,
    title: "Excellence",
    desc: "We are committed to delivering the highest standards of quality and precision in every single project we undertake.",
  },
  {
    icon: <FaUsers />,
    title: "Collaboration",
    desc: "We believe in the power of synergy, working as one unified team, both internally and with our valued clients.",
  },
];

const journeyData: JourneyItem[] = [
  {
    year: "2022",
    title: "Foundation & Vision",
    desc: "Established in Pune with a clear vision to become a trusted global leader in SAP and ERP solutions.",
  },
  {
    year: "2023",
    title: "Global Footprint",
    desc: "Expanded rapidly, serving a diverse clients across Europe, the Middle East, and Asia.",
  },
  {
    year: "2024",
    title: "Team Expansion",
    desc: "Assembled a world-class team of certified consultants, expert analysts, and creative developers.",
  },
  {
    year: "2025",
    title: "Delivering Excellence",
    desc: "Successfully completed over 50 major enterprise projects with a track record of innovation.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-out-quad" });
  }, []);

  return (
    <>
      <Head>
        <title>About Us | Alphaseam</title>
        <meta
          name="description"
          content="Learn more about Alphaseam, a Pune-based IT powerhouse delivering enterprise-grade SAP and ERP solutions globally."
        />
      </Head>

      <main className={styles.pageWrapper}>
        {/* Background video */}
        <div className={styles.backgroundContainer}>
          <video autoPlay muted loop className={styles.backgroundVideo}>
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className={styles.backgroundOverlay}></div>
        </div>

        {/* Page Content */}
        <div className={styles.contentContainer}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.container}>
              <h1 data-aos="fade-up">
                Pioneering <span className={styles.highlight}>Digital</span> Transformation
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                We are a Pune-based IT powerhouse delivering enterprise-grade SAP and ERP solutions to businesses across the globe.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.missionGrid}>
                <div className={styles.missionText} data-aos="fade-right">
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is to fuel digital transformation with cutting-edge technology, reliability, and relentless innovation. With a diverse team of developers, consultants, and strategists, Alphaseam combines deep domain knowledge with technical expertise to deliver intelligent and scalable software systems.
                  </p>
                  <p>
                    We are not just a service provider — we are your trusted transformation partner, dedicated to your success.
                  </p>
                </div>
                <div className={styles.missionStats} data-aos="fade-left" data-aos-delay="100">
                    <div className={styles.statItem}>
                        <h3>50+</h3>
                        <p>Projects Delivered</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>3</h3>
                        <p>Continents Served</p>
                    </div>
                    <div className={styles.statItem}>
                        <h3>100%</h3>
                        <p>Client Satisfaction</p>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeader} data-aos="fade-up">
                <h2>Our Core Values</h2>
                <p>The principles that drive our commitment to excellence.</p>
              </div>
              <div className={styles.valuesGrid}>
                {coreValues.map((value, index) => (
                  <div key={index} className={styles.valueCard} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className={styles.valueIcon}>{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Journey Section */}
          <section className={styles.section}>
             <div className={styles.container}>
                <div className={styles.sectionHeader} data-aos="fade-up">
                    <h2>Our Journey</h2>
                    <p>A timeline of our growth, innovation, and success.</p>
                </div>
                <div className={styles.timelineContainer}>
                    {journeyData.map((item, index) => (
                        <div key={index} className={styles.timelineItem} data-aos="fade-up">
                            <div className={styles.timelineNode}></div>
                            <div className={styles.timelineContent}>
                                <span className={styles.timelineYear}>{item.year}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </section>

          {/* Why Choose Us Section */}
          <section className={`${styles.section} ${styles.chooseUsSection}`}>
            <div className={styles.container}>
                <div className={styles.sectionHeader} data-aos="fade-up">
                    <h2>Why Choose Alphaseam?</h2>
                </div>
                <div className={styles.iconGrid} data-aos="fade-up" data-aos-delay="100">
                    <div className={styles.iconItem}>
                        <FaLightbulb />
                        <span>Innovation First</span>
                    </div>
                    <div className={styles.iconItem}>
                        <FaUsers />
                        <span>Client-Centric</span>
                    </div>
                    <div className={styles.iconItem}>
                        <FaAward />
                        <span>Certified Expertise</span>
                    </div>
                    <div className={styles.iconItem}>
                        <FaGlobe />
                        <span>Global Impact</span>
                    </div>
                </div>
                <p className={styles.finalText} data-aos="fade-up" data-aos-delay="200">
                    We don’t just build solutions — we build futures. When you work with
                    us, you’re partnering with passionate professionals who care about
                    your business as much as you do.
                </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
