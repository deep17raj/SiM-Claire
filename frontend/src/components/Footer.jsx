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
                            <div className="flex items-center gap-5">
                                {/* Facebook */}
                                <a href="#" className="hover:text-white/80 transition-colors">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                {/* X (Twitter) */}
                                <a href="#" className="hover:text-white/80 transition-colors">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                </a>
                                {/* Instagram */}
                                <a href="#" className="hover:text-white/80 transition-colors">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                {/* YouTube */}
                                <a href="#" className="hover:text-white/80 transition-colors">
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon fill="white" stroke="none" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
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