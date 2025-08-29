"use client";

// app/blog/page.tsx
import React, { useState, useEffect } from 'react'; // <--- useState ADDED
import Head from 'next/head';
import styles from './blog.module.css';
import { FaArrowRight, FaTimes } from 'react-icons/fa'; // <--- FaTimes ADDED for close icon
import AOS from 'aos';
import 'aos/dist/aos.css';

// Static blog post data for design purposes.
const blogPosts = [
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
    content: 'Artificial intelligence is no longer a futuristic concept; it\'s a present-day reality in ERP. Learn how AI is enhancing automation, predictive analytics, and decision-making within modern ERP systems, leading to more efficient and intelligent business processes.',
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


// --- NEW ---
// Popup/Modal Component for displaying blog details
const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  // Stop propagation to prevent closing modal when clicking inside content
  const handleContentClick = (e) => e.stopPropagation();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleContentClick} data-aos="zoom-in" data-aos-duration="300">
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <img src={blog.image} alt={blog.title} className={styles.modalImage} />
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
  // --- NEW ---
  // State to manage which blog is selected for the modal
  const [selectedBlog, setSelectedBlog] = useState(null);

  const newsletterLink =
    "https://www.linkedin.com/newsletters/alphaseam-sap-services-7341412789007069189";

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: 'ease-in-out' });
  }, []);
  
  // --- NEW ---
  // Functions to open and close the modal
  const handleReadMore = (blog) => {
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
        {/* Featured Blog Post */}
        {featuredBlog && (
          <section className={styles.featuredSection} data-aos="fade-up">
            <h2 className={styles.sectionTitle}>Featured Article</h2>
            <div className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className={styles.featuredImage}
                />
              </div>
              <div className={styles.featuredContent}>
                <p className={styles.postMeta}>
                  {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
                <h3>{featuredBlog.title}</h3>
                <p>{featuredBlog.content.slice(0, 150)}...</p> {/* Shortened for preview */}
                {/* --- MODIFIED --- Changed <a> to <button> with onClick */}
                <button onClick={() => handleReadMore(featuredBlog)} className={styles.readMoreLink}>
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Other Blog Posts */}
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
                <img
                  src={blog.image}
                  alt={blog.title}
                  className={styles.blogCardImage}
                />
                <div className={styles.blogCardContent}>
                  <p className={styles.postMeta}>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                  <h4>{blog.title}</h4>
                  <p>{blog.content.slice(0, 100)}...</p>
                  {/* --- MODIFIED --- Changed <a> to <button> with onClick */}
                  <button onClick={() => handleReadMore(blog)} className={styles.readMoreLink}>
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
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

      {/* --- NEW --- Conditionally render the modal */}
      <BlogModal blog={selectedBlog} onClose={handleCloseModal} />
    </div>
  );
};

export default BlogPage;