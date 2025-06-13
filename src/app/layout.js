import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ModalProvider } from '@/context/ModalContext';
import { RoutineProvider } from '@/context/RoutineContext';
import { NewRoutineModal } from '@/components/modals/NewRoutineModal';

export const metadata = {
  title: 'Alamo Teste',
  description: 'Teste Alamo dev frontend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={` antialiased`}>
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
