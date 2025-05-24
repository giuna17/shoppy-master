import { Product } from './productService';
import { hasUserPurchasedProduct } from './orderService';
import { addDiscount, getUserDiscounts } from './discountService';

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
  photoUrl?: string;
  isVerifiedPurchase: boolean;
}

// No initial reviews - only real user-submitted reviews will be stored
const initialReviews: Review[] = [];

// Load reviews from localStorage
export const loadReviews = (): Review[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load reviews:', error);
    return [];
  }
};

// Save reviews to localStorage
const saveReviews = (reviews: Review[]) => {
  localStorage.setItem('reviews', JSON.stringify(reviews));
};

// Initialize reviews from storage
let reviews: Review[] = loadReviews();

// Get all reviews
export const getAllReviews = (): Review[] => {
  return [...reviews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

// Get reviews for a specific product
export const getProductReviews = (productId: number): Review[] => {
  return reviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get top-rated reviews for featured display
export const getTopReviews = (limit: number = 3): Review[] => {
  return [...reviews].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

// Check if user has already reviewed a product
export const hasUserReviewedProduct = (
  userId: number,
  productId: number,
): boolean => {
  return reviews.some(
    (review) => review.userId === userId && review.productId === productId,
  );
};

interface ReviewCheckResult {
  canReview: boolean;
  reason?: string;
}

// Check if user can review a product
export const canUserReviewProduct = (
  userId: number,
  productId: number,
): ReviewCheckResult => {
  // Проверяем, купил ли пользователь товар
  if (!hasUserPurchasedProduct(userId, productId)) {
    return {
      canReview: false,
      reason: 'reviews.must_purchase',
    };
  }

  // Проверяем, не оставлял ли пользователь уже отзыв (только по реальным отзывам)
  const userReviewExists = reviews.some(
    (r) => r.userId === userId && r.productId === productId,
  );
  if (userReviewExists) {
    return {
      canReview: false,
      reason: 'reviews.already_reviewed',
    };
  }

  return { canReview: true };
};

// Add a new review with validation
export const addReview = (
  reviewData: Omit<Review, 'id' | 'isVerifiedPurchase'>,
): Review | null => {
  // Prevent test or fake reviews
  if (!reviewData.userId || !reviewData.userName || !reviewData.comment) {
    console.error('Invalid review data: Missing required fields');
    return null;
  }

  // Validate comment length and content
  const trimmedComment = reviewData.comment.trim();
  if (trimmedComment.length < 10 || trimmedComment.length > 1000) {
    console.error('Invalid review: Comment must be between 10 and 1000 characters');
    return null;
  }
  
  // Validate rating
  if (!Number.isInteger(reviewData.rating) || reviewData.rating < 1 || reviewData.rating > 5) {
    console.error('Invalid review: Rating must be an integer between 1 and 5');
    return null;
  }
  
  // Check for suspicious patterns in username and comment
  const suspiciousPatterns = [
    'test', 'admin', 'user', 'reviewer', 'tester', 'fake', 'example', 'sample'
  ];
  
  const nameLower = reviewData.userName.toLowerCase();
  const commentLower = trimmedComment.toLowerCase();
  
  // Check for suspicious content
  const hasSuspiciousContent = [nameLower, commentLower].some(text => 
    suspiciousPatterns.some(pattern => text.includes(pattern))
  );
  
  if (hasSuspiciousContent) {
    console.error('Suspicious content detected in review');
    return null;
  }
  
  // Check for generic or spammy content
  const genericComments = [
    'great', 'good', 'nice', 'excellent', 'perfect', 'awesome', 'amazing',
    'love it', 'super', 'wow', 'cool', 'best', 'recommend', '5 stars'
  ];
  
  const isGeneric = genericComments.some(term => 
    commentLower === term || commentLower.split(/\s+/).length < 3
  );
  
  if (isGeneric) {
    console.error('Review is too generic or lacks detail');
    return null;
  }
  // Проверяем возможность оставить отзыв
  const { canReview, reason } = canUserReviewProduct(
    reviewData.userId,
    reviewData.productId,
  );

  if (!canReview) {
    throw new Error(reason);
  }

  // Создаем новый отзыв
  const newReview = {
    ...reviewData,
    id: Math.max(0, ...reviews.map((r) => r.id)) + 1,
    isVerifiedPurchase: true,
  };

  reviews = [newReview, ...reviews];
  saveReviews(reviews);

  // Если отзыв 5 звезд - даем скидку
  if (reviewData.rating === 5) {
    // Проверяем, нет ли уже активной скидки за отзыв
    const userDiscounts = getUserDiscounts(reviewData.userId);
    const hasReviewDiscount = userDiscounts.some((d) => d.type === 'review');

    if (!hasReviewDiscount) {
      addDiscount(reviewData.userId, 'review', 5); // 5% скидка за отзыв
    }
  }

  return newReview;
};

// Calculate average rating for a product
export const getProductAverageRating = (productId: number): number => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};

// Get user's reviews
export const getUserReviews = (userId: number): Review[] => {
  return reviews
    .filter((review) => review.userId === userId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get products awaiting review
export const getProductsAwaitingReview = (userId: number): number[] => {
  const userReviews = new Set(
    reviews
      .filter((review) => review.userId === userId)
      .map((review) => review.productId),
  );

  // Получаем все купленные товары, на которые еще нет отзыва
  return Array.from(
    new Set(
      Array.from({ length: 10 }, (_, i) => i + 1) // Предполагаем, что у нас есть товары с ID от 1 до 10
        .filter(
          (productId) =>
            hasUserPurchasedProduct(userId, productId) &&
            !userReviews.has(productId),
        ),
    ),
  );
};

// Simple function to update product model with filter functionality
export const applyFilters = (
  products: Product[],
  filters: {
    priceRange?: [number, number];
    categories?: string[];
    inStock?: boolean;
    onSale?: boolean;
  },
): Product[] => {
  return products.filter((product) => {
    // Price filter
    if (
      filters.priceRange &&
      (product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1])
    ) {
      return false;
    }

    // Category filter
    if (
      filters.categories &&
      filters.categories.length > 0 &&
      !filters.categories.some(cat => 
        product.category.toLowerCase().includes(cat.toLowerCase())
      )
    ) {
      return false;
    }

    // Stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }

    // On Sale filter
    if (filters.onSale && !product.onSale) {
      return false;
    }

    return true;
  });
};

// Скидка за 5-звёздочный отзыв (одноразовая)
export const setUserDiscount = (userId: number) => {
  localStorage.setItem(`discountForUser_${userId}`, 'true');
};
export const hasUserDiscount = (userId: number) => {
  return localStorage.getItem(`discountForUser_${userId}`) === 'true';
};
export const clearUserDiscount = (userId: number) => {
  localStorage.removeItem(`discountForUser_${userId}`);
};
