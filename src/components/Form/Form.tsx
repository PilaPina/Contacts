"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";
import { Contact } from "../../types";
import Button from "../Button/Button";

interface FormProps {
  children?: React.ReactNode;
  fetchOnly?: boolean;
  onSubmit: (contact: Contact) => void;
  initialData?: Contact;
}

export default function Form({
  fetchOnly = false,
  onSubmit,
  initialData,
}: FormProps) {
  const [form, setForm] = useState<Contact>(
    initialData || {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      socialMedia: "",
      otherInfo: "",
    }
  );

  React.useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fetchOnly) {
      onSubmit({ name: form.name } as Contact); // Fetch only requires name
    } else {
      if (!form.name || !form.email) {
        alert("Name and Email are required");
        return;
      }
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <input
          id="name"
          name="name"
          aria-label="Name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contact name"
          className={styles.formInput}
          required
        />
      </div>
      {!fetchOnly && (
        <div className={styles.formGroup}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@contact.com"
            className={styles.formInput}
            required
          />
        </div>
      )}
      {!fetchOnly && (
        <>
          <div className={styles.formGroup}>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="+354 123 4567"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Home address"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              id="socialMedia"
              name="socialMedia"
              value={form.socialMedia}
              onChange={handleChange}
              placeholder="Social media"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              id="otherInfo"
              name="otherInfo"
              value={form.otherInfo}
              onChange={handleChange}
              placeholder="Other information"
              className={styles.formInput}
            />
          </div>
        </>
      )}
      <Button
        type="submit"
        variant={fetchOnly ? "success" : "primary"}
        aria-label={fetchOnly ? "Fetch contact" : "Submit contact"}
      >
        {fetchOnly ? "Fetch" : "Submit"}
      </Button>
    </form>
  );
}
