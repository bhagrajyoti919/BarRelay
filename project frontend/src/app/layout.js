import GlobalNavbar from '../components/GlobalNavbar';
import './globals.css';

export const metadata = {
  title: 'SpiritsDelivered - Alcohol Delivery',
  description: 'Fast delivery of beer, wine, and spirits.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
