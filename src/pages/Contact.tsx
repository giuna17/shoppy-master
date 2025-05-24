import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Facebook, Loader2, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      toast({
        title: t('contact.error'),
        description: t('contact.error_name_required'),
        variant: 'destructive',
      });
      return false;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      toast({
        title: t('contact.error'),
        description: t('contact.error_email_invalid'),
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: t('contact.error'),
        description: t('contact.error_message_required'),
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_q9aooyp';
      const templateId = 'template_tm4v6kc';
      const publicKey = 'dSrGPvQ4YvKySD9Iu'; // EmailJS public key

      // Prepare the template parameters
      const templateParams = {
        to_name: 'Neko Team', // Your name or team name that will receive the email
        from_name: `${formData.first_name} ${formData.last_name}`.trim(),
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email, // Important for the reply-to header
        to_email: 'grge339@gmail.com', // Your receiving email
        subject: `New Contact Form Submission from ${formData.first_name} ${formData.last_name}`,
      };

      // Send the email
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        toast({
          title: t('contact.success'),
          description: t('contact.success_message'),
        });

        // Reset the form
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.error_sending'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-crimson">{t('contact.title')}</span>{' '}
          <span className="text-white">{t('contact.us')}</span>
        </h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="first_name"
                    className="text-sm font-medium text-white"
                  >
                    {t('contact.first_name')}
                  </label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="bg-black/50 border-crimson/20 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last_name"
                    className="text-sm font-medium text-white"
                  >
                    {t('contact.last_name')}
                  </label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="bg-black/50 border-crimson/20 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white"
                >
                  {t('contact.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-black/50 border-crimson/20 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-white"
                >
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-32 bg-black/50 border-crimson/20 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-crimson hover:bg-crimson/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  t('contact.submit')
                )}
              </Button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Collaboration Message */}
            <div className="space-y-4 p-6 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent">
              <p className="text-gray-300">{t('contact.collaboration')}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-5 h-5 text-crimson" />
                  <a href="mailto:grge339@gmail.com" className="hover:text-white transition-colors">
                    grge339@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                {t('contact.social_media')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://facebook.com/nekoshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent hover:bg-crimson/20 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-crimson flex-shrink-0" />
                  <span className="text-white">Facebook</span>
                </a>
                <a
                  href="https://instagram.com/neko.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent hover:bg-crimson/20 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-crimson flex-shrink-0" />
                  <span className="text-white">Instagram</span>
                </a>
                <a
                  href="https://t.me/not_even_here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-crimson/20 bg-gradient-to-r from-crimson/10 to-transparent hover:bg-crimson/20 transition-colors"
                  aria-label={t('contact.telegram')}
                >
                  <MessageCircle className="w-6 h-6 text-crimson flex-shrink-0" />
                  <span className="text-white">Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
