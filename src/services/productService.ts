export interface Product {
  id: number;
  name: {
    ru: string;
    en: string;
    ge: string;
  };
  description: {
    ru: string;
    en: string;
    ge: string;
  };
  price: number;
  currency: string;
  images: string[];
  category: string;
  featured?: boolean;
  stock: number;
  materials: string[];
  colors: string[];
  onSale?: boolean;
}

const products: Product[] = [

  {
    id: 25,
    name: {
      ru: 'Браслет "Рок-Скелет"',
      en: 'Bracelet "Rock Skeleton"',
      ge: 'სახვური "როკ-ჩონგური"',
    },
    description: {
      ru: 'Этот уникальный браслет состоит из стильного кожаного ремешка и оригинальной подвески в виде скелета, играющего на электрогитаре. Кулон выполнен под состаренную бронзу или латунь, придавая изделию винтажный и брутальный вид. Браслет "Рок-Скелет" — идеальный выбор для любителей рок-музыки, готической эстетики и необычных аксессуаров. Он станет ярким акцентом в повседневном образе, подчеркнет индивидуальность и страсть к неформальному стилю. Также это отличный подарок для музыкантов, фанатов рока и всех, кто ценит креативные и запоминающиеся украшения. Регулируемая застежка обеспечивает комфортное ношение.',
      en: 'This unique bracelet features a stylish leather strap and an original pendant in the shape of a skeleton playing an electric guitar. The pendant is made to resemble aged bronze or brass, giving the piece a vintage and brutal look. The "Rock Skeleton" bracelet is the perfect choice for rock music lovers, gothic aesthetics enthusiasts, and those who appreciate unusual accessories. It will become a striking accent in your everyday look, emphasizing individuality and passion for informal style. Also makes a great gift for musicians, rock fans, and anyone who values creative and memorable jewelry. The adjustable clasp ensures comfortable wear.',
      ge: 'ეს უნიკალური სამაჯური შედგება სტილური ტყავის ზოლისა და ორიგინალური ქანდაკებისგან, რომელიც ელექტრო გიტარაზე დაკვრილ სკელეტს გამოსახავს. ქანდაკება დამზადებულია ძველი ბრინჯაოს ან თითბრის იმიტაციით, რაც ნაწარმს ვინტაჟურსა და უხეშ იერს აძლევს. სამაჯური "როკ-ჩონგური" არის იდეალური არჩევანი როკ-მუსიკის მოყვარულთათვის, გოთური ესთეტიკის მოყვარულთათვის და უჩვეულო აქსესუარების მოყვარულთათვის. ის გახდება ნათელი აქცენტი თქვენს ყოველდღიურ იერსახეს, ხაზს გაუსვამს ინდივიდუალურობასა და ვნებას არაფორმალური სტილის მიმართ. ასევე შესანიშნავი საჩუქარია მუსიკოსებისთვის, როკის გულშემატკივრებისთვის და ყველა მათთვის, ვინც აფასებს კრეატიულ და დამახსოვრებად ნაჭუჭს. რეგულირებადი საკინაფარი უზრუნველყოფს კომფორტულ ტარებას.',
    },
    price: 30,
    currency: '₾',
    images: [
      '/lovable-uploads/494572321_1695262911380497_3159085465488947786_n.jpg',
      '/lovable-uploads/494572321_1695262911380497_3159085465488947786_n_2.jpg'
    ],
    category: 'bracelets',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Бронза'],
  },
  
  {
    id: 24,
    name: {
      ru: 'Браслет "Регги"',
      en: 'Bracelet "Reggae"',
      ge: 'სახვური "რეგი"',
    },
    description: {
      ru: 'Этот стильный браслет выполнен из кожи и украшен крупной металлической подвеской в виде стилизованного листа. Подвеска имеет винтажный вид под состаренную бронзу, что придает браслету особый шарм и индивидуальность. Браслет "Регги" идеально подойдет для тех, кто ценит свободный дух, любит музыку в стиле регги, хиппи-эстетику или просто ищет оригинальный аксессуар, который подчеркнет его уникальность. Он прекрасно дополнит повседневный образ, добавив ему непринужденности и расслабленности. Регулируемая застежка обеспечивает комфортную посадку на любое запястье. Отличный подарок для друзей и близких, разделяющих схожие интересы.',
      en: 'This stylish bracelet is made of leather and adorned with a large metal pendant in the shape of a stylized leaf. The pendant has a vintage, aged bronze finish that gives the bracelet a special charm and individuality. The "Reggae" bracelet is perfect for those who appreciate a free spirit, love reggae music, hippie aesthetics, or are simply looking for a unique accessory that emphasizes their uniqueness. It will perfectly complement a casual look, adding ease and relaxation. The adjustable clasp ensures a comfortable fit for any wrist. A great gift for friends and loved ones who share similar interests.',
      ge: 'ეს სტილური სამაჯური დამზადებულია ტყავისგან და დეკორირებულია დიდი ზომის მეტალის ქანდაკებით, რომელიც სტილიზებულ ფოთლს წააგავს. ქანდაკებას აქვს ვინტაჟური, დაძველებული ბრინჯაოს ეფექტი, რაც სამაჯურს განსაკუთრებულ მიმზიდველობასა და ინდივიდუალურობას აძლევს. სამაჯური "რეგი" იდეალურია მათთვის, ვინც აფასებს თავისუფალ სულს, უყვარს რეგის მუსიკა, ჰიპის ესთეტიკა ან უბრალოდ ეძებს ორიგინალურ აქსესუარს, რომელიც მათ უნიკალურობას ხაზს გაუსვამს. ის შესანიშნავად შეავსებს ყოველდღიურ იერს, დაუმატებს მას უსათამაშობობას და დამშვიდობებას. რეგულირებადი საკინაფარი უზრუნველყოფს კომფორტულ მორგებას ნებისმიერი მაჯისთვის. შესანიშნავი საჩუქარი მეგობრებისთვის და ნათესავებისთვის, რომლებიც მსგავს ინტერესებს იზიარებენ.',
    },
    price: 22,
    currency: '₾',
    images: [
      '/lovable-uploads/494573304_1210713720698628_5887406144073799270_n.jpg',
      '/lovable-uploads/494573304_1210713720698628_5887406144073799270_n_2.jpg'
    ],
    category: 'bracelets',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Коричневый', 'Бронза'],
  },
  
  {
    id: 23,
    name: {
      ru: 'Браслет "Крест Защитника"',
      en: 'Bracelet "Defender\'s Cross"',
      ge: 'სახვური "მცველის ჯვარი"',
    },
    description: {
      ru: 'Этот элегантный и мистический браслет представляет собой широкий ремешок из кожи, к которому прикреплен крупный кулон в виде стилизованного креста с винтажным орнаментом. Металлический кулон выполнен под старинную бронзу или латунь, придавая изделию особую атмосферу таинственности и древности. Идеальный аксессуар для тех, кто ценит необычные детали и хочет подчеркнуть свою индивидуальность.',
      en: 'This elegant and mystical bracelet features a wide leather strap with a large pendant in the form of a stylized cross with a vintage pattern. The metal pendant is made to resemble antique bronze or brass, giving the piece a special atmosphere of mystery and antiquity. A perfect accessory for those who appreciate unusual details and want to emphasize their individuality.',
      ge: 'ეს ელეგანტური და მისტიკური სამაჯური წარმოადგენს ფართო ტყავის ზოლს, რომელზეც მიმაგრებულია დიდი ზომის ქანდაკება სტილიზებული ჯვრის სახით ვინტაჟური ორნამენტით. მეტალის ქანდაკება დამზადებულია ძველი ბრინჯაოს ან თითბრის იმიტაციით, რაც ნაწარმს საიდუმლოებით და უძველესი დროის ატმოსფეროს აძლევს. იდეალური აქსესუარი მათთვის, ვინც აფასებს არაჩვეულებრივ დეტალებს და სურს ხაზი გაუსვას საკუთარ ინდივიდუალურობას.',
    },
    price: 28,
    currency: '₾',
    images: [
      '/lovable-uploads/494356912_2907248866121505_2657667423894533600_n.jpg',
      '/lovable-uploads/494356912_2907248866121505_2657667423894533600_n_2.jpg'
    ],
    category: 'bracelets',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Коричневый', 'Бронза'],
  },
  
  {
    id: 26,
    name: {
      ru: 'Браслет "Рок-Легенда"',
      en: 'Bracelet "Rock Legend"',
      ge: 'სახვური "როკ-ლეგენდა"',
    },
    description: {
      ru: 'Этот брутальный и стильный браслет выполнен из высококачественной черной кожи и украшен металлическими люверсами, через которые продеты две изящные цепочки. Дизайн браслета вдохновлен рок-эстетикой и станет идеальным аксессуаром для тех, кто ценит индивидуальность и дерзкий стиль. Он отлично дополнит повседневный образ, добавив ему нотку бунтарства, а также будет уместен на рок-концерте или тематической вечеринке. Надежная застежка обеспечит комфортное ношение. Подходит как мужчинам, так и женщинам.',
      en: 'This brutal and stylish bracelet is made of high-quality black leather and decorated with metal eyelets, through which two elegant chains are threaded. The bracelet design is inspired by rock aesthetics and will be the perfect accessory for those who value individuality and bold style. It will perfectly complement your everyday look, adding a touch of rebellion, and will also be appropriate at a rock concert or themed party. The reliable clasp ensures comfortable wear. Suitable for both men and women.',
      ge: 'ეს უხეში და სტილური სამაჯური დამზადებულია მაღალი ხარისხის შავი ტყავისგან და დეკორირებულია მეტალის ხვრელებით, რომლებშიც ორი ელეგანტური ჯაჭვია გავლებული. სამაჯურის დიზაინი შთაგონებულია როკ-ესთეტიკით და იქნება იდეალური აქსესუარი მათთვის, ვინც ფასობს ინდივიდუალურობას და თამამ სტილს. ის შესანიშნავად შეავსებს თქვენს ყოველდღიურ იერს, დაუმატებს მას აჯანყების შეფერილობას და ასევე შესაფერისი იქნება როკ-კონცერტზე ან თემატურ წვეულებაზე. საიმედო საკინაფარი უზრუნველყოფს კომფორტულ ტარებას. შესაფერისია როგორც ქალების, ისე მამაკაცებისთვის.',
    },
    price: 25,
    currency: '₾',
    images: [
      '/lovable-uploads/494358890_1385872359349954_8620536579018894230_n.jpg',
      '/lovable-uploads/494358890_1385872359349954_8620536579018894230_n_2.jpg'
    ],
    category: 'bracelets',
    stock: 1,
    featured: true,
    materials: ['Натуральная кожа', 'Металл'],
    colors: ['Черный', 'Серебро'],
  },
  
  {
    id: 19,
    name: {
      ru: 'Серьги "Солнечный свет"',
      en: 'Earrings "Sunlight"',
      ge: 'საყურეები "მზის შუქი"',
    },
    description: {
      ru: 'Элегантные серьги с изящными подвесками в форме солнца, воплощающие тепло, свет и утонченную красоту. Их сияние добавит образу изысканности, а лёгкое покачивание при движении создаст эффект живого блеска.\n\nИдеальное украшение для вечернего выхода, романтического свидания или особого события. Несмотря на выразительный дизайн, серьги остаются лёгкими и комфортными, что делает их отличным выбором для длительного ношения.\n\nПозвольте себе блистать, словно солнечный луч, с каждым шагом!',
      en: 'Elegant earrings with graceful sun-shaped pendants, embodying warmth, light, and refined beauty. Their radiance will add sophistication to your look, while the gentle sway with movement creates a living sparkle effect.\n\nPerfect for evening outings, romantic dates, or special occasions. Despite their expressive design, the earrings remain light and comfortable, making them an excellent choice for extended wear.\n\nLet yourself shine like a sunbeam with every step!',
      ge: 'ელეგანტური საყურეები დახვეწილი მზის ფორმის ჩამოკიდებულებებით, რომლებიც განასახიერებენ სითბოს, სინათლეს და დახვეწილ სილამაზეს. მათი ბრწყინვალება დაამატებს თქვენს იერსებას დახვეწილობას, ხოლო მსუბუქი ქანაობა მოძრაობისას შექმნის ცოცხალი ბზინვარების ეფექტს.\n\nიდეალურია საღამოს გასვლისთვის, რომანტიკული პაემნისთვის ან განსაკუთრებული ღონისძიებისთვის. გამომხატველი დიზაინის მიუხედავად, საყურეები რჩება მსუბუქი და კომფორტული, რაც მათ შესანიშნავ არჩევანს ხდის ხანგრძლივი ტარებისთვის.\n\nნება მოგეცეთ საკუთარ თავს ისე ინათოთ, როგორც მზის სხივი, ყოველი ნაბიჯით!',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356262_714391001147663_7135250089724160584_n.jpg',
      '/lovable-uploads/494356262_714391001147663_7135250089724160584_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл с золотым покрытием'],
    colors: ['Золотой'],
  },
  {
    id: 20,
    name: {
      ru: 'Серьги "Полумесяц Луны"',
      en: 'Earrings "Moon Crescent"',
      ge: 'საყურეები "მთვარის ნახევარმთვარე"',
    },
    description: {
      ru: 'Нежные и утончённые серьги, вдохновлённые волшебством ночного неба. Изящная форма полумесяца придаёт образу загадочности и романтики, подчёркивая индивидуальность и внутреннюю гармонию.\n\nДобавят изысканности как повседневному наряду, так и вечернему образу. Лёгкие и удобные, они станут вашим спутником в любой день — от деловых встреч до тихих вечерних прогулок под звёздами.\n\nПусть лунный свет всегда будет с вами — в каждом движении и каждом взгляде.',
      en: 'Delicate and sophisticated earrings inspired by the magic of the night sky. The graceful crescent moon shape adds an air of mystery and romance to your look, emphasizing individuality and inner harmony.\n\nThey will add elegance to both casual and evening outfits. Lightweight and comfortable, they will become your companion for any occasion — from business meetings to quiet evening walks under the stars.\n\nLet the moonlight always be with you — in every movement and every glance.',
      ge: 'ნაზი და დახვეწილი საყურეები, შთაგონებული ღამის ცის მაგიით. მოხდენილი ნახევარმთვარის ფორმა თქვენს იმიჯს საიდუმლოებასა და რომანტიკას ამატებს, ხაზს უსვამს ინდივიდუალობასა და შინაგან ჰარმონიას.\n\nდაუმატებს დახვეწილობას როგორც ყოველდღიურ, ისე საღამოს ტანსაცმელს. მსუბუქი და კომფორტული, ისინი გახდება თქვენი თანამგზავრი ნებისმიერ დღეს — ბიზნეს შეხვედრებიდან ვარსკვლავების ქვეშ ჩუმ ღამის ფრიადამდე.\n\nნება მთვარის შუქმა ყოველთვის იყოს თქვენთან — ყოველ მოძრაობაში და თვალისჩამომშრალი ყოველ შეხედვაში.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494356774_1769263413996811_5281240654920214474_n.jpg',
      '/lovable-uploads/494356774_1769263413996811_5281240654920214474_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Сплав металла', 'Искусственные кристаллы'],
    colors: ['Фиолетовый', 'Серебро'],
  },
  {
    id: 21,
    name: {
      ru: 'Серьги "Короткая Луна"',
      en: 'Earrings "Short Moon"',
      ge: 'საყურეები "მოკლე მთვარე"',
    },
    description: {
      ru: 'Стильные и лаконичные серьги с изящным акцентом в виде полумесяца. Их минималистичный дизайн делает украшение универсальным — они идеально впишутся как в повседневный образ, так и в наряд для особого случая.\n\nСдержанный блеск и плавные линии луны добавляют утончённости и лёгкой загадочности. Легкие, удобные и почти невесомые — идеально подходят для длительного ношения без дискомфорта.\n\n"Короткая Луна" — когда стиль говорит за тебя.',
      en: 'Stylish and concise earrings with an elegant crescent moon accent. Their minimalist design makes the jewelry versatile — they will perfectly fit both casual looks and special occasion outfits.\n\nThe restrained shine and smooth lines of the moon add sophistication and a touch of mystery. Lightweight, comfortable, and almost weightless — perfect for long-term wear without discomfort.\n\n"Short Moon" — when style speaks for you.',
      ge: 'სტილური და ლაკონიური საყურეები ელეგანტური ნახევარმთვარის აქცენტით. მათი მინიმალისტური დიზაინი ხდის სამკაულს უნივერსალურს — ისინი იდეალურად ჯდება როგორც ყოველდღიურ, ისე სპეციალური დღისთვის განკუთვნილ ტანსაცმელში.\n\nდაუდგრომელი ბზინვარება და მთვარის გლუვი ხაზები ემატება დახვეწილობას და ნაზ საიდუმლოებას. მსუბუქი, კომფორტული და თითქმის უწონო — იდეალურია ხანგრძლივი ტარებისთვის დისკომფორტის გარეშე.\n\n"მოკლე მთვარე" — როდესაც სტილი შენს ნაცვლად ლაპარაკობს.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494358021_1236477491488223_1113084814910147747_n.jpg',
      '/lovable-uploads/494358021_1236477491488223_1113084814910147747_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл с золотым покрытием'],
    colors: ['Золотой'],
  },
  {
    id: 22,
    name: {
      ru: 'Серьги "Вестерн"',
      en: 'Earrings "Western"',
      ge: 'საყურეები "ვესტერნი"',
    },
    description: {
      ru: 'Роскошные серьги с характером — для тех, кто не боится быть дерзкой. Дизайн с отсылкой к духу дикого запада: револьвер, пыльные дороги, жаркое солнце и свобода в каждом шаге.\n\nИдеальное украшение для тех, кто любит сочетать стиль с огоньком и намёком на бунтарство. Эффектный аксессуар, который привлечёт взгляды и точно не оставит вас без внимания.\n\n"Вестерн" — когда твой стиль стреляет метко.',
      en: 'Luxurious earrings with character — for those who aren\'t afraid to be bold. A design that references the spirit of the Wild West: revolvers, dusty roads, hot sun, and freedom in every step.\n\nThe perfect accessory for those who love to combine style with a spark of rebellion. A striking piece that will attract attention and ensure all eyes are on you.\n\n"Western" — when your style hits the mark.',
      ge: 'ფუფუნებისმოყვარე საყურეები ხასიათით — მათთვის, ვინც არ ეშინია თამამი იყოს. დიზაინი, რომელიც მიუთითებს ველური დასავლის სულზე: რევოლვერები, მტვრიანი გზები, ცხელი მზე და თავისუფლება ყოველ ნაბიჯში.\n\nიდეალური სამკაული მათთვის, ვისაც უყვარს სტილის ამბოხებულ ნაპერწკალთან შერწყმა. შთამბეჭდავი აქსესუარი, რომელიც მიიზიდავს ყურადღებას და აუცილებლად არ დატოვებს უყურადღებოდ.\n\n"ვესტერნი" — როცა შენი სტილი ზუსტად ურტყამს სამიზნეს.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/494360448_1202980541322821_433259679981194833_n.jpg',
      '/lovable-uploads/494360448_1202980541322821_433259679981194833_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Металл', 'Искусственные кристаллы'],
    colors: ['Розовое золото', 'Кристаллы'],
  },
  {
    id: 27,
    name: {
      ru: 'Серьги "Снежок"',
      en: 'Earrings "Snowball"',
      ge: 'საყურეები "თოვლის ბურთულა"',
    },
    description: {
      ru: 'Элегантные серьги в виде снежка — лёгкие, как первый снег и такие же очаровательные. Их утончённый дизайн придаёт образу свежести и лёгкости, подчёркивая вашу естественную красоту.\n\nСтанут идеальным акцентом как в повседневном наряде, так и в вечернем луке. Универсальные и невесомые, они добавят вашему стилю нотку зимней сказки в любое время года.\n\n"Снежок" — когда хочется нежности, блеска и лёгкого мороза по коже.',
      en: 'Elegant snowball-shaped earrings — light as the first snow and just as charming. Their refined design adds freshness and lightness to your look, highlighting your natural beauty.\n\nThey will become the perfect accent in both casual and evening wear. Versatile and weightless, they will add a touch of winter fairy tale to your style at any time of the year.\n\n"Snowball" — when you want tenderness, sparkle, and a light frosty touch.',
      ge: 'ელეგანტური საყურეები თოვლის ბურთულის ფორმის — მსუბუქი, როგორც პირველი თოვლი და ასეთივე მომხიბვლელი. მათი დახვეწილი დიზაინი აძლევს იმიჯს სიახლესა და სიმსუბუქეს, ხაზს უსვამს თქვენ ბუნებრივ სილამაზეს.\n\nგახდება იდეალური აქცენტი როგორც ყოველდღიურ, ისე საღამოს ტანსამოსში. უნივერსალური და უწონო, ისინი დაუმატებენ თქვენს სტილს ზამთრის ზღაპრის შეფერილობას წლის ნებისმიერ დროს.\n\n"თოვლის ბურთულა" — როცა გინდათ ნაზობა, ბზინვარება და თხელი, ყინულოვანი შეხება.',
    },
    price: 15,
    currency: '₾',
    images: [
      '/lovable-uploads/496514974_486316394509569_7569377168526650890_n.jpg',
      '/lovable-uploads/496514974_486316394509569_7569377168526650890_n_2.jpg'
    ],
    category: 'earrings',
    stock: 1,
    featured: true,
    materials: ['Серебро 925 пробы'],
    colors: ['Серебро'],
  },
  {
    id: 18,
    name: {
      ru: 'Кулон "Свободное Перо"',
      en: 'Pendant "Free Feather"',
      ge: 'შუბლჭვირის ფორმის ბროლჯვარი',
    },
    description: {
      ru: 'Изящный кулон "Свободное Перо" выполнен из двух тонких полосок ткани глубокого коричневого цвета. Кожаные ремешки соединены между собой металлическими заклепками и центральным кольцом, к которому подвешен крупный кулон в виде серебряного пера. Этот аксессуар станет прекрасным дополнением к вашему образу, добавив нотку бохо-шика и индивидуальности. Идеально подходит для повседневной носки, а также для создания стильных образов в стиле кантри, этник или хиппи.',
      en: 'The elegant "Free Feather" pendant is made of two thin strips of deep brown fabric. The leather straps are connected with metal rivets and a central ring, from which hangs a large silver feather pendant. This accessory will be a wonderful addition to your look, adding a touch of boho chic and individuality. Perfect for everyday wear and for creating stylish looks in country, ethnic, or hippie styles.',
      ge: 'ელეგანტური "თავისუფალი ბუმბული" ბროლჯვარი დამზადებულია ორი წვრილი ღრმა ყავისფერი ქსოვილის ზოლისგან. ტყავის სამაჯურები დაკავშირებულია ლითონის მოქლონებითა და ცენტრალური რგოლით, რომელსაც ეკიდება დიდი ვერცხლისფერი ბუმბულის ფორმის ბროლჯვარი. ეს აქსესუარი შესანიშნავი დამატება იქნება თქვენს იმიჯში, რომელიც დაუმატებს ბოჰო-შარმსა და ინდივიდუალურობას. იდეალურია ყოველდღიური ტარებისთვის, ასევე სტილური იმიჯის შესაქმნელად ქანთრი, ეთნიკური ან ჰიპის სტილში.',
    },
    price: 62,
    currency: '₾',
    images: [
      '/lovable-uploads/bumbl_1.jpg',
      '/lovable-uploads/bumbl_2.jpeg',
    ],
    category: 'necklaces',
    stock: 0,
    featured: true,
    materials: ['Металлический сплав', 'Цветные вставки'],
    colors: ['Желтый', 'Черный'],
  },
  {
    id: 17,
    name: {
      ru: 'Двойное ожерелье "Мистический крест"',
      en: 'Double Necklace "Mystic Cross"',
      ge: 'ორმაგი ყელსაბამი "მისტიკური ჯვარი"',
    },
    description: {
      ru: 'Этот уникальный двойное ожерелье сочетает в себе гранж и винтажный стили. Верхняя часть представляет собой простую и элегантную черную эластичную полоску, плотно облегающую шею. Ниже располагается вторая из тонкого ремешка под кожу темно-коричневого цвета, на котором подвешен массивный кулон в виде старинного креста. Крест выполнен в детализированном дизайне, возможно, с элементами в виде черепа или других готических мотивов, что придает ему мистический и таинственный вид. Этот чокер идеально подойдет для создания смелого и выразительного образа, подчеркивая вашу индивидуальность и любовь к неординарным украшениям. Прекрасно сочетается с нарядами в стиле кэжуал, рок или гранж.',
      en: 'This unique double necklace combines grunge and vintage styles. The upper part features a simple and elegant black elastic band that fits snugly around the neck. Below it is a second layer made of a thin dark brown leather strap, from which hangs a massive antique-style cross pendant. The cross is crafted with intricate detailing, possibly featuring skull or other gothic elements, giving it a mystical and mysterious appearance. This choker is perfect for creating a bold and expressive look, highlighting your individuality and love for unique jewelry. Pairs beautifully with casual, rock, or grunge outfits.',
      ge: 'ეს უნიკალური ორმაგი ყელსაბამი აერთიანებს გრანჟისა და ვინტაჟურ სტილებს. ზედა ნაწილი წარმოადგენს მარტივ და ელეგანტურ შავ ელასტიკურ ზოლს, რომელიც მჭიდროდ უჯდება კისერს. ქვემოთ მოთავსებულია მეორე ფენა - წვრილი ტყავის ყავისფერი სამაჯური, რომელზეც დაკიდებულია მასიური ძველი სტილის ჯვრის ფორმის ბროლჯვარი. ჯვარი დამზადებულია დეტალური დიზაინით, შესაძლოა თავის ქალის ან სხვა გოთური ელემენტებით, რაც მას მისტიკურ და იდუმალ იერს აძლევს. ეს ჩოკერი იდეალურია თამამი და გამომხატველი იმიჯის შესაქმნელად, ხაზს უსვამს თქვენ ინდივიდუალურობასა და სიყვარულს უჩვეულო სამკაულების მიმართ. შესანიშნავად ერწყმის კაზუალურ, როკ ან გრანჟ სტილის ტანსაცმელს.',
    },
    price: 68,
    currency: '₾',
    images: [
      '/lovable-uploads/jvar_1.jpg',
      '/lovable-uploads/jvar_2.jpg',
    ],
    category: 'necklaces',
    stock: 1,
    featured: true,
    materials: ['Металл с покрытием'],
    colors: ['Серебро'],
  },
  {
    id: 16,
    name: {
      ru: 'Чокер "Сердце"',
      en: 'Choker "Heart"',
      ge: 'ჩოკერი "გული"',
    },
    description: {
      ru: 'Элегантный и стильный чокер, выполненный из мягкой черной замши. Он состоит из 4 полосок, которые соединяются и крепятся по бокам к крупному металлическому кольцу в форме сердца. Сердце из металла серебристого оттенка расположено по центру, привлекая внимание к области шеи. Этот чокер является выразительным аксессуаром, который добавит нотку романтики и готического шика в любой образ. Идеально подойдет для создания дерзких и женственных нарядов, а также станет отличным подарком для тех, кто ценит уникальные украшения.',
      en: 'An elegant and stylish choker made of soft black suede. It consists of 4 strips that connect and fasten at the sides to a large metal ring in the shape of a heart. The silver-tone metal heart is positioned in the center, drawing attention to the neckline. This choker is a striking accessory that will add a touch of romance and gothic chic to any look. Perfect for creating bold and feminine outfits, it also makes a great gift for those who appreciate unique jewelry.',
      ge: 'ელეგანტური და სტილური ჩოკერი დამზადებული რბილი შავი ხავერდისგან. იგი შედგება 4 ზოლისგან, რომლებიც ერთმანეთთან არის დაკავშირებული და გვერდებზე მიმაგრებულია დიდ ლითონის რგოლზე გულის ფორმის. ვერცხლისფერი ლითონისგან დამზადებული გული განლაგებულია ცენტრში, რაც ყურადღებას ამახვილებს კისრის ხაზზე. ეს ჩოკერი არის გამომხატველი აქსესუარი, რომელიც ნებისმიერ იმიჯს დაუმატებს რომანტიკისა და გოთიკური შარმის ნოტს. იდეალურია თამამი და ქალწულური ტანსაცმლის შესაქმნელად, ასევე გახდება შესანიშნავი საჩუქარი მათთვის, ვინც აფასებს უნიკალურ სამკაულებს.',
    },
    price: 58,
    currency: '₾',
    images: [
      '/lovable-uploads/gul_1.jpg',
      '/lovable-uploads/gul_2.jpg',
    ],
    category: 'chokers',
    stock: 0,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серебро'],
  },
  {
    id: 15,
    name: {
      ru: 'Ожерелье "Бесконечный череп"',
      en: 'Necklace "Infinite Skull"',
      ge: 'საყელური "უსასრულო თავის ქალა"',
    },
    description: {
      ru: 'Стильное ожерелье выполненный из тонкого ремешка темно-коричневой кожи. По центру ожерелья расположен оригинальный металлический элемент в виде символа бесконечности, к которому подвешен детализированный кулон в форме черепа. У основания черепа видны элементы, напоминающие цветок или небольшие декоративные детали, что добавляет изысканности и уникальности. Застежка чокера выполнена с использованием металлических заклепок, придающих ему прочный и надежный вид. Это ожерелье является ярким акцентом для тех, кто ценит готическую эстетику, рок-стиль или просто любит необычные и символичные украшения. Он идеально дополнит повседневный образ, придав ему дерзости и индивидуальности.',
      en: 'Stylish necklace made of a thin dark brown leather strap. The centerpiece of the necklace features an original metal infinity symbol, from which hangs a detailed skull pendant. At the base of the skull, you can see elements resembling a flower or small decorative details, adding sophistication and uniqueness. The choker clasp is made with metal rivets, giving it a sturdy and reliable appearance. This necklace is a striking statement piece for those who appreciate gothic aesthetics, rock style, or simply love unusual and symbolic jewelry. It will perfectly complement your everyday look, adding an edge of boldness and individuality.',
      ge: 'სტილური საყელური დამზადებული წვრილი ყავისფერი ტყავის სამაჯურისაგან. საყელურის ცენტრში განთავსებულია ორიგინალური ლითონის უსასრულობის სიმბოლო, რომელსაც ეკიდება დეტალურად შესრულებული თავის ქალის ფორმის ბროლჯვარი. თავის ქალის ძირში ჩანს ყვავილის ან მცირე დეკორატიული დეტალების მსგავსი ელემენტები, რაც ემატება დახვეწილობასა და უნიკალურობას. ჩოკერის საკინძი დამზადებულია ლითონის მოქლონების გამოყენებით, რაც მას აძლევს მტკიცე და საიმედო იერს. ეს საყელური არის მკვეთი აქცენტი მათთვის, ვინც აფასებს გოთიკურ ესთეტიკას, როკ-სტილს ან უბრალოდ უყვარს უჩვეულო და სიმბოლური სამკაულები. ის იდეალურად შეავსებს თქვენ ყოველდღიურ იმიჯს, რაც მას მისცემს თამაზსა და ინდივიდუალურობას.',
    },
    price: 75,
    currency: '₾',
    images: [
      '/lovable-uploads/conchx_1.jpg',
      '/lovable-uploads/conchx_2.jpg',
    ],
    category: 'necklaces',
    stock: 1,
    featured: true,
    materials: ['Металл с серебряным покрытием'],
    colors: ['Серебро'],
  },
  {
    id: 14,
    name: {
      ru: "Чокер 'The Walking Dead'",
      en: "Choker 'The Walking Dead'",
      ge: "ჩოკერი 'The Walking Dead'",
    },
    description: {
      ru: 'Стильный кожаный чокер в тематике The Walking Dead. Идеальный аксессуар для поклонников сериала и постапокалиптического стиля. В комплекте представлены две фотографии с разных ракурсов.',
      en: 'Stylish leather choker inspired by The Walking Dead. Perfect accessory for fans of the series and post-apocalyptic style. Includes two photos from different angles.',
      ge: 'სტილური ტყავის ჩოკერი The Walking Dead-ის სტილში. იდეალური აქსესუარი სერიალის და პოსტ-აპოკალიფსური სტილის მოყვარულებისთვის. შედის ორი ფოტო სხვადასხვა კუთხით.',
    },
    price: 65,
    currency: '₾',
    images: [
      '/lovable-uploads/walking_1.jpg',
      '/lovable-uploads/walking_2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серый'],
  },
  {
    id: 12,
    name: {
      ru: "Чокер 'Бритва'",
      en: "Choker 'Razor'",
      ge: "ჩოკერი 'ბრიტვა'",
    },
    description: {
      ru: 'Стильный чокер с металлической подвеской в виде бритвы. Идеально подходит для создания смелого и дерзкого образа.',
      en: 'Stylish choker with a razor-shaped metal pendant. Perfect for creating a bold and edgy look.',
      ge: 'სტილური ჩოკერი ლითონის ბრიტვის ფორმის ქინძისთავით. იდეალური თამამი და თამაზირებული იმიჯის შესაქმნელად.',
    },
    price: 55,
    currency: '₾',
    images: [
      '/lovable-uploads/britva_1.jpg',
      '/lovable-uploads/britva_2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный', 'Серебро'],
  },
  {
    id: 11,
    name: {
      ru: "Чокер 'Звезда Давида' из стали",
      en: "Steel 'Star of David' Choker",
      ge: "ფოლადის 'დავითის ვარსკვლავი' ჩოკერი",
    },
    description: {
      ru: 'Элегантный стальной чокер с подвеской в виде Звезды Давида. Символ иудаизма и еврейской идентичности. Идеально подходит для повседневного ношения и особых случаев. Выполнен из высококачественной хирургической стали, не вызывает аллергии и не темнеет со временем.',
      en: 'Elegant steel choker featuring a Star of David pendant. A symbol of Judaism and Jewish identity. Perfect for both everyday wear and special occasions. Made from high-quality surgical steel, hypoallergenic and tarnish-resistant.',
      ge: 'ელეგანტური ფოლადის ჩოკერი დავითის ვარსკვლავის ქინძისთავით. იუდაიზმისა და ებრაული იდენტობის სიმბოლო. იდეალურია როგორც ყოველდღიური, ასევე სპეციალური დღეებისთვის. დამზადებულია მაღალი ხარისხის ქირურგიული ფოლადისგან, ჰიპოალერგენული და გაუფერულებადი.',
    },
    price: 45,
    currency: '₾',
    images: [
      '/lovable-uploads/choker-dvd-1.jpg',
      '/lovable-uploads/choker-dvd-2.jpeg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Металл', 'Стекло'],
    colors: ['Серебро'],
  },
  {
    id: 9,
    name: {
      ru: "Чокер с подвеской Guns N' Roses",
      en: "Guns N' Roses Choker",
      ge: "Guns N' Roses ჩოკერი",
    },
    description: {
      ru: "Стильный чокер с подвеской в виде логотипа Guns N' Roses. Идеальный аксессуар для поклонников рок-музыки.",
      en: "Stylish choker with a Guns N' Roses logo pendant. Perfect accessory for rock music fans.",
      ge: "სტილური ჩოკერი Guns N' Roses-ის ლოგოთი. იდეალური აქსესუარი როკ-მუსიკის მოყვარულებისთვის.",
    },
    price: 35,
    currency: '₾',
    images: [
      '/lovable-uploads/choker-gnr-1.jpg',
      '/lovable-uploads/choker-gnr-2.jpg',
    ],
    category: 'chokers',
    stock: 1,
    featured: true,
    materials: ['Кожа', 'Металл'],
    colors: ['Черный'],
  },
  // Removed products with IDs: 8 (Серьги Солнце и Луна) and 10 (Черный кожаный чокер с шипами) as per user request
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id: number) => {
  try {
    console.log(`[getProductById] Looking for product with ID: ${id}`);
    const product = products.find((product) => product.id === id);
    
    if (!product) {
      console.warn(`[getProductById] Product not found with ID: ${id}`);
      return null;
    }
    
    console.log(`[getProductById] Found product:`, product);
    return product;
  } catch (error) {
    console.error(`[getProductById] Error finding product with ID ${id}:`, error);
    return null;
  }
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};
