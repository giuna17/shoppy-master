// Utility function to clear any test reviews from localStorage
export const clearTestReviews = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('reviews');
    console.log('All reviews have been cleared from localStorage');
  }
};

// Uncomment the line below and run this file directly to clear reviews
// clearTestReviews();
