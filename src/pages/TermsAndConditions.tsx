import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms and Conditions | NEKO.shop</title>
        <meta name="description" content="Terms and conditions for NEKO.shop - Handmade alternative jewelry and accessories" />
      </Helmet>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-foreground/80">Last updated: June 13, 2025</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to NEKO.shop. These Terms and Conditions govern your use of our website and the purchase of any products from us. By accessing or using our website, you agree to be bound by these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Products</h2>
            <p className="mb-4">
              All our products are handmade, meaning each piece is unique and crafted with care. Slight variations in color, texture, size, or finish are natural and not considered defects. Minor imperfections may occur and are part of the charm of handmade goods.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>All prices are listed in GEL (Georgian Lari)</li>
              <li>Payments are processed securely through trusted payment processors</li>
              <li>We accept major credit cards and other payment methods as displayed at checkout</li>
              <li>Your order is confirmed once payment is successfully received</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Shipping</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>We currently ship only within Tbilisi</li>
              <li>Orders are processed within 1 to 5 business days</li>
              <li>Shipping times may vary depending on your location and the selected shipping method</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Exchanges</h2>
            <p className="mb-4">
              We do not accept returns or exchanges due to the handmade nature of our products, unless one of the following conditions is met:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your order was damaged during delivery</li>
              <li>You did not receive your order within 5 business days after shipment confirmation</li>
            </ul>
            <p className="mb-4">
              If any of the above applies, please contact us within 7 days of the expected delivery date or upon receiving a damaged item. We'll do our best to resolve the issue.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including images, text, logos, and product designs, is the intellectual property of NEKO.shop and is protected under applicable copyright laws. Any unauthorized use or reproduction is strictly prohibited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              NEKO.shop shall not be held liable for any indirect, incidental, or consequential damages arising from the use or misuse of our products or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>We reserve the right to update or modify these Terms and Conditions at any time.</li>
              <li>Changes will take effect immediately upon being posted to our website.</li>
              <li>Continued use of the website after any changes constitutes acceptance of the updated terms.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns regarding these Terms and Conditions, feel free to contact us at:
            </p>
            <p className="font-medium">📧 grge339@gmail.com</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">10. Business Information</h2>
            <p className="mb-2">Individual Entrepreneur: G. Velijanashvili</p>
            <p>Identification Code: 01001087670</p>
          </section>

          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
