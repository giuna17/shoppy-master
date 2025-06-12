// Define types for translations
type TranslationValue = 
  | { ru: string; en: string; ge: string }
  | string[]
  | string;

interface NestedTranslations {
  [key: string]: TranslationValue | NestedTranslations;
}

export type Translations = NestedTranslations;

// All translations go here
const translations: Translations = {
'favorites.login_required': {
    ru: 'Войдите, чтобы сохранять избранное',
    en: 'Please login to save favorites',
    ge: 'გთხოვთ შეხვიდეთ ფავორიტების შესანახად',
  },
  'nav.home': {
  'nav.shop': {
  'nav.about': {
  'nav.contact': {
  'nav.promo_code': {
  'promo.discount': {
  'nav.enter_promo': {
  'nav.faq': {
  'nav.categories': {
  'nav.cart': {
  'nav.profile': {
  'nav.profile_menu': {
  'nav.favorites': {
  'favorites.item': {
  'favorites.items': {
  'home.shop_now': {
  'home.our_story': {
  'home.subtitle': {
  'home.popular_products': {
  'home.view_all': {
  'footer.shop_link': {
  'footer.company': {
  'footer.info': {
  'footer.all_products': {
  'footer.bracelets': {
  'footer.necklaces': {
  'footer.rings': {
  'footer.candles': {
  'footer.about_us': {
  'footer.contact': {
  'footer.faq': {
  'footer.shipping': {
  'footer.handmade': {
  'footer.handmade_products': {
  'footer.other_products': {
  'common.close': {
  'delivery.title': {
  'delivery.description': {
  'footer.delivery': {
  'cart.delivery_fee': {
  'cart.free_delivery': {
  'cart.promo_info': {
  'cart.discount_10': {
  'cart.discount_5': {
  'cart.discount_5_review': {
  'cart.free_delivery_info': {
  'product.categories': {
  'products.zero': {
  'products.one': {
  'products.few': {
  'products.many': {
  'product.add_to_cart': {
  'product.featured': {
  'product.out_of_stock': {
  'favorites.added': {
  'favorites.added_description': {
  'favorites.remove': {
  'favorites.empty_title': {
  'favorites.empty_description': {
  'favorites.browse_shop': {
  'favorites.removed': {
  'favorites.removed_description': {
  'favorites.empty': {
  'favorites.title': {
  'product.in_cart': {
  'product.in_stock': {
  'product.discounted_products': {
  'product.no_discounted_products': {
  'recently_viewed': {
    label: {
    you_looked: {
    you_might_like: {
    dont_lose_it: {
    view_all: {
    empty_state: {
    view_shop: {
  'favorites.favorite': {
  'product.back_to_shop': {
  'product.details': {
  'product.detail_material': {
  'product.not_found': {
  'product.not_found_message': {
  'product.return_to_shop': {
  'product.no_products_found': {
  'product.detail_1': {
  'product.detail_2': {
  'product.detail_3': {
  'product.detail_4': {
  'product.remaining_stock': {
  'filters.availability': {
  'product.no_stock': {
  'product.stock_warning': {
  'home.most_popular': {
  'product.most_viewed': {
  'product.discounts': {
  'product.coming_soon_discounted': {
  'filters.title': {
  'filters.most_popular': {
  'filters.discounts': {
  'filters.price': {
  'filters.categories': {
  'filters.materials': {
  'filters.in_stock': {
  'filters.out_of_stock': {
  'filters.on_sale': {
  'filters.apply': {
  'filters.handmade': {
  'filters.other': {
  'common.apply': {
  'promo.have_code': {
  'promo.want_discount': {
  'promo.how_to_get': {
  'promo.social_codes': {
  'promo.over_500': {
  'promo.over_200': {
  'promo.over_100': {
  'promo.facebook': {
  'promo.instagram': {
  'promo.discount_info_title': {
  'promo.follow_us_for_discounts': {
  'sort.by_price_low_high': {
  'sort.by_price_high_low': {
  'filters.reset': {
  'filters.special_offers': {
  'filters.reset_all': {
  'filters.show': {
  'filters.hide': {
  'category.all': {
  'category.bracelets': {
  'category.rings': {
  'category.earrings': {
  'category.chokers': {
  'category.hairpins': {
  'category.candles': {
  'category.accessories': {
  'category.necklaces': {
  'category.bracelet': {
  'category.keychains': {
  'category.ring': {
  'category.earring': {
  'category.choker': {
  'category.hairpin': {
  'category.candle': {
  'category.necklace': {
  'material.metal': {
  'material.silver': {
  'material.gold': {
  'material.leather': {
  'material.fabric': {
  'material.glass': {
  'material.wood': {
  'material.wax': {
  'toast.added_to_cart': {
  'toast.added_to_cart_description': {
  'toast.stock_limit_reached': {
  'toast.stock_limit_message': {
  'reviews.title_part1': {
  'reviews.title_part2': {
  'reviews.leave_review': {
  'reviews.rating': {
  'reviews.comment': {
  'reviews.comment_placeholder': {
  'reviews.photo_url': {
  'reviews.photo_url_placeholder': {
  'reviews.submit': {
  'reviews.review': {
  'reviews.reviews': {
  'reviews.no_reviews': {
  'reviews.customer_reviews': {
  'reviews.view_all': {
  'reviews.success': {
  'reviews.thank_you': {
  'reviews.error': {
  'reviews.comment_required': {
  'reviews.rating_required': {
  'reviews.must_purchase': {
  'reviews.already_reviewed': {
  'reviews.must_purchase_message': {
  'reviews.verified_only': {
  'reviews.leave_good_review_discount': {
  'reviews.write_review': {
  'reviews.your_rating': {
  'reviews.how_was_it': {
  'reactions.love': {
  'reactions.funny': {
  'reactions.mind_blown': {
  'reviews.what_did_you_like': {
  'reviews.categories.price': {
  'reviews.categories.quality': {
  'reviews.categories.design': {
  'reviews.categories.delivery': {
  'reviews.categories.packaging': {
  'reviews.categories.usability': {
  'reviews.tell_us_more': {
  'reviews.features_placeholder': {
  'reviews.example': {
  'reviews.example_text': {
  'reviews.liked': {
  'reviews.reactions.love': {
  'reviews.reactions.funny': {
  'reviews.reactions.mind_blown': {
  'reviews.success_title': {
  'reviews.success_message': {
  'reviews.submit_error': {
  'reviews.filters': {
  'reviews.clear_all': {
  'reviews.comment_help': {
  'reviews.max_size': {
  'reviews.choose_photo': {
  'reviews.add_photo': {
  'common.optional': {
  'common.clear': {
  'common.required_fields': {
  'reviews.sort_by': {
  'reviews.newest': {
  'reviews.highest_rated': {
  'reviews.with_photos': {
  'reviews.stars': {
  'cart.title': {
  'cart.item': {
  'cart.items': {
  'cart.empty': {
  'cart.subtotal': {
  'cart.shipping': {
  'cart.free': {
  'cart.discount_applied': {
  'cart.total': {
  'cart.checkout': {
  'cart.empty_title': {
  'cart.empty_description': {
  'cart.continue_shopping': {
  'cart.add_more_for_free_delivery': {
  'cart.empty_cart_title': {
  'cart.empty_cart_message': {
  'cart.remove': {
  'similar.products': {
  'product.hide_details': {
  'product.details.handmade': {
  'product.details.style': {
  'product.details.made_by': {
  'product.quality': {
  'cart.quantity': {
  'cart.update': {
  'auth.sign_in': {
  'auth.signing_in': {
  'auth.sign_up': {
  'auth.sign_out': {
  'auth.email': {
  'auth.password': {
  'auth.name': {
  'auth.continue_with': {
  'auth.google': {
  'auth.facebook': {
  'auth.no_account': {
  'auth.already_account': {
  'auth.forgot_password': {
  'auth.or': {
  'auth.profile': {
  'auth.welcome': {
  'auth.login_success': {
  'auth.logout_success': {
  'auth.signup_success': {
  'auth.login_failed': {
  'checkout.login_with_google': {
  'auth.signup_failed': {
  'auth.error': {
  'auth.goodbye': {
  'reviews.login_required': {
  'about.title': {
  'about.intro': {
  'about.quote': {
  'about.philosophy_title': {
  'about.philosophy_text': {
  'about.craftsmanship_title': {
  'about.craftsmanship_text': {
  'about.join_title': {
  'about.join_text': {
  'about.closing': {
  'faq.title': {
  'faq.subtitle': {
  'faq.q1.question': {
  'faq.q1.answer': {
  'faq.q2.question': {
  'faq.q2.answer': {
  'faq.q3.question': {
  'faq.q3.answer': {
  'faq.q4.question': {
  'faq.q4.answer': {
  'faq.q5.question': {
  'faq.q5.answer': {
  'faq.needHelp': {
  'faq.contactUs': {
  'contact.title': {
  'contact.us': {
  'contact.get_in_touch': {
  'contact.questions': {
  'contact.collaboration': {
  'contact.telegram': {
  'contact.telegram_username': {
  'contact.email_address': {
  'contact.submit': {
  'contact.social_media': {
  'contact.first_name': {
  'contact.last_name': {
  'contact.email': {
  'contact.message': {
  'contact.first_name_placeholder': {
  'contact.last_name_placeholder': {
  'contact.email_placeholder': {
  'contact.message_placeholder': {
  'contact.send_message': {
  'contact.message_sent': {
  'contact.message_received': {
  'contact.sending': {
  'contact.error': {
  'contact.error_message': {
  'contact.error_name_required': {
  'contact.error_email_invalid': {
  'contact.error_message_required': {
  'contact.error_configuration': {
  'product.details.material': {
  'product.details.stainless_steel': {
  'product.details.chain_length': {
  'product.details.pendant_size': {
  'product.details.cm': {
  'profile.purchases': {
  'profile.reviews': {
  'profile.pending_reviews': {
  'profile.purchase_history': {
  'profile.recent_purchases': {
  'profile.my_reviews': {
  'profile.reviews_description': {
  'profile.no_purchases': {
  'profile.no_reviews': {
  'profile.view_product': {
  'profile.no_pending_reviews': {
  language: {
  'profile.address': {
  'profile.address_description': {
  'profile.city': {
  'profile.tbilisi': {
  'profile.only_tbilisi': {
  'profile.address_field': {
  'profile.address_placeholder': {
  'profile.phone': {
  'profile.phone_placeholder': {
  'profile.save': {
  'profile.saved': {
  'profile.edit': {
  'custom_order.title': {
  'custom_order.description': {
  'custom_order.social_links': {
  'custom_order.button': {
  'home.search_placeholder': {
  'shop.search_title': {
  'shop.custom_design_title': {
  'shop.custom_design_button': {
  'footer.shop': {
  'footer.alternative_jewelry': {
  'reviews.testimonials': {
  'most_popular': {
  'profile.fill_address_warning': {
  'checkout.optional': {
  'checkout.comment': {
  'checkout.comment_placeholder': {
  'checkout.title': {
  'checkout.subtitle': {
  'checkout.delivery_info': {
  'checkout.name': {
  'checkout.name_placeholder': {
  'checkout.email': {
  'checkout.email_placeholder': {
  'checkout.phone': {
  'checkout.phone_placeholder': {
  'checkout.city': {
  'checkout.district': {
  'checkout.district_placeholder': {
  'checkout.building': {
  'checkout.building_placeholder': {
  'checkout.floor': {
  'checkout.floor_placeholder': {
  'checkout.apartment': {
  'checkout.apartment_placeholder': {
  'checkout.address': {
  'checkout.address_placeholder': {
  'checkout.processing': {
  'checkout.order_summary': {
  'auth.sign_in_with_google': {
  'common.back_to_home': {
  'checkout.only_tbilisi': {
  'checkout.required_field': {
  'checkout.select_city': {
  'purchase_messages': [
    '🎯 Quest completed: [Purchase successful].',
    '🔓 Unlocked: New equipment item.',
    '🗃️ Added to inventory. Use wisely.',
    '🧩 You found hidden loot. Not everyone gets this far.',
    '🎲 The odds were in your favor. Epic drop!',
    '👣 You chose the path. This item is now part of your story.',
    '⚗️ Crafted something worthy. Let\'s test it in battle.',
    '🛠️ Your build is looking serious now.',
    '👁️ You saw potential where others passed by.',
    '🕹️ Equipment slot filled. Time to take the next step.',
    '💾 Progress saved. No turning back now.',
    '💣 This is not just an item — it\'s your advantage.',
    '👑 Purchase confirmed. Prestige +1.',
    '📡 Signal received. Artifact en route to your world.',
    '⚔️ Combat rating increased. You\'re ready for the next wave.',
    '🎮 Item received. Rarity: Unique.',
    '📦 You unlocked a new ally.',
    '⚙️ You activated an artifact. Now to figure out what it does.',
    '🛡️ This is not just gear. It\'s a buff to your style.',
    '🔥 Inventory updated. Someone just got stronger.',
    '🕶️ Stylish. Dangerous. Yours.',
    '💬 NPCs are jealous. You\'re the main character now.',
    '🌌 You pulled an artifact from another reality. Must-have.',
    '🧠 +10 to charisma. The rest will follow.',
    '🚀 You didn\'t just choose a product. You chose an upgrade.',
    '🔮 Item bound to owner. No returns.',
    '🎮 Loot secured. Mission accomplished.',
    '📖 A new chapter begins with this purchase.',
    '⚡ You received ⚡ buff: Confidence +25%',
    '🛰️ Your signal received. Delivery launched from the stratosphere.',
    '🧤 The power is in the details. And you\'ve got it all.',
    '🪙 You spent coins. Got a legend.',
    '🚫 You\'re no longer the one who watched. You\'re the one who chose.',
    '🗡️ Something ominously good in your inventory.',
    '🎯 You never miss. And this choice is no exception.',
    '📡 Interdimensional delivery activated. Prepare your slot.',
    '🎖️ Achievement unlocked: Good taste.',
    '🕳️ You looked into the black box... and took the best.',
    '🎁 You didn\'t just order. You summoned this.',
    '👤 They\'ll be asking: where did you get that?'
  ],
  'checkout.complete_order': {
  'checkout.empty_cart': {
  'checkout.add_items': {
  'checkout.continue_shopping': {
  'checkout.login_required': {
  'checkout.login_prompt': {
  'profile.go_to_address': {
  'footer.terms': {
  'categories.handmade': {
  'categories.other': {
  'cart.decrease_quantity': {
  'cart.increase_quantity': {
  'cart.delivery': {
  'cart.success': {
  'product.items': {
  'product.our_story': {
  'product.no_reviews': {
  'product.image_not_available': {
};

// Export the translations
export default translations;
