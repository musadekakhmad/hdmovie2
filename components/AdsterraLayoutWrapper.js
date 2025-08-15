"use client";

import { useEffect } from 'react';
import { handleAdsterraClick } from '../utils/adsterra';

// Component khusus untuk menangani klik secara global
export default function AdsterraLayoutWrapper({ children }) {
  useEffect(() => {
    // Fungsi untuk memanggil logika adsterra saat ada klik di mana saja
    const handleClick = (e) => {
      // Kita perlu membuat dummy targetUrl karena logika handleAdsterraClick memerlukannya
      // Dalam kasus ini, kita bisa menggunakan URL halaman saat ini.
      const targetUrl = window.location.href;
      handleAdsterraClick(e, targetUrl);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
}
