import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Menu, X, Star, Check, Truck, Sparkles, 
  ShieldCheck, Droplet, BookOpen, Mail, Phone, MapPin, 
  Instagram, ArrowRight, ChevronRight, ChevronLeft, Trash2, 
  Search, Heart, Award, ArrowDown, ExternalLink, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, ARTISANS, BLOGS, CARE_GUIDES, Product, BlogPost, getImagePath } from './data';

export default function App() {
  // Navigation & States
  const [activeTab, setActiveTab] = useState<'home' | 'collections' | 'product' | 'care' | 'journal' | 'contact' | 'privacy'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeProductImage, setActiveProductImage] = useState<keyof Product['images']>('front');
  const [selectedSize, setSelectedSize] = useState<number>(6);
  const [cart, setCart] = useState<{ product: Product; size: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState<'All' | 'Classic' | 'Wedding' | 'Premium' | 'New Arrival'>('All');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  
  // Interactive UI Feedbacks
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState<'desc' | 'specs' | 'packaging' | 'shipping'>('desc');
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return (localStorage.getItem('kp-theme') as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('kp-theme', nextTheme);
    } catch (e) {
      console.warn("Storage access not allowed in sandbox: ", e);
    }
  };

  // Auto-scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activeTab]);

  // Cart operations
  const addToCart = (product: Product, size: number) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, size, quantity: 1 }]);
    }
    setCartNotification(`Successfully added ${product.name} (Size ${size}) to your luxury cart.`);
    setIsCartOpen(true);
    setTimeout(() => setCartNotification(null), 4000);
  };

  const removeFromCart = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const totalCartPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const toggleLike = (productId: string) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter(id => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', phone: '', email: '', message: '' });
    }, 6000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
    }, 6000);
  };

  const viewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveProductImage('front');
    setSelectedSize(product.sizes[0] || 6);
    setActiveTab('product');
  };

  const filteredProducts = collectionFilter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === collectionFilter);

  return (
    <div className={`min-h-screen flex flex-col bg-leather-dark text-[#fbf8f3] selection:bg-[#d4af37] selection:text-leather-dark leather-grain transition-colors duration-500 ${theme === 'light' ? 'theme-ivory' : ''}`}>
      
      {/* Top Banner Accent */}
      <div className="bg-[#1d1109] border-b border-[#d4af37]/15 py-2 px-4 text-center text-xs tracking-[0.25em] text-[#d4af37] flex items-center justify-center gap-2 font-light">
        <Sparkles className="w-3 h-3 animate-pulse text-[#d4af37]" />
        <span>AUTHENTIC HANDCRAFTED KOLHAPURI SANDALS — FREE SHIPPING ACROSS INDIA</span>
        <Sparkles className="w-3 h-3 animate-pulse text-[#d4af37]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0f0906]/95 backdrop-blur-md border-b border-[#d4af37]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <button 
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex flex-col items-start focus:outline-none group text-left"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.15em] text-gold-gradient font-semibold group-hover:opacity-90 transition-opacity">
              KOLHAPURI PAUL
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37]/75 -mt-1 pl-0.5">
              Every Step Carries A Tradition
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#fbf8f3]/80">
            {[
              { id: 'home', label: 'Home' },
              { id: 'collections', label: 'Collections' },
              { id: 'product', label: 'Product Details' },
              { id: 'care', label: 'Leather Care' },
              { id: 'journal', label: 'Journal' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === 'product') {
                    // Default to first product if none loaded
                    if (!selectedProduct) setSelectedProduct(PRODUCTS[0]);
                  }
                }}
                className={`px-4 py-2 rounded-sm transition-all duration-300 relative group ${
                  activeTab === tab.id ? 'text-[#d4af37] font-semibold' : 'hover:text-[#fbf8f3]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id ? (
                  <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></span>
                ) : (
                  <span className="absolute bottom-0 left-1/2 right-1/2 h-[1px] bg-[#d4af37]/40 transition-all duration-300 group-hover:left-4 group-hover:right-4"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setActiveTab('collections');
                setCollectionFilter('All');
              }}
              className="p-2 text-[#fbf8f3]/80 hover:text-[#d4af37] transition-colors focus:outline-none relative group"
              title="Search Collection"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 bg-[#1d1109] border border-[#d4af37]/20 hover:border-[#d4af37]/60 text-[#fbf8f3] rounded-full transition-all duration-300 focus:outline-none relative"
              title="Shopping Cart"
              id="cart-trigger"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-[#d4af37]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-700 text-leather-dark text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#0f0906] animate-bounce">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Premium Theme Selector */}
            <button 
              onClick={toggleTheme}
              className="px-3.5 py-2 bg-[#1d1109] border border-[#d4af37]/25 hover:border-[#d4af37]/60 text-[#fbf8f3] rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-[#d4af37]/5"
              title={theme === 'dark' ? "Switch to Royal Ivory Mode" : "Switch to Royal Obsidian Mode"}
            >
              {theme === 'dark' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#d4af37] font-semibold uppercase">OBSIDIAN</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c6700] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8c6700]"></span>
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#8c6700] font-semibold uppercase">IVORY</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#fbf8f3] hover:text-[#d4af37] transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden border-t border-[#d4af37]/10 bg-[#0f0906]/98 backdrop-blur-lg px-4 py-6 space-y-3 absolute top-20 left-0 w-full shadow-2xl overflow-hidden"
            >
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'collections', label: 'Collections' },
                { id: 'product', label: 'Product Details' },
                { id: 'care', label: 'Leather Care' },
                { id: 'journal', label: 'Journal & Stories' },
                { id: 'contact', label: 'Contact Us' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-3 px-4 rounded-sm text-sm uppercase tracking-widest transition-all ${
                    activeTab === tab.id 
                      ? 'bg-[#1d1109] text-[#d4af37] border-l-2 border-[#d4af37] pl-6 font-semibold' 
                      : 'text-[#fbf8f3]/80 hover:bg-[#150e0a]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm" 
              onClick={() => setIsCartOpen(false)}
            />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-[#0f0906] border-l border-[#d4af37]/20 flex flex-col shadow-2xl relative h-full pointer-events-auto"
              >
              
              {/* Cart Header */}
              <div className="p-6 border-b border-[#d4af37]/10 flex items-center justify-between bg-[#140c08]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                  <h2 className="text-xl font-serif tracking-widest text-[#fbf8f3] uppercase font-light">Your Luxury Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-[#fbf8f3]/60 hover:text-[#d4af37] hover:bg-white/5 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-[#1c110a] border border-[#d4af37]/15">
                      <ShoppingBag className="w-8 h-8 text-[#d4af37]/50" />
                    </div>
                    <p className="text-lg font-serif italic text-[#fbf8f3]/80">Your cart is currently empty</p>
                    <p className="text-xs text-[#fbf8f3]/50 max-w-xs uppercase tracking-wider">
                      Explore our handcrafted collections and find a pair woven with tradition.
                    </p>
                    <button 
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveTab('collections');
                      }}
                      className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-sm"
                    >
                      Browse Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-3 bg-[#130b06] border border-[#d4af37]/10 rounded-sm relative group hover:border-[#d4af37]/30 transition-all">
                      <div className="w-20 h-20 rounded bg-leather-dark overflow-hidden flex-shrink-0 border border-white/5">
                        <img 
                          src={getImagePath(item.product.images.front)} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm tracking-wide text-[#fbf8f3] font-medium">{item.product.name}</h4>
                            <span className="text-sm font-medium text-[#d4af37]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-xs text-amber-500/80 font-light mt-0.5">Size: {item.size}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-[#d4af37]/20 rounded bg-leather-dark overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(index, -1)}
                              className="px-2 py-0.5 text-[#fbf8f3]/75 hover:bg-[#d4af37]/10 transition-colors text-xs"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-semibold text-center min-w-8">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(index, 1)}
                              className="px-2 py-0.5 text-[#fbf8f3]/75 hover:bg-[#d4af37]/10 transition-colors text-xs"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-white/40 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#d4af37]/10 bg-[#140c08] space-y-4">
                  <div className="flex justify-between text-base font-serif text-[#fbf8f3]">
                    <span className="tracking-widest uppercase">Subtotal:</span>
                    <span className="text-[#d4af37] font-semibold text-lg">₹{totalCartPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-white/50 text-center uppercase tracking-wider">
                    Our sandals are authentic. Secure checkout via verified channels.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a 
                      href="https://www.amazon.in/s?k=handcrafted+leather+kolhapuri+sandals+women"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 px-2 bg-[#232F3E] hover:bg-[#37475A] text-white text-xs uppercase tracking-widest font-semibold text-center rounded-sm transition-all duration-300"
                    >
                      Buy On Amazon <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="https://www.flipkart.com/search?q=kolhapuri+sandals+leather+women" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3 px-2 bg-[#2874F0] hover:bg-[#1B57BD] text-white text-xs uppercase tracking-widest font-semibold text-center rounded-sm transition-all duration-300"
                    >
                      Buy On Flipkart <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-[10px] text-[#d4af37]/80 italic">
                      *Note: Clicking links opens official Kolhapuri Paul searches on partner platforms.
                    </p>
                  </div>
                </div>
              )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Container Toast Notification */}
      {cartNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#160d07] border border-[#d4af37] px-5 py-4 shadow-2xl rounded-sm flex items-center gap-3 max-w-sm animate-fade-in-up">
          <div className="bg-[#d4af37]/20 p-1.5 rounded-full">
            <Check className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">Added to Cart</p>
            <p className="text-xs text-[#fbf8f3] mt-0.5">{cartNotification}</p>
          </div>
          <button onClick={() => setCartNotification(null)} className="text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* ==================== 1. HOME PAGE ==================== */}
        {activeTab === 'home' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            
            {/* Cinematic Hero Section */}
            <section className="relative h-[85vh] sm:h-[90vh] overflow-hidden flex items-center justify-center bg-black">
              {/* Slow Motion Video / Photo Backdrop */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={getImagePath("./images/royal_banner_mogra_1784274952702.jpg")} 
                  alt="Artisan hand stitching leather" 
                  className="w-full h-full object-cover opacity-45 scale-105 animate-pulse-slow"
                />
                {/* Visual leather texture ambient gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0906] via-transparent to-[#0f0906]/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0906]/90 via-[#0f0906]/30 to-[#0f0906]/90"></div>
                {/* Hand stitch line overlay decor */}
                <div className="absolute left-8 right-8 top-8 bottom-8 border border-[#d4af37]/10 pointer-events-none rounded-sm"></div>
              </div>

              {/* Hero Inner Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.1
                    }
                  }
                }}
                className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: -15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[#1d1109]/80 border border-[#d4af37]/30 rounded-full text-[10px] tracking-[0.25em] text-[#d4af37] uppercase mb-2"
                >
                  <Star className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                  <span>The Golden Legacy of Kolhapur</span>
                </motion.div>
                
                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.15em] text-white font-medium leading-none"
                >
                  KOLHAPURI PAUL
                </motion.h1>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="font-serif italic text-lg sm:text-2xl text-[#d4af37] tracking-wider font-light"
                >
                  Every Step Carries A Tradition
                </motion.p>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" } }
                  }}
                  className="max-w-xl mx-auto text-xs sm:text-sm text-[#fbf8f3]/70 leading-relaxed uppercase tracking-widest font-light"
                >
                  Premium Handcrafted Vegetable-Tanned Women's Sandals, Built by Royal Heritage Artisans.
                </motion.p>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <button 
                    onClick={() => {
                      setActiveTab('collections');
                      setCollectionFilter('All');
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#d4af37]/10"
                  >
                    Explore Collection
                  </button>
                  <button 
                    onClick={() => setActiveTab('care')}
                    className="w-full sm:w-auto px-8 py-4 bg-[#140c08]/80 border border-[#d4af37]/30 hover:border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
                  >
                    Leather Care Guide
                  </button>
                </motion.div>
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 text-[10px] tracking-widest uppercase">
                <span>Scroll to Explore</span>
                <ArrowDown className="w-4.5 h-4.5 mt-2 animate-bounce text-[#d4af37]/60" />
              </div>
            </section>

            {/* New Arrivals Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#d4af37]/5">
              <div className="text-center space-y-2 mb-14">
                <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase">Curated Masterpieces</span>
                <h2 className="text-3xl sm:text-5xl font-serif tracking-wider">NEW ARRIVALS</h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: "Ambabai Collection",
                    desc: "Golden floral motifs inspired by local temple craft.",
                    img: "./images/kolhapuri_red_pompom_1784182929447.jpg",
                    pId: "ambabai-floral"
                  },
                  {
                    title: "Royal Wedding",
                    desc: "Opulent gold threads for glorious festive journeys.",
                    img: "./images/kolhapuri_royal_banner_1784182889076.jpg",
                    pId: "royal-wedding"
                  },
                  {
                    title: "Classic Heritage",
                    desc: "Timeless barks tanning, rustic natural walnut dye.",
                    img: "./images/kolhapuri_tan_open_1784182943658.jpg",
                    pId: "classic-heritage"
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                    }}
                    className="group bg-[#130b06] border border-[#d4af37]/10 overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-leather-dark">
                      <img 
                        src={getImagePath(item.img)} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#130b06] via-transparent to-transparent opacity-65"></div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="font-serif text-2xl tracking-wide text-white group-hover:text-[#d4af37] transition-colors">{item.title}</h3>
                      <p className="text-xs text-[#fbf8f3]/60 leading-relaxed font-light">{item.desc}</p>
                      
                      <button 
                        onClick={() => {
                          const prod = PRODUCTS.find(p => p.id === item.pId) || PRODUCTS[0];
                          viewProductDetails(prod);
                        }}
                        className="inline-flex items-center gap-1 text-[#d4af37] hover:text-[#fbf8f3] text-xs uppercase tracking-widest font-semibold transition-colors mt-2 focus:outline-none"
                      >
                        Shop Now <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* Our Story / Heritage Section */}
            <section className="py-20 bg-gradient-to-b from-[#140c08] to-[#0f0906] border-t border-b border-[#d4af37]/5 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Visual Column - Bhavani Mandap Palace */}
                <div className="relative group overflow-hidden border border-[#d4af37]/15 rounded-sm">
                  <div className="absolute inset-0 border-4 border-dashed border-[#d4af37]/10 pointer-events-none z-10 m-2"></div>
                  <img 
                    src={getImagePath("./images/heritage_palace_mogra_1784274973797.jpg")} 
                    alt="Bhavani Mandap Kolhapur Heritage" 
                    className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute bottom-4 left-4 bg-leather-dark/90 border border-[#d4af37]/20 px-4 py-2 text-[10px] tracking-[0.2em] text-[#d4af37] uppercase">
                    Historic Bhavani Mandap, Kolhapur
                  </div>
                </div>

                {/* Text Story Column */}
                <div className="space-y-6 lg:pl-6">
                  <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Royal Legacy Since 13th Century</span>
                  <h2 className="text-3xl sm:text-5xl font-serif tracking-wider text-white">BORN IN KOLHAPUR</h2>
                  <div className="w-16 h-[1px] bg-[#d4af37] my-4"></div>
                  
                  <div className="space-y-4 text-sm text-[#fbf8f3]/80 leading-relaxed font-light">
                    <p>
                      Nestled at the foothills of the Sahyadri mountains, the historic city of Kolhapur holds an ancient leather secret. Initiated under the visionary guidance of the royal family of Chhatrapati Shahu Maharaj, our sandals are the culmination of 800 years of design preservation.
                    </p>
                    <p>
                      Each pair is **crafted entirely by skilled local artisans** who passed down this ancestral knowledge over generations. We combine this time-honored art with modern ergonomic contours designed explicitly for the modern woman who values tradition without compromising contemporary comfort.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setActiveTab('care')}
                      className="px-6 py-3 bg-[#1d1109] hover:bg-[#d4af37] hover:text-leather-dark border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
                    >
                      View Care Guidelines
                    </button>
                  </div>
                </div>

              </div>
            </section>



            {/* Featured Product Highlight Area */}
            <section className="py-20 bg-[#140c08] border-t border-b border-[#d4af37]/10 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Banner Image */}
                <div className="lg:col-span-7 relative group overflow-hidden border border-[#d4af37]/25 rounded-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none z-10"></div>
                  <img 
                    src={getImagePath("./images/royal_banner_mogra_1784274952702.jpg")} 
                    alt="Ambabai Floral Sandal Premium Showcase" 
                    className="w-full aspect-[16/10] object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-[#d4af37] text-leather-dark text-[10px] tracking-[0.2em] font-semibold px-3 py-1 uppercase">
                    MOST WANTED MASTERPIECE
                  </div>
                </div>

                {/* Details Side Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#d4af37] tracking-[0.3em] uppercase block">TODAY'S SIGNATURE PAIR</span>
                    <h3 className="text-4xl font-serif tracking-wider text-white">AMBABAI FLORAL</h3>
                    <div className="flex items-center gap-2 text-amber-400 mt-1">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />)}
                      </div>
                      <span className="text-xs text-white/60">(128 Customer Reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-serif text-[#d4af37]">₹2,499</span>
                    <span className="text-base text-white/40 line-through">₹3,499</span>
                    <span className="text-xs text-green-500 font-semibold">(28% OFF)</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#fbf8f3]/80 leading-relaxed font-light">
                    Meticulously carved floral center emblem embellished with natural tilla gold-embroidery. Features a cushioned full-grain leather footbed that forms a custom imprint of your sole.
                  </p>

                  {/* Size selector */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs tracking-wider uppercase">
                      <span className="text-white/60">Select Size (UK/India):</span>
                      <button 
                        onClick={() => {
                          setSelectedProduct(PRODUCTS[0]);
                          setActiveTab('product');
                        }}
                        className="text-[#d4af37] hover:underline"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {[5, 6, 7, 8, 9].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-11 border text-xs tracking-widest font-semibold flex items-center justify-center transition-all duration-300 rounded-sm focus:outline-none ${
                            selectedSize === size
                              ? 'bg-[#d4af37] border-[#d4af37] text-leather-dark font-bold'
                              : 'border-white/10 hover:border-[#d4af37]/60 text-white/80 hover:text-[#d4af37]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => addToCart(PRODUCTS[0], selectedSize)}
                      className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 text-center rounded-sm focus:outline-none"
                    >
                      Add To Cart
                    </button>
                    <button 
                      onClick={() => viewProductDetails(PRODUCTS[0])}
                      className="py-4 px-6 bg-[#120c08] hover:bg-[#1f140e] border border-white/15 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 text-center rounded-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Why Kolhapuri Paul - Premium Perks Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center space-y-2 mb-14">
                <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase">The Guarantee of Excellence</span>
                <h2 className="text-3xl sm:text-5xl font-serif tracking-wider">WHY KOLHAPURI PAUL</h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { icon: Award, title: "100% Handmade", desc: "No machinery used" },
                  { icon: ShieldCheck, title: "Genuine Leather", desc: "Premium full grain hide" },
                  { icon: Sparkles, title: "Super Comfort", desc: "Flexible, soft footbeds" },
                  { icon: Gift, title: "Luxury Package", desc: "Perfect for royal gifts" },
                  { icon: MapPin, title: "Born in Kolhapur", desc: "Authentic local heritage" },
                  { icon: Leaf, title: "Sustainable", desc: "Natural vegetable tanning" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#130b06] border border-[#d4af37]/10 p-6 rounded-sm text-center space-y-3 hover:border-[#d4af37]/35 hover:-translate-y-1 transition-all duration-300">
                    <div className="w-10 h-10 bg-[#1c110a] border border-[#d4af37]/25 rounded-full flex items-center justify-center text-[#d4af37] mx-auto">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-sm tracking-wide text-white font-medium">{item.title}</h4>
                    <p className="text-[10px] text-white/50 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Packaging Unboxing Interactive Experience */}
            <section className="py-20 bg-gradient-to-b from-[#0f0906] to-[#140c08] border-t border-b border-[#d4af37]/15 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Story Info */}
                <div className="space-y-6">
                  <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">An Unboxing Tradition</span>
                  <h2 className="text-3xl sm:text-5xl font-serif tracking-wider text-white">THE LUXURY UNBOXING EXPERIENCE</h2>
                  <div className="w-16 h-[1px] bg-[#d4af37] my-4"></div>
                  
                  <p className="text-sm text-[#fbf8f3]/80 leading-relaxed font-light">
                    Every pair of Kolhapuri Paul is packed like a royal treasure. We believe that receiving your sandals should be as spectacular as stepping into them. Each element in our standard packaging serves an organic protective purpose.
                  </p>

                  {/* Flow breakdown */}
                  <div className="space-y-4 pt-2">
                    {[
                      { step: "A", title: "Luxury Rigid Gold-Foil Box", desc: "Sturdy structural box decorated with classic temple embossing." },
                      { step: "B", title: "Certificate of Authenticity", desc: "Signed directly by the master artisan of your specific pair." },
                      { step: "C", title: "100% Cotton Dust Bags", desc: "Allows natural leather pores to dry comfortably during storage." },
                      { step: "D", title: "Pure Castor Oil Vial", desc: "20ml organic castor extract for standard 30-day moisturizing." }
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-6 h-6 bg-[#d4af37]/10 text-[#d4af37] text-xs font-serif font-bold rounded-full flex items-center justify-center border border-[#d4af37]/25 flex-shrink-0 mt-0.5">
                          {step.step}
                        </div>
                        <div>
                          <h5 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">{step.title}</h5>
                          <p className="text-xs text-white/50 font-light mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging Visualization Box Card */}
                <div className="bg-[#120a06] border border-[#d4af37]/20 p-8 sm:p-12 text-center rounded-sm relative shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none"></div>
                  
                  <div className="space-y-6 max-w-sm mx-auto">
                    <div className="w-24 h-24 mx-auto border-2 border-dashed border-[#d4af37]/30 rounded-xl flex items-center justify-center group-hover:border-[#d4af37] transition-colors duration-500">
                      <Gift className="w-12 h-12 text-[#d4af37]/70 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <h4 className="font-serif text-3xl tracking-wide text-white">THE ROYAL COFFER</h4>
                    <p className="text-xs text-white/60 leading-relaxed uppercase tracking-wider">
                      Luxury Box → Certificate → Dust Bag → Leather Care Oil → Your Custom Pair
                    </p>
                    
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
                    
                    <p className="text-[11px] italic text-[#d4af37] font-light leading-relaxed">
                      "Opening this felt like finding a historic artifact in a modern era. The natural leather smell and gold certificate are majestic."
                    </p>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.25em] font-medium">— Shravya K., Mumbai</p>
                  </div>
                </div>

              </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center space-y-2 mb-14">
                <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase">Beloved By Patrons Worldwide</span>
                <h2 className="text-3xl sm:text-5xl font-serif tracking-wider">PATRON TESTIMONIALS</h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Priya Deshmukh", city: "Pune", comment: "The stitching detail on the Ambabai Floral is outstanding. It is so hard to find genuine handcrafted leather sandals in typical shoe shops. Will cherish these for years.", stars: 5 },
                  { name: "Anjali Sharma", city: "New Delhi", comment: "Absolutely breathtaking. From the royal cardboard box to the lovely cotton dust bags, you can tell the creators respect their heritage. Truly squeak-free and beautiful.", stars: 5 },
                  { name: "Meera Nair", city: "Bengaluru", comment: "I wore these for a 3-day family wedding. Zero shoe bites, zero irritation. The footbed has already molded to my foot shape perfectly. Outstanding castor polish finish.", stars: 5 }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#130b06] border border-[#d4af37]/15 p-8 rounded-sm relative">
                    <div className="absolute top-6 right-8 text-6xl font-serif text-[#d4af37]/10 pointer-events-none select-none">“</div>
                    <div className="flex text-[#d4af37] gap-0.5 mb-4">
                      {[...Array(item.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#d4af37]" />)}
                    </div>
                    <p className="text-xs sm:text-sm text-[#fbf8f3]/80 leading-relaxed font-light italic mb-6">
                      "{item.comment}"
                    </p>
                    <div className="border-t border-[#d4af37]/10 pt-4 flex justify-between items-center text-xs">
                      <span className="font-serif tracking-wide text-white font-medium">{item.name}</span>
                      <span className="text-[#d4af37]/80 uppercase tracking-widest text-[10px]">{item.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Instagram / Social Showcase */}
            <section className="py-14 bg-[#140c08] border-t border-[#d4af37]/10 px-4">
              <div className="max-w-7xl mx-auto text-center space-y-4">
                <p className="text-xs tracking-[0.3em] uppercase text-[#d4af37]">FOLLOW THE LEGACY ON INSTAGRAM</p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-white hover:text-[#d4af37] text-sm uppercase tracking-widest font-semibold transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5 text-[#d4af37]" /> @kolhapuripaul
                </a>

                {/* Instagram posts visual mockup */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                  {[
                    "./images/kolhapuri_tan_open_1784182943658.jpg",
                    "./images/artisan_stitching_close_1784188217493.jpg",
                    "./images/artisan_workshop_stack_1784188236319.jpg",
                    "./images/artisan_carving_sole_1784188253561.jpg"
                  ].map((url, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden group border border-white/5 bg-leather-dark">
                      <img src={getImagePath(url)} alt="Instagram Showcase Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Instagram className="w-6 h-6 text-[#d4af37]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </motion.div>
        )}

        {/* ==================== 2. COLLECTION PAGE ==================== */}
        {activeTab === 'collections' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
          >
            
            {/* Page Header / Hero Banner */}
            <div className="bg-[#140c08] border border-[#d4af37]/15 p-8 sm:p-12 text-center rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-15">
                <img src="https://images.unsplash.com/photo-1524292332607-d557a0dbd675?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" alt="Leather texture back" />
              </div>
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Royal Craft Portfolio</span>
                <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-white">THE WOMEN'S COLLECTION</h1>
                <div className="w-20 h-[1px] bg-[#d4af37] mx-auto my-4"></div>
                <p className="text-xs uppercase tracking-widest text-white/60 max-w-lg mx-auto leading-relaxed">
                  Every step is a walk through 800 years of pure heritage. Explore our natural-tanned collections, hand-stitched by certified master artisans in Kolhapur.
                </p>
              </div>
            </div>

            {/* Interactive Filters Panel */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#d4af37]/10">
              
              {/* Tabs list */}
              <div className="flex flex-wrap gap-2">
                {(['All', 'Classic', 'Wedding', 'Premium', 'New Arrival'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setCollectionFilter(filter)}
                    className={`px-5 py-2.5 text-xs uppercase tracking-widest rounded-sm transition-all focus:outline-none ${
                      collectionFilter === filter
                        ? 'bg-[#d4af37] text-leather-dark font-semibold'
                        : 'bg-[#130b06] border border-[#d4af37]/15 text-[#fbf8f3]/80 hover:border-[#d4af37]/50'
                    }`}
                  >
                    {filter} {filter === 'All' ? `(${PRODUCTS.length})` : `(${PRODUCTS.filter(p => p.category === filter).length})`}
                  </button>
                ))}
              </div>

              {/* Counter status info */}
              <div className="text-xs uppercase tracking-widest text-[#d4af37]">
                Showing {filteredProducts.length} Premium Masterpieces
              </div>
            </div>

            {/* Product Grid */}
            <motion.div 
              key={collectionFilter}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                  }}
                  className="group bg-[#130b06] border border-[#d4af37]/10 hover:border-[#d4af37]/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 relative shadow-lg"
                >
                  
                  {/* Like / Wishlist Button */}
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-4 right-4 z-20 p-2 bg-leather-dark/80 border border-white/10 hover:border-[#d4af37] rounded-full text-[#fbf8f3] hover:text-[#d4af37] transition-all focus:outline-none"
                  >
                    <Heart className={`w-4 h-4 ${likedProducts.includes(product.id) ? 'fill-[#d4af37] text-[#d4af37]' : ''}`} />
                  </button>

                  {/* Product Image Stage */}
                  <div 
                    onClick={() => viewProductDetails(product)}
                    className="relative aspect-[4/5] w-full overflow-hidden bg-leather-dark cursor-pointer group"
                  >
                    <img 
                      src={getImagePath(product.images.front)} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130b06] via-transparent to-transparent opacity-60"></div>
                    
                    {/* Hover Quick View Ribbon */}
                    <div className="absolute bottom-0 left-0 w-full bg-[#d4af37]/95 backdrop-blur-sm py-3 text-center text-[10px] tracking-[0.25em] text-leather-dark font-bold uppercase translate-y-full group-hover:translate-y-0 transition-all duration-300">
                      View Detailed Gallery
                    </div>

                    {/* Category Ribbon */}
                    <span className="absolute top-4 left-4 bg-leather-dark/80 border border-[#d4af37]/30 text-[#d4af37] text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm">
                      {product.category}
                    </span>
                  </div>

                  {/* Core details block */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 
                        onClick={() => viewProductDetails(product)}
                        className="font-serif text-xl tracking-wide text-white cursor-pointer hover:text-[#d4af37] transition-colors"
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[#d4af37] text-xs">
                        <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#fbf8f3]/60 line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-serif text-[#d4af37]">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-white/40 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <button 
                        onClick={() => viewProductDetails(product)}
                        className="px-4 py-2 bg-[#1c110a] hover:bg-[#d4af37] hover:text-leather-dark border border-[#d4af37]/25 text-[#d4af37] text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm focus:outline-none"
                      >
                        View Product
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>

            {/* Sizing Information Block */}
            <div className="bg-[#130b06] border border-[#d4af37]/10 p-8 rounded-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mt-12">
              <div className="space-y-2">
                <h4 className="font-serif text-2xl tracking-wide text-[#d4af37]">AUTHENTIC SIZING</h4>
                <p className="text-xs text-[#fbf8f3]/60 leading-relaxed font-light">
                  Our sandals are sized according to standard UK/India measurements. Since genuine leather stretches and molds to your feet, we recommend picking your exact standard size.
                </p>
              </div>
              <div className="lg:col-span-2 overflow-x-auto no-scrollbar">
                <table className="w-full text-left text-xs tracking-wider uppercase text-white/80 border-collapse">
                  <thead>
                    <tr className="border-b border-[#d4af37]/15 pb-2 text-[#d4af37]">
                      <th className="py-2 pr-4 font-normal">UK/India Size</th>
                      <th className="py-2 px-4 font-normal">Euro Size</th>
                      <th className="py-2 px-4 font-normal">US Women Size</th>
                      <th className="py-2 pl-4 font-normal">Foot Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="font-light divide-y divide-white/5">
                    <tr><td className="py-2.5 pr-4">5</td><td className="py-2.5 px-4">38</td><td className="py-2.5 px-4">7</td><td className="py-2.5 pl-4">8.8"</td></tr>
                    <tr><td className="py-2.5 pr-4">6</td><td className="py-2.5 px-4">39</td><td className="py-2.5 px-4">8</td><td className="py-2.5 pl-4">9.2"</td></tr>
                    <tr><td className="py-2.5 pr-4">7</td><td className="py-2.5 px-4">40</td><td className="py-2.5 px-4">9</td><td className="py-2.5 pl-4">9.5"</td></tr>
                    <tr><td className="py-2.5 pr-4">8</td><td className="py-2.5 px-4">41</td><td className="py-2.5 px-4">10</td><td className="py-2.5 pl-4">9.8"</td></tr>
                    <tr><td className="py-2.5 pr-4">9</td><td className="py-2.5 px-4">42</td><td className="py-2.5 px-4">11</td><td className="py-2.5 pl-4">10.2"</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        )}

        {/* ==================== 3. PRODUCT DETAIL PAGE ==================== */}
        {activeTab === 'product' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Photo Gallery */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Active Main Image */}
                <div className="relative aspect-square bg-[#130b06] border border-[#d4af37]/20 rounded-sm overflow-hidden group">
                  <img 
                    src={getImagePath(selectedProduct.images[activeProductImage])} 
                    alt={`${selectedProduct.name} main view`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-leather-dark/80 border border-[#d4af37]/30 text-[#d4af37] text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm">
                    {selectedProduct.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/75 px-3 py-1.5 text-[10px] tracking-widest uppercase text-white/70 font-light rounded-sm">
                    {activeProductImage} VIEW
                  </div>
                </div>

                {/* Thumbnails Navigation Grid */}
                <div className="grid grid-cols-5 gap-3">
                  {(Object.keys(selectedProduct.images) as Array<keyof Product['images']>).map((imgKey) => (
                    <button
                      key={imgKey}
                      onClick={() => setActiveProductImage(imgKey)}
                      className={`relative aspect-square bg-[#130b06] border rounded-sm overflow-hidden transition-all duration-300 focus:outline-none ${
                        activeProductImage === imgKey
                          ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
                          : 'border-white/10 hover:border-[#d4af37]/45'
                      }`}
                    >
                      <img 
                        src={getImagePath(selectedProduct.images[imgKey])} 
                        alt={`${selectedProduct.name} thumb ${imgKey}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Product Core Details */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Header title */}
                <div className="space-y-2">
                  <span className="text-xs text-[#d4af37] uppercase tracking-[0.25em] font-medium block">
                    Royal Handcrafted Leather Footwear
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-wider text-white">
                    {selectedProduct.name}
                  </h1>
                  
                  {/* Rating / Review */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#d4af37] font-semibold">{selectedProduct.rating} Stars</span>
                    <span className="text-xs text-white/40">|</span>
                    <span className="text-xs text-white/50">{selectedProduct.reviewsCount} Patron Reviews</span>
                  </div>
                </div>

                {/* Price block */}
                <div className="p-4 bg-[#130b06] border border-[#d4af37]/15 rounded-sm flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Patron Royal Price</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-serif text-[#d4af37]">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-white/40 line-through">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/10 border border-green-500/30 text-green-500 px-3 py-1 uppercase tracking-widest rounded-sm font-semibold">
                    SAVE {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% Today
                  </span>
                </div>

                {/* Quick details */}
                <p className="text-xs sm:text-sm text-[#fbf8f3]/80 leading-relaxed font-light">
                  {selectedProduct.description}
                </p>

                {/* Size Selector */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs tracking-wider uppercase text-white/70">
                    <span>Select Size (UK/India):</span>
                    <span className="text-amber-500 font-semibold text-[11px]">True to Size</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border text-xs tracking-widest font-semibold flex items-center justify-center transition-all duration-300 rounded-sm focus:outline-none ${
                          selectedSize === size
                            ? 'bg-[#d4af37] border-[#d4af37] text-leather-dark font-bold'
                            : 'border-white/10 hover:border-[#d4af37]/60 text-white/80 hover:text-[#d4af37]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Action CTAs */}
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => addToCart(selectedProduct, selectedSize)}
                    className="w-full py-4.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 text-center rounded-sm focus:outline-none"
                  >
                    Add to Cart & Secure Box
                  </button>
                  
                  {/* External Buying Channels */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <a 
                      href={`https://www.amazon.in/s?k=handcrafted+leather+kolhapuri+sandals+women+${encodeURIComponent(selectedProduct.name)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3.5 px-4 bg-[#232F3E] hover:bg-[#37475A] text-white text-[11px] uppercase tracking-widest font-semibold text-center rounded-sm transition-all duration-300"
                    >
                      Buy On Amazon <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href={`https://www.flipkart.com/search?q=kolhapuri+sandals+leather+women+${encodeURIComponent(selectedProduct.name)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-3.5 px-4 bg-[#2874F0] hover:bg-[#1B57BD] text-white text-[11px] uppercase tracking-widest font-semibold text-center rounded-sm transition-all duration-300"
                    >
                      Buy On Flipkart <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Fast Information bullets */}
                <div className="border-t border-[#d4af37]/10 pt-5 grid grid-cols-2 gap-4 text-xs tracking-wider text-white/70">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37]" />
                    <span>100% Genuine Leather</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37]" />
                    <span>Authentic Royal Box</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37]" />
                    <span>Free Shipping across India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#d4af37]" />
                    <span>Handcrafted in Kolhapur</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Specifications Tabs Section */}
            <div className="border-t border-[#d4af37]/15 pt-12">
              <div className="flex border-b border-[#d4af37]/10 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
                {[
                  { id: 'desc', label: 'Detailed Highlight' },
                  { id: 'specs', label: 'Specifications' },
                  { id: 'packaging', label: 'Packaging Included' },
                  { id: 'shipping', label: 'Shipping Details' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSpecTab(tab.id as any)}
                    className={`py-4 px-4 sm:px-6 relative focus:outline-none ${
                      activeSpecTab === tab.id ? 'text-[#d4af37]' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {activeSpecTab === tab.id && (
                      <motion.span 
                        layoutId="activeSpecUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="py-8 text-sm leading-relaxed text-[#fbf8f3]/80 max-w-4xl font-light overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeSpecTab === 'desc' && (
                    <motion.div 
                      key="desc"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <p>{selectedProduct.description}</p>
                      <ul className="space-y-2 mt-4">
                        {selectedProduct.highlights.map((h, i) => (
                          <li key={i} className="flex gap-3 text-xs tracking-wider">
                            <Check className="w-4.5 h-4.5 text-[#d4af37] flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeSpecTab === 'specs' && (
                    <motion.div 
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {[
                        { key: "Leather Grade", val: selectedProduct.specifications.leather },
                        { key: "Finish / Dye Type", val: selectedProduct.specifications.finish },
                        { key: "Fit Profile", val: selectedProduct.specifications.gender },
                        { key: "Stitch Craft", val: selectedProduct.specifications.make },
                        { key: "Heritage Origin", val: selectedProduct.specifications.origin }
                      ].map((spec, i) => (
                        <div key={i} className="p-4 bg-[#130b06] border border-white/5 rounded-sm">
                          <span className="text-[10px] text-[#d4af37] uppercase tracking-widest block font-semibold">{spec.key}</span>
                          <span className="text-xs text-white/80 mt-1 block">{spec.val}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeSpecTab === 'packaging' && (
                    <motion.div 
                      key="packaging"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <p className="text-xs uppercase tracking-widest text-white/60">Every dispatch includes our complete unboxing experience suite:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-[#130b06] border border-[#d4af37]/10 flex gap-3 rounded-sm">
                          <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                          <div>
                            <strong className="text-xs uppercase text-white tracking-widest block">Luxury Gold-Foil Outer Coffer</strong>
                            <p className="text-xs text-white/50 font-light mt-0.5">High-quality rigid cardboard protects sandals from impact during travel.</p>
                          </div>
                        </div>
                        <div className="p-4 bg-[#130b06] border border-[#d4af37]/10 flex gap-3 rounded-sm">
                          <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                          <div>
                            <strong className="text-xs uppercase text-white tracking-widest block">Breathable Cotton Dust Bags</strong>
                            <p className="text-xs text-white/50 font-light mt-0.5">Keeps dust away while allowing natural leather to breathe comfortably.</p>
                          </div>
                        </div>
                        <div className="p-4 bg-[#130b06] border border-[#d4af37]/10 flex gap-3 rounded-sm">
                          <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                          <div>
                            <strong className="text-xs uppercase text-white tracking-widest block">Artisan Signed Certificate</strong>
                            <p className="text-xs text-white/50 font-light mt-0.5">Confirms genuine materials and contains the handwritten initials of your craftsman.</p>
                          </div>
                        </div>
                        <div className="p-4 bg-[#130b06] border border-[#d4af37]/10 flex gap-3 rounded-sm">
                          <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                          <div>
                            <strong className="text-xs uppercase text-white tracking-widest block">20ml Organic Castor Oil Guide</strong>
                            <p className="text-xs text-white/50 font-light mt-0.5">Specially extracted oil for routine leather maintenance and high shine.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeSpecTab === 'shipping' && (
                    <motion.div 
                      key="shipping"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <p>
                        Since each pair is meticulously hand-inspected, we dispatch within 24 hours of receiving your order.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-[#130b06] border border-white/5 rounded-sm">
                          <span className="text-[10px] text-[#d4af37] uppercase tracking-widest block font-semibold">Estimated Delivery Timeline</span>
                          <p className="text-xs text-white/80 mt-1">Metro Cities: 3 - 5 business days<br />Rest of India: 5 - 7 business days</p>
                        </div>
                        <div className="p-4 bg-[#130b06] border border-white/5 rounded-sm">
                          <span className="text-[10px] text-[#d4af37] uppercase tracking-widest block font-semibold">Tracking Information</span>
                          <p className="text-xs text-white/80 mt-1">A real-time tracking link will be sent directly to your mobile phone via SMS and email immediately upon dispatch.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Related Products Section */}
            <div className="border-t border-[#d4af37]/15 pt-12 space-y-6">
              <h3 className="font-serif text-2xl tracking-wide text-white uppercase">You May Also Appreciate</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 4).map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => viewProductDetails(product)}
                    className="bg-[#130b06] border border-[#d4af37]/10 hover:border-[#d4af37]/35 rounded-sm overflow-hidden p-4 group cursor-pointer transition-all duration-300"
                  >
                    <div className="aspect-square rounded overflow-hidden bg-leather-dark mb-4">
                      <img 
                        src={getImagePath(product.images.front)} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-base text-white tracking-wide group-hover:text-[#d4af37] transition-colors">{product.name}</h4>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-[#d4af37]">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-white/40 uppercase tracking-widest text-[9px]">{product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ==================== 5. LEATHER CARE PAGE ==================== */}
        {activeTab === 'care' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
          >
            
            {/* Page Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Preserving Your Royal Investment</span>
              <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-white">CARE THAT LASTS GENERATIONS</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto"></div>
              <p className="text-xs uppercase tracking-widest text-white/60 leading-relaxed">
                Vegetable-tanned leather is a living material. Follow our direct care ritual to keep the fibers hydrated, glossy, and comfortable for decades.
              </p>
            </div>

            {/* Quick Tips Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CARE_GUIDES.map((tip) => (
                <div key={tip.id} className="bg-[#130b06] border border-[#d4af37]/15 p-6 rounded-sm space-y-3 hover:border-[#d4af37]/40 transition-colors">
                  <div className="w-10 h-10 bg-[#1c110a] border border-[#d4af37]/20 rounded-full flex items-center justify-center text-[#d4af37]">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg tracking-wide text-white font-medium">{tip.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{tip.description}</p>
                </div>
              ))}
            </div>

            {/* Castor Oil Guide (Interactive Illustration box) */}
            <div className="bg-[#140c08] border border-[#d4af37]/20 p-8 sm:p-12 rounded-sm space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[10px] text-[#d4af37] tracking-[0.3em] uppercase font-semibold">The 30-Day Ritual</span>
                <h3 className="text-3xl font-serif tracking-wide text-white">THE PURE CASTOR OIL PROTOCOL</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest max-w-md mx-auto">
                  A 10-minute ritual that keeps the water-buffalo hide fibers dynamic and prevents natural aging cracks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
                {[
                  { step: "01", title: "Every 30 Days", desc: "Set a regular reminder. Consistent care guarantees decades of durability." },
                  { step: "02", title: "2–3 Drops Only", desc: "Do not saturate. Apply only a couple of drops of castor oil to the leather straps." },
                  { step: "03", title: "Soft Cotton Cloth", desc: "Gently buff the oil across the surface in small, circular motions." },
                  { step: "04", title: "Leave Overnight", desc: "Allow the sandals to fully absorb the oil in a cool shaded room before wearing." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#0f0906] border border-white/5 p-6 rounded text-center space-y-3 relative">
                    <div className="absolute top-4 left-4 text-[#d4af37]/20 font-serif text-3xl font-bold">{item.step}</div>
                    <h5 className="font-serif text-base tracking-wide text-[#d4af37] font-medium pt-4">{item.title}</h5>
                    <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Care Section */}
            <div className="border-t border-[#d4af37]/15 pt-12 space-y-8 max-w-4xl mx-auto">
              <h3 className="font-serif text-3xl text-center tracking-wider text-white uppercase">CARE FREQUENTLY ASKED QUESTIONS</h3>
              
              <div className="space-y-6">
                {[
                  { q: "What should I do if my sandals get wet in the rain?", a: "Do not panic. Immediately blot any excess water with a dry cloth. Allow them to dry naturally in a cool, well-ventilated room. Never expose wet leather to direct sunlight, heaters, or blow dryers, as this breaks down the organic tanning binders and leads to cracking." },
                  { q: "Why do my sandals make a squeaking sound while walking?", a: "The classic wooden squeak is the hallmark of genuine water-buffalo leather. This is caused by the thick natural fibers of the sole rubbing against the central leather cord. If you wish to reduce this sound, simply apply 2 drops of castor oil directly into the central stitch line on the bottom sole." },
                  { q: "The sandals feel slightly tight on my first wear. Is this normal?", a: "Yes, absolutely normal. True vegetable-tanned leather is stiff initially. Within 3-4 days of light wear, the fibers stretch and mold to the unique contours of your feet, creating a personalized anatomical shape. You can rub a tiny amount of castor oil on the inside of the strap to accelerate softening." }
                ].map((item, i) => (
                  <div key={i} className="bg-[#130b06] border border-[#d4af37]/10 p-6 rounded-sm space-y-2">
                    <h4 className="font-serif text-lg tracking-wide text-[#d4af37] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#d4af37]/75" />
                      {item.q}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#fbf8f3]/75 leading-relaxed font-light pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ==================== 6. JOURNAL / STORIES PAGE ==================== */}
        {activeTab === 'journal' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
          >
            
            {/* Page Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Stories of Heritage, Craftsmanship & Timeless Style</span>
              <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-white">The Journal</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto"></div>
            </div>

            {/* Grid of Blog posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOGS.map((blog, idx) => (
                <div key={blog.id} className="bg-[#130b06] border border-[#d4af37]/10 overflow-hidden rounded-sm flex flex-col justify-between group hover:border-[#d4af37]/45 transition-all duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden bg-leather-dark">
                    <img src={getImagePath(blog.image)} alt={blog.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 bg-leather-dark/80 border border-[#d4af37]/35 text-[#d4af37] text-[9px] tracking-widest px-2.5 py-1 uppercase rounded-sm">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-wider font-light">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h3 className="font-serif text-2xl tracking-wide text-white group-hover:text-[#d4af37] transition-colors">
                      {idx + 1}. {blog.title}
                    </h3>
                    <p className="text-xs text-[#fbf8f3]/60 line-clamp-3 leading-relaxed font-light">{blog.excerpt}</p>
                    
                    <button 
                      onClick={() => setActiveBlog(blog)}
                      className="inline-flex items-center gap-1 text-[#d4af37] hover:text-[#fbf8f3] text-xs uppercase tracking-widest font-semibold transition-colors pt-2 focus:outline-none"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter section */}
            <div className="bg-[#140c08] border border-[#d4af37]/20 p-8 sm:p-12 text-center rounded-sm max-w-3xl mx-auto space-y-6">
              <span className="text-[10px] text-[#d4af37] tracking-[0.3em] uppercase block font-semibold">Newsletter Section</span>
              <h3 className="text-3xl font-serif text-white tracking-wide">Stay Connected with Kolhapuri Paul</h3>
              <p className="text-xs text-[#fbf8f3]/60 max-w-md mx-auto leading-relaxed">
                Receive updates on new collections, craftsmanship stories, and exclusive launches.
              </p>

              {newsletterSuccess ? (
                <div className="p-4 bg-amber-500/10 border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest rounded-sm max-w-md mx-auto animate-fade-in font-semibold">
                  ✓ Thank you. You are now subscribed.
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="ENTER YOUR EMAIL"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-leather-dark border border-white/10 hover:border-[#d4af37]/30 focus:border-[#d4af37] px-4 py-3 text-xs tracking-wider uppercase text-white placeholder-white/40 focus:outline-none rounded-sm"
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 rounded-sm focus:outline-none"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Blog Article Reader Modal */}
            {activeBlog && (
              <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity" onClick={() => setActiveBlog(null)}></div>
                
                <div className="relative min-h-screen flex items-center justify-center p-4">
                  <div className="relative w-full max-w-3xl bg-[#0f0906] border border-[#d4af37]/30 p-6 sm:p-10 shadow-2xl space-y-6 my-8 rounded-sm">
                    
                    {/* Close button */}
                    <button 
                      onClick={() => setActiveBlog(null)}
                      className="absolute top-4 right-4 p-2 text-white/50 hover:text-[#d4af37] transition-colors focus:outline-none"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="space-y-2">
                      <span className="bg-[#d4af37] text-leather-dark text-[9px] tracking-widest px-2.5 py-0.5 uppercase inline-block rounded-sm">
                        {activeBlog.category}
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide">{activeBlog.title}</h2>
                      <div className="flex gap-4 text-xs text-white/40 uppercase tracking-widest pt-1">
                        <span>{activeBlog.date}</span>
                        <span>{activeBlog.readTime}</span>
                      </div>
                    </div>

                    <div className="aspect-[16/9] w-full rounded overflow-hidden bg-leather-dark">
                      <img src={getImagePath(activeBlog.image)} alt={activeBlog.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-xs sm:text-sm text-white/80 leading-relaxed font-light whitespace-pre-line space-y-4">
                      {activeBlog.content}
                    </div>

                    <div className="border-t border-[#d4af37]/15 pt-6 flex justify-between items-center text-xs">
                      <button 
                        onClick={() => setActiveBlog(null)}
                        className="text-[#d4af37] hover:underline uppercase tracking-widest font-semibold"
                      >
                        ← Back to Journal
                      </button>
                      <span className="text-white/40 uppercase tracking-widest">Kolhapuri Paul Publications</span>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </motion.div>
        )}

        {/* ==================== 7. CONTACT PAGE ==================== */}
        {activeTab === 'contact' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
          >
            
            {/* Page Header */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Direct Line to Our Workshop</span>
              <h1 className="text-4xl sm:text-6xl font-serif tracking-wider text-white">GET IN TOUCH</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto"></div>
              <p className="text-xs uppercase tracking-widest text-white/60 leading-relaxed">
                Have private sizing questions, bespoke wedding requirements, or wish to order customized color finishes? Fill out our formal request.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-[#130b06] border border-[#d4af37]/15 p-6 sm:p-10 rounded-sm">
                
                {contactSuccess ? (
                  <div className="text-center py-12 space-y-4 animate-fade-in">
                    <div className="w-16 h-16 bg-amber-500/10 border border-[#d4af37]/35 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <h3 className="font-serif text-2xl text-white">MESSAGE TRANSMITTED</h3>
                    <p className="text-xs text-[#fbf8f3]/60 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Kolhapuri Paul. Your luxury query has been routed directly to our Rankala Workshop coordinator. We will reply via email or phone within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/60 block font-semibold">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Shreya Patil"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-leather-dark border border-white/10 hover:border-[#d4af37]/25 focus:border-[#d4af37] px-4 py-3 text-xs tracking-wider uppercase text-white focus:outline-none rounded-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-white/60 block font-semibold">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full bg-leather-dark border border-white/10 hover:border-[#d4af37]/25 focus:border-[#d4af37] px-4 py-3 text-xs tracking-wider uppercase text-white focus:outline-none rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 block font-semibold">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. shreya@example.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-leather-dark border border-white/10 hover:border-[#d4af37]/25 focus:border-[#d4af37] px-4 py-3 text-xs tracking-wider uppercase text-white focus:outline-none rounded-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-white/60 block font-semibold">Your Query / Message</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="PLEASE DESCRIBE YOUR REQUIREMENT OR INQUIRY"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-leather-dark border border-white/10 hover:border-[#d4af37]/25 focus:border-[#d4af37] px-4 py-3 text-xs tracking-wider uppercase text-white focus:outline-none rounded-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-[#d4af37] hover:to-[#b8860b] text-leather-dark text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 rounded-sm focus:outline-none"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Contact Details */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  
                  {/* Card 1: Support Email */}
                  <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 flex gap-4 rounded-sm animate-fade-in">
                    <div className="p-2 bg-[#1c110a] text-[#d4af37] rounded-full border border-[#d4af37]/15">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-white tracking-wide uppercase">Patron Support</h4>
                      <p className="text-xs text-white/50 mt-1">Managed by <strong className="text-white">Chetan Manglekar</strong></p>
                      <a href="mailto:care@kolhapuripaul.com" className="text-sm text-[#d4af37] font-semibold block mt-0.5 hover:underline">care@kolhapuripaul.com</a>
                      <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Checked continuously daily</p>
                    </div>
                  </div>

                  {/* Card 2: Orders Email */}
                  <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 flex gap-4 rounded-sm animate-fade-in">
                    <div className="p-2 bg-[#1c110a] text-[#d4af37] rounded-full border border-[#d4af37]/15">
                      <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-white tracking-wide uppercase">Order Queries</h4>
                      <p className="text-xs text-white/50 mt-1">Managed by <strong className="text-white">Shrikant Jarhad</strong></p>
                      <a href="mailto:orders@kolhapuripaul.com" className="text-sm text-[#d4af37] font-semibold block mt-0.5 hover:underline">orders@kolhapuripaul.com</a>
                      <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">For shipping & status updates</p>
                    </div>
                  </div>

                  {/* Card 2: Hours */}
                  <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 flex gap-4 rounded-sm">
                    <div className="p-2 bg-[#1c110a] text-[#d4af37] rounded-full border border-[#d4af37]/15">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-white tracking-wide uppercase">Business Hours</h4>
                      <p className="text-xs text-white/80 mt-1">Mon - Sat: 10:00 AM - 6:00 PM IST</p>
                      <p className="text-[11px] text-white/40 uppercase tracking-widest mt-0.5">Rankala Workshop Office</p>
                    </div>
                  </div>

                  {/* Card 3: Social */}
                  <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 flex gap-4 rounded-sm">
                    <div className="p-2 bg-[#1c110a] text-[#d4af37] rounded-full border border-[#d4af37]/15">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-white tracking-wide uppercase">Instagram Support</h4>
                      <p className="text-xs text-white/80 mt-1">Send a direct message on Instagram</p>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#d4af37] hover:underline text-[11px] uppercase tracking-wider font-semibold block mt-1"
                      >
                        Follow @kolhapuripaul →
                      </a>
                    </div>
                  </div>

                </div>

                {/* Aesthetic footer signature stamp */}
                <div className="p-6 bg-[#140c08] border border-[#d4af37]/15 rounded-sm text-center">
                  <span className="font-serif text-sm tracking-[0.3em] text-[#d4af37] uppercase block font-semibold">Authentic Seal</span>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                    Every pair carrying the signature "म. शिं." and "रू. प." stamps is certified genuinely handmade in Kolhapur.
                  </p>
                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* ==================== 8. PRIVACY / POLICIES PAGE ==================== */}
        {activeTab === 'privacy' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12"
          >
            
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="text-[11px] text-[#d4af37] tracking-[0.3em] uppercase block">Legal Statements</span>
              <h1 className="text-4xl font-serif tracking-wider text-white">POLICIES & GUIDELINES</h1>
              <div className="w-20 h-[1px] bg-[#d4af37] mx-auto mt-2"></div>
            </div>

            <div className="space-y-10 text-sm leading-relaxed text-white/80 font-light">
              
              <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 sm:p-8 space-y-3 rounded-sm">
                <h3 className="font-serif text-xl tracking-wide text-[#d4af37] uppercase">Privacy Policy</h3>
                <p>
                  At Kolhapuri Paul, we respect the absolute privacy of our patrons. We gather your personal information (Name, Shipping Address, Phone Number, and Email) solely for processing shipments and dispatching certificate credentials. We will never sell, lease, or distribute your private database records to third-party telemetry systems or marketing hubs.
                </p>
              </div>

              <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 sm:p-8 space-y-3 rounded-sm">
                <h3 className="font-serif text-xl tracking-wide text-[#d4af37] uppercase">Shipping Policy</h3>
                <p>
                  We dispatch packages from our Kolhapur studio within 24 hours of successful validation. Free shipping is provided automatically across India on all collections. Transit times average 3-5 days for metropolitan regions and 5-7 days elsewhere. International shipping inquiries can be routed formally to care@khpaul.com.
                </p>
              </div>

              <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 sm:p-8 space-y-3 rounded-sm">
                <h3 className="font-serif text-xl tracking-wide text-[#d4af37] uppercase">Return & Exchange Policy</h3>
                <p>
                  Since genuine leather molds completely to your individual anatomical foot form, we accommodate size exchanges within 14 days of package receipt. The sandals must be in absolute mint, unworn condition with our original gold rigid boxes and custom dust sheets intact. To request a courier swap, please message our Rankala coordinator at care@kolhapuripaul.com.
                </p>
              </div>

              <div className="bg-[#130b06] border border-[#d4af37]/10 p-6 sm:p-8 space-y-3 rounded-sm">
                <h3 className="font-serif text-xl tracking-wide text-[#d4af37] uppercase">Terms of Heritage Service</h3>
                <p>
                  Our sandals are handcrafted entirely out of natural vegetable-tanned hides using organic wood bark infusions and traditional castor oil. Standard superficial color inconsistencies, minor grain patterns, and temporary wooden squeaks are not structural defects; they confirm the absolute authenticity of slow hand-crafting methods.
                </p>
              </div>

            </div>

          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#0b0604] border-t border-[#d4af37]/15 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-gold-gradient font-bold">KOLHAPURI PAUL</h3>
            <p className="text-xs text-[#fbf8f3]/60 leading-relaxed font-light">
              Honoring 800 years of regal Indian leather craftsmanship. Built by hand, polished with oil, and wrapped in gold.
            </p>
            <div className="flex gap-4">
              <a href="mailto:care@kolhapuripaul.com" className="p-2 bg-white/5 hover:bg-[#d4af37]/10 text-white hover:text-[#d4af37] rounded-full border border-white/10 transition-colors" title="Email Chetan (Support)">
                <Mail className="w-4 h-4" />
              </a>
              <a href="mailto:orders@kolhapuripaul.com" className="p-2 bg-white/5 hover:bg-[#d4af37]/10 text-white hover:text-[#d4af37] rounded-full border border-white/10 transition-colors" title="Email Shrikant (Orders)">
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sizing / Shop Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-[#d4af37] uppercase tracking-widest font-semibold">PATRON COLLECTIONS</h4>
            <ul className="space-y-2 text-xs tracking-wider uppercase text-white/70">
              <li>
                <button onClick={() => { setActiveTab('collections'); setCollectionFilter('Classic'); }} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Classic Walnut
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('collections'); setCollectionFilter('Wedding'); }} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Royal Wedding Gold
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('collections'); setCollectionFilter('Premium'); }} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Premium Peshwai
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('collections'); setCollectionFilter('New Arrival'); }} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  New Ambabai Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Informational Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-[#d4af37] uppercase tracking-widest font-semibold">AUTHENTIC GUIDES</h4>
            <ul className="space-y-2 text-xs tracking-wider uppercase text-white/70">
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Patron Support
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('care')} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Leather Care Oils
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('journal')} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Legacy Journal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('privacy')} className="hover:text-[#d4af37] transition-colors focus:outline-none">
                  Royal Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-[#d4af37] uppercase tracking-widest font-semibold">RANKALA STUDIO</h4>
            <p className="text-xs text-[#fbf8f3]/60 leading-relaxed font-light">
              Rankala Lake Road, Karveer,<br />Kolhapur District, Maharashtra — 416012
            </p>
            <div className="space-y-1">
              <p className="text-xs text-[#d4af37] font-semibold">
                Support: <a href="mailto:care@kolhapuripaul.com" className="hover:underline">care@kolhapuripaul.com</a>
              </p>
              <p className="text-xs text-[#d4af37] font-semibold">
                Orders: <a href="mailto:orders@kolhapuripaul.com" className="hover:underline">orders@kolhapuripaul.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Gold Border Separator */}
        <div className="max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent my-8"></div>

        {/* Copy / Signature Stamp */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40 text-center sm:text-left">
          <span>
            © 2026 KOLHAPURI PAUL INC. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[#d4af37]/75 font-serif font-light italic">
            Woven with silent devotion in Kolhapur
          </span>
        </div>
      </footer>

    </div>
  );
}

// Visual layout helper objects (Gift icon wrapper)
const Gift = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M12 8a3 3 0 1 1-3-3h3z" />
    <path d="M12 8a3 3 0 1 0 3-3h-3z" />
  </svg>
);

const Leaf = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
    <path d="M9 22v-4h-4" />
  </svg>
);
