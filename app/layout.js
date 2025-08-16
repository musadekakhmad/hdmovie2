// ---------------------------------------------------------------- //
// Nama File: app/layout.js
// Fungsi: Merupakan layout utama untuk seluruh halaman web,
//         digunakan untuk mengatur elemen-elemen yang tampil
//         di semua halaman, seperti header, footer, dan lebar konten.
// ---------------------------------------------------------------- //

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper'; // Impor komponen wrapper baru
// Menghapus import 'video.js/dist/video-js.css'; dari sini

export const metadata = {
  title: 'Estreno Ya | Free HD Movie & TV Show Streaming',
  description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
  // Meta tag Open Graph untuk Facebook
  openGraph: {
    title: 'Estreno Ya | Free HD Movie & TV Show Streaming',
    description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
    url: 'https://estrenoya.netlify.app/',
    siteName: 'Estreno Ya',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Estreno Ya',
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
    title: 'Cineflix | Free HD Movie & TV Show Streaming',
    description: 'Your ultimate destination for high-quality, free movie and TV show streaming..',
    images: ['https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg'], // Ganti dengan URL gambar yang sesuai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Menambahkan suppressHydrationWarning untuk mengatasi hydration error. */}
      {/* Ini sering terjadi saat ada script pihak ketiga atau ekstensi browser yang memodifikasi tag body. */}
      <body suppressHydrationWarning={true}>
        <AdsterraLayoutWrapper>
          {/* Kontainer utama dengan lebar maksimum */}
          {/* Memindahkan Header, konten, dan Footer ke dalam kontainer ini */}
          <div className="mx-auto max-w-7xl">
            <Header />
            {children}
            <Footer />
          </div>
        </AdsterraLayoutWrapper>
      </body>
    </html>
  );
}
