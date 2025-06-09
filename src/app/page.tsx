"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ContactList from "../components/ContactList/ContactList";
import { Contact } from "../types";
import { getAll, editContact, removeContact } from "../utils/ContactManager";
import styles from "./page.module.css";
import "./globals.css";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import Button from "../components/Button/Button";

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [filteredContact, setFilteredContact] = useState<Contact | null>(null);

  // initial 2.5s loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  // load contacts on mount and whenever storage updates
  useEffect(() => {
    if (!loading) {
      setContacts(getAll());
      const onChange = () => setContacts(getAll());
      window.addEventListener("contactsChanged", onChange);
      return () => window.removeEventListener("contactsChanged", onChange);
    }
  }, [loading]);

  // Adding handler for fetching contact by name
  useEffect(() => {
    function handleShowContactByName(e: CustomEvent) {
      const name = e.detail;
      const found = getAll().find((c) => c.name === name);
      setFilteredContact(found || null);
    }
    window.addEventListener(
      "showContactByName",
      handleShowContactByName as EventListener
    );
    return () =>
      window.removeEventListener(
        "showContactByName",
        handleShowContactByName as EventListener
      );
  }, []);

  const handleEdit = (c: Contact) => {
    setEditingContact(c);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (updated: Contact) => {
    editContact(editingContact?.email || updated.email, updated);
    window.dispatchEvent(new Event("contactsChanged"));
    setEditModalOpen(false);
    setEditingContact(null);
  };

  const handleRemove = (email: string) => {
    removeContact(email);
    window.dispatchEvent(new Event("contactsChanged"));
  };

  // Handler to clear filter (show all contacts)
  const handleClearFilter = () => setFilteredContact(null);

  if (loading) return <LoadingScreen />;

  return (
    <div className={styles.container}>
      <div className={styles.contactList}>
        <ContactList
          contacts={
            filteredContact
              ? filteredContact
                ? [filteredContact]
                : []
              : contacts
          }
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
        {filteredContact && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingTop: "1.5rem",
            }}
          >
            <Button variant="primary" onClick={handleClearFilter}>
              Show all contacts
            </Button>
          </div>
        )}
      </div>
      <Modal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingContact(null);
        }}
        size="large"
      >
        {editingContact && (
          <Form initialData={editingContact} onSubmit={handleEditSubmit} />
        )}
      </Modal>
    </div>
  );
}
