// Data layer for managing contacts in localStorage
import { Contact } from '../types';

const STORAGE_KEY = 'contacts';

// Load the array (or return empty)
function loadContacts(): Contact[] {
  if (typeof window === 'undefined') return [];
  const json = localStorage.getItem(STORAGE_KEY);
  if (!json) return [];
  try {
    return JSON.parse(json) as Contact[];
  } catch {
    return [];
  }
}

// Save the array
function saveContacts(contacts: Contact[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }
}

export function getAll(): Contact[] {
  return loadContacts();
}

export function addContact(contact: Contact): void {
  const list = loadContacts();
  if (list.some((c) => c.email === contact.email)) {
    alert('A contact with that email already exists.');
    return;
  }
  list.push(contact);
  saveContacts(list);
}

export function editContact(email: string, data: Partial<Contact>): void {
  const list = loadContacts();
  const idx = list.findIndex((c) => c.email === email);
  if (idx === -1) {
    alert('Contact not found');
    return;
  }
  list[idx] = { ...list[idx], ...data };
  saveContacts(list);
}

export function removeContact(email: string): void {
  const list = loadContacts().filter((c) => c.email !== email);
  saveContacts(list);
}
