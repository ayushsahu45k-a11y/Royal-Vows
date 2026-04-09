import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { venues } from '../data/mockData';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  suggestions?: any[];
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Namaste! I'm your Royal Vows AI assistant. How can I help you find your dream wedding venue today?",
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI Logic
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (query: string): Message => {
    const q = query.toLowerCase();
    let text = "I'm not sure I understand. Could you tell me more about your preferred location or budget?";
    let suggestions: any[] = [];

    if (q.includes('palace') || q.includes('royal')) {
      text = "Palace weddings are truly magical! Here are some of our top-rated palaces in Rajasthan:";
      suggestions = venues.filter(v => v.type === 'Palace').slice(0, 2);
    } else if (q.includes('beach') || q.includes('goa')) {
      text = "A beach wedding sounds lovely! Goa has some stunning resorts. Check these out:";
      suggestions = venues.filter(v => v.type === 'Beach' || v.city === 'Goa').slice(0, 2);
    } else if (q.includes('budget') || q.includes('cheap') || q.includes('affordable')) {
      text = "I can help with that. Here are some venues that offer great value for your celebration:";
      suggestions = venues.sort((a, b) => a.pricePerPlate - b.pricePerPlate).slice(0, 2);
    } else if (q.includes('delhi') || q.includes('ncr')) {
      text = "Delhi NCR has some of the most luxurious banquet halls and farmhouses. Take a look:";
      suggestions = venues.filter(v => v.city === 'Delhi' || v.city === 'Gurgaon').slice(0, 2);
    } else if (q.includes('thank')) {
      text = "You're very welcome! I'm here if you need anything else. Happy planning!";
    }

    return {
      id: (Date.now() + 1).toString(),
      text,
      sender: 'bot',
      suggestions,
    };
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-rose text-white rounded-full shadow-2xl flex items-center justify-center border-2 border-gold/30 overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-rose via-wine to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X className="w-6 h-6 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6 relative z-10" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border border-white"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-ivory dark:bg-gray-900 rounded-3xl shadow-2xl border border-gold/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-luxury p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-gold/30">
                  <Bot className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold text-sm">Royal Vows AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-[10px] text-white/70">Online & Ready to Help</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.sender === 'user' ? 'bg-rose border-rose text-white' : 'bg-white dark:bg-gray-800 border-gold/20 text-gold'}`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`p-3 rounded-2xl text-sm shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-rose text-white rounded-tr-none'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gold/10'
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {msg.suggestions.map((venue) => (
                            <Link
                              key={venue.id}
                              to={`/venue/${venue.id}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl border border-gold/10 hover:border-gold/30 transition-all group"
                            >
                              <img src={venue.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{venue.name}</h4>
                                <p className="text-[10px] text-gray-500 truncate">{venue.city}</p>
                              </div>
                              <Sparkles className="w-3 h-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none border border-gold/10 flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-800 border-t border-gold/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about venues, budget..."
                  className="w-full pl-4 pr-12 py-3 bg-ivory dark:bg-gray-900 rounded-2xl border border-gold/20 focus:ring-2 focus:ring-gold focus:border-transparent outline-none text-sm dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-rose text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-wine"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-gray-400 mt-2">
                Powered by Royal Vows AI • Personalized for you
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
