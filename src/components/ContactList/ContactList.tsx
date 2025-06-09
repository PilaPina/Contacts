"use client";
import React from "react";
import { Contact } from "../../types";
import styles from "./ContactList.module.css";
import Button from "../Button/Button";
import { motion } from "framer-motion";

interface Props {
  contacts: Contact[];
  onEdit: (c: Contact) => void;
  onRemove: (email: string) => void;
}

export default function ContactList({ contacts, onEdit, onRemove }: Props) {
  return (
    <div className={styles.contactList}>
      {contacts.length === 0 && (
        <div className={styles.noContacts}>
          <div>Welcome to your contact list!</div>
          <div>It looks like you don&apos;t have anything stored here.</div>
          <div>Try adding a contact by clicking the button in the sidebar.</div>
          <div>
            Please note that the contacts that you add here are only stored in
            your browser. That means that if you clear your history or switch
            browsers, you will lose them.
          </div>
        </div>
      )}
      {contacts.map((c) => (
        <motion.div
          key={c.email}
          className={styles.contactCard}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          whileTap={{ scale: 0.97 }}
        >
          <h3>{c.name}</h3>
          <p>{c.email}</p>
          {c.phoneNumber && <p>{c.phoneNumber}</p>}
          {c.address && <p>{c.address}</p>}
          {c.socialMedia && <p>{c.socialMedia}</p>}
          {c.otherInfo && <p>{c.otherInfo}</p>}
          <div className={styles.actions}>
            <Button variant="primary" onClick={() => onEdit(c)}>
              Edit info
            </Button>
            <Button variant="danger" onClick={() => onRemove(c.email)}>
              Remove
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
