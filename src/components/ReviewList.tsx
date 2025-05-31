import React from 'react';
import { Star, StarHalf, StarOff, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Review, ReactionType } from '@/services/reviewService';
import { cn } from '@/lib/utils';

interface ReviewListProps {
  reviews: Review[];
  showTitle?: boolean;
  showOnlyVerified?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  showTitle = true,
  showOnlyVerified = true,
}) => {
  // Filter out unverified reviews if needed
  const filteredReviews = showOnlyVerified 
    ? reviews.filter(review => review.isVerifiedPurchase)
    : reviews;
  const { t } = useLanguage();

  if (filteredReviews.length === 0) {
    return (
      <div className="text-center py-6 text-foreground/70">
        <p>{t('reviews.no_reviews')}</p>
      </div>
    );
  }

  // Function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  // Function to get reaction emoji and label
  const getReactionLabel = (reaction?: ReactionType) => {
    if (!reaction) return null;
    
    const reactions: Record<ReactionType, string> = {
      '🥰': t('reactions.love'),
      '😅': t('reactions.funny'),
      '🤯': t('reactions.mind_blown'),
    };
    
    return {
      emoji: reaction,
      label: reactions[reaction] || ''
    };
  };
  
  // Function to get category label
  type CategoryKey = '💸' | '⚙️' | '🎨' | '🚀' | '📦' | '🛠';
  
  const getCategoryLabel = (type: string) => {
    const categories: Record<CategoryKey, string> = {
      '💸': t('reviews.categories.price'),
      '⚙️': t('reviews.categories.quality'),
      '🎨': t('reviews.categories.design'),
      '🚀': t('reviews.categories.delivery'),
      '📦': t('reviews.categories.packaging'),
      '🛠': t('reviews.categories.usability'),
    };
    return categories[type as CategoryKey] || type;
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarOff
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <h3 className="text-lg font-medium">
          {t('reviews.customer_reviews')} ({filteredReviews.length})
        </h3>
      )}
      <div className="space-y-6">
        {filteredReviews.map((review) => {
          const reaction = getReactionLabel(review.reaction);
          
          return (
            <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{review.userName}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
                {review.isVerifiedPurchase && (
                  <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t('reviews.verified_purchase')}
                  </span>
                )}
              </div>
              
              {/* Reaction */}
              {reaction && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    <span className="text-base mr-1">{reaction.emoji}</span>
                    {reaction.label}
                  </span>
                </div>
              )}
              
              <p className="text-foreground mt-3">{review.comment}</p>
              
              {/* Feedback Categories */}
              {review.feedbackCategories && review.feedbackCategories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {review.feedbackCategories.map((category) => (
                    <span 
                      key={category} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                    >
                      <span className="mr-1">{category}</span>
                      {getCategoryLabel(category)}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Liked Features */}
              {review.likedFeatures && (
                <div className="mt-3 p-3 bg-muted/30 rounded-md">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">{review.userName.split(' ')[0]}</span> {t('reviews.liked')}: {review.likedFeatures}
                  </p>
                </div>
              )}
              
              {/* Photo */}
              {review.photoUrl && (
                <div className="mt-3">
                  <img
                    src={review.photoUrl}
                    alt="Review"
                    className="h-32 w-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;
