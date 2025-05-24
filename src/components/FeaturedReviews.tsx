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
          <Button
            asChild
            variant="link"
            className="text-crimson hover:text-crimson/80 text-[1.05em]"
            style={{ transform: 'scale(1.05)' }}
          >
            <Link to="/reviews">{t('reviews.view_all')}</Link>
          </Button>
        </div>
        <div className="text-center text-lg font-medium text-crimson bg-black/5 py-2 px-4 rounded-md border border-crimson/20">
          {t('reviews.leave_good_review_discount')}
        </div>
      </div>

      <ReviewList reviews={reviews} showTitle={false} />
    </div>
  );
};

export default FeaturedReviews;
