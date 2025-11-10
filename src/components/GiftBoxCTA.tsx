import { Gift, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface GiftBoxCTAProps {
  onCreateGiftBox: () => void;
}

export function GiftBoxCTA({ onCreateGiftBox }: GiftBoxCTAProps) {
  return (
    <div className="py-12 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          {/* Floating Gift Icons */}
          <motion.div
            className="absolute top-8 right-12 text-4xl opacity-20"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎁
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-12 text-3xl opacity-20"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎀
          </motion.div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Icon */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
              <Gift className="h-16 w-16 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Get 10% OFF on Custom Gift Boxes</span>
              </div>
              <h2 className="text-3xl md:text-4xl mb-3">
                Create Your Perfect Gift Box
              </h2>
              <p className="text-lg text-rose-100 max-w-2xl">
                Mix and match your favorite makhana flavours and save 10% instantly! 
                Perfect for gifting or treating yourself to variety.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                onClick={onCreateGiftBox}
                size="lg"
                className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-8 shadow-xl hover:shadow-2xl transition-all group"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
