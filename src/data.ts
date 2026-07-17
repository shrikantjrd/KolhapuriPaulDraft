import imgArtisanCarving from './assets/images/artisan_carving_sole_1784188253561.jpg';
import imgArtisanStitching from './assets/images/artisan_stitching_close_1784188217493.jpg';
import imgArtisanWorkshop from './assets/images/artisan_workshop_stack_1784188236319.jpg';
import imgHeritagePalace from './assets/images/heritage_palace_mogra_1784274973797.jpg';
import imgCreamFlower from './assets/images/kolhapuri_cream_flower_1784182909014.jpg';
import imgRedPompom from './assets/images/kolhapuri_red_pompom_1784182929447.jpg';
import imgRoyalBanner from './assets/images/royal_banner_mogra_1784274952702.jpg';
import imgTanOpen from './assets/images/kolhapuri_tan_open_1784182943658.jpg';

const imageMap: Record<string, string> = {
  'images/artisan_carving_sole_1784188253561.jpg': imgArtisanCarving,
  'images/artisan_stitching_close_1784188217493.jpg': imgArtisanStitching,
  'images/artisan_workshop_stack_1784188236319.jpg': imgArtisanWorkshop,
  'images/kolhapur_heritage_palace_1784187835882.jpg': imgHeritagePalace,
  'images/heritage_palace_mogra_1784274973797.jpg': imgHeritagePalace,
  'images/kolhapuri_cream_flower_1784182909014.jpg': imgCreamFlower,
  'images/kolhapuri_red_pompom_1784182929447.jpg': imgRedPompom,
  'images/kolhapuri_royal_banner_1784182889076.jpg': imgRoyalBanner,
  'images/royal_banner_mogra_1784274952702.jpg': imgRoyalBanner,
  'images/kolhapuri_tan_open_1784182943658.jpg': imgTanOpen,
};

export const getImagePath = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Resolve using the pre-compiled Vite asset imports
  const cleanPath = path.replace(/^\.?\//, ''); // e.g. "images/kolhapuri_red_pompom_..."
  if (imageMap[cleanPath]) {
    return imageMap[cleanPath];
  }
  
  // Fallback to legacy path resolution if not found in map
  const baseUrl = import.meta.env.BASE_URL || '/';
  let base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  if (base === '/' && typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const repoName = pathSegments[0];
    if (repoName && !repoName.endsWith('.html')) {
      base = `/${repoName}/`;
    }
  }
  
  const finalPath = `${base}${cleanPath}`;
  const sanitizedPath = ('/' + finalPath).replace(/\/+/g, '/');
  return sanitizedPath;
};

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  category: 'Classic' | 'Wedding' | 'Premium' | 'New Arrival';
  description: string;
  images: {
    front: string;
    side: string;
    back: string;
    closeup: string;
    lifestyle: string;
  };
  sizes: number[];
  specifications: {
    leather: string;
    finish: string;
    gender: string;
    make: string;
    origin: string;
  };
  highlights: string[];
}

export interface Artisan {
  id: string;
  name: string;
  village: string;
  experience: number;
  signature: string;
  quote: string;
  photo: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ambabai-floral',
    name: "Ambabai Floral",
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviewsCount: 128,
    category: 'New Arrival',
    description: "Inspired by the divine beauty of the Mahalaxmi Ambabai Temple, this premium masterpiece features a soft, hand-carved floral leather center motif. Embellished with fine gold tilla hand-embroidery and a rich natural-tan base, it is an exquisite blend of devotion and traditional luxury.",
    images: {
      front: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      side: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      back: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      closeup: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      lifestyle: "./images/kolhapuri_royal_banner_1784182889076.jpg"
    },
    sizes: [5, 6, 7, 8, 9],
    specifications: {
      leather: "100% Genuine Full-Grain Vegetable-Tanned Leather",
      finish: "Natural Castor Oil Polished Semi-Gloss",
      gender: "Women's Royal Fit",
      make: "Hand-stitched with premium waxed linen threads",
      origin: "Crafted in the heart of Kolhapur"
    },
    highlights: [
      "Natural-tan leather that darkens beautifully with age and wear",
      "Features soft, self-healing leather footbeds that mold to your foot shape",
      "Exquisite hand-braided straps with authentic golden zari highlights",
      "Completely allergen-free, skin-friendly natural tanning process"
    ]
  },
  {
    id: 'royal-wedding',
    name: "Royal Wedding Gold",
    price: 2999,
    originalPrice: 3999,
    rating: 5.0,
    reviewsCount: 94,
    category: 'Wedding',
    description: "A celebration of regal Indian craftsmanship, the Royal Wedding sandal is woven with premium gold-leaf leather cords. Designed for brides and high-festive celebrations, this pair utilizes our softest triple-cushioned leather sole and double-bound borders for day-long bridal luxury.",
    images: {
      front: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      side: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      back: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      closeup: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      lifestyle: "./images/kolhapuri_royal_banner_1784182889076.jpg"
    },
    sizes: [5, 6, 7, 8, 9],
    specifications: {
      leather: "Gold-Foiled Royal Sheepskin and Buff-Leather Soles",
      finish: "Traditional Hand-buffed Metallic Luster",
      gender: "Women's Festive Fit",
      make: "Double-stitch leather welt construction",
      origin: "In-house Master Artisan Special, Kolhapur"
    },
    highlights: [
      "24k-gold look foil bound to supple, breathable leather",
      "Triple layered cushioning with double anti-slip rubber-threaded heel nodes",
      "Hand-braided leather backstraps for premium stability",
      "Includes protective satin travel pouch"
    ]
  },
  {
    id: 'classic-heritage',
    name: "Classic Heritage Walnut",
    price: 1999,
    originalPrice: 2499,
    rating: 4.8,
    reviewsCount: 215,
    category: 'Classic',
    description: "The timeless flat that started it all. Featuring the standard hand-stitched leather strap, double-row hand punch work, and dyed a rich walnut hue using local organic barks. It produces the classic wooden sound upon stepping and is a beautiful nod to true legacy fashion.",
    images: {
      front: "./images/kolhapuri_tan_open_1784182943658.jpg",
      side: "./images/kolhapuri_tan_open_1784182943658.jpg",
      back: "./images/kolhapuri_tan_open_1784182943658.jpg",
      closeup: "./images/kolhapuri_tan_open_1784182943658.jpg",
      lifestyle: "./images/kolhapuri_royal_banner_1784182889076.jpg"
    },
    sizes: [6, 7, 8, 9],
    specifications: {
      leather: "100% Genuine Water-Buffalo Leather (Extremely Durable)",
      finish: "Eco-friendly Organic Walnut Bark Infused Dye",
      gender: "Women's Everyday Comfort Fit",
      make: "Traditional hand-stitched center seam",
      origin: "Sambhaji Nagar Artisans, Kolhapur"
    },
    highlights: [
      "Water-buffalo leather softens wonderfully within 3-4 days of wear",
      "Stitched with natural cotton-waxed thread for dynamic flexibility",
      "100% biodegradable and sustainably sourced materials",
      "Stands up to high heat and forms a perfect anatomical foot imprint"
    ]
  },
  {
    id: 'peshwai-pride',
    name: "Peshwai Royal Crimson",
    price: 2799,
    originalPrice: 3599,
    rating: 4.9,
    reviewsCount: 62,
    category: 'Premium',
    description: "Honoring the legendary Peshwa royalty, this premium sandal is distinguished by a deep hand-dyed crimson leather strap. Adorned with dual-braided golden trims and a slightly raised, ergonomic heel, this pair exudes unmatched confidence and pride.",
    images: {
      front: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      side: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      back: "./images/kolhapuri_royal_banner_1784182889076.jpg",
      closeup: "./images/kolhapuri_red_pompom_1784182929447.jpg",
      lifestyle: "./images/kolhapuri_royal_banner_1784182889076.jpg"
    },
    sizes: [5, 6, 7, 8, 9],
    specifications: {
      leather: "Tuscan-grade Soft Cowhide Upper with Buffalo Leather Outsole",
      finish: "Organic Beetroot extract hand-dyed Crimson",
      gender: "Women's Luxury Fit",
      make: "Multi-layered hand-braided detailing",
      origin: "Rankala Workshop, Kolhapur"
    },
    highlights: [
      "Stunning hand-mixed crimson color that shimmers in warm sunlight",
      "Anti-slip premium crepe-rubber base added under the leather sole",
      "Beautifully suited for hand-loom sarees and ethnic kurtas",
      "Dual stitched reinforcement at major pressure points"
    ]
  },
  {
    id: 'karveer-golden',
    name: "Karveer Sunset Glow",
    price: 2299,
    originalPrice: 2999,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Premium',
    description: "Inspired by the warm golden-hour sunset over the Rankala Lake, the Karveer Golden sandal features custom multi-braid straps and subtle copper embroidery. Lightweight, flexible, and featuring a velvety soft suede-lined inner strap, it is crafted for the modern, fast-paced woman.",
    images: {
      front: "./images/kolhapuri_cream_flower_1784182909014.jpg",
      side: "./images/kolhapuri_cream_flower_1784182909014.jpg",
      back: "./images/kolhapuri_cream_flower_1784182909014.jpg",
      closeup: "./images/kolhapuri_cream_flower_1784182909014.jpg",
      lifestyle: "./images/kolhapuri_royal_banner_1784182889076.jpg"
    },
    sizes: [5, 6, 7, 8, 9],
    specifications: {
      leather: "Natural Soft-tanned Goat Leather straps and Bovine sole",
      finish: "Organic Turmeric & Castor Blend Golden Waxing",
      gender: "Women's Comfort Fit",
      make: "Seamless single-strap looping structure",
      origin: "Karveer Village Artisans, Kolhapur"
    },
    highlights: [
      "Ultra-lightweight sole structure designed for modern urban pavements",
      "Suede-lined interior strap for absolute zero-friction guarantee",
      "Stitched completely by hand without a single metal pin or nail",
      "A portion of sales directly supports our girl education initiative in Karveer"
    ]
  }
];

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: "Mahadev Shinde",
    village: "Kapshi Village, Kolhapur",
    experience: 34,
    signature: "म. शिं.",
    quote: "Leather has its own breath. My job is to stitch that breath into every pair of Kolhapuri Paul so that it lives with you for generations.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80" // Artisan portrait look
  },
  {
    id: 'artisan-2',
    name: "Rukmini Powar",
    village: "Sambhaji Nagar, Kolhapur",
    experience: 22,
    signature: "रू. प.",
    quote: "The complex braids you see on the strap are woven in complete silence. Each loop holds a prayer for the traveler who will wear them.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80" // Craftswoman portrait
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: 'story-behind-kolhapuri-paul',
    title: "The Story Behind Kolhapuri Paul",
    excerpt: "A glimpse into our heritage, passion, and handcrafted legacy.",
    date: "July 16, 2026",
    readTime: "4 mins read",
    category: "Heritage",
    image: "./images/kolhapuri_royal_banner_1784182889076.jpg",
    content: "Kolhapuri Paul is born from a desire to preserve the pristine legacy of 800 years of royal leather crafting from the historic city of Kolhapur, Maharashtra.\n\nOur story is woven in the lanes of Rankala and Karveer, where families of master artisans have kept the traditional methods alive across multiple generations. Every chappal represents hundreds of precise cuts, a month-long organic babool-bark tanning process, and a signature castor-oil finish that gives the leather its rich tone and incredible longevity.\n\nWe bridge the gap between historic royalty and contemporary elegance, bringing true heirloom luxury to discerning feet worldwide."
  },
  {
    id: 'art-of-handcrafting',
    title: "The Art of Handcrafting",
    excerpt: "Discover how every pair is carefully made by skilled artisans using traditional techniques.",
    date: "July 12, 2026",
    readTime: "5 mins read",
    category: "Craftsmanship",
    image: "./images/artisan_stitching_close_1784188217493.jpg",
    content: "True craftsmanship has no shortcut. At Kolhapuri Paul, we don't use high-speed automated sewing machines or metal nails. Instead, every single sandal is built using centuries-old manual techniques.\n\nFirst, the heavy buffalo hide is selected for structural strength, then cut by hand using a traditional curved cutter called an 'Aari'. Second, the straps are braided in complete silence, requiring intense focus to ensure symmetry. Third, the pieces are hand-stitched directly into the sole using durable local sisal cord, forming a strong, flexible lock-stitch.\n\nThis labor-intensive work produces footwear that molds to your unique foot arch and gets more comfortable with every passing step."
  },
  {
    id: 'leather-care-guide',
    title: "Leather Care Guide",
    excerpt: "Simple tips to preserve the beauty and longevity of your handcrafted leather sandals.",
    date: "July 08, 2026",
    readTime: "3 mins read",
    category: "Care Guide",
    image: "./images/kolhapuri_tan_open_1784182943658.jpg",
    content: "Because our leather is vegetable-tanned using organic barks instead of harsh chemicals, it is a living material that responds beautifully to care.\n\n1. **Protect from Water**: Since raw leather is porous, direct exposure to heavy rain or water should be avoided. If wet, let them air-dry naturally in a shaded, well-ventilated space. Never use hair dryers or direct sunlight.\n\n2. **Hydrate with Castor Oil**: Rub a few drops of organic Castor Oil (Erandel Tel) onto the leather straps once a month. This nourishes the fibers, prevents dryness/cracking, and deepens the natural tan color to a rich, professional gloss.\n\n3. **Store Smartly**: Always store your sandals in our premium breathable cotton dust bags. Avoid plastic containers, which trap moisture and can cause mold."
  },
  {
    id: 'style-journal',
    title: "Style Journal",
    excerpt: "Elegant ways to style Kolhapuri sandals for everyday wear and special occasions.",
    date: "July 05, 2026",
    readTime: "3 mins read",
    category: "Style",
    image: "./images/kolhapuri_cream_flower_1784182909014.jpg",
    content: "Kolhapuris are incredibly versatile and bridge the gap between traditional ethnic wear and contemporary global fashion.\n\n- **Casual Linen Look**: Pair our classic tan flat sandals with a relaxed white linen shirt and light beige linen trousers for a sophisticated, breezy summer aesthetic.\n\n- **Boho Chic**: Combine our vibrant crimson sandals with a flowing cotton midi dress and vintage silver jewelry for an elegant, artistic look.\n\n- **Festive Fusion**: Style our royal gold-embellished sandals with modern drapes, raw silk tunics, or even premium denim for high-end fusion styling that makes a confident statement at any special occasion."
  },
  {
    id: 'behind-collection',
    title: "Behind the Collection",
    excerpt: "Explore the inspiration behind our latest handcrafted designs.",
    date: "June 28, 2026",
    readTime: "4 mins read",
    category: "Inspiration",
    image: "./images/kolhapuri_red_pompom_1784182929447.jpg",
    content: "Our latest collection is a deep homage to the sacred landmarks and cultural touchstones of Kolhapur.\n\nWe drew inspiration from the divine architecture of the Mahalaxmi Ambabai Temple, extracting the intricate gold tilla and floral carving work seen on our newest red pompom sandal. We also captured the golden hues of sunsets over the Rankala Lake, using subtle copper highlights on custom multi-braid straps.\n\nEvery pair is more than footwear—it is a wearable piece of history, combining regal motifs with modern ergonomic cushioning for a luxurious walk."
  },
  {
    id: 'from-workshop',
    title: "From Our Workshop",
    excerpt: "A look inside our workshop, where tradition meets craftsmanship.",
    date: "June 18, 2026",
    readTime: "5 mins read",
    category: "Workshop",
    image: "./images/artisan_workshop_stack_1784188236319.jpg",
    content: "Step inside our Rankala Lake workshop, where the air is filled with the rich, earthy aroma of natural vegetable-tanned leather and castor oil.\n\nHere, there are no assembly lines. Each artisan sits on a low wooden bench, working diligently on a single pair from start to finish. You will hear the gentle rhythmic tapping of a wooden mallet on leather, the precision slice of a sharp 'Aari' tool, and the soft hum of local stories shared among craftsmen who have honed their skills over decades.\n\nThis dedicated environment is where true luxury is created, step by step, keeping an ancient craft alive and thriving in the modern world."
  }
];

export const CARE_GUIDES = [
  {
    id: 'avoid-water',
    title: "Avoid Direct Water Contact",
    description: "Natural vegetable-tanned leather is highly porous. If your sandals get wet, never dry them in an oven or with a hairdryer; simply dry them in natural, shaded drafts."
  },
  {
    id: 'castor-oil',
    title: "The Magic of Castor Oil",
    description: "Apply a few drops of pure organic Castor Oil (Erandel Tel) to the straps every 30 days. It keeps the fibers moisturized, prevents cracks, and darkens the leather to a premium gloss."
  },
  {
    id: 'dust-bag',
    title: "Always Store in a Dust Bag",
    description: "Store them inside our premium cotton dust bags to protect them from high humidity and dust. Avoid plastic boxes which trap moisture and promote mildew."
  },
  {
    id: 'dry-naturally',
    title: "Allow Them to Breathe",
    description: "After a long day of walking, leave your sandals in a ventilated room overnight before storing them away. This allows the natural leather lining to dry and stay odor-free."
  }
];
