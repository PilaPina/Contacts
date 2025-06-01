"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, UserPlus, Search } from "lucide-react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import styles from "./Sidebar.module.css";
import { Contact } from "../../types";
import { addContact, getAll } from "../../utils/ContactManager";
import Button from "../Button/Button";

export default function Sidebar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showGet, setShowGet] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setContacts(getAll());
  }, []);

  const handleAdd = (c: Contact) => {
    addContact(c); // writes to localStorage
    window.dispatchEvent(
      // ← signal “hey, contacts changed!”
      new Event("contactsChanged")
    );
    setContacts(getAll());
    setShowAdd(false);
  };

  const handleGet = (name: string) => {
    const c = contacts.find((x) => x.name === name);
    if (c) alert(JSON.stringify(c, null, 2));
    else alert("Contact not found"); //TODO: remove alert and create better error handling
    setShowGet(false);
  };

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>
        <h1 className={styles.title}>C O N T A C T S !</h1>
      </header>
      <nav className={styles.nav}>
        <Button onClick={() => setShowAdd(true)}>
          <UserPlus size={16} />
          <span className={styles.btnText}> New Contact</span>
        </Button>
        <Button onClick={() => setShowGet(true)}>
          <Search size={16} />
          <span className={styles.btnText}> Get Contact</span>
        </Button>
      </nav>
      <footer className={styles.footer}>
        <Button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          <span className={styles.btnText}>
            {theme === "light" ? " Dark Mode" : " Light Mode"}
          </span>
        </Button>
      </footer>
      <Modal open={showAdd} onClose={() => setShowAdd(false)} size="large">
        <Form onSubmit={handleAdd} />
      </Modal>
      <Modal open={showGet} onClose={() => setShowGet(false)} size="large">
        <Form fetchOnly onSubmit={(e) => handleGet(e.name)} />
      </Modal>
    </aside>
  );
}
