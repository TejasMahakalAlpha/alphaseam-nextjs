"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";

import AOS from "aos";
import "aos/dist/aos.css";

// --- SVG Icons ---
const ArrowIcon = () => <span className={styles.arrowIcon}>→</span>;
const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
// --- NEW: Close Icon for Modal ---
const CloseIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// --- Public Assets ---
const heroVideo = "/video/bg9_video.mp4";
const service1 = "/image/sap2.webp";
const service2 = "/image/c-s-d.jpeg";
const service3 = "/image/s-i-s.jpeg";
const aboutImg = "/image/home4.jpg";
const case1 = "/image/home9.jpg";
const case2 = "/image/home10.jpg";
const case3 = "/image/home11.jpg";

// --- Data ---
// Defining the type for a single service for type safety
type Service = {
  img: string;
  title: string;
  desc: string;
  icon: JSX.Element;
};

const services: Service[] = [
  {
    img: service1,
    title: "SAP ERP Solutions",
    desc: "Enterprise-grade ERP implementations to modernize and scale your core operations. We cover everything from initial consultation and system design to implementation, customization, and ongoing support for SAP S/4HANA, Business One, and other core modules.",
  },
  {
    img: service2,
    title: "Custom Development",
    desc: "Intelligent, tailor-made web and mobile applications that solve unique business challenges. Our agile development process ensures we deliver scalable, secure, and high-performance applications built on modern technology stacks like Next.js, React, Node.js, and Python.",
  },
  {
    img: service3,
    title: "System Integration",
    desc: "Synchronizing disparate systems to create a seamless, optimized technology ecosystem. We specialize in connecting APIs, databases, and third-party platforms to ensure smooth data flow, automate workflows, and provide a single source of truth for your business.",
  },
].map(service => ({ ...service, icon: <PlusIcon /> })); // Add icon dynamically

const caseStudies = [
  { img: case1, title: "Global Retailer Transformation", desc: "Implemented a full-scale SAP S/4HANA transformation across 25+ countries, unifying global operations.", category: "SAP S/4HANA", },
  { img: case2, title: "High-Availability FinTech API", desc: "Engineered a scalable, secure, API-driven architecture achieving 99.99% uptime for a leading FinTech.", category: "API Architecture", },
  { img: case3, title: "Logistics Network Integration", desc: "Orchestrated a complex system integration across 10+ smart warehouses, boosting efficiency by 40%.", category: "System Integration", },
];

// --- NEW MODAL COMPONENT ---
interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleModalContentClick} data-aos="zoom-in-up" data-aos-duration="400">
        <button className={styles.modalCloseButton} onClick={onClose}>
            <CloseIcon />
        </button>
        <div className={styles.modalImageContainer}>
          <Image src={service.img} alt={service.title} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.modalTextContainer}>
          <h2>{service.title}</h2>
          <p>{service.desc}</p>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const router = useRouter();
  const consultationLink = "https://calendly.com/alphaseam-operations/30min";
  
  // --- NEW STATE FOR MODAL ---
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-quad" });
  }, []);
  
  // --- NEW HANDLERS FOR MODAL ---
  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <Head>
        <title>Alphaseam | Digital Transformation & SAP Solutions</title>
        <meta
          name="description"
          content="Alphaseam delivers digital velocity through modern web & mobile app development, SAP & ERP solutions, and system integration."
        />
      </Head>

      <main className={styles.pageWrapper}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
            <video className={styles.heroVideo} autoPlay muted loop playsInline>
                <source src={heroVideo} type="video/mp4" />
            </video>
            <div className={styles.heroOverlay} />
            <div className={styles.container}>
            <div className={styles.heroContent} data-aos="fade-up">
                <h1>
                <span className={styles.highlight}>Delivering</span> Digital
                Velocity
                </h1>
                <p>
                We are your dedicated partners in innovation, driving digital transformation through state-of-the-art web, mobile, and SAP solutions.
                </p>
                <div className={styles.heroButtons}>
                <button
                    className={styles.primaryButton}
                    onClick={() => router.push("/contact")}
                >
                    Get in Touch <ArrowIcon />
                </button>
                <button
                    className={styles.secondaryButton}
                    onClick={() => router.push("/services")}
                >
                    Our Services
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* Services Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-aos="fade-up">
              <h2>Core Services</h2>
              <p>
                Our expertise lies in crafting powerful solutions that drive growth, efficiency, and competitive advantage.
              </p>
            </div>
            <div className={styles.servicesGrid}>
              {services.map((service, i) => (
                <div key={i} className={styles.serviceCard} data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className={styles.serviceCardBg}>
                      <Image src={service.img} alt={service.title} layout="fill" objectFit="cover" />
                  </div>
                  <div className={styles.serviceCardContent}>
                    {/* --- ADDED ONCLICK HANDLER HERE --- */}
                    <div className={styles.serviceCardIcon} onClick={() => handleOpenModal(service)}>
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc.substring(0, 100)}...</p> {/* Shortened description for card view */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Other sections remain unchanged --- */}
        
        {/* About Section */}
        <section className={styles.section}>
            <div className={styles.container}>
            <div className={styles.aboutGrid}>
                <div className={styles.aboutText} data-aos="fade-right" data-aos-delay="100">
                <h2>Your Partner in Innovation</h2>
                <p>
                    We are a global team of SAP & digital experts dedicated to
                    accelerating your business transformation with agile processes and
                    innovative technology. Our commitment is to deliver excellence and drive tangible results.
                </p>
                <button className={styles.primaryButton} onClick={() => router.push("/about")}>
                    Learn More <ArrowIcon />
                </button>
                </div>
                <div className={styles.aboutImage} data-aos="fade-left" data-aos-delay="200">
                <Image src={aboutImg} alt="Our team collaborating" layout="fill" objectFit="cover" />
                </div>
            </div>
            </div>
        </section>

        {/* Case Studies Section */}
        <section className={styles.section}>
            <div className={styles.container}>
            <div className={styles.sectionHeader} data-aos="fade-up">
                <h2>Success in Action</h2>
                <p>
                We deliver impactful results. Explore how we've helped leading businesses transform and succeed.
                </p>
            </div>
            <div className={styles.caseStudiesGrid}>
                {caseStudies.map((caseStudy, i) => (
                <div key={i} className={styles.caseCard} data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className={styles.caseCardImage}>
                    <Image src={caseStudy.img} alt={caseStudy.title} layout="fill" objectFit="cover" />
                    </div>
                    <div className={styles.caseCardContent}>
                    <span className={styles.caseCardCategory}>{caseStudy.category}</span>
                    <h3>{caseStudy.title}</h3>
                    <p>{caseStudy.desc}</p>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Consultation CTA Section */}
        <section className={styles.section}>
            <div className={styles.container}>
            <div className={styles.ctaContainer} data-aos="fade-up">
                <h2>Ready to Build Your Future?</h2>
                <p>
                Let's talk about your project. Book a free, no-obligation consultation with our experts today.
                </p>
                <a href={consultationLink} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                Book Free Consultation <ArrowIcon />
                </a>
            </div>
            </div>
        </section>
      </main>

      {/* --- RENDER MODAL CONDITIONALLY --- */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default HomePage;