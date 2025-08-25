"use client";

// pages/career.tsx
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import styles from './career.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBriefcase, FaGraduationCap, FaGlobe, FaLightbulb, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// --- Type Definitions ---
interface CareerJob {
  _id: string;
  position: string;
  location: string;
  experience: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  resume: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  resume?: string;
}

// --- Dummy Job Data (Empty for "No Openings") ---
const dummyCareers: CareerJob[] = [];


const CareerPage: React.FC = () => {
  const [careers, setCareers] = useState<CareerJob[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: 'ease-in-out' });
    setCareers(dummyCareers);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleOpenForm = (job: CareerJob) => {
    setSelectedJob(job);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setFormData({ name: '', email: '', phone: '', message: '', resume: null });
    setErrors({});
  };

  const validateField = (name: keyof FormData, value: string | File | null): string => {
    switch (name) {
      case 'name':
        if (!value) return 'Name is required.';
        if (typeof value === 'string' && !/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces.';
        break;
      case 'email':
        if (!value) return 'Email is required.';
        if (typeof value === 'string' && !/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address.';
        break;
      case 'phone':
        if (!value) return 'Phone number is required.';
        if (typeof value === 'string' && !/^\d{10}$/.test(value)) return 'Phone number must be exactly 10 digits.';
        break;
      case 'resume':
        if (!value) return 'Resume is required.';
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    const fieldValue = name === 'resume' && files ? files[0] : value;
    
    setFormData({ ...formData, [name]: fieldValue });
    
    if (errors[name as keyof FormErrors]) {
      const error = validateField(name as keyof FormData, fieldValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: FormErrors = {};
    let formIsValid = true;
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (key === 'message') return;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      showNotification('Please fix the errors before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    showNotification('Submitting your application...', 'success');

    setTimeout(() => {
      setIsSubmitting(false);
      showNotification('Application submitted successfully!', 'success');
      handleCloseForm();
    }, 2000);
  };

  return (
    <div className={styles['career-page']}>
      <Head>
        <title>Career Opportunities at Alphaseam</title>
        <meta name="description" content="Explore career openings at Alphaseam. Join a dynamic IT company specializing in SAP and ERP technologies." />
      </Head>

      {notification.show && (
        <div className={`${styles['notification-toast']} ${styles[notification.type]} ${notification.show ? styles.show : ''}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
          {notification.message}
        </div>
      )}

      <section className={styles['career-hero-section']} data-aos="fade-in">
        <h1>Join Our Team of Innovators</h1>
        <p>We are revolutionizing business technology through cutting-edge SAP & ERP solutions. Be a part of our journey.</p>
      </section>

      <main className={styles['career-content-wrapper']}>
        <section className={styles['job-listings-section']}>
          <h2 className={styles['section-title']} data-aos="fade-up">Current Openings</h2>
          <div className={styles['job-listings']}>
            {careers.length > 0 ? careers.map((job, index) => (
              <article key={job._id} className={styles['job-card']} data-aos="fade-up" data-aos-delay={100 + index * 100}>
                {/* Job Card Content would be rendered here if careers array wasn't empty */}
              </article>
            )) : <p className={styles['no-openings']}>No current openings. Check back soon!</p>}
          </div>
        </section>

        {showModal && (
          <div className={styles['modal-overlay']} onClick={handleCloseForm}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
              <button className={styles['modal-close-btn']} onClick={handleCloseForm} aria-label="Close form"><FaTimes /></button>
              <h3>Apply for: {selectedJob?.position}</h3>
              <form onSubmit={handleSubmit} className={styles['modal-form']} noValidate>
                {/* Form inputs go here */}
              </form>
            </div>
          </div>
        )}

      {/* ====== START: Updated Benefits Section ====== */}
      <section className={styles['benefits-section']}>
        <h2 className={styles['section-title']} data-aos="fade-up">Innovate, Grow, and Lead</h2>
        <p className={styles['benefits-intro']} data-aos="fade-up" data-aos-delay="100">
            At Alphaseam, we're more than just a company; we're a launchpad for your ambitions. We invest in our people, providing the tools, challenges, and collaborative environment you need to do your life's best work.
        </p>
        <div className={styles['benefits-grid']}>
          <div className={styles['benefit-card']} data-aos="zoom-in-up" data-aos-delay="200">
            <div className={styles['icon-wrapper']}>
                <FaBriefcase className={styles.icon} />
            </div>
            <h4>Impactful Global Projects</h4>
            <p>Tackle complex challenges for industry leaders, delivering real-world solutions that redefine business landscapes with the latest SAP and cloud technologies.</p>
          </div>
          <div className={styles['benefit-card']} data-aos="zoom-in-up" data-aos-delay="300">
            <div className={styles['icon-wrapper']}>
                <FaGraduationCap className={styles.icon} />
            </div>
            <h4>Accelerated Career Growth</h4>
            <p>With personalized learning paths, mentorship from industry veterans, and full support for certifications, your potential is limitless here.</p>
          </div>
          <div className={styles['benefit-card']} data-aos="zoom-in-up" data-aos-delay="400">
            <div className={styles['icon-wrapper']}>
                <FaGlobe className={styles.icon} />
            </div>
            <h4>A Truly Global & Inclusive Culture</h4>
            <p>Join a diverse team of brilliant minds from over 15 countries. We champion collaboration and believe our collective strength drives innovation.</p>
          </div>
          <div className={styles['benefit-card']} data-aos="zoom-in-up" data-aos-delay="500">
            <div className={styles['icon-wrapper']}>
                <FaLightbulb className={styles.icon} />
            </div>
            <h4>Empowered to Innovate</h4>
            <p>Curiosity is your currency. We provide the autonomy to experiment, explore emerging tech, and pitch groundbreaking ideas. Your voice will be amplified.</p>
          </div>
        </div>
      </section>
      {/* ====== END: Updated Benefits Section ====== */}

      </main>
    </div>
  );
};

export default CareerPage;