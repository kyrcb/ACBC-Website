"use client";

import { useState } from "react";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";

type FormState = {
  fullName: string;
  email: string;
  contactNumber: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  contactNumber: "",
  message: "",
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }
  if (!form.email.trim() || !validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (
    form.contactNumber.trim() &&
    !/^[\d\s\+\-\(\)]{7,}$/.test(form.contactNumber)
  ) {
    errors.contactNumber = "Please enter a valid contact number.";
  }
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  return errors;
}

const inputBase =
  "w-full font-sans text-sm text-gray-700 border border-gray-300 px-4 py-3 rounded-none bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all";
const labelBase =
  "block font-sans text-xs uppercase tracking-widest text-gray-400 mb-1";
const errorBase = "font-sans text-xs text-red-600 mt-1";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setForm(EMPTY_FORM);
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-12 border-t-2 border-gold-500 mx-auto mb-6" />
        <h3 className="font-serif text-2xl font-semibold text-navy-700 mb-3">
          Thank You
        </h3>
        <p className="font-sans text-gray-700 leading-relaxed max-w-prose mx-auto">
          Your message has been received. We will get back to you as soon as
          possible. May God bless you.
        </p>
        <button
          className="mt-8 font-sans text-sm text-gray-400 hover:text-navy-700 underline underline-offset-2 transition-colors"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy-700 mb-4">
        Send a Message
      </h2>
      <Divider className="mb-8" />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelBase}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            className={`${inputBase} ${errors.fullName ? "border-red-500" : ""}`}
            placeholder="Juan dela Cruz"
          />
          {errors.fullName && (
            <p className={errorBase}>{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelBase}>
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={`${inputBase} ${errors.email ? "border-red-500" : ""}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className={errorBase}>{errors.email}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label htmlFor="contactNumber" className={labelBase}>
            Contact Number
            <span className="ml-1 normal-case text-gray-400">(optional)</span>
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            autoComplete="tel"
            value={form.contactNumber}
            onChange={handleChange}
            className={`${inputBase} ${errors.contactNumber ? "border-red-500" : ""}`}
            placeholder="+63 9XX XXX XXXX"
          />
          {errors.contactNumber && (
            <p className={errorBase}>{errors.contactNumber}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelBase}>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className={`${inputBase} resize-y ${errors.message ? "border-red-500" : ""}`}
            placeholder="Your message..."
          />
          {errors.message && (
            <p className={errorBase}>{errors.message}</p>
          )}
        </div>

        <div>
          <Button type="submit" variant="primary">
            Submit Message
          </Button>
        </div>
      </form>
    </div>
  );
}
