import "./globals.css";
import styles from "./page.module.css";
import { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

export const metadata = {
  title: "Contact List",
  description: "Create, edit, and manage your contacts easily",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles["main-content"]}>{children}</main>
        </div>
      </body>
    </html>
  );
}
