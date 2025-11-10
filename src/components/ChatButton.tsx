import { MessageCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Chat with us</h3>
                    <p className="text-xs text-rose-100">We're online now!</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-6 h-64 bg-gray-50">
              <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                <p className="text-sm text-gray-700">
                  👋 Hello! Welcome to Home for Amrut. How can we help you
                  today?
                </p>
                <p className="text-xs text-gray-400 mt-2">Just now</p>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left bg-white hover:bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm transition-colors">
                  🛍️ I need help with my order
                </button>
                <button className="w-full text-left bg-white hover:bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm transition-colors">
                  🌶️ Tell me about your flavours
                </button>
                <button className="w-full text-left bg-white hover:bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm transition-colors">
                  🎁 Corporate gifting options
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-full shadow-2xl h-14 w-14 p-0"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </>
  );
}
