import React, { useState, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import emailjs from "@emailjs/browser";
import "./ContactFormPopup.css";

const ContactFormPopup = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Cấu hình email
  const emailConfig = useMemo(
    () => ({
      serviceId: import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    }),
    [],
  );

  // Xử lý thay đổi
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (error) setError(""); // Xóa lỗi khi người dùng nhập
    },
    [error],
  );

  // Hàm reset form
  const resetForm = useCallback(() => {
    setForm({ name: "", email: "", message: "" });
    setSending(false);
    setSent(false);
    setError("");
  }, []);

  // Xử lý validation
  const validateForm = useCallback((formData) => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      return "Please fill in all required fields.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters long.";
    }
    return null;
  }, []);

  // Xử lý submit
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Xử lý validation
      const validationError = validateForm(form);
      if (validationError) {
        setError(validationError);
        return;
      }

      setSending(true);
      setError("");
      setSent(false);

      try {
        const emailData = {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          time: new Date().toLocaleString(),
          title: "Contact Form Submission",
        };

        const result = await Promise.race([
          emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            emailData,
            emailConfig.publicKey,
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("TIMEOUT")), 10000),
          ),
        ]);

        console.log("Email sent successfully:", result.text);
        setSent(true);
        setForm({ name: "", email: "", message: "" });

        // Đóng sau khi thành công
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } catch (err) {
        console.error("Error sending email:", err);
        const errorMessage =
          err.message === "TIMEOUT"
            ? "Request timeout. Please check your connection and try again."
            : `Email sending failed: ${err.message || "Unknown error"}. Please try again.`;
        setError(errorMessage);
      } finally {
        setSending(false);
      }
    },
    [form, emailConfig, validateForm, onClose, resetForm],
  );

  // Xử lý đóng popup
  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  if (!isOpen) return null;

  const popupContent = (
    <div className="popup-contact" onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup-close"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="popup-header">
          <h2>GET IN TOUCH</h2>
        </div>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              disabled={sending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="david@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
              disabled={sending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your question</label>
            <textarea
              id="message"
              name="message"
              placeholder="Ask me anything!"
              value={form.message}
              onChange={handleChange}
              required
              disabled={sending}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={sending}>
            {sending ? (
              <>
                <div className="spinner" aria-hidden="true"></div>
                Đang gửi...
              </>
            ) : (
              "Send"
            )}
          </button>

          {sent && (
            <div className="success-msg" role="alert">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Sent successfully!
            </div>
          )}

          {error && (
            <div className="error-msg" role="alert">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="9"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="9"
                  x2="15"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  // Render popup using Portal
  return createPortal(popupContent, document.getElementById("popup-portal"));
};

export default ContactFormPopup;
