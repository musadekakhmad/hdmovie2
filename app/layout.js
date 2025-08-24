// ---------------------------------------------------------------- //
// Nama File: app/layout.js
// Fungsi: Merupakan layout utama untuk seluruh halaman web,
//         digunakan untuk mengatur elemen-elemen yang tampil
//         di semua halaman, seperti header, footer, dan lebar konten.
// ---------------------------------------------------------------- //

import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdsterraLayoutWrapper from '../components/AdsterraLayoutWrapper'; 
// Menghapus import 'video.js/dist/video-js.css'; dari sini

export const metadata = {
  // Mengubah judul dan deskripsi ke bahasa Indonesia
  title: 'Libra Sinema | Nonton Film Gratis dan Streaming Serial Tv',
  description: 'Tujuan utama Anda untuk streaming film dan acara TV gratis berkualitas tinggi.',
  // Menambahkan tag verifikasi di sini untuk Next.js 13+
  verification: {
    google: 'Op253moeSLgz53Zc2b4oZ0oc088akfDPrQLeRsQA008',
  // Meta tag Open Graph untuk Facebook
  openGraph: {
    title: 'Libra Sinema | Nonton Film Gratis dan Streaming Serial Tv',
    description: 'Tujuan utama Anda untuk streaming film dan acara TV gratis berkualitas tinggi.',
    url: 'https://LibraSinema.netlify.app/',
    siteName: 'Libra Sinema',
    images: [
      {
        url: 'https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg',
        width: 1200,
        height: 630,
        alt: 'Libra Sinema',
      },
    ],
    // Mengubah locale ke Indonesia
    locale: 'id_ID',
    type: 'website',
    // Properti khusus untuk Facebook, 'og:app_id'
    appId: 'librasinema',
  },
  // Meta tag Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@WatchStream123', // User Twitter Anda
    creator: '@WatchStream123',
    // Mengubah judul dan deskripsi ke bahasa Indonesia
    title: 'Libra Sinema | Nonton Film Gratis dan Streaming Serial Tv',
    description: 'Tujuan utama Anda untuk streaming film dan acara TV gratis berkualitas tinggi.',
    images: ['https://live.staticflickr.com/65535/54707174696_49edde76e3_b.jpg'], // Ganti dengan URL gambar yang sesuai
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
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
