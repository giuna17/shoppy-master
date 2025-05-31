import cron from 'node-cron';
import { updateMostPopularProduct } from '../services/productViewService';
import { getMostPopularProduct } from '../services/productService';

// Schedule the job to run every day at midnight (0 0 * * *)
export const setupPopularProductCron = (): void => {
  console.log('Setting up popular product update cron job...');
  
  // Run at midnight every day
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('Running scheduled job: Updating most popular product...');
      updateMostPopularProduct();
      
      // Log the current most popular product for verification
      const popularProduct = getMostPopularProduct();
      if (popularProduct) {
        console.log(`Updated most popular product: ${popularProduct.name.en} (ID: ${popularProduct.id})`);
      } else {
        console.log('No popular product found or an error occurred');
      }
    } catch (error) {
      console.error('Error in popular product update cron job:', error);
    }
  }, {
    timezone: 'Asia/Tbilisi' // Set your timezone
  });

  console.log('Popular product update cron job scheduled to run daily at midnight');
};

// For testing purposes, you can run the update immediately
if (process.env.NODE_ENV === 'development') {
  console.log('Development mode: Running popular product update immediately...');
  updateMostPopularProduct();
}
