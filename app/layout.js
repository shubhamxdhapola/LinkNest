import { Toaster } from "sonner";
import "./globals.css";
import { LinkNestProvider } from "@/context/LinkNestContext";
import ThemeSetter from "@/components/ThemeSetter";

export const metadata = {
  title: "LinkNest",
  description:
    "This is a link sharing site where a user can share all his social media and other links at one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" webcrx="">
      <body className="dark">
        <LinkNestProvider>
          <ThemeSetter />
          <Toaster position="top-center" />
          {children}
        </LinkNestProvider>
      </body>
    </html>
  );
}
