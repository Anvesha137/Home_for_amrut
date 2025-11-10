import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900 text-white mt-20">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h3 className="mb-4 text-lg text-rose-200">About Us</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🌾</div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-tight">
                  Home for Amrut
                </span>
                <span className="text-xs text-rose-300">Premium Makhana</span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Bringing you the finest flavoured makhana, crafted with authentic
              ingredients and a passion for wellness.
            </p>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-4 text-lg text-rose-200">Customer Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-lg text-rose-200">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-rose-300 transition-colors">
                  Payment Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-lg text-rose-200">Connect With Us</h3>
            <div className="space-y-3 text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rose-400" />
                <span>hello@homeforamrut.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rose-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span>Mumbai, India</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-white/10 hover:bg-rose-500 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-rose-500 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-rose-500 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-rose-500 p-2 rounded-full transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <p>
            © 2025 Home for Amrut. All rights reserved. Made with ❤️ for healthy
            snacking.
          </p>
        </div>
      </div>
    </footer>
  );
}
