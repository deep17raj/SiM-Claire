import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        // 'm-4' and 'rounded-3xl' gives it that modern "floating" card look seen in your image
        <div className="px-4 py-8">
            <footer className="w-full max-w-[1400px] mx-auto bg-secondary text-white mx-4 mb-4 rounded-3xl pt-12 pb-8 px-6 md:px-12 mt-12">
                <div className="">

                    {/* Top Section: Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

                        {/* Column 1: Brand & Socials (Spans 2 columns on large screens) */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex  items-center gap-2 mb-4">
                                {/* 1. Wrapper: Size h-12 w-12 (48px) is usually perfect for a navbar logo */}
                                <div className="relative h-16 w-16 translate-y-2 flex-shrink-0">
                                    <Image
                                        src="/logo.svg"
                                        alt="SiMClaire Logo"
                                        fill
                                        /* - object-contain: Ensures the whole logo fits without cropping
                                           - scale-125: Zooms in slightly if your SVG has too much empty space around it 
                                        */
                                        className="object-cover scale-125"
                                    />
                                </div>

                                {/* 2. Text: Align vertical rhythm */}
                                <span className="font-bold text-2xl tracking-tight text-white">
                                    SiM <span className="text-brand">Claire</span>
                                </span>
                            </Link>

                            <p className="text-white/80 text-sm mb-6 max-w-xs">
                                Get instant coverage with no roaming surprises.
                            </p>

                            {/* Social Icons */}
                            <div className="flex items-center gap-5 text-brand">
    {/* Facebook */}
    <a href="#" className="hover:text-white/80 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    </a>

    {/* Instagram */}
    <a href="#" className="hover:text-white/80 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    </a>

    {/* TikTok */}
    <a href="#" className="hover:text-white/80 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
        </svg>
    </a>
</div>
                        </div>

                        {/* Links Sections - Using Grid to match the layout */}

                        {/* Site Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Site Links</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li><Link href="/" className="hover:underline">Home</Link></li>
                                <li><Link href="/destination" className="hover:underline">Choose a Destination</Link></li>
                                <li><Link href="/why-esim" className="hover:underline">Why an eSIM?</Link></li>
                                <li><Link href="/support" className="hover:underline">Get Support</Link></li>
                                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Important Info */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Important Information</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
                                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                                <li><Link href="/kyc" className="hover:underline">KYC Policy</Link></li>
                            </ul>
                        </div>

                        {/* User Profile */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">User Profile</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li><Link href="/signup" className="hover:underline">Sign Up</Link></li>
                                <li><Link href="/login" className="hover:underline">Log In</Link></li>
                            </ul>
                        </div>

                        {/* Supported Regions */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Supported Regions</h3>
                            <ul className="space-y-2 text-sm text-white/90">
                                <li><Link href="/region/gulf" className="hover:underline">Gulf States</Link></li>
                                <li><Link href="/region/europe" className="hover:underline">Europe</Link></li>
                                <li><Link href="/region/eastern-europe" className="hover:underline">Eastern Europe</Link></li>
                                <li><Link href="/region/north-america" className="hover:underline">North America</Link></li>
                                <li><Link href="/region/south-asia" className="hover:underline">South Asia</Link></li>
                                <li><Link href="/region/south-america" className="hover:underline">South America</Link></li>
                                <li><Link href="/region/global" className="hover:underline">Global</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-[1px] bg-white/20 mb-8"></div>

                    {/* Bottom Section: Copyright & Payments */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/80 text-sm">
                            Copyright © 2026 SiMClaire. All rights reserved.
                        </p>

                        <div className="flex items-center gap-3">
                            {/* Visa Badge */}
                            <div className="bg-white/10 px-3 py-1 rounded-md border border-white/20">
                                <span className="font-bold text-white italic tracking-wider text-sm">VISA</span>
                            </div>
                            {/* Mastercard Badge */}
                            <div className="bg-white/10 px-3 py-1 rounded-md border border-white/20 flex items-center">
                                <div className="flex -space-x-1">
                                    <div className="w-4 h-4 rounded-full bg-red-500/90"></div>
                                    <div className="w-4 h-4 rounded-full bg-yellow-500/90"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;