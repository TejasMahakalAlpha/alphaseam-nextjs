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

// --- Dummy Job Data (Replaces API Call) ---
const dummyCareers: CareerJob[] = [
  {
    _id: '1',
    position: 'Senior SAP Consultant',
    location: 'Pune, India',
    experience: '5+ Years',
    description: 'Lead SAP S/4HANA implementation projects, providing expert guidance and solutions to enterprise clients. Strong experience in FI/CO modules required.',
  },
  {
    _id: '2',
    position: 'React Frontend Developer',
    location: 'Remote',
    experience: '3+ Years',
    description: 'Build and maintain modern, responsive user interfaces for our client-facing applications using Next.js and TypeScript. Collaborate with UI/UX designers.',
  },
  {
    _id: '3',
    position: 'Cloud DevOps Engineer',
    location: 'Bengaluru, India',
    experience: '4+ Years',
    description: 'Manage and scale our cloud infrastructure on AWS/Azure. Implement CI/CD pipelines, monitor system performance, and ensure high availability.',
  },
];


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
    // Load static dummy data instead of fetching from an API
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
      if (key === 'message') return; // Message is optional
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

    // --- Backend Logic Removed: Simulating Submission ---
    setIsSubmitting(true);
    showNotification('Submitting your application...', 'success');

    setTimeout(() => {
      setIsSubmitting(false);
      showNotification('Application submitted successfully!', 'success');
      handleCloseForm();
    }, 2000); // Simulate a 2-second network request
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
                <div className={styles['job-card-content']}>
                  <header className={styles['job-header']}>
                    <h3 className={styles['job-title']}>{job.position}</h3>
                    <div className={styles['job-meta']}>
                      <span className={styles['job-tag']}>{job.location}</span>
                      <span className={styles['job-tag']}>{job.experience}</span>
                    </div>
                  </header>
                  <p className={styles['job-description']}>{job.description}</p>
                  <button className={styles['glowing-btn']} onClick={() => handleOpenForm(job)}>
                    Apply Now
                  </button>
                </div>
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
                <div className={styles['input-wrapper']}>
                  <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className={errors.name ? styles.error : ''} required />
                  {errors.name && <span className={styles['error-message']}>{errors.name}</span>}
                </div>
                <div className={styles['input-wrapper']}>
                  <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={errors.email ? styles.error : ''} required />
                  {errors.email && <span className={styles['error-message']}>{errors.email}</span>}
                </div>
                <div className={styles['input-wrapper']}>
                  <input type="tel" name="phone" placeholder="Your Phone (10 digits)" value={formData.phone} onChange={handleChange} className={errors.phone ? styles.error : ''} required />
                  {errors.phone && <span className={styles['error-message']}>{errors.phone}</span>}
                </div>
                <div className={styles['input-wrapper']}>
                  <textarea name="message" placeholder="Your Message (Optional)" rows={4} value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className={styles['input-wrapper']}>
                  <label htmlFor="resume-upload" className={`${styles['resume-label']} ${errors.resume ? styles.error : ''}`}>
                    {formData.resume ? `📄 ${formData.resume.name}` : 'Upload Your Resume (PDF/DOC)'}
                  </label>
                  <input id="resume-upload" type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} style={{ display: 'none' }} required />
                  {errors.resume && <span className={styles['error-message']}>{errors.resume}</span>}
                </div>
                <div className={styles['modal-buttons']}>
                  <button type="submit" className={styles['glowing-btn']} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className={styles['benefits-section']}>
          <h2 className={styles['section-title']} data-aos="fade-up">Why Work With Us?</h2>
          <div className={styles['benefits-grid']}>
            <div className={styles['benefit-card']} data-aos="zoom-in" data-aos-delay="200">
              <FaBriefcase className={styles.icon} />
              <h4>Cutting-Edge Projects</h4>
              <p>Work with the latest SAP technologies for global industry leaders.</p>
            </div>
            <div className={styles['benefit-card']} data-aos="zoom-in" data-aos-delay="300">
              <FaGraduationCap className={styles.icon} />
              <h4>Professional Growth</h4>
              <p>Continuous learning through real-world challenges and certifications.</p>
            </div>
            <div className={styles['benefit-card']} data-aos="zoom-in" data-aos-delay="400">
              <FaGlobe className={styles.icon} />
              <h4>Global Team</h4>
              <p>Collaborate with experts across 15+ countries worldwide.</p>
            </div>
            <div className={styles['benefit-card']} data-aos="zoom-in" data-aos-delay="500">
              <FaLightbulb className={styles.icon} />
              <h4>Culture of Innovation</h4>
              <p>Freedom to try new technologies and build impactful solutions.</p>
            </div>
          </div>
        </section>

        <section className={styles['cta-section']}>
          <div className={styles['cta-container']} data-aos="zoom-in">
            <h3>Can't find your role?</h3>
            <p>We're always looking for exceptional talent. Feel free to submit your resume for future opportunities!</p>
            <button className={`${styles['glowing-btn']} ${styles.large}`} onClick={() => handleOpenForm({ _id: 'general', position: 'General Application', location: 'Any', experience: 'Varies', description: '' })}>
              Submit Resume
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerPage;