import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Gift } from 'lucide-react';

interface HeroBannerProps {
  onCreateGiftBox?: () => void;
}

export function HeroBanner({ onCreateGiftBox }: HeroBannerProps) {
  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: 'url(/hero.png)',
        }}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌰
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-5xl opacity-20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🍯
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-sm text-rose-800 border border-rose-200 mb-4">
              ✨ New Flavours Launched
            </div>
            <h1 className="text-4xl md:text-6xl text-gray-900 tracking-tight">
              Wholesome Crunch.
              <br />
              <span className="text-rose-700">Flavours that Nourish.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium makhana crafted with love, packed with nutrition,
              and bursting with authentic flavours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                onClick={onCreateGiftBox}
                className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Gift className="h-5 w-5 mr-2" />
                Create Gift Box
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-24"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
  );
}