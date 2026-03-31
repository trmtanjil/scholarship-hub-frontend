import React from 'react'
import Link from 'next/link'
import { GraduationCap, Globe, Share2, Users, Mail, Phone, MapPin } from 'lucide-react'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-white">
                            <GraduationCap className="h-8 w-8 text-blue-500" />
                            <span className="text-2xl font-bold tracking-tight">ScholarshipHub</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Empowering talented students to reach their dream universities worldwide. Finding the right scholarship is now easier than ever.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Link href="#" className="hover:text-blue-500 transition-colors">
                                <Globe size={20} />
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Share2 size={20} />
                            </Link>
                            <Link href="#" className="hover:text-blue-600 transition-colors">
                                <Users size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/scholarships" className="hover:text-white transition-colors">All Scholarships</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Scholarship Types</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/scholarships?category=Full" className="hover:text-white transition-colors">Full Funding</Link></li>
                            <li><Link href="/scholarships?category=Partial" className="hover:text-white transition-colors">Partial Funding</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Undergraduate</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Postgraduate</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-6">Contact Support</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-blue-500 shrink-0" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-500 shrink-0" />
                                <span>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-500 shrink-0" />
                                <span>support@scholarshiphub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {currentYear} ScholarshipHub. All rights reserved by Tanjil.</p>
                    <div className="flex gap-6">
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer