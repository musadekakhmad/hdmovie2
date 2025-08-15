import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper'; // Impor komponen wrapper baru
// Menghapus import 'video.js/dist/video-js.css'; dari sini

export const metadata = {
  title: 'Estrenoya | Free HD Movie & TV Show Streaming',
  description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
  // Meta tag Open Graph untuk Facebook
  openGraph: {
    title: 'Estrenoya | Free HD Movie & TV Show Streaming',
    description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
    url: 'https://estrenoya.netlify.app/',
    siteName: 'Estrenoya',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Estrenoya',
      },
    ],
    locale: 'en_US',
    type: 'website',
    // Properti khusus untuk Facebook, 'og:app_id'
    appId: 'librasinema',
  },
  // Meta tag Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123', // User Twitter Anda
    creator: '@WatchStream123',
    title: 'Estrenoya | Free HD Movie & TV Show Streaming',
    description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
    images: ['https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg'], // Ganti dengan URL gambar yang sesuai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* AdsterraLayoutWrapper membungkus children (semua konten halaman) */}
        <AdsterraLayoutWrapper>
          {children}
        </AdsterraLayoutWrapper>
        <Footer />
      </body>
    </html>
  );
}
