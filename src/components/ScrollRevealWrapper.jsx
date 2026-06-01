import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ScrollRevealSection = ({
  children,
  variant = 'slideUp',
  duration = 0.6,
  delay = 0,
  className = '',
}) => {
  const { ref, variants } = useScrollReveal(variant, duration, delay);

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      whileInView={variants.whileInView}
      transition={variants.transition}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem = ({
  children,
  variant = 'slideUp',
  duration = 0.6,
  delay = 0,
  className = '',
  staggerDelay = 0,
}) => {
  const finalDelay = delay + staggerDelay;
  const { ref, variants } = useScrollReveal(variant, duration, finalDelay);

  return (
    <motion.div
      ref={ref}
      initial={variants.initial}
      whileInView={variants.whileInView}
      transition={variants.transition}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealContainer = ({
  children,
  staggerDelay = 0.1,
  duration = 0.6,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {children && typeof children === 'function' ? children(itemVariants) : children}
    </motion.div>
  );
};
