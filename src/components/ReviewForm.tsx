import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Lock, Camera, X, Loader2, ImagePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  addReview,
  canUserReviewProduct,
  setUserDiscount,
  ReactionType,
  FeedbackCategory,
  uploadReviewImage,
} from '@/services/reviewService';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ReviewFormProps {
  productId: number;
  onReviewAdded?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onReviewAdded,
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const auth = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [hover, setHover] = useState<number | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [canReview, setCanReview] = useState<boolean>(false);
  const [blockReason, setBlockReason] = useState<string>('');
  const [reaction, setReaction] = useState<ReactionType | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<FeedbackCategory[]>([]);
  const [likedFeatures, setLikedFeatures] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const reactions: { type: ReactionType; label: string }[] = [
    { type: '🥰', label: t('reviews.reactions.love') },
    { type: '😅', label: t('reviews.reactions.funny') },
    { type: '🤯', label: t('reviews.reactions.mind_blown') },
  ];
  
  const feedbackCategories: { type: FeedbackCategory; label: string }[] = [
    { type: '💸', label: t('reviews.categories.price') },
    { type: '⚙️', label: t('reviews.categories.quality') },
    { type: '🎨', label: t('reviews.categories.design') },
    { type: '🚀', label: t('reviews.categories.delivery') },
    { type: '📦', label: t('reviews.categories.packaging') },
    { type: '🛠', label: t('reviews.categories.usability') },
  ];

  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      const result = canUserReviewProduct(auth.user.uid, productId);
      setCanReview(result.canReview);
      setBlockReason(result.reason ? t(result.reason) : '');
    } else {
      setCanReview(false);
      setBlockReason(t('reviews.login_required'));
    }
  }, [auth.isLoggedIn, auth.user, productId, t]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_COMMENT_LENGTH = 1000;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: t('reviews.invalid_file_type_title'),
        description: t('reviews.invalid_file_type', { types: 'JPEG, PNG, WebP' }),
        variant: 'destructive',
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: t('reviews.file_too_large_title'),
        description: t('reviews.file_too_large', { size: '5MB' }),
        variant: 'destructive',
      });
      return;
    }

    setPhotoFile(file);
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!auth.isLoggedIn || !auth.user) {
      toast({
        title: t('reviews.error'),
        description: t('reviews.login_required'),
        variant: 'destructive',
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: t('reviews.error'),
        description: t('reviews.comment_required'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    let uploadedImageUrl = '';

    try {
      // Upload image if exists
      if (photoFile) {
        setIsUploading(true);
        setUploadProgress(0);
        
        const onProgress = (progress: number) => {
          setUploadProgress(progress);
        };
        
        uploadedImageUrl = await uploadReviewImage(photoFile, auth.user.uid, onProgress);
        setIsUploading(false);
      }

      const newReview = {
        productId,
        userId: auth.user.uid,
        userName: auth.user.displayName || t('reviews.anonymous'),
        rating,
        comment: comment.trim(),
        date: new Date(),
        photoUrl: uploadedImageUrl || undefined,
        isVerifiedPurchase: false,
        reaction: reaction || undefined,
        feedbackCategories: selectedCategories.length > 0 ? selectedCategories : undefined,
        likedFeatures: likedFeatures.trim() || undefined,
      };

      const result = await addReview(newReview);
      if (result) {
        // If it's a 5-star review, apply a one-time discount
        if (rating === 5) {
          await setUserDiscount(auth.user.uid);
        }

        toast({
          title: t('reviews.success_title'),
          description: t('reviews.success_message'),
        });

        // Reset form
        setRating(5);
        setComment('');
        setPhotoFile(null);
        setPhotoPreview('');
        setReaction(null);
        setSelectedCategories([]);
        setLikedFeatures('');
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Notify parent component
        onReviewAdded?.();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: t('reviews.error'),
        description: error instanceof Error ? error.message : t('reviews.submit_error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const toggleCategory = (category: FeedbackCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h3 className="text-lg font-medium">{t('reviews.write_review')}</h3>

      {!canReview && blockReason && (
        <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
          <Lock className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{blockReason}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label htmlFor="rating" className="block mb-2">
            {t('reviews.your_rating')}
          </Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                disabled={!canReview}
              >
                <Star
                  className={`h-8 w-8 ${
                    (hover || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Reaction */}
        <div>
          <Label className="block mb-2">
            {t('reviews.how_was_it')}
          </Label>
          <div className="flex flex-wrap gap-2">
            {reactions.map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => setReaction(type === reaction ? null : type)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full border transition-colors',
                  reaction === type
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-muted-foreground/30 hover:bg-muted/50',
                  !canReview && 'opacity-50 cursor-not-allowed'
                )}
                disabled={!canReview}
              >
                <span className="text-xl">{type}</span>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Categories */}
        <div>
          <Label className="block mb-2">
            {t('reviews.what_did_you_like')}
          </Label>
          <div className="flex flex-wrap gap-2">
            {feedbackCategories.map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleCategory(type)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors text-sm',
                  selectedCategories.includes(type)
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-muted-foreground/30 hover:bg-muted/50',
                  !canReview && 'opacity-50 cursor-not-allowed'
                )}
                disabled={!canReview}
              >
                <span>{type}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <div className="mt-4">
              <Label htmlFor="likedFeatures" className="block mb-2">
                {t('reviews.tell_us_more')}
              </Label>
              <Textarea
                id="likedFeatures"
                value={likedFeatures}
                onChange={(e) => setLikedFeatures(e.target.value)}
                placeholder={t('reviews.features_placeholder')}
                rows={2}
                disabled={!canReview}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {t('reviews.example')} "{t('reviews.example_text')}"
              </p>
            </div>
          )}
        </div>

        {/* Comment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="comment">
              {t('reviews.comment')}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <span className={`text-xs ${
              comment.length > MAX_COMMENT_LENGTH ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {comment.length}/{MAX_COMMENT_LENGTH}
            </span>
          </div>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('reviews.comment_placeholder')}
            rows={4}
            required
            disabled={!canReview || isUploading}
            className={cn(
              'min-h-[120px]',
              comment.length > MAX_COMMENT_LENGTH && 'border-destructive focus-visible:ring-destructive'
            )}
            maxLength={MAX_COMMENT_LENGTH}
          />
          {comment.length > MAX_COMMENT_LENGTH && (
            <p className="mt-1 text-sm text-destructive">
              {t('reviews.comment_too_long')}
            </p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {t('reviews.comment_help')}
          </p>
        </div>

        {/* Photo Upload */}
        <div>
          <Label htmlFor="photo-upload" className="block mb-2">
            {t('reviews.add_photo')} ({t('common.optional')})
            <span className="text-xs text-muted-foreground ml-1">
              ({t('reviews.max_size', { size: '5MB' })})
            </span>
          </Label>
          
          <input
            type="file"
            id="photo-upload"
            ref={fileInputRef}
            accept="image/jpeg, image/png, image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={!canReview || isUploading}
          />
          
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={!canReview || isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              {t('reviews.choose_photo')}
            </Button>
            
            {photoFile && (
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {photoFile.name}
              </span>
            )}
          </div>
          
          {isUploading && (
            <div className="mt-2 space-y-1">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {Math.round(uploadProgress)}% {t('common.uploading')}
              </p>
            </div>
          )}
          
          {photoPreview && (
            <div className="mt-3 relative inline-block group">
              <div className="relative">
                <img
                  src={photoPreview}
                  alt={t('reviews.photo_preview')}
                  className="h-32 w-32 object-cover rounded-md border shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-background rounded-full p-1.5 shadow-md border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  aria-label={t('common.remove')}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={
              !canReview || 
              !comment.trim() || 
              isSubmitting || 
              isUploading ||
              comment.length > MAX_COMMENT_LENGTH
            }
            className="w-full sm:w-auto"
          >
            {isSubmitting || isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('common.submitting')}
              </>
            ) : (
              t('reviews.submit')
            )}
          </Button>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setRating(5);
                  setComment('');
                  setPhotoFile(null);
                  setPhotoPreview('');
                  setReaction(null);
                  setSelectedCategories([]);
                  setLikedFeatures('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                disabled={isSubmitting || isUploading || (!comment && !photoPreview && rating === 5 && !reaction && selectedCategories.length === 0)}
                className="w-full sm:w-auto"
              >
                {t('common.clear')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('reviews.clear_form')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p className="flex items-start gap-1">
            <span className="text-destructive">*</span>
            <span>{t('common.required_fields')}</span>
          </p>
        </div>
      </form>
      </div>
    </TooltipProvider>
  );
};

export default ReviewForm;
