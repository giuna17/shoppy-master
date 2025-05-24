import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface FAQItem {
  id: number;
  questionKey: string;
  answerKey: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`group rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-2 ring-crimson bg-gray-900/50' : 'ring-1 ring-gray-800 hover:ring-crimson/50 bg-black'}`}>
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center transition-all duration-300 group-hover:bg-gray-900/30"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg transition-colors text-white group-hover:text-crimson">
          {question}
        </span>
        <div className={`p-1 rounded-full transition-all ${isOpen ? 'bg-crimson/20' : 'bg-gray-800 group-hover:bg-crimson/10'}`}>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-crimson" />
          ) : (
            <ChevronDown className="h-5 w-5 text-crimson" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-gray-900/50 to-transparent">
          <div 
            className="text-gray-300 text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: answer.replace(
                /Contact Us|Связаться с нами|დაგვიკავშირდით/g,
                '<a href="/contact" class="text-crimson font-medium hover:underline transition-colors">$&</a>'
              )
            }}
          />
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openItem, setOpenItem] = useState<number | null>(null);

  // Array of question/answer IDs
  const faqItems: FAQItem[] = useMemo(() => [
    { id: 1, questionKey: 'faq.q1.question', answerKey: 'faq.q1.answer' },
    { id: 2, questionKey: 'faq.q2.question', answerKey: 'faq.q2.answer' },
    { id: 3, questionKey: 'faq.q3.question', answerKey: 'faq.q3.answer' },
    { id: 4, questionKey: 'faq.q4.question', answerKey: 'faq.q4.answer' },
    { id: 5, questionKey: 'faq.q5.question', answerKey: 'faq.q5.answer' },
  ], []);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  // Get all translations at once - will update when language changes
  const translatedItems = useMemo(() => 
    faqItems.map(item => ({
      ...item,
      question: t(item.questionKey),
      answer: t(item.answerKey)
    })),
    [faqItems, t, language]
  );

  // Get translated strings
  const title = useMemo(() => t('faq.title'), [t, language]);
  const subtitle = useMemo(() => t('faq.subtitle'), [t, language]);
  const needHelp = useMemo(() => t('faq.needHelp'), [t, language]);
  const contactUs = useMemo(() => t('faq.contactUs'), [t, language]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <section className="py-20 px-4 flex-grow" id="faq">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="relative inline-block mb-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-crimson to-crimson-dark">
                  {title}
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-crimson to-transparent rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {translatedItems.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === item.id}
                onClick={() => toggleItem(item.id)}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              {needHelp}
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 border border-crimson text-base font-medium rounded-md text-white bg-crimson hover:bg-crimson/90 transition-colors shadow-sm"
            >
              {contactUs}
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;
