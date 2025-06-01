"use client";
import React from "react";
import { Contact } from "../../types";
import styles from "./ContactList.module.css";
import Button from "../Button/Button";

interface Props {
  contacts: Contact[];
  onEdit: (c: Contact) => void;
  onRemove: (email: string) => void;
}

export default function ContactList({ contacts, onEdit, onRemove }: Props) {
  return (
    <div className={styles.contactList}>
      {contacts.length === 0 && (
        <p className={styles.noContacts}>
          Welcome to your contact list! <br />
          <br /> It looks like you don&apos;t have any contacts yet. <br /> You
          can add one by clicking the button in the sidebar.
        </p>
      )}
      {contacts.map((c) => (
        <div key={c.email} className={styles.contactCard}>
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
        </div>
      ))}
    </div>
  );
}
