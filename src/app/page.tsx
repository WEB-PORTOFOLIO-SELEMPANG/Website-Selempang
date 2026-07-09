"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Sample sash products data
const PRODUCTS = [
  {
    id: 1,
    name: "Selempang Satin Ribbon Gold",
    material: "Satin",
    border: "Pita",
    price: 35000,
    image: "/sash_satin_ribbon.jpg",
    description: "Selempang dengan bahan Satin Premium warna merah muda (pink) yang berkilau anggun. Dilengkapi bordir emas yang presisi tinggi dan border pita (ribbon) satin emas yang minimalis modern.",
    features: ["Bahan Satin Kilau Mewah", "Border Pita Emas", "Bordir Rapi", "Satu Lapis Kain (Tanpa Furing)"]
  },
  {
    id: 2,
    name: "Selempang Velvet Lace Royal Blue",
    material: "Beludru",
    border: "Renda",
    price: 60000,
    image: "/sash_velvet_lace.jpg",
    description: "Selempang Beludru Mewah berwarna biru dongker (navy blue) bertekstur tebal dan lembut. Dilengkapi border renda (lace) emas klasik berornamen mewah serta penutup furing belakang agar benang bordir tidak terlihat.",
    features: ["Bahan Beludru Tebal Premium", "Border Renda Klasik Emas", "Bordir Tebal", "Double Layer dengan Furing Belakang"]
  },
  {
    id: 3,
    name: "Selempang Satin Lace Gold Black",
    material: "Satin",
    border: "Renda",
    price: 45000,
    image: "/material_satin.jpg",
    description: "Sash satin premium dengan sentuhan renda emas berornamen klasik. Memberikan kombinasi kilauan satin yang elegan dipadu dengan detail pinggiran renda yang megah.",
    features: ["Bahan Satin Mengkilap", "Border Renda Klasik", "Custom Nama/Gelar", "Double Layer dengan Furing"]
  },
  {
    id: 4,
    name: "Selempang Velvet Ribbon Emerald",
    material: "Beludru",
    border: "Pita",
    price: 50000,
    image: "/material_velvet.jpg",
    description: "Selempang beludru hitam pekat dengan border pita minimalis. Tekstur beludru yang menyerap cahaya dipadu dengan pita mengkilap memberikan kontras yang sangat premium dan modern.",
    features: ["Bahan Beludru Premium", "Border Pita Satin", "Tulisan Bordir Kontras", "Satu Lapis Kain"]
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
  const [calcMaterial, setCalcMaterial] = useState("Satin");
  const [calcBorder, setCalcBorder] = useState("Pita");
  const [calcLogo, setCalcLogo] = useState(false);
  const [calcDoubleLayer, setCalcDoubleLayer] = useState(false);
  const [calcExpress, setCalcExpress] = useState(false);

  // Calculate sash price dynamically
  const calculatePrice = () => {
    let base = 0;
    if (calcMaterial === "Satin") {
      base = calcBorder === "Pita" ? 35000 : 45000;
    } else {
      // Beludru
      base = calcBorder === "Pita" ? 50000 : 60000;
    }

    if (calcLogo) base += 10000;
    if (calcDoubleLayer) base += 10000;
    if (calcExpress) base += 15000;

    return base;
  };

  // Generate WA custom order link
  const getWhatsAppLink = (isCalc = false) => {
    const phone = "6285741007890"; // WhatsApp number format
    let message = "";
    if (isCalc) {
      message = `Halo Dins Selempang, saya ingin memesan selempang custom dengan rincian:\n\n- Bahan: ${calcMaterial}\n- Pinggiran: ${calcBorder}\n- Custom Logo: ${calcLogo ? "Ya (+Rp 10.000)" : "Tidak"}\n- Lapis Furing Belakang: ${calcDoubleLayer ? "Ya (+Rp 10.000)" : "Tidak"}\n- Waktu Pengerjaan: ${calcExpress ? "Express 1 Hari (+Rp 15.000)" : "Normal (2-3 Hari)"}\n- Estimasi Harga: Rp ${calculatePrice().toLocaleString("id-ID")}\n\nMohon informasi selanjutnya untuk pengisian data nama dan gelar. Terima kasih!`;
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
                &ldquo;Mengukir Prestasi, Merayakan Dedikasi — Selempang Premium untuk Momen Spesial Anda.&rdquo;
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
                <div className="text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Bordir</div>
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
                  Sejak 2019 Menghias Momen Kelulusan Terindah Anda
                </h2>
                <div className="text-zinc-300 text-xs sm:text-sm font-light space-y-4 leading-relaxed">
                  <p>
                    Dins Selempang didirikan pada awal tahun 2019 dengan misi sederhana: memberikan apresiasi tertinggi bagi mereka yang telah berjuang menuntut ilmu atau meraih prestasi terbaik. Kami sadar bahwa selempang bukan sekadar kain, melainkan simbol kebanggaan dan kerja keras bertahun-tahun.
                  </p>
                  <p>
                    Dimulai dari produksi rumahan berskala kecil, kami berkomitmen untuk selalu mempertahankan kualitas jahitan dan kerapian bordir. Berkat kepercayaan ribuan wisudawan, Dins Selempang kini telah tumbuh menjadi produsen selempang andalan bagi mahasiswa di berbagai universitas besar di Indonesia, pageant event, hingga penghargaan instansi.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                      <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

          {/* Grid of Materials (Satin vs Beludru) - Reverted to clean vertical stack on mobile */}
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
              <div className="group rounded-3xl bg-zinc-900/30 border border-zinc-800/80 overflow-hidden hover:border-red-500/30 transition-all duration-300">
                <div className="relative w-full h-48 sm:h-64 md:aspect-[16/9] overflow-hidden rounded-t-3xl bg-[#03050d]">
                  <Image 
                    src="/material_velvet.jpg"
                    alt="Bahan Beludru Premium"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-red-600 text-white font-bold text-[10px] sm:text-xs uppercase px-2.5 py-1.5 rounded-full">
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
                    Pinggiran diselematkan menggunakan pita satin dengan lebar 1 cm yang mengelilingi seluruh kain selempang. Model ini memberikan garis batas yang tegas, rapi, dan bernuansa minimalis modern. Pilihan paling tepat untuk Anda yang menyukai gaya elegan yang simpel dan modern.
                  </p>
                </div>

                {/* Lace Border Option */}
                <div className="space-y-3 sm:space-y-4 pt-4 md:pt-0 md:pl-8">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base sm:text-lg font-bold text-red-400">List Renda (Lace Border)</h4>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                    Pinggiran dihiasi dengan renda rajut bermotif klasik yang mewah. Renda dipasang melingkari seluruh sisi selempang, memberikan kesan tradisional yang anggun, prestisius, dan megah. Sangat direkomendasikan untuk wisuda universitas negeri atau upacara formal kerajaan/kontes kecantikan.
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

          {/* Grid Products - Reverted to clean vertical stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <RevealOnScroll key={product.id} delay={index * 150}>
                <div className="group flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 h-full">
                  <div className="relative w-full h-56 sm:h-72 md:h-auto md:aspect-square overflow-hidden rounded-t-3xl bg-[#03050d]">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-[#03050d]/80 backdrop-blur-sm border border-zinc-800 text-blue-400 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                        Bahan: {product.material}
                      </span>
                      <span className="bg-[#03050d]/80 backdrop-blur-sm border border-zinc-800 text-red-400 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full">
                        List: {product.border}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-sans leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-base sm:text-lg font-extrabold text-white font-sans shrink-0">
                          Rp {product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light font-sans">
                        {product.description}
                      </p>
                      
                      {/* Features list - grid grid-cols-1 sm:grid-cols-2 prevents text overlaps on mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 sm:pt-2">
                        {product.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-zinc-400">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-zinc-500 font-sans">Estimasi: 2-3 hari</span>
                      <a
                        href={`https://wa.me/6285741007890?text=${encodeURIComponent(
                          `Halo Dins Selempang, saya tertarik memesan model: ${product.name} (Rp ${product.price.toLocaleString("id-ID")})`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.185-1.359a9.95 9.95 0 004.822 1.233h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.922-7.062A9.92 9.92 0 0012.012 2zm6.935 14.18c-.28.788-1.634 1.453-2.244 1.517-.542.057-1.25.077-3.619-.899-3.033-1.25-4.992-4.329-5.143-4.53-.15-.2-.1.979-1.21-1.35-.989-1.897-.08-2.905-.443-3.279-.28-.288-.61-.36-.813-.36-.203 0-.406 0-.584.009-.183.01-.482.072-.736.353-.254.28-.97.948-.97 2.31 0 1.361.99 2.678 1.13 2.868.14.19 1.948 2.973 4.72 4.17 2.772 1.198 2.772.799 3.28.75.507-.05 1.634-.67 1.863-1.312.228-.64.228-1.189.16-1.303-.07-.113-.254-.183-.532-.323z"/>
                        </svg>
                        Pesan Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* 6. PRICE TABLE SECTION */}
        <section id="pricing" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-white sm:text-4xl font-sans">Daftar Harga & Model</h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2">Skema harga transparan berdasarkan jenis bahan dan ornamen pinggiran. Bebas pilih warna!</p>
            </div>
          </RevealOnScroll>

          {/* Pricing Grid - Grid columns snap from 1 to 2 to 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            
            {/* Tier 1: Satin Pita */}
            <RevealOnScroll delay={0}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition-all h-full">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-300">Satin Pita</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">Ekonomis & Minimalis</p>
                  <div className="mt-3 sm:mt-4 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">Rp 35.000</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 ml-1">/pcs</span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 text-[10px] sm:text-xs text-zinc-400 border-t border-zinc-800 pt-4 sm:pt-6">
                    <li className="flex items-center gap-2">- Bahan Satin Premium</li>
                    <li className="flex items-center gap-2">- Border Pita Satin (1cm)</li>
                    <li className="flex items-center gap-2">- Bordir (1 Sisi)</li>
                    <li className="flex items-center gap-2">- Tanpa Furing Belakang</li>
                  </ul>
                </div>
                <a 
                  href={getWhatsAppLink()} 
                  className="mt-6 sm:mt-8 block w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center py-2.5 text-xs font-bold text-white transition-colors"
                >
                  Pilih Model Ini
                </a>
              </div>
            </RevealOnScroll>

            {/* Tier 2: Satin Renda */}
            <RevealOnScroll delay={100}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition-all h-full">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-300">Satin Renda</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 font-sans">Klasik & Anggun</p>
                  <div className="mt-3 sm:mt-4 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">Rp 45.000</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 ml-1">/pcs</span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 text-[10px] sm:text-xs text-zinc-400 border-t border-zinc-800 pt-4 sm:pt-6">
                    <li className="flex items-center gap-2">- Bahan Satin Premium</li>
                    <li className="flex items-center gap-2">- Border Renda Rajut</li>
                    <li className="flex items-center gap-2">- Bordir (1 Sisi)</li>
                    <li className="flex items-center gap-2">- Lapis Furing Belakang</li>
                  </ul>
                </div>
                <a 
                  href={getWhatsAppLink()} 
                  className="mt-6 sm:mt-8 block w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center py-2.5 text-xs font-bold text-white transition-colors"
                >
                  Pilih Model Ini
                </a>
              </div>
            </RevealOnScroll>

            {/* Tier 3: Beludru Pita */}
            <RevealOnScroll delay={200}>
              <div className="relative rounded-2xl border-2 border-blue-600 bg-zinc-900/40 p-5 sm:p-6 flex flex-col justify-between shadow-lg shadow-blue-500/10 h-full">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-white">
                  Paling Populer
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Beludru Pita</h3>
                  <p className="text-[10px] sm:text-xs text-blue-400 mt-1 font-sans">Sangat Elegan & Kontras</p>
                  <div className="mt-3 sm:mt-4 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">Rp 50.000</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 ml-1">/pcs</span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 text-[10px] sm:text-xs text-zinc-300 border-t border-zinc-800 pt-4 sm:pt-6">
                    <li className="flex items-center gap-2">- Bahan Beludru Tebal</li>
                    <li className="flex items-center gap-2">- Border Pita Satin (1cm)</li>
                    <li className="flex items-center gap-2">- Bordir Tebal</li>
                    <li className="flex items-center gap-2">- Tanpa Furing Belakang</li>
                  </ul>
                </div>
                <a 
                  href={getWhatsAppLink()} 
                  className="mt-6 sm:mt-8 block w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-center py-2.5 text-xs font-extrabold text-white transition-colors animate-pulse"
                >
                  Pesan Sekarang
                </a>
              </div>
            </RevealOnScroll>

            {/* Tier 4: Beludru Renda */}
            <RevealOnScroll delay={300}>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition-all h-full">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-300">Beludru Renda</h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500 mt-1 font-sans">Kualitas Royal / Kontes</p>
                  <div className="mt-3 sm:mt-4 flex items-baseline">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">Rp 60.000</span>
                    <span className="text-[10px] sm:text-xs text-zinc-400 ml-1">/pcs</span>
                  </div>
                  <ul className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 text-[10px] sm:text-xs text-zinc-400 border-t border-zinc-800 pt-4 sm:pt-6">
                    <li className="flex items-center gap-2">- Bahan Beludru Tebal</li>
                    <li className="flex items-center gap-2">- Border Renda Rajut</li>
                    <li className="flex items-center gap-2">- Bordir Tebal</li>
                    <li className="flex items-center gap-2">- Lapis Furing Belakang</li>
                  </ul>
                </div>
                <a 
                  href={getWhatsAppLink()} 
                  className="mt-6 sm:mt-8 block w-full rounded-xl bg-zinc-800 hover:bg-zinc-700 text-center py-2.5 text-xs font-bold text-white transition-colors"
                >
                  Pilih Model Ini
                </a>
              </div>
            </RevealOnScroll>

          </div>

          {/* Extra options notes */}
          <RevealOnScroll delay={400}>
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-5 sm:p-6">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">Layanan Tambahan (Optional Add-ons):</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs text-zinc-400">
                <div className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">-</span>
                  <p><strong className="text-zinc-200">Custom Logo Universitas/Sekolah:</strong> +Rp 10.000 / pcs (Bordir berwarna rapi di ujung selempang).</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">-</span>
                  <p><strong className="text-zinc-200">Lapis Furing Belakang (Penutup):</strong> +Rp 10.000 / pcs (Menutup hasil rajutan benang bordir agar bagian belakang rapi).</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-500 font-bold shrink-0">-</span>
                  <p><strong className="text-blue-500">Layanan Kilat (1 Hari Selesai):</strong> +Rp 15.000 / pcs (Pengerjaan express selesai dalam 24 jam).</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* INTERACTIVE PRICE CALCULATOR */}
        <section id="calculator" className="relative py-16 md:py-24 border-t border-zinc-900">
          <RevealOnScroll delay={0}>
            <div className="max-w-4xl mx-auto bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative">
              <div className="absolute top-0 right-0 h-32 w-32 bg-blue-500/5 blur-3xl rounded-full" />
              
              <div className="text-center md:text-left mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-sans">Kalkulator Estimasi Harga Custom</h2>
                <p className="text-zinc-400 text-xs mt-1 sm:mt-2">Rancang selempang impian Anda dan dapatkan perhitungan biaya secara langsung serta pesan lewat WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                {/* Calculator Settings */}
                <div className="space-y-5 sm:space-y-6">
                  
                  {/* 1. Select Material */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">1. Pilih Bahan Kain</label>
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

                  {/* 2. Select Border */}
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">2. Pilih Model Pinggiran (List)</label>
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

                  {/* 3. Add-ons */}
                  <div className="space-y-3">
                    <label className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">3. Layanan Tambahan (Optional)</label>
                    
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
                          <div>+Rp 10.000 (Dibordir presisi)</div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 p-3 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={calcDoubleLayer}
                          onChange={(e) => setCalcDoubleLayer(e.target.checked)}
                          className="rounded border-zinc-700 text-blue-500 focus:ring-blue-500 h-4 w-4 bg-[#03050d]"
                        />
                        <div className="text-xs text-zinc-300 flex-1">
                          <div className="font-semibold text-white">Double Layer (Lapis Furing Belakang)</div>
                          <div>+Rp 10.000 (Menutup benang rajutan)</div>
                        </div>
                      </label>

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

                </div>

                {/* Calculator Output */}
                <div className="bg-[#03050d] border border-zinc-800 p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-wider font-sans">Hasil Rincian & Estimasi</h4>
                    
                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                      <div className="flex justify-between">
                        <span>Bahan ({calcMaterial}) + List ({calcBorder})</span>
                        <span className="font-semibold text-white font-sans text-right">
                          Rp {((calcMaterial === "Satin" ? (calcBorder === "Pita" ? 35000 : 45000) : (calcBorder === "Pita" ? 50000 : 60000))).toLocaleString("id-ID")}
                        </span>
                      </div>
                      {calcLogo && (
                        <div className="flex justify-between text-xs text-zinc-400 font-sans">
                          <span>+ Custom Logo</span>
                          <span>Rp 10.000</span>
                        </div>
                      )}
                      {calcDoubleLayer && (
                        <div className="flex justify-between text-xs text-zinc-400 font-sans">
                          <span>+ Lapis Furing Belakang</span>
                          <span>Rp 10.000</span>
                        </div>
                      )}
                      {calcExpress && (
                        <div className="flex justify-between text-xs text-zinc-400 text-blue-300 font-sans">
                          <span>+ Pengerjaan Kilat (1 Hari)</span>
                          <span>Rp 15.000</span>
                        </div>
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
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.185-1.359a9.95(9.95 0 004.822 1.233h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.922-7.062A9.92 9.92 0 0012.012 2zm6.935 14.18c-.28.788-1.634 1.453-2.244 1.517-.542.057-1.25.077-3.619-.899-3.033-1.25-4.992-4.329-5.143-4.53-.15-.2-.1.979-1.21-1.35-.989-1.897-.08-2.905-.443-3.279-.28-.288-.61-.36-.813-.36-.203 0-.406 0-.584.009-.183.01-.482.072-.736.353-.254.28-.97.948-.97 2.31 0 1.361.99 2.678 1.13 2.868.14.19 1.948 2.973 4.72 4.17 2.772 1.198 2.772.799 3.28.75.507-.05 1.634-.67 1.863-1.312.228-.64.228-1.189.16-1.303-.07-.113-.254-.183-.532-.323z"/>
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

          {/* Grid contacts - clean vertical stack on mobile, 3 columns on desktop */}
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
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.185-1.359a9.95 9.95 0 004.822 1.233h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.922-7.062A9.92 9.92 0 0012.012 2zm6.935 14.18c-.28.788-1.634 1.453-2.244 1.517-.542.057-1.25.077-3.619-.899-3.033-1.25-4.992-4.329-5.143-4.53-.15-.2-.1.979-1.21-1.35-.989-1.897-.08-2.905-.443-3.279-.28-.288-.61-.36-.813-.36-.203 0-.406 0-.584.009-.183.01-.482.072-.736.353-.254.28-.97.948-.97 2.31 0 1.361.99 2.678 1.13 2.868.14.19 1.948 2.973 4.72 4.17 2.772 1.198 2.772.799 3.28.75.507-.05 1.634-.67 1.863-1.312.228-.64.228-1.189.16-1.303-.07-.113-.254-.183-.532-.323z"/>
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
                className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 h-full"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 sm:mt-6 group-hover:text-red-400 transition-colors font-sans">Instagram</h3>
                <p className="text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed font-light">Lihat ratusan portofolio terbaru kami, foto testimonial, keseruan wisuda, dan info promo di feeds/story kami.</p>
                <span className="text-xs font-bold text-red-400 mt-4 sm:mt-6 inline-flex items-center gap-1 group-hover:underline">
                  Ikuti @dins.selempang ➔
                </span>
              </a>
            </RevealOnScroll>

            {/* Shopee Contact Card */}
            <RevealOnScroll delay={300}>
              <a 
                href="shopee.co.id/dinzselempang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[85vw] md:w-full shrink-0 snap-center group flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 h-full"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M19.5 6.75h-3.25v-.5a4.25 4.25 0 0 0-8.5 0v.5H4.5A1.75 1.75 0 0 0 2.75 8.5v11c0 .966.784 1.75 1.75 1.75h15a1.75 1.75 0 0 0 1.75-1.75v-11a1.75 1.75 0 0 0-1.75-1.75Zm-10.25-.5a2.75 2.75 0 0 1 5.5 0v.5h-5.5v-.5Zm11 13.25a.25.25 0 0 1-.25.25h-15a.25.25 0 0 1-.25-.25v-11a.25.25 0 0 1 .25-.25h15a.25.25 0 0 1 .25.25v11Z"/>
                    <path d="M11.5 11.25c-.828 0-1.5.56-1.5 1.25s.672 1.25 1.5 1.25 1.5.56 1.5 1.25-.672 1.25-1.5 1.25h-1a.5.5 0 0 1 0-1h1c.276 0 .5-.112.5-.25s-.224-.25-.5-.25c-.828 0-1.5-.56-1.5-1.25s.672-1.25 1.5-1.25h1a.5.5 0 0 1 0 1h-1Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mt-4 sm:mt-6 group-hover:text-blue-400 transition-colors font-sans">Shopee Indonesia</h3>
                <p className="text-zinc-400 text-xs mt-2 max-w-xs leading-relaxed font-light font-sans">Nikmati keamanan bertransaksi dengan sistem Escrow Shopee, subsidi Gratis Ongkir, dan promo Cashback menarik.</p>
                <span className="text-xs font-bold text-blue-400 mt-4 sm:mt-6 inline-flex items-center gap-1 group-hover:underline">
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
