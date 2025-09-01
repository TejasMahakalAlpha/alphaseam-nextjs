"use client";

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import styles from "./contact.module.css";
import {
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// --- Type Definitions ---
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const contactFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: "ease-in-out" });
  }, []);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 4000);
  };

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value)
          return `${name === "firstName" ? "First" : "Last"} name is required.`;
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Name can only contain letters.";
        break;
      case "email":
        if (!value) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Please enter a valid email address.";
        break;
      case "phone":
        if (!value) return "Phone number is required.";
        if (!/^\d{10}$/.test(value))
          return "Phone number must be exactly 10 digits.";
        break;
      case "message":
        if (!value) return "Message is required.";
        break;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // --- FIXED 'let' vs 'const' ERROR HERE ---
    const { name } = e.target;
    let value = e.target.value;

    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: FormErrors = {};
    let formIsValid = true;
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      showNotification("Please fix the errors before submitting.", "error");
      return;
    }
    
    setIsSubmitting(true);
    showNotification("Sending your message...", "success");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("Message sent successfully!", "success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        setErrors({});
      } else {
        showNotification("Failed to send message. Please try again later.", "error");
      }
    } catch (error) {
      showNotification("An error occurred. Please try again later.", "error");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["contact-page"]}>
      <Head>
        <title>Contact Us | Alphaseam</title>
        <meta
          name="description"
          content="Get in touch with Alphaseam for inquiries, support, or to discuss your next project."
        />
      </Head>

      {notification.show && (
        <div
          className={`${styles["notification-toast"]} ${
            styles[notification.type]
          } ${notification.show ? styles.show : ""}`}
        >
          {notification.type === "success" ? (
            <FaCheckCircle />
          ) : (
            <FaExclamationCircle />
          )}
          {notification.message}
        </div>
      )}

      <section className={styles["contact-hero-section"]} data-aos="fade-in">
        <h1>Get In Touch</h1>
        {/* --- FIXED APOSTROPHE ERROR HERE --- */}
        <p>
          We&apos;re here to answer any question you might have. We look forward to
          hearing from you.
        </p>
      </section>

      <main className={styles["contact-content-wrapper"]}>
        <div className={styles["contact-grid"]}>
          <article
            className={styles["contact-details-card"]}
            data-aos="fade-right"
          >
            <h3>Contact Information</h3>
            <p>
              Fill up the form and our team will get back to you within 24
              hours.
            </p>
            <ul>
              <li>
                <FaPhoneAlt className={styles["contact-icon"]} />{" "}
                <a href="tel:+917387182811">+91-7387182811</a>
              </li>
              <li>
                <FaEnvelope className={styles["contact-icon"]} />{" "}
                <a href="mailto:info@alphaseam.com">info@alphaseam.com</a>
              </li>
              <li>
                <FaMapMarkerAlt className={styles["contact-icon"]} />{" "}
                <span>Address:-306, City centre, phase 1 road behind persistent, Hinjwadi pimpri chinchwad Maharashtra 411057</span>
              </li>
            </ul>
            <div className={styles["social-icons-wrapper"]}>
              <a
                href="https://www.linkedin.com/company/alphaseam-enterprises-llp/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["social-icon"]}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </article>

          <div
            className={styles["contact-form-card"]}
            ref={contactFormRef}
            data-aos="fade-left"
          >
            <form
              onSubmit={handleSubmit}
              className={styles["contact-form-content"]}
              noValidate
            >
              <div className={styles["form-row"]}>
                <div className={styles["input-wrapper"]}>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className={errors.firstName ? styles.error : ""} />
                  {errors.firstName && (<span className={styles["error-message"]}>{errors.firstName}</span>)}
                </div>
                <div className={styles["input-wrapper"]}>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={errors.lastName ? styles.error : ""} />
                  {errors.lastName && (<span className={styles["error-message"]}>{errors.lastName}</span>)}
                </div>
              </div>
              <div className={styles["input-wrapper"]}>
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className={errors.email ? styles.error : ""} />
                {errors.email && (<span className={styles["error-message"]}>{errors.email}</span>)}
              </div>
              <div className={styles["input-wrapper"]}>
                <input type="tel" name="phone" placeholder="Your Phone Number (10 digits)" value={formData.phone} onChange={handleChange} className={errors.phone ? styles.error : ""} maxLength={10} />
                {errors.phone && (<span className={styles["error-message"]}>{errors.phone}</span>)}
              </div>
              <div className={styles["input-wrapper"]}>
                <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} className={errors.message ? styles.error : ""} />
                {errors.message && (<span className={styles["error-message"]}>{errors.message}</span>)}
              </div>
              <button type="submit" className={styles["glowing-btn"]} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <section
          className={styles["map-section"]}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <iframe
            title="Google Map Location of Alphaseam in Hinjawadi, Pune"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27378.14190882272!2d73.70038427431642!3d18.586254599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbe7af9b56b1%3A0x7c1c86b796e12483!2sCity%20Centre%20-%20Kolte%20Patil!5e1!3m2!1sen!2sin!4v1756448329016!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;