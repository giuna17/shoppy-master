import React from 'react';
import { Button } from './ui/button';
import ReviewList from './ReviewList';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { getTopReviews } from '@/services/reviewService';

const FeaturedReviews = () => {
  const { t } = useLanguage();
  const reviews = getTopReviews(3); // Get top 3 reviews

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 relative z-10 font-medieval">
            <span className="text-crimson">{t('reviews.title_part1')}</span>{' '}
            <span className="text-white">{t('reviews.title_part2')}</span>
          </h2>
          <Link 
            to="/reviews"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium bg-crimson/10 hover:bg-crimson/20 text-crimson border border-crimson/20 rounded-md transition-colors group"
          >
            {t('reviews.view_all')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>

      </div>

      <ReviewList reviews={reviews} showTitle={false} />
    </div>
  );
};

export default FeaturedReviews;
