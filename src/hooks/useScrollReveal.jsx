import { useRef } from 'react';
import { useInView } from 'framer-motion';

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
  },
  slideUpFade: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
  },
};

export const useScrollReveal = (
  variant = 'slideUp',
  duration = 0.6,
  delay = 0,
  viewportAmount = 0.2
) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: viewportAmount,
  });

  const selectedVariant = animationVariants[variant] || animationVariants.slideUp;

  return {
    ref,
    isInView,
    variants: {
      initial: selectedVariant.initial,
      whileInView: selectedVariant.whileInView,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    },
  };
};
