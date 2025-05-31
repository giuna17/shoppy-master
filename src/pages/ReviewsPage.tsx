import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReviewList from '@/components/ReviewList';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllReviews, Review } from '@/services/reviewService';
import { Button } from '@/components/ui/button';
import { Filter, Star, Calendar, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterType = {
  stars: number | null;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | null;
  hasPhotos: boolean | null;
};

const ReviewsPage = () => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterType>({
    stars: null,
    sortBy: null,
    hasPhotos: null,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample reviews data - in a real app, this would come from an API
  const allReviews = getAllReviews();

  const filteredReviews = useMemo(() => {
    let result = [...allReviews];

    // Filter by stars
    if (filters.stars !== null) {
      result = result.filter(
        (review) => Math.floor(review.rating) === filters.stars,
      );
    }

    // Filter by photos
    if (filters.hasPhotos !== null) {
      result = result.filter((review) =>
        filters.hasPhotos ? !!review.photoUrl : true,
      );
    }

    // Sort reviews
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          result.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
          break;
        case 'oldest':
          result.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
          break;
        case 'highest':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'lowest':
          result.sort((a, b) => a.rating - b.rating);
          break;
      }
    }

    return result;
  }, [allReviews, filters]);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters]);

  const toggleStarFilter = (star: number) => {
    setFilters((prev) => ({
      ...prev,
      stars: prev.stars === star ? null : star,
    }));
  };

  const toggleSort = (sortBy: 'newest' | 'oldest' | 'highest' | 'lowest') => {
    setFilters((prev) => ({
      ...prev,
      sortBy: prev.sortBy === sortBy ? null : sortBy,
    }));
  };

  const togglePhotosFilter = () => {
    setFilters((prev) => ({
      ...prev,
      hasPhotos: prev.hasPhotos === null ? true : null,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      stars: null,
      sortBy: null,
      hasPhotos: null,
    });
  };

  const hasActiveFilters =
    filters.stars !== null ||
    filters.sortBy !== null ||
    filters.hasPhotos !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-12 px-4 bg-background flex-grow">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 mt-6 relative z-10 font-medieval">
              <span className="text-crimson">{t('reviews.title_part1')}</span>{' '}
              <span className="text-white">{t('reviews.title_part2')}</span>
            </h1>

            {/* Filters Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                {t('reviews.filters')}
                {hasActiveFilters && (
                  <span className="ml-1 flex h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>

              {/* Filters Dropdown Content */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-card rounded-md shadow-lg border border-border z-10 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">{t('reviews.filters')}</h3>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs h-6 px-2 text-foreground/60 hover:text-foreground/90"
                      >
                        {t('reviews.clear_all')}
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {/* Star Rating Filter */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        {t('reviews.rating')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <Button
                            key={star}
                            variant={
                              filters.stars === star ? 'default' : 'outline'
                            }
                            size="sm"
                            className={cn(
                              'flex items-center gap-1 h-8',
                              filters.stars === star
                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                : '',
                            )}
                            onClick={() => toggleStarFilter(star)}
                          >
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs">{star}+</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        {t('reviews.sort_by')}
                      </h4>
                      <div className="space-y-2">
                        <Button
                          variant={
                            filters.sortBy === 'newest' ? 'default' : 'outline'
                          }
                          size="sm"
                          className={cn(
                            'w-full justify-start',
                            filters.sortBy === 'newest'
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : '',
                          )}
                          onClick={() => toggleSort('newest')}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {t('reviews.newest')}
                        </Button>
                        <Button
                          variant={
                            filters.sortBy === 'highest' ? 'default' : 'outline'
                          }
                          size="sm"
                          className={cn(
                            'w-full justify-start',
                            filters.sortBy === 'highest'
                              ? 'bg-primary/10 text-primary hover:bg-primary/20'
                              : '',
                          )}
                          onClick={() => toggleSort('highest')}
                        >
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-2" />
                          {t('reviews.highest_rated')}
                        </Button>
                      </div>
                    </div>

                    {/* Has Photos */}
                    <div>
                      <Button
                        variant={filters.hasPhotos ? 'default' : 'outline'}
                        size="sm"
                        className={cn(
                          'w-full justify-start',
                          filters.hasPhotos
                            ? 'bg-primary/10 text-primary hover:bg-primary/20'
                            : '',
                        )}
                        onClick={togglePhotosFilter}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        {t('reviews.with_photos')}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {filters.stars !== null && (
                  <div className="flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded-md">
                    {filters.stars}+ {t('reviews.stars')}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, stars: null }))
                      }
                    />
                  </div>
                )}

                {filters.sortBy === 'newest' && (
                  <div className="flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded-md">
                    {t('reviews.newest')}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, sortBy: null }))
                      }
                    />
                  </div>
                )}

                {filters.sortBy === 'highest' && (
                  <div className="flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded-md">
                    {t('reviews.highest_rated')}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, sortBy: null }))
                      }
                    />
                  </div>
                )}

                {filters.hasPhotos && (
                  <div className="flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded-md">
                    {t('reviews.with_photos')}
                    <X
                      className="w-3 h-3 ml-1 cursor-pointer"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, hasPhotos: null }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mt-8">
            <ReviewList reviews={filteredReviews} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
