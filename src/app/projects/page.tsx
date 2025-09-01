"use client";

// app/projects/page.tsx
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // Import the Image component
import styles from './project.module.css';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Type definition for a Project
interface Project {
  _id: string;
  title: string;
  description: string;
  image: string; // Added image property
  tags?: string[];
}

// --- UPDATED: Static project data with image paths ---
// Make sure you have these images in your /public/projects/ folder
const projectsData: Project[] = [
  {
    _id: '1',
    title: 'MooRopan',
    description: 'An agriculture tech solution designed to optimize crop management and improve yield for farmers.',
    image: '/image/mooropan.png', // Image path
    tags: ['React.js', 'Express.js', 'Node.js', 'MongoDB'],
  },
  {
    _id: '2',
    title: 'SRDT',
    description: 'A security and data transformation tool ensuring data integrity and protection for enterprise-level applications.',
    image: '/image/srdt.png', // Image path
    tags: ['React.js', 'Java', 'Spring Boot', 'MySQL'],
  },
  {
    _id: '3',
    title: 'Amsa',
    description: 'A comprehensive software suite for managing complex business operations and workflows.',
    image: '/image/amsa.png', // Image path
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    _id: '4',
    title: 'Crowd Fund',
    description: 'A robust platform for raising capital through community contributions, featuring secure payment gateway and project tracking.',
    image: '/image/crowdfund_logo.png', // Image path
    tags: ['React', 'Java', 'Spring boot', 'MySQL', 'Razorpay', 'Postgresql'],
  },
  {
    _id: '5',
    title: 'Agrimitra',
    description: 'A farmer-centric application providing vital information on weather, market rates, and best farming practices.',
    image: '/image/agrimitra.jpeg', // Image path
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    _id: '6',
    title: 'Exilieen',
    description: 'A comprehensive software suite for managing complex business operations and workflows.',
    image: '/image/exilieen_logo.png', // Image path
    tags: ['React.js', 'MongoDB', 'Node.js', 'Express.js'],
  },
];


// Custom Hook for the 3D Tilt effect (No changes here)
const use3DTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = (y / height - 0.5) * -20;
      const rotateY = (x / width - 0.5) * 20;
      element.style.setProperty('--rotateX', `${rotateX}deg`);
      element.style.setProperty('--rotateY', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--rotateX', '0deg');
      element.style.setProperty('--rotateY', '0deg');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return ref;
};

// ProjectCard component
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const tiltRef = use3DTilt();
  
  // The 'getInitials' function is no longer needed

  return (
    <div
      className={styles.projectCard}
      ref={tiltRef}
      data-aos="fade-up"
      data-aos-delay={100 * index}
    >
      {/* --- UPDATED: Replaced initials with Image component --- */}
      <div className={styles.projectLogo}>
        <Image
            src={project.image}
            alt={`${project.title} Logo`}
            layout="fill"
            objectFit="cover"
        />
      </div>
      <div className={styles.projectCardContent}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags?.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main ProjectsPage component (No changes here)
const ProjectsPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });
  }, []);

  return (
    <div className={styles.projectsPage}>
      <Head>
        <title>Our Projects | Alphaseam</title>
        <meta
          name="description"
          content="Explore Alphaseam's portfolio of innovative projects and successful digital transformation initiatives."
        />
      </Head>

      <header className={styles.heroSection} data-aos="fade-in">
        <div className={styles.container}>
          <h1>Innovation in Action</h1>
          <p className={styles.subtitle}>
            A glimpse into the innovative solutions and impactful projects we've
            successfully delivered.
          </p>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        <section className={styles.ctaSection} data-aos="zoom-in">
          <h3>Have a Project in Mind?</h3>
          <p>
            Let's collaborate to build the next innovative solution for your
            business. Get in touch with our experts today.
          </p>
          <Link href="/contact" className={styles.ctaButton}>
            Start a Project
          </Link>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;