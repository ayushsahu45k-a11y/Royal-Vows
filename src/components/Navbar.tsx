import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart, Moon, Sun, ShieldCheck, Sparkles, User, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { savedVenues } = useAppContext();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' },
    { name: 'Compare', path: '/compare' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  if (!mounted) return null;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || !isHome
          ? 'bg-ivory/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg py-3 border-b border-gold/10'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:rotate-12",
            isScrolled || !isHome ? "bg-gradient-luxury shadow-rose/20" : "bg-white/10 backdrop-blur-md border border-white/20"
          )}>
            <span className="text-white font-serif text-3xl font-bold italic">R</span>
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-2xl font-serif font-bold tracking-tight transition-colors leading-none",
              isScrolled || !isHome ? "text-gray-900 dark:text-white" : "text-white"
            )}>
              Royal <span className="text-gold">Vows</span>
            </span>
            <span className={cn(
              "text-[8px] uppercase tracking-[0.3em] font-bold mt-1",
              isScrolled || !isHome ? "text-rose" : "text-gold"
            )}>
              Luxury Weddings
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-xs font-bold uppercase tracking-widest transition-all hover:text-gold relative group/link",
                isScrolled || !isHome 
                  ? (location.pathname === link.path ? "text-rose" : "text-gray-600 dark:text-gray-400") 
                  : "text-white/90"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/link:w-full",
                location.pathname === link.path && "w-full"
              )} />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 pr-6 border-r border-gold/20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className={cn("p-2.5 rounded-xl transition-all hover:scale-110", isScrolled || !isHome ? "text-gray-600 dark:text-gray-400 hover:bg-gold/10" : "text-white hover:bg-white/10")}
                >
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : theme === 'light' ? <Sun className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-ivory dark:bg-gray-900 border-gold/20">
                <DropdownMenuItem onClick={() => setTheme('light')} className="gap-2 cursor-pointer hover:text-gold">
                  <Sun className="w-4 h-4" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="gap-2 cursor-pointer hover:text-gold">
                  <Moon className="w-4 h-4" /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')} className="gap-2 cursor-pointer hover:text-gold">
                  <Monitor className="w-4 h-4" /> System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/admin" className={cn("p-2.5 rounded-xl transition-all hover:scale-110", isScrolled || !isHome ? "text-gray-600 dark:text-gray-400 hover:bg-gold/10" : "text-white hover:bg-white/10")} title="Admin Panel">
              <ShieldCheck className="w-5 h-5" />
            </Link>

            <Link to="/dashboard" className={cn("relative p-2.5 rounded-xl transition-all hover:scale-110", isScrolled || !isHome ? "text-gray-600 dark:text-gray-400 hover:bg-gold/10" : "text-white hover:bg-white/10")}>
              <Heart className="w-5 h-5" />
              {savedVenues.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {savedVenues.length}
                </span>
              )}
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-gradient-luxury text-white px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-rose/30 flex items-center gap-2 group">
                <User className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                Account
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-ivory dark:bg-gray-900 border-gold/20 w-48">
              <DropdownMenuItem asChild>
                <Link to="/login" className="gap-2 cursor-pointer hover:text-gold">
                  <Sparkles className="w-4 h-4" /> Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="gap-2 cursor-pointer hover:text-gold">
                  <User className="w-4 h-4" /> My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gold/10" />
              <DropdownMenuItem className="gap-2 cursor-pointer text-rose hover:bg-rose/10">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-gold/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={cn("w-7 h-7", isScrolled || !isHome ? "text-gray-900 dark:text-white" : "text-white")} />
          ) : (
            <Menu className={cn("w-7 h-7", isScrolled || !isHome ? "text-gray-900 dark:text-white" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-ivory dark:bg-gray-950 shadow-2xl overflow-hidden lg:hidden border-t border-gold/10"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-lg font-serif font-bold py-2 border-b border-gold/5 transition-colors",
                    location.pathname === link.path ? "text-rose" : "text-gray-800 dark:text-white"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-6">
                <div className="flex gap-4">
                  <button onClick={() => setTheme('light')} className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Sun className="w-6 h-6" />
                  </button>
                  <button onClick={() => setTheme('dark')} className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Moon className="w-6 h-6" />
                  </button>
                  <button onClick={() => setTheme('system')} className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                    <Monitor className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex gap-4">
                  <Link to="/admin" className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold" onClick={() => setIsOpen(false)}>
                    <ShieldCheck className="w-6 h-6" />
                  </Link>
                  <Link to="/dashboard" className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold relative" onClick={() => setIsOpen(false)}>
                    <Heart className="w-6 h-6" />
                    {savedVenues.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {savedVenues.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile" className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold" onClick={() => setIsOpen(false)}>
                    <User className="w-6 h-6" />
                  </Link>
                </div>
                <Link to="/login" className="bg-gradient-luxury text-white px-10 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest text-center" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
