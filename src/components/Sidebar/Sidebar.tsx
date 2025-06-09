"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, UserPlus, Search } from "lucide-react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import styles from "./Sidebar.module.css";
import Button from "../Button/Button";
import { addContact } from "../../utils/ContactManager";
import { Contact } from "../../types";

export default function Sidebar() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showGet, setShowGet] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAdd = (c: Contact) => {
    addContact(c); // writes to localStorage
    window.dispatchEvent(
      // ← signal “hey, contacts changed!”
      new Event("contactsChanged")
    );
    setShowAdd(false);
  };

  const handleGet = (name: string) => {
    window.dispatchEvent(
      new CustomEvent("showContactByName", { detail: name })
    );
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
