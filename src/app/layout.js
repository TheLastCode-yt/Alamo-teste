import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModalProvider } from '@/context/ModalContext';
import { RoutineProvider } from '@/context/RoutineContext';
import { NewRoutineModal } from '@/components/modals/NewRoutineModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Management App',
  description: 'Personal management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <RoutineProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1">
                <SidebarTrigger />
                {children}
              </main>

              {/* Global Modals */}
              <NewRoutineModal />
            </SidebarProvider>
          </RoutineProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
