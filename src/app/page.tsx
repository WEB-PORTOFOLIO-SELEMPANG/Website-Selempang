"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Sample sash products data (Updated with new prices and categories)
const PRODUCTS = [
  {
    id: 1,
    name: "Selempang Samping Satin Ribbon Gold",
    material: "Satin",
    border: "Pita",
    price: 40000,
    image: "/sash_satin_ribbon.jpg",
    description: "Selempang samping dengan bahan Satin Premium warna merah muda (pink) berkilau. Dilengkapi bordir emas presisi tinggi dan list pita satin emas minimalis modern.",
    features: ["Bahan Satin Kilau Premium", "List Pita Satin Emas", "Bordir Rapi", "Model Samping / Bahu"]
  },
  {
    id: 2,
    name: "Selempang Samping Velvet Lace Navy",
    material: "Beludru",
    border: "Renda",
    price: 50000,
    image: "/sash_velvet_lace.jpg",
    description: "Selempang samping bahan Beludru Premium navy blue bertekstur tebal dan lembut. Dilengkapi pinggiran renda rajut klasik emas mewah.",
    features: ["Bahan Beludru Tebal", "List Renda Rajut Klasik", "Bordir Tebal Emas", "Model Samping / Bahu"]
  },
  {
    id: 3,
    name: "Selempang Kalung Beludru List Emas",
    material: "Beludru",
    border: "Pakai List",
    price: 75000,
    image: "/material_velvet.jpg",
    description: "Selempang model kalung (V-Neck) berbahan beludru hitam premium dengan pinggiran list pita mengkilap membingkai seluruh sisi dada.",
    features: ["Model Kalung (V-Neck)", "Bahan Beludru Hitam Pekat", "Bordir Kanan-Kiri Rapi", "Pakai List Pita Emas"]
  },
  {
    id: 4,
    name: "Selempang Kalung Batik Double Beludru",
    material: "Beludru",
    border: "Batik",
    price: 90000,
    image: "/material_satin.jpg",
    description: "Selempang model kalung termewah dengan ornamen batik nusantara serta lapisan ganda double beludru kaku untuk penampilan royal sempurna.",
    features: ["Model Kalung Mewah", "Aksen Batik Premium", "Konstruksi Double Beludru", "Tampilan Sangat Gagah"]
  }
];

// Helper Component for Scroll Reveal animation
function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger animation once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is in view
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("Semua");

  // Calculator State
  const [calcType, setCalcType] = useState("Samping"); // Samping or Kalung
  const [calcMaterial, setCalcMaterial] = useState("Satin");
  const [calcBorder, setCalcBorder] = useState("Pita");
  const [calcLogo, setCalcLogo] = useState(false);
  const [calcExpress, setCalcExpress] = useState(false);
  const [calcKalungModel, setCalcKalungModel] = useState("Tanpa List");

  // Calculate sash price dynamically based on new user pricing structure
  const calculatePrice = () => {
    if (calcType === "Samping") {
      let base = 40000;
      if (calcBorder === "Renda") base += 10000;
      if (calcLogo) base += 10000;
      return base;
    } else {
      // Selempang Kalung
      let base = 75000;
      if (calcKalungModel === "Double Beludru") base = 80000;
      if (calcKalungModel === "Batik Double Beludru") base = 90000;
      if (calcExpress) base += 15000;
      return base;
    }
  };

  // Generate WA custom order link
  const getWhatsAppLink = (isCalc = false) => {
    const phone = "6285741007890"; // WhatsApp number format
    let message = "";
    if (isCalc) {
      if (calcType === "Samping") {
        message = `Halo Dins Selempang, saya ingin memesan Selempang Samping custom dengan rincian:\n\n- Jenis: Selempang Samping\n- Bahan: ${calcMaterial}\n- Pinggiran: ${calcBorder}\n- Custom Logo: ${calcLogo ? "Ya (+Rp 10.000)" : "Tidak"}\n- Estimasi Harga: Rp ${calculatePrice().toLocaleString("id-ID")}\n\nMohon informasi selanjutnya untuk pengisian data nama dan gelar. Terima kasih!`;
      } else {
        message = `Halo Dins Selempang, saya ingin memesan Selempang Kalung custom dengan rincian:\n\n- Jenis: Selempang Kalung (Bahan Beludru)\n- Model: ${calcKalungModel}\n- Waktu Pengerjaan: ${calcExpress ? "Express 1 Hari (+Rp 15.000)" : "Normal (2-3 Hari)"}\n- Estimasi Harga: Rp ${calculatePrice().toLocaleString("id-ID")}\n\nMohon informasi selanjutnya untuk pengisian data nama dan gelar. Terima kasih!`;
      }
    } else {
      message = "Halo Dins Selempang, saya tertarik dengan produk selempang wisuda Anda dan ingin melakukan konsultasi pemesanan.";
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const filteredProducts = activeTab === "Semua"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.material === activeTab);

  return (
    <div className="min-h-screen bg-[#050814] text-zinc-100 font-sans selection:bg-blue-600 selection:text-white scroll-smooth overflow-x-hidden">

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 2. HERO / HOME SECTION - min-h-screen fits hero perfectly */}
        <section id="home" className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center text-center py-16">
          {/* Subtle Solid Blue Backdrop Glow */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] sm:h-[400px] w-[500px] sm:w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/10 blur-[100px] sm:blur-[120px]" />

          <div className="max-w-4xl space-y-6">
            <RevealOnScroll delay={0}>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                Dins Selempang
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-300 font-light md:text-xl leading-relaxed px-2">
                Setiap Perjuangan Layak Dirayakan dengan Selempang Premium untuk Momen Terbaik Anda.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={350}>
              <p className="mx-auto max-w-xl text-xs sm:text-sm text-zinc-400 px-4">
                Visi kami adalah menjadi mitra terbaik dalam merayakan pencapaian penting Anda dengan menghadirkan selempang berkualitas tinggi, bordir presisi, dan estetika yang mewah.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                <a
                  href="#calculator"
                  className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                >
                  Buat Desain & Cek Harga
                </a>
                <a
                  href="#gallery"
                  className="rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-zinc-800"
                >
                  Lihat Galeri
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Quick Badges */}
          <RevealOnScroll delay={700}>
            <div className="mt-12 sm:mt-20 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 w-full max-w-4xl px-2">
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 sm:p-6 backdrop-blur-sm text-center hover:border-zinc-700 transition-colors">
                <div className="text-blue-400 text-2xl sm:text-3xl font-bold mb-1">100%</div>
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Bordir Premium</div>
              </div>
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 sm:p-6 backdrop-blur-sm text-center hover:border-zinc-700 transition-colors">
                <div className="text-blue-400 text-2xl sm:text-3xl font-bold mb-1">Premium</div>
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Satin & Beludru</div>
              </div>
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 sm:p-6 backdrop-blur-sm text-center hover:border-zinc-700 transition-colors">
                <div className="text-blue-400 text-2xl sm:text-3xl font-bold mb-1 font-sans">Cepat</div>
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Bisa Kilat 1 Hari</div>
              </div>
              <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-4 sm:p-6 backdrop-blur-sm text-center hover:border-zinc-700 transition-colors">
                <div className="text-blue-400 text-2xl sm:text-3xl font-bold mb-1 font-sans">Ribu+</div>
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Wisudawan Puas</div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* 3. ABOUT SECTION - Standard block scroll prevents flex centering cutoff */}
        <section id="about" className="relative py-16 md:py-24 border-t border-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <RevealOnScroll delay={0}>
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl tracking-tight leading-tight">
                  Sejak 2021 Menghias Momen Kelulusan Terindah Anda
                </h2>
                <div className="text-zinc-300 text-xs sm:text-sm font-light space-y-4 leading-relaxed">
                  <p>
                    Dins Selempang didirikan pada awal tahun 2021 dengan misi sederhana yaitu memberikan apresiasi tertinggi bagi mereka yang telah berjuang menuntut ilmu atau meraih prestasi terbaik. Kami sadar bahwa selempang bukan sekadar kain, melainkan simbol kebanggaan dan kerja keras bertahun-tahun.
                  </p>
                  <p>
                    Dimulai dari produksi rumahan berskala kecil, kami berkomitmen untuk selalu mempertahankan kualitas jahitan dan kerapian bordir. Berkat kepercayaan ribuan wisudawan, Dins Selempang kini telah tumbuh menjadi produsen selempang andalan bagi mahasiswa di berbagai universitas besar di Indonesia, pageant event, hingga penghargaan instansi.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Detail Presisi</h4>
                      <p className="text-[10px] sm:text-xs text-zinc-400">Bordir rapat dan rapi.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">Lapis Furing</h4>
                      <p className="text-[10px] sm:text-xs text-zinc-400">Jahitan belakang tertutup.</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              {/* Controlled aspect/height for mobile phone screen sizes */}
              <div className="relative w-full h-64 sm:h-80 md:h-auto md:aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                <Image
                  src="/sash_satin_ribbon.jpg"
                  alt="Produk Dins Selempang"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 bg-[#03050d]/70 border border-zinc-800/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl">
                  <p className="text-blue-400 font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">Kualitas Premium Bergaransi</p>
                  <p className="text-zinc-300 text-[10px] sm:text-xs leading-relaxed">Apabila ada kesalahan bordir dari pihak kami, kami ganti baru 100% tanpa biaya tambahan!</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* 4. MATERIALS & BORDERS SECTION */}
        <section id="materials" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl">Bahan Kain & Tipe Pinggiran</h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2">Kami hanya menggunakan bahan kain dan benang berkualitas tinggi untuk menghasilkan selempang yang kokoh, tegak, dan berkilau indah.</p>
            </div>
          </RevealOnScroll>

          {/* Grid of Materials (Satin vs Beludru) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">

            {/* Satin Card */}
            <RevealOnScroll delay={100}>
              <div className="group rounded-3xl bg-zinc-900/30 border border-zinc-800/80 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
                <div className="relative w-full h-48 sm:h-64 md:aspect-[16/9] overflow-hidden rounded-t-3xl bg-[#03050d]">
                  <Image
                    src="/material_satin.jpg"
                    alt="Bahan Satin Premium"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-blue-600 text-white font-bold text-[10px] sm:text-xs uppercase px-2.5 py-1.5 rounded-full">
                    Karakter: Berkilau & Halus
                  </span>
                </div>
                <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-sans">Bahan Satin Premium</h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    Satin memiliki permukaan yang sangat halus, licin, dan memantulkan cahaya dengan indah (glossy). Sangat cocok untuk acara di siang hari maupun malam hari. Memberikan kesan yang modern, ceria, dan formal yang berkelas namun tetap ekonomis.
                  </p>
                  <div className="flex gap-2 flex-wrap pt-1">
                    <span className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md">Ringan & Lembut</span>
                    <span className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md">Banyak Pilihan Warna</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Velvet Card */}
            <RevealOnScroll delay={250}>
              <div className="group rounded-3xl bg-zinc-900/30 border border-zinc-800/80 overflow-hidden hover:border-blue-500/30 transition-all duration-300">
                <div className="relative w-full h-48 sm:h-64 md:aspect-[16/9] overflow-hidden rounded-t-3xl bg-[#03050d]">
                  <Image
                    src="/material_velvet.jpg"
                    alt="Bahan Beludru Premium"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-blue-600 text-white font-bold text-[10px] sm:text-xs uppercase px-2.5 py-1.5 rounded-full">
                    Karakter: Tebal & Matte
                  </span>
                </div>
                <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-sans">Bahan Beludru (Velvet)</h3>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    Beludru memiliki tekstur permukaan yang berbulu halus, tebal, dan menyerap cahaya sehingga memberikan warna yang pekat (matte). Sangat disukai karena memberikan kesan yang luar biasa mewah, formal royal, kokoh saat diselempangkan, dan terlihat sangat menawan di foto.
                  </p>
                  <div className="flex gap-2 flex-wrap pt-1">
                    <span className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md">Tebal & Kokoh</span>
                    <span className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-[10px] px-2.5 py-1 rounded-md">Kesan Sangat Royal</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* List Options / Border Types */}
          <RevealOnScroll delay={350}>
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-3xl">
              <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6 sm:mb-8">Pilihan List / Pinggiran Selempang</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-800">

                {/* Ribbon Border Option */}
                <div className="space-y-3 sm:space-y-4 pb-4 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base sm:text-lg font-bold text-blue-400">List Pita (Ribbon Border)</h4>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    Pinggiran disematkan menggunakan pita satin dengan lebar 1 cm yang mengelilingi seluruh kain selempang. Model ini memberikan garis batas yang tegas, rapi, dan bernuansa minimalis modern. Pilihan paling tepat untuk Anda yang menyukai gaya elegan yang simpel dan modern.
                  </p>
                </div>

                {/* Lace Border Option */}
                <div className="space-y-3 sm:space-y-4 pt-4 md:pt-0 md:pl-8">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base sm:text-lg font-bold text-blue-400">List Renda (Lace Border)</h4>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    Pinggiran dihiasi dengan renda rajut bermotif klasik yang mewah. Renda dipasang melingkari seluruh sisi selempang, memberikan kesan tradisional yang anggun, prestisius, dan megah. Sangat direkomendasikan untuk wisuda universitas negeri atau upacara formal kontes kecantikan.
                  </p>
                </div>

              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* 5. GALLERY / SHOWCASE SECTION */}
        <section id="gallery" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl font-sans">Galeri Selempang Pilihan</h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1">Beberapa hasil produksi nyata dari Dins Selempang.</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-full self-start md:self-auto">
                {["Semua", "Satin", "Beludru"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-wide transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab === "Semua" ? "Semua Bahan" : `Bahan ${tab}`}
                  </button>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Grid Products - Clean, compact grid for fitting many products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product, index) => (
              <RevealOnScroll key={product.id} delay={index * 150}>
                <div className="group flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 h-full">
                  <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-[#03050d]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors font-sans leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-block border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-sans font-medium">
                          Bahan: {product.material}
                        </span>
                        <span className="inline-block border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md font-sans font-medium">
                          List: {product.border}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* 6. PRICE TABLE SECTION (Re-designed with new pricing structures) */}
        <section id="pricing" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl font-sans">Daftar Harga & Model</h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2">Daftar harga selempang berdasarkan jenis model dan bahan. Bebas pilih warna kain & tulisan!</p>
            </div>
          </RevealOnScroll>

          {/* Pricing Grid - 2 Column comparative Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            {/* Selempang Samping Card */}
            <RevealOnScroll delay={0}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8 hover:border-zinc-700 transition-all">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">Selempang Samping (Biasa)</h3>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6">Model selempang wisuda/kontes klasik yang dikenakan menyamping di pundak. Tersedia bahan Satin Premium & Beludru.</p>

                  <div className="space-y-4 border-t border-zinc-800 pt-6">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Bahan Satin / Beludru (Pita)</p>
                        <p className="text-[10px] text-zinc-500">Model polos dengan list pita tepi 1cm</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 40.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Satin / Beludru + Renda</p>
                        <p className="text-[10px] text-zinc-500">Model pinggiran renda rajut klasik mewah</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 50.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Satin / Beludru + Logo</p>
                        <p className="text-[10px] text-zinc-500">Ditambah bordir logo instansi/sekolah berwarna</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 50.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Satin / Beludru + Logo + Renda</p>
                        <p className="text-[10px] text-zinc-500">Model terlengkap & termewah untuk selempang samping</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 60.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Selempang Kalung Card */}
            <RevealOnScroll delay={150}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 sm:p-8 hover:border-zinc-700 transition-all">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">Selempang Kalung (Neck Sash)</h3>
                  </div>
                  <p className="text-xs text-zinc-400 mb-6">Model selempang berbentuk kalung V-neck/U-neck yang menggantung melingkar di leher. Memberikan kesan sangat formal dan royal.</p>

                  <div className="space-y-4 border-t border-zinc-800 pt-6">
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Bahan Beludru (Tanpa List)</p>
                        <p className="text-[10px] text-zinc-500">Bahan beludru tebal polos tanpa jahitan list tepi</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 75.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Bahan Beludru (Pakai List)</p>
                        <p className="text-[10px] text-zinc-500">Bahan beludru tebal dengan border list pita tepi</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 75.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-zinc-800/40 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Beludru + Lapisan (Double Beludru)</p>
                        <p className="text-[10px] text-zinc-500">Dua lapis beludru tebal depan-belakang (kaku & kokoh)</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 80.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 gap-4">
                      <div>
                        <p className="font-semibold text-zinc-300 text-xs sm:text-sm">Beludru + Batik + Lapisan (Double)</p>
                        <p className="text-[10px] text-zinc-500">Variasi aksen batik nusantara dengan double beludru kaku</p>
                      </div>
                      <span className="text-lg font-bold text-white font-sans shrink-0">Rp 90.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Extra options notes */}
          <RevealOnScroll delay={400}>
            <div className="max-w-2xl mx-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-5 sm:p-6 text-center">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">Layanan Tambahan (Optional Add-ons):</h4>
              <div className="text-xs text-zinc-400 flex justify-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <p><strong className="text-zinc-200">Custom Logo Universitas/Sekolah:</strong> +Rp 10.000 / pcs (Bordir berwarna rapi di ujung selempang).</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* INTERACTIVE PRICE CALCULATOR (With Dynamic Type Support) */}
        <section id="calculator" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="max-w-4xl mx-auto bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative">
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/5 blur-3xl rounded-full" />

              <div className="text-center md:text-left mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-sans">Confirm Pesanan Selempang</h2>
                <p className="text-zinc-400 text-xs mt-1 sm:mt-2">Rancang selempang impian Anda secara interaktif dan dapatkan rincian biaya yang tepat.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">

                {/* Calculator Settings */}
                <div className="space-y-5 sm:space-y-6">

                  {/* 1. Select Type */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">1. Pilih Tipe Selempang</label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <button
                        onClick={() => setCalcType("Samping")}
                        className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                          calcType === "Samping"
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
                            : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        Selempang Samping
                      </button>
                      <button
                        onClick={() => setCalcType("Kalung")}
                        className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                          calcType === "Kalung"
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
                            : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        Selempang Kalung
                      </button>
                    </div>
                  </div>

                  {calcType === "Samping" ? (
                    <>
                      {/* 2. Select Material */}
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">2. Pilih Bahan Kain</label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => setCalcMaterial("Satin")}
                            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                              calcMaterial === "Satin"
                                ? "border-blue-500 bg-blue-500/10 text-blue-300"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            Satin
                          </button>
                          <button
                            onClick={() => setCalcMaterial("Beludru")}
                            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                              calcMaterial === "Beludru"
                                ? "border-blue-500 bg-blue-500/10 text-blue-300"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                            }`}
                          >
                            Beludru
                          </button>
                        </div>
                      </div>

                      {/* 3. Select Border */}
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">3. Pilih Model Pinggiran (List)</label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <button
                            onClick={() => setCalcBorder("Pita")}
                            className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                              calcBorder === "Pita"
                                ? "border-blue-500 bg-blue-500/10 text-blue-300"
                                : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        List Pita
                      </button>
                      <button
                        onClick={() => setCalcBorder("Renda")}
                        className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                          calcBorder === "Renda"
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
                            : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        List Renda
                      </button>
                    </div>
                  </div>

                  {/* 4. Add-ons */}
                  <div className="space-y-3">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">4. Layanan Tambahan (Optional)</label>

                    <div className="space-y-2">
                      <label className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 p-3 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={calcLogo}
                          onChange={(e) => setCalcLogo(e.target.checked)}
                          className="rounded border-zinc-700 text-blue-500 focus:ring-blue-500 h-4 w-4 bg-[#03050d]"
                        />
                        <div className="text-xs text-zinc-300 flex-1">
                          <div className="font-semibold text-white">Custom Logo Sekolah/Universitas</div>
                          <div>+Rp 10.000 (Dibordir berwarna)</div>
                        </div>
                      </label>
                    </div>
                  </div>
                    </>
                  ) : (
                    <>
                      {/* 2. Select Kalung Variation */}
                      <div className="space-y-2">
                        <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">2. Pilih Model Selempang Kalung</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { name: "Tanpa List", label: "Beludru Tanpa List (Rp 75.000)" },
                            { name: "Pakai List", label: "Beludru Pakai List (Rp 75.000)" },
                            { name: "Double Beludru", label: "Beludru + Lapisan Ganda (Rp 80.000)" },
                            { name: "Batik Double Beludru", label: "Beludru + Batik + Lapisan Ganda (Rp 90.000)" }
                          ].map((model) => (
                            <button
                              key={model.name}
                              onClick={() => setCalcKalungModel(model.name)}
                              className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex justify-between items-center ${
                                calcKalungModel === model.name
                                  ? "border-blue-500 bg-blue-500/10 text-blue-300"
                                  : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700"
                              }`}
                            >
                              <span>{model.label}</span>
                              {calcKalungModel === model.name && (
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3. Add-ons for Kalung */}
                      <div className="space-y-3">
                        <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">3. Layanan Tambahan (Optional)</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 p-3 rounded-xl cursor-pointer">
                            <input
                              type="checkbox"
                              checked={calcExpress}
                              onChange={(e) => setCalcExpress(e.target.checked)}
                              className="rounded border-zinc-700 text-blue-500 focus:ring-blue-500 h-4 w-4 bg-[#03050d]"
                            />
                            <div className="text-xs text-zinc-300 flex-1">
                              <div className="font-semibold text-white">Pengerjaan Kilat (1 Hari Jadi)</div>
                              <div>+Rp 15.000 (Normal: 2-3 hari)</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                </div>

                {/* Calculator Output */}
                <div className="bg-[#03050d] border border-zinc-800 p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider font-sans">Hasil Rincian & Estimasi</h4>

                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                      {calcType === "Samping" ? (
                        <>
                          <div className="flex justify-between">
                            <span>Selempang Samping ({calcMaterial})</span>
                            <span className="font-semibold text-white font-sans text-right">
                              Rp 40.000
                            </span>
                          </div>
                          {calcBorder === "Renda" && (
                            <div className="flex justify-between text-xs text-zinc-400 font-sans">
                              <span>+ List Renda</span>
                              <span>Rp 10.000</span>
                            </div>
                          )}
                          {calcLogo && (
                            <div className="flex justify-between text-xs text-zinc-400 font-sans">
                              <span>+ Custom Logo</span>
                              <span>Rp 10.000</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span>Selempang Kalung ({calcKalungModel})</span>
                            <span className="font-semibold text-white font-sans text-right">
                              Rp {(calcKalungModel === "Double Beludru" ? 80000 : calcKalungModel === "Batik Double Beludru" ? 90000 : 75000).toLocaleString("id-ID")}
                            </span>
                          </div>
                          {calcExpress && (
                            <div className="flex justify-between text-xs text-zinc-400 text-blue-300 font-sans">
                              <span>+ Pengerjaan Kilat (1 Hari)</span>
                              <span>Rp 15.000</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="border-t border-zinc-800 pt-4 mt-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs sm:text-sm text-zinc-400 font-bold">Total Estimasi:</span>
                        <span className="text-2xl sm:text-3xl font-extrabold text-green-500 font-sans">
                          Rp {calculatePrice().toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <a
                      href={getWhatsAppLink(true)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 transition-all shadow-md shadow-blue-500/10"
                    >
                      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Kirim Pesanan ke WhatsApp
                    </a>
                    <p className="text-[9px] text-zinc-500 text-center mt-2.5 sm:mt-3 leading-relaxed">
                      *Harga di atas adalah estimasi. Rincian final nama/gelar dan logo akan dikonfirmasi kembali oleh admin di chat WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* 7. CONTACT & SOCIALS SECTION */}
        <section id="contact" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl">Pemesanan Mudah Secara Online</h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 sm:mt-3">Silakan hubungi customer service kami atau berbelanja langsung di marketplace resmi kami.</p>
            </div>
          </RevealOnScroll>

          {/* Grid contacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* WhatsApp Contact Card */}
            <RevealOnScroll delay={0}>
              <a
                href="https://wa.me/6285741007890?text=Halo%20Dins%20Selempang,%20saya%20tertarik%20dengan%20produk%20selempang%20wisuda%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 h-full"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-green-500/10 text-green-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-4 sm:mt-6 group-hover:text-green-400 transition-colors font-sans">WhatsApp Chat</h3>
                <p className="text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed font-light font-sans">Konsultasi warna kain, jenis font bordir, dan detail tulisan secara langsung dengan CS kami yang ramah.</p>
                <span className="text-xs font-bold text-green-400 mt-4 sm:mt-6 inline-flex items-center gap-1 group-hover:underline">
                  Chat Sekarang ➔
                </span>
              </a>
            </RevealOnScroll>

            {/* Instagram Contact Card */}
            <RevealOnScroll delay={150}>
              <a
                href="https://www.instagram.com/selempang_pamulang?igsh=bHJ3OGlkajFzeTc0"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 h-full"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 110 12.324 6.162 6.162 0 010-12.324zM12 16a4 4 0 100-8 4 4 0 000 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 sm:mt-6 group-hover:text-blue-400 transition-colors font-sans">Instagram</h3>
                <p className="text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed font-light">Lihat ratusan portofolio terbaru kami, foto testimonial, keseruan wisuda, dan info promo di feeds/story kami.</p>
                <span className="text-xs font-bold text-blue-400 mt-4 sm:mt-6 inline-flex items-center gap-1 group-hover:underline">
                  Ikuti @dins.selempang ➔
                </span>
              </a>
            </RevealOnScroll>

            {/* Shopee Contact Card */}
            <RevealOnScroll delay={300}>
              <a
                href="https://shopee.co.id/dinzselempang"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 h-full"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 sm:mt-6 group-hover:text-orange-400 transition-colors font-sans">Shopee Indonesia</h3>
                <p className="text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed font-light font-sans">Nikmati keamanan bertransaksi dengan sistem Escrow Shopee, subsidi Gratis Ongkir, dan promo Cashback menarik.</p>
                <span className="text-xs font-bold text-orange-400 mt-4 sm:mt-6 inline-flex items-center gap-1 group-hover:underline">
                  Kunjungi Toko ➔
                </span>
              </a>
            </RevealOnScroll>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#0d1527] bg-[#03050d] py-12 mt-20">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-lg font-bold tracking-wider text-blue-400 font-sans">
              DINS SELEMPANG
            </span>
            <p className="text-xs text-zinc-500 font-sans">
              &copy; {new Date().getFullYear()} Dins Selempang. Seluruh hak cipta dilindungi undang-undang.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs text-zinc-400">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-400 transition-colors">Tentang Kami</a>
            <a href="#materials" className="hover:text-blue-400 transition-colors">Bahan & List</a>
            <a href="#gallery" className="hover:text-blue-400 transition-colors">Galeri</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Harga</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
