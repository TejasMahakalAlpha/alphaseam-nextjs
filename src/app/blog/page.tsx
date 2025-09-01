"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image'; // <-- Imported Image component
import styles from './blog.module.css';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Type definitions for props
interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

interface BlogModalProps {
  blog: Blog | null;
  onClose: () => void;
}

const blogPosts: Blog[] = [
  {
    _id: '1',
    title: 'Unlocking Business Potential with SAP S/4HANA',
    content: 'Discover the core advantages of migrating to SAP S/4HANA. From real-time analytics to a simplified data model, we explore how this intelligent ERP can revolutionize your business operations. This new era of enterprise resource planning offers unprecedented speed and agility, enabling businesses to make smarter decisions faster. The in-memory computing power of HANA allows for complex calculations on the fly, eliminating batch processing delays. Furthermore, the Fiori user experience provides an intuitive, role-based interface that works seamlessly across devices, boosting user adoption and productivity.',
    image: '/image/home2.jpg',
    createdAt: '2025-08-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'The Future of AI in Enterprise Resource Planning',
    // --- FIXED APOSTROPHE ERROR HERE ---
    content: 'Artificial intelligence is no longer a futuristic concept; it&apos;s a present-day reality in ERP. Learn how AI is enhancing automation, predictive analytics, and decision-making within modern ERP systems, leading to more efficient and intelligent business processes.',
    image: '/image/hero.jpg',
    createdAt: '2025-08-10T09:00:00Z',
  },
  {
    _id: '3',
    title: 'Cloud vs. On-Premise: A Modern Tech Dilemma',
    content: 'Choosing between cloud and on-premise infrastructure is a critical decision. We break down the pros, cons, and key considerations for scalability, security, and cost-effectiveness to help you make the right choice for your enterprise.',
    image: '/image/home1.jpg',
    createdAt: '2025-08-05T14:30:00Z',
  },
  {
    _id: '4',
    title: 'Cybersecurity Best Practices for a Digital-First World',
    content: 'As businesses become more digitized, the threat landscape evolves. Here are essential cybersecurity strategies to protect your valuable data and infrastructure from modern threats, ensuring business continuity and customer trust.',
    image: '/image/home3.jpg',
    createdAt: '2025-07-28T11:00:00Z',
  },
];

const BlogModal: React.FC<BlogModalProps> = ({ blog, onClose }) => {
  if (!blog) return null;

  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick} data-aos="zoom-in" data-aos-duration="300">
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        {/* --- CONVERTED <img> to <Image> --- */}
        <div className={styles.modalImageWrapper}>
            <Image src={blog.image} alt={blog.title} className={styles.modalImage} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.modalTextContent}>
          <h3>{blog.title}</h3>
          <p className={styles.postMeta}>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
          <p className={styles.modalFullContent}>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

const BlogPage: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const newsletterLink = "https://www.linkedin.com/newsletters/alphaseam-sap-services-7341412789007069189";

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });
  }, []);
  
  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog);
  };
  
  const handleCloseModal = () => {
    setSelectedBlog(null);
  };

  const featuredBlog = blogPosts[0];
  const otherBlogs = blogPosts.slice(1);

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>Tech Insights | Alphaseam Blog</title>
        <meta
          name="description"
          content="Expert analysis and insights on enterprise technology, SAP, and digital transformation from the Alphaseam team."
        />
      </Head>

      <header className={styles.heroSection} data-aos="fade-in">
        <div className={styles.container}>
          <h1>Alphaseam Insights</h1>
          <p className={styles.subtitle}>
            Your source for expert analysis on enterprise technology, digital
            transformation, and the future of SAP.
          </p>
        </div>
      </header>

      <main className={styles.container}>
        {featuredBlog && (
          <section className={styles.featuredSection} data-aos="fade-up">
            <h2 className={styles.sectionTitle}>Featured Article</h2>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                {/* --- CONVERTED <img> to <Image> --- */}
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className={styles.featuredImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.featuredContent}>
                <p className={styles.postMeta}>
                  {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <h3>{featuredBlog.title}</h3>
                <p>{featuredBlog.content.slice(0, 150)}...</p>
                <button onClick={() => handleReadMore(featuredBlog)} className={styles.readMoreLink}>
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>
          </section>
        )}

        <section className={styles.latestArticlesSection}>
          <h2 className={styles.sectionTitle} data-aos="fade-up">
            Latest Articles
          </h2>
          <div className={styles.blogGrid}>
            {otherBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className={styles.blogCard}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className={styles.blogCardImageWrapper}>
                    {/* --- CONVERTED <img> to <Image> --- */}
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        className={styles.blogCardImage}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={styles.blogCardContent}>
                  <p className={styles.postMeta}>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                  <h4>{blog.title}</h4>
                  <p>{blog.content.slice(0, 100)}...</p>
                  <button onClick={() => handleReadMore(blog)} className={styles.readMoreLink}>
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection} data-aos="zoom-in">
          <h3>Stay Ahead of the Curve</h3>
          <p>
            Subscribe to our exclusive SAP and tech insights newsletter on
            LinkedIn.
          </p>
          <a
            href={newsletterLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            Subscribe on LinkedIn
          </a>
        </section>
      </main>

      <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
    </div>
  );
};

export default BlogPage;