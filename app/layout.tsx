import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'تمكين | TAMKEEN Contracting',
  description: 'عرض تجريبي لشركة تمكين للمقاولات — من الرؤية إلى الواقع.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
