import { AuthProvider } from "../context/authContext";
import "./globals.css";
import AuthRedirect from "@/components/AuthRedirect";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>
          <AuthProvider>
            <AuthRedirect>{children}</AuthRedirect>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}