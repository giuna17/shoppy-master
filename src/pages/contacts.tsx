import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const ContactsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-crimson">Contact</span>{' '}
          <span className="text-white">Us</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          {/* Social Media Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a
              href="https://facebook.com/nekoshop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent hover:bg-crimson/20 transition-colors"
            >
              <Facebook className="w-6 h-6 text-crimson" />
              <div>
                <h3 className="font-semibold text-white">Facebook</h3>
                <p className="text-sm text-gray-400">@nekoshop</p>
              </div>
            </a>

            <a
              href="https://instagram.com/neko.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent hover:bg-crimson/20 transition-colors"
            >
              <Instagram className="w-6 h-6 text-crimson" />
              <div>
                <h3 className="font-semibold text-white">Instagram</h3>
                <p className="text-sm text-gray-400">@neko.shop</p>
              </div>
            </a>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent">
              <Mail className="w-6 h-6 text-crimson" />
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <a
                  href="mailto:contact@nekoshop.com"
                  className="text-sm text-gray-400 hover:text-crimson"
                >
                  contact@nekoshop.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent">
              <Phone className="w-6 h-6 text-crimson" />
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <a
                  href="tel:+1234567890"
                  className="text-sm text-gray-400 hover:text-crimson"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Business Hours
            </h2>
            <div className="space-y-2 text-gray-400">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactsPage;
