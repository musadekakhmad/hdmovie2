// components/About.js
"use client";
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Bagian Banner Hero */}
      {/* Menggunakan rounded-xl dan shadow-2xl untuk efek visual yang menarik */}
      {/* Menambahkan pt-20 untuk jarak dari header */}
      <div className="relative w-full h-48 md:h-64 lg:h-96 overflow-hidden rounded-xl shadow-2xl pt-7">
        <img
          src="https://live.staticflickr.com/65535/54734663743_992c7169cc_b.jpg"
          alt="Libra Sinema Banner"
          className="w-full h-full object-cover object-center rounded-xl"
          // Penanganan kesalahan gambar (fallback)
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/0d1117/2d3138?text=Libra-Sinema';
          }}
        />
        {/* Overlay gradient untuk memastikan teks di atas banner terbaca dengan jelas */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
      </div>
      
      {/* Kontainer Konten Utama */}
      {/* Mengubah padding agar ada jarak di bagian atas dan bawah */}
      <div className="px-4 md:px-8 py-9"> 
        {/* Bagian Tentang Kami */}
        <section className="bg-gray-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          {/* Judul utama dan deskripsi singkat */}
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg mb-2 text-blue-500">
              Libra Sinema: Nonton Film Gratis dan Streaming Serial Tv.
            </h1>
            <p className="text-xl md:text-2xl font-semibold opacity-80 mt-2">
              Hiburan Tanpa Batas dan Berkualitas HD/FHD/4K.
            </p>
          </div>
          
          {/* Bagian Misi dan Visi */}
          <h2 className="text-3xl font-bold text-white mb-6">Misi dan Visi Kami</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Libra Sinema didirikan atas keyakinan sederhana: setiap orang berhak menikmati hiburan berkualitas tinggi tanpa batasan finansial. Di dunia yang dipenuhi layanan berbayar, kami muncul sebagai mercusuar kebebasan, menawarkan perpustakaan film dan serial TV HD yang luas sepenuhnya gratis. Visi kami melampaui sekadar streaming; kami membayangkan sebuah komunitas global di mana para penggemar film dapat terhubung, berbagi, dan merayakan sinema. Kami berkomitmen untuk mempertahankan platform yang ramah pengguna, bebas dari iklan yang mengganggu, dan terus diperbarui dengan konten segar dari seluruh dunia. Misi kami adalah untuk mengubah lanskap hiburan digital, menjadikannya lebih inklusif dan dapat diakses oleh semua orang, di mana pun mereka berada.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Sejak awal, kami telah fokus pada penyediaan pengalaman menonton yang mulus. Algoritma streaming kami dioptimalkan untuk memastikan pemutaran instan, tanpa buffering yang mengganggu, bahkan pada koneksi yang lebih lambat. Kami memahami bahwa detail terkecil pun penting, dan itulah mengapa kami berinvestasi dalam infrastruktur yang menjamin kualitas HD yang tajam dan audio yang jernih. Kami bangga dengan teknologi kami, tetapi kami lebih bangga dengan dampak yang diberikannya—membawa senyum ke jutaan wajah di seluruh dunia dengan memungkinkan mereka untuk menikmati film favorit mereka tanpa kekhawatiran biaya.
          </p>

          {/* Bagian Perpustakaan Konten */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Perpustakaan Konten yang Luas</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Perpustakaan Libra Sinema adalah bukti dari hasrat kami terhadap sinema. Kami secara teliti mengkurasi koleksi kami untuk menawarkan berbagai genre yang tak tertandingi, melayani setiap selera dan suasana hati. Apakah Anda mencari ketegangan film horor, tawa riang komedi romantis, aksi mendebarkan, atau narasi kompleks dari drama, kami punya semuanya. Koleksi kami meliputi film-film klasik Hollywood, permata independen yang tersembunyi, dan sensasi internasional yang sedang tren. Kami percaya bahwa keragaman adalah kunci, dan perpustakaan kami mencerminkan komitmen itu, menawarkan konten dari setiap sudut dunia.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Setiap film dan serial TV dilengkapi dengan deskripsi yang mendalam, informasi pemeran dan kru, trailer, dan rating dari penonton. Kami ingin Anda membuat keputusan yang tepat tentang apa yang akan ditonton berikutnya. Fitur-fitur ini tidak hanya meningkatkan pengalaman menonton tetapi juga memberdayakan Anda untuk menjelajahi genre dan sutradara baru. Kami terus-menerus menambahkan judul-judul baru ke koleksi kami, memastikan selalu ada sesuatu yang baru dan menarik untuk ditemukan.
          </p>

          {/* Bagian Komunitas Kami */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Komunitas Kami</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Libra Sinema lebih dari sekadar platform streaming; ini adalah komunitas yang berkembang. Kami mendorong pengguna kami untuk berinteraksi dengan berbagi ulasan, rekomendasi, dan teori tentang film favorit mereka. Platform kami menyediakan ruang yang aman dan suportif bagi para penggemar film untuk terhubung, bertukar pikiran, dan membentuk hubungan yang bermakna. Kami secara aktif mendengarkan masukan dari komunitas kami dan menggunakannya untuk memandu keputusan kami tentang fitur baru dan konten yang akan ditambahkan.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Kami mengadakan acara-acara virtual, seperti malam film dan diskusi, untuk lebih memperkuat komunitas kami. Ini adalah kesempatan bagi anggota kami untuk berkumpul dan merayakan kecintaan bersama terhadap sinema. Partisipasi Anda sangat penting bagi kami, dan kami berterima kasih kepada setiap orang yang telah memilih untuk menjadi bagian dari perjalanan kami.
          </p>
          
          {/* Bagian Teknologi */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Teknologi di Balik Layar</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Teknologi yang mendukung Libra Sinema adalah keajaiban yang berfokus pada pengguna. Kami menggunakan jaringan pengiriman konten (CDN) yang canggih untuk memastikan bahwa film Anda di-streaming dari server terdekat, mengurangi latensi dan memastikan pemutaran tanpa gangguan. Infrastruktur kami dibangun untuk menahan lonjakan lalu lintas yang besar, memastikan bahwa Anda selalu mendapatkan layanan terbaik, tidak peduli berapa banyak orang lain yang menonton.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Selain itu, kami berinvestasi dalam langkah-langkah keamanan yang ketat untuk melindungi data pengguna dan memastikan lingkungan yang aman. Kami tidak mengumpulkan informasi pribadi yang tidak perlu, dan kami berkomitmen pada transparansi penuh tentang bagaimana data Anda digunakan. Privasi Anda adalah prioritas utama kami.
          </p>

          {/* Bagian Perkembangan Masa Depan */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Perkembangan Masa Depan</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Kami tidak berpuas diri. Tim kami terus mengeksplorasi teknologi baru dan ide-ide inovatif untuk meningkatkan pengalaman Libra Sinema. Rencana masa depan kami meliputi implementasi fitur yang didukung AI untuk rekomendasi yang lebih personal, integrasi dengan media sosial untuk berbagi yang mulus, dan perpustakaan konten eksklusif yang terus berkembang. Kami juga berencana untuk memperluas dukungan bahasa kami, menjadikan Libra Sinema dapat diakses oleh audiens global yang lebih luas.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Setiap langkah yang kami ambil didorong oleh dedikasi kami untuk memberikan pengalaman hiburan terbaik secara gratis. Kami menghargai dukungan Anda dan mengundang Anda untuk mengikuti kami dalam perjalanan yang mendebarkan ini. Libra Sinema adalah bukti dari kekuatan komunitas dan hasrat bersama terhadap sinema. Terima kasih telah menjadi bagian dari keluarga besar kami.
          </p>

          {/* Bagian Tim Kami - Tambahan */}
          <h2 className="text-3xl font-bold text-white mb-6 mt-8">Tim Kami</h2>
          <p className="text-gray-300 text-justify leading-relaxed">
            Di balik layar Libra Sinema, ada tim individu yang bersemangat yang bekerja tanpa lelah untuk menghidupkan visi kami. Dari pengembang yang mengoptimalkan pengalaman streaming Anda hingga kurator konten yang menemukan permata tersembunyi, setiap anggota tim berkomitmen pada keunggulan. Kami adalah sekelompok penggemar film dan serial TV yang berdedikasi untuk berbagi cinta kami pada sinema dengan dunia.
          </p>
          <p className="mt-4 text-gray-300 text-justify leading-relaxed">
            Kami percaya bahwa tim yang kuat dibangun di atas kolaborasi dan saling menghormati. Kami mendorong kreativitas, inovasi, dan komunikasi terbuka, memastikan bahwa setiap ide didengar. Tim kami adalah keluarga kami, dan semangat itu tercermin dalam setiap aspek platform yang kami bangun.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
