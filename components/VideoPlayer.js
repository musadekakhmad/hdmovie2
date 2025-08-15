'use client';

import React from 'react';

/**
 * Komponen React untuk memutar video menggunakan elemen <video> HTML5 native.
 * Ini adalah alternatif yang lebih ringan dan andal dari video.js.
 * @param {string} videoUrl - URL video yang akan diputar.
 */
function VideoPlayer({ videoUrl }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
      {/*
        Elemen video HTML5 native. Atribut 'controls' menyediakan kontrol pemutaran
        bawaan browser. 'autoPlay' memastikan video dimulai secara otomatis.
        'w-full' dan 'h-full' memastikan video mengisi container-nya.
      */}
      <video
        className="w-full h-full object-cover"
        src={videoUrl}
        controls
        autoPlay
        preload="auto"
        // Tambahkan fallback jika browser tidak mendukung tag video
        onError={(e) => console.error("Error loading video:", e)}
      >
        Browser Anda tidak mendukung tag video.
      </video>
    </div>
  );
}

export default VideoPlayer;
