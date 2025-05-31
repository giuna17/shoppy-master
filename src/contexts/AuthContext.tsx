import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  User, 
  AuthContextType, 
  AuthContext, 
  useAuth 
} from './AuthContext.utils';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/services/firebase';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Map Firebase user to our User type
  const mapFirebaseUser = useCallback((firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;
    
    // Get photo URL from provider data if available
    let photoURL = firebaseUser.photoURL;
    if (firebaseUser.providerData && firebaseUser.providerData.length > 0) {
      // Try to get photo URL from the first provider
      const providerPhotoURL = firebaseUser.providerData[0]?.photoURL;
      if (providerPhotoURL) {
        // Use higher resolution photo if available
        photoURL = providerPhotoURL.includes('=s96-c')
          ? providerPhotoURL.replace('=s96-c', '=s400-c')
          : providerPhotoURL;
      }
    }
    
    console.log('Mapped user with photoURL:', {
      uid: firebaseUser.uid,
      photoURL,
      providerData: firebaseUser.providerData?.map(p => ({
        providerId: p.providerId,
        photoURL: p.photoURL
      }))
    });
    
    return {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      photoURL: photoURL,
      emailVerified: firebaseUser.emailVerified,
      phoneNumber: firebaseUser.phoneNumber,
      providerData: Array.from(firebaseUser.providerData || []),
      purchasedProducts: []
    };
  }, []);

  // Handle auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = mapFirebaseUser(firebaseUser);
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [mapFirebaseUser]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User is set via onAuthStateChanged, no need to set it here
      toast({
        title: t('auth.login_success'),
        description: t('auth.welcome', { name: userCredential.user.displayName || userCredential.user.email || '' }),
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.login_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // User is set via onAuthStateChanged, no need to set it here
      toast({
        title: t('auth.signup_success'),
        description: t('auth.welcome', { name }),
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.signup_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setIsLoggedIn(false);
      toast({
        title: t('auth.goodbye'),
        description: t('auth.logout_success'),
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: t('auth.error'),
        description: 'Failed to sign out',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      // Set custom parameters for Google Auth provider
      googleProvider.setCustomParameters({
        prompt: 'select_account',
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      if (credential) {
        // Get the Google Access Token
        const token = credential.accessToken;
        
        // Get the signed-in user info
        const user = result.user;
        
        // Ensure we have the photo URL
        if (user.providerData && user.providerData[0]?.photoURL) {
          // If the photo URL ends with '=s96-c', remove it to get a higher resolution image
          let photoURL = user.providerData[0].photoURL;
          if (photoURL.endsWith('=s96-c')) {
            photoURL = photoURL.replace('=s96-c', '=s400-c');
          }
          
          // Update the user's profile with the photo URL if it's not already set
          if (user.photoURL !== photoURL) {
            await updateProfile(user, { photoURL });
          }
        }
        
        toast({
          title: t('auth.login_success'),
          description: t('auth.welcome', { name: user.displayName || user.email || '' }),
        });
      }
    } catch (error: any) {
      console.error('Google signin error:', error);
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.google_signin_failed'),
        variant: 'destructive',
      });
      throw error;
    }
  };

  const hasUserPurchasedProduct = (productId: number): boolean => {
    if (!user) return false;
    return user.purchasedProducts.includes(productId);
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    loading,
    login,
    signUp,
    logout,
    signInWithGoogle,
    hasUserPurchasedProduct,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth };

function toast(arg0: { title: any; description: any; }) {
  throw new Error('Function not implemented.');
}

function t(arg0: string, p0?: { name: any; }) {
  throw new Error('Function not implemented.');
}

function mapFirebaseUser(user: FirebaseUser) {
  throw new Error('Function not implemented.');
}

