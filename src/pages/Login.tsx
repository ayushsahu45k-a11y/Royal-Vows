import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User as UserIcon, Sparkles, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { toast } from 'sonner';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      toast.success('Logged in successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Welcome back!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
        toast.success('Account created successfully!');
      }
      navigate('/profile');
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl z-10 border border-gold/10"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-6 group">
            <div className="w-12 h-12 bg-gradient-luxury rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform">
              <span className="text-white font-serif text-2xl font-bold italic">R</span>
            </div>
            <span className="text-3xl font-serif font-bold tracking-tight text-gray-900 dark:text-white">
              Royal <span className="text-gold">Vows</span>
            </span>
          </Link>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Join the Royalty'}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isLogin ? "New to Royal Vows? " : "Already a member? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-rose hover:text-wine transition-colors"
            >
              {isLogin ? 'Create an account' : 'Sign in here'}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                  <input 
                    required 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/20 focus:ring-2 focus:ring-gold outline-none text-gray-900 dark:text-white transition-all" 
                    placeholder="Ayush Sahu" 
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                <input 
                  required 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/20 focus:ring-2 focus:ring-gold outline-none text-gray-900 dark:text-white transition-all" 
                  placeholder="hello@royalvows.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" />
                <input 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 p-4 rounded-2xl bg-ivory dark:bg-gray-800 border border-gold/20 focus:ring-2 focus:ring-gold outline-none text-gray-900 dark:text-white transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-rose focus:ring-rose border-gold/20 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-bold text-rose hover:text-wine transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl text-sm font-bold uppercase tracking-widest text-white bg-gradient-luxury hover:shadow-rose/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gold/20 rounded-2xl hover:bg-ivory dark:hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Google</span>
          </button>
          <button 
            disabled={loading}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-gold/20 rounded-2xl hover:bg-ivory dark:hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            <Facebook className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
