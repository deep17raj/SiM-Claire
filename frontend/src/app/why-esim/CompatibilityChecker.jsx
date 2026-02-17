import React from 'react';

// 1. Define Custom SVG Icons for each brand
const BrandIcons = {
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 4.31-.74c.76.12 2.29.54 3.03 1.63-2.6 1.6-2.14 4.8 1.05 6.09-.59 1.83-1.62 3.65-3.47 5.25zM12.05 5.59c-.71-3.26 2.65-4.81 2.65-4.81.79 3.69-2.65 4.81-2.65 4.81z"/>
    </svg>
  ),
  samsung: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
       {/* Stylized Galaxy Orbit / 'S' representation */}
       <path d="M13.2 2.06c4.6 1.15 7.17 6.07 5.76 10.98-1.4 4.91-6.2 7.82-10.8 6.67-4.6-1.15-7.17-6.07-5.76-10.98 1.4-4.91 6.2-7.82 10.8-6.67zm-1.12 2.05c-2.48.33-4.66 2.1-5.32 4.41-.67 2.31.25 4.7 2.26 5.86 2.01 1.16 4.62.99 6.28-.42 1.66-1.41 2.24-3.8 1.42-5.83-.82-2.03-2.9-3.52-4.64-4.02z"/>
       <path d="M19.46 15.68l1.35 1.35-3.54 3.54-1.35-1.35 3.54-3.54z" opacity="0.6"/>
    </svg>
  ),
  google: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  huawei: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      {/* Abstract Flower/Petals Shape */}
      <path d="M12 2c-.6 0-1.1.2-1.5.6-.4.4-.6.9-.6 1.5s.2 1.1.6 1.5c.4.4.9.6 1.5.6s1.1-.2 1.5-.6c.4-.4.6-.9.6-1.5s-.2-1.1-.6-1.5C13.1 2.2 12.6 2 12 2zm-4.2 3.8c-.5-.3-1.1-.2-1.5.2-.4.4-.6 1-.2 1.5l1.5 2.1c.3.5.9.6 1.4.2.5-.3.6-.9.2-1.4L7.8 5.8zm8.4 0L14.8 8c-.4.5-.3 1.1.2 1.4.5.4 1.1.2 1.4-.2l1.5-2.1c.4-.5.2-1.1-.2-1.5-.5-.3-1.1-.2-1.5.2zM4.5 10.5c-.5-.2-1.1 0-1.3.5-.2.5 0 1.1.5 1.3l2.5 1c.5.2 1.1 0 1.3-.5.2-.5 0-1.1-.5-1.3l-2.5-1zm15 0l-2.5 1c-.5.2-.7.8-.5 1.3.2.5.8.7 1.3.5l2.5-1c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.3-.5zM7.5 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm9 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
  motorola: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
       {/* Stylized M */}
       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h-2.5l-2.5 7h2.5l1-3 1.5 3h2l1.5-3 1 3h2.5l-2.5-7H11z"/>
    </svg>
  ),
  others: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
       <circle cx="6" cy="12" r="2"></circle>
       <circle cx="12" cy="12" r="2"></circle>
       <circle cx="18" cy="12" r="2"></circle>
    </svg>
  )
};

// 2. Data for Brand Tiles (Added 'iconKey' to map to BrandIcons)
const brands = [
  { id: 'apple', name: 'Apple', sub: 'iPhone & iPad', iconKey: 'apple', active: true },
  { id: 'samsung', name: 'Samsung', sub: 'Galaxy Series', iconKey: 'samsung', active: false },
  { id: 'google', name: 'Google', sub: 'Pixel Devices', iconKey: 'google', active: false },
  { id: 'huawei', name: 'Huawei', sub: 'P & Mate Series', iconKey: 'huawei', active: false },
  { id: 'motorola', name: 'Motorola', sub: 'Razr & Edge', iconKey: 'motorola', active: false },
  { id: 'others', name: 'Others', sub: 'Xiaomi, Oppo...', iconKey: 'others', active: false },
];

// 3. Data for Device Lists
const deviceCategories = [
  {
    title: '2024 Models',
    badge: 'New Release',
    models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16'],
  },
  {
    title: '2023 Models',
    models: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'],
  },
  {
    title: '2022 Models',
    models: ['iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14', 'iPhone SE (3rd Gen)'],
  },
  {
    title: '2021 Models',
    models: ['iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13'],
  },
  {
    title: 'iPads & Tablets',
    models: ['iPad Pro 12.9 (4th Gen+)', 'iPad Air (3rd Gen+)', 'iPad mini (5th Gen+)', 'iPad (7th Gen+)'],
  },
  {
    title: 'Legacy Models',
    models: ['iPhone 12 Series', 'iPhone 11 Series', 'iPhone XR / XS / XS Max', 'iPhone SE (2nd Gen)'],
  },
];

const CompatibilityChecker = () => {
  return (
    <section className="bg-[#fafafa] text-slate-900 min-h-screen mt-20 ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Header Section */}
        <header className="flex flex-col items-center text-center mb-20 relative">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <div className="absolute inset-0 bg-brand/10 rounded-[32px] rotate-6"></div>
              <div className="absolute inset-0 bg-white shadow-2xl rounded-[32px] flex items-center justify-center border border-slate-100">
                {/* Main Smartphone Icon */}
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f2671c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                 </svg>
              </div>
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight hcol mb-6">
            Compatibility Checker: <span className="text-brand">Is Your Device eSIM Ready?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal ">
            Verify if your hardware is ready for the digital SIM revolution. Select your brand to see the full list of compatible models.
          </p>
        </header>

        {/* Brand Selection Grid */}
        <div className="mb-20">
          <h3 className="text-center subheading  text-slate-600 mb-10">Premium Brand Selection</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <button 
                key={brand.id}
                className={`group relative flex flex-col items-center cursor-pointer p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-3 bg-gradient-to-br from-white to-slate-50 ${
                    brand.active 
                    ? 'border-brand bg-gradient-to-br from-white to-[#fff5f0] shadow-[0_25px_50px_-12px_rgba(242,103,28,0.15)] ring-1 ring-brand/20' 
                    : ''
                }`}
              >
                {/* Icon Container: Inherits text color for hover/active states */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    brand.active 
                    ? 'bg-gradient-to-br from-brand to-[#ff8c4a] text-white shadow-[0_10px_15px_-3px_rgba(242,103,28,0.3)]' 
                    : 'bg-slate-50 text-secondary'
                }`}>
                  {/* Renders the specific SVG from the BrandIcons object */}
                  {BrandIcons[brand.iconKey]}
                </div>
                
                <span className={`subheading sec font-bold transition-colors ${brand.active ? 'text-brand' : 'text-secondary'}`}>
                    {brand.name}
                </span>
                <span className={`desc mt-1  tracking-widest font-semibold transition-colors ${brand.active ? 'text-orange-400' : 'text-secondary'}`}>
                    {brand.sub}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Device Models Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {deviceCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 h-fit break-inside-avoid">
              <h4 className="subheading font-extrabold text-slate-900 mb-8 flex items-center justify-between">
                {category.title}
                {category.badge && (
                  <span className="text-[10px] font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full uppercase tracking-wider">
                    {category.badge}
                  </span>
                )}
              </h4>
              <ul className="space-y-5">
                {category.models.map((model, mIdx) => (
                  <li key={mIdx} className="flex items-center gap-4 text-slate-600 group cursor-default">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-secondary flex-shrink-0">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="desc hv  transition-colors">
                        {model}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        {/* <div className="mt-24 bg-secondary  rounded-[40px] p-8 md:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="12" y1="16" x2="12" y2="12"></line>
                 <line x1="12" y1="8" x2="12.01" y2="8"></line>
               </svg>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h5 className="text-2xl font-bold mb-4">Crucial Compatibility Factors</h5>
              <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                Models listed above generally support eSIM technology. However, regional variations such as hardware configurations for mainland China or carrier locks may impact your specific device's capabilities.
              </p>
            </div>
            <div className="flex-shrink-0 grid grid-cols-1 gap-4 w-full md:w-auto">
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Region Lock</p>
                <p className="text-xs text-slate-300 italic leading-snug">China/HK models with dual slots lack eSIM.</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Carrier Status</p>
                <p className="text-xs text-slate-300 italic leading-snug">Device must be network unlocked.</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Footer Actions */}
        <footer className="mt-20 flex flex-col md:flex-row items-center justify-between py-12 border-t border-slate-200">
          <div className="flex items-center gap-6 mb-8 md:mb-0">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-xs font-bold text-slate-400">U1</div>
              <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-xs font-bold text-slate-400">U2</div>
              <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center text-xs font-bold text-slate-400">U3</div>
            </div>
            <p className="text-slate-500 text-lg md:text-xl font-semibold">Trusted by <span className="text-slate-900">10,000+</span> global travelers</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <button className="px-16 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer text-brand text-lg md:text-xl border-brand border-2 rounded-lg">
              Help Center
            </button>
            <button className="text-brand text-lg md:text-xl border-brand border-2 rounded-lg px-14 py-4 font-bold hover:bg-brand hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all transform active:scale-95 transition-all duration-300 cursor-pointer">
              Get Your eSIM
            </button>
          </div>
        </footer>

      </div>
    </section>
  );
};

export default CompatibilityChecker;