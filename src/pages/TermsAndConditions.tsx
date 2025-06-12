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
          <p className="text-foreground/80">Last updated: June 10, 2025</p>
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
              All products are handmade, which means each piece is unique. Slight variations in color, texture, and size may occur and should not be considered defects.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>All prices are in USD</li>
              <li>Payment is processed securely through our payment processors</li>
              <li>We accept major credit cards and other payment methods as displayed at checkout</li>
              <li>Your order is confirmed once payment is received</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Shipping</h2>
            <p className="mb-4">
              We currently ship to Tbilisi only. Shipping times may vary depending on your location and the shipping method selected. Please allow 3-5 business days for order processing before shipment.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">5. Returns and Exchanges</h2>
            <p className="mb-4">
              Due to the handmade nature of our products, we do not accept returns or exchanges unless the item is defective or damaged upon arrival. If you receive a damaged item, please contact us within 7 days of delivery.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including images, text, and designs, is the property of NEKO.shop and is protected by copyright laws. Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              NEKO.shop shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our website constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:grge339@gmail.com" className="text-crimson hover:underline">grge339@gmail.com</a>.
            </p>
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
