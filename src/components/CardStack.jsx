import React, { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import SwipeCard from './SwipeCard';
import './CardStack.css';

// Animation constants
const ANIMATION_CONFIG = {
  exit: {
    stiffness: 80,
    damping: 15,
    distance: 600
  },
  snapback: {
    stiffness: 200,
    damping: 25
  },
  entrance: {
    stiffness: 200,
    damping: 20
  }
};

// Feedback colors
const FEEDBACK_COLORS = {
  MOON: '#8EF0CC',
  PUMP: '#D1F08E', 
  DUMP: '#FF6B6B'
};

const CardStack = ({ tokens, onSwipe }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentToken = tokens[currentIndex];
  const hasMoreCards = currentIndex < tokens.length;

  const handleCardComplete = useCallback((direction) => {
    onSwipe && onSwipe(currentToken, direction);
    if (currentIndex < tokens.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    setIsAnimating(false);
  }, [currentToken, onSwipe, currentIndex, tokens.length]);

  const handleButtonClick = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    handleCardComplete(direction);
  }, [isAnimating, handleCardComplete]);

  if (!hasMoreCards) {
    return (
      <div className="no-more-cards">
        <h2>🎉 All cards swiped!</h2>
        <p>No more tokens to review</p>
      </div>
    );
  }

  return (
    <div className="card-container">
      <DraggableCard
        key={`${currentToken.id}-${currentIndex}`}
        token={currentToken}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
        onComplete={handleCardComplete}
        onButtonClick={handleButtonClick}
      />
    </div>
  );
};

const DraggableCard = React.memo(({ 
  token, 
  isAnimating,
  setIsAnimating,
  onComplete,
  onButtonClick
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [feedback, setFeedback] = useState(null);
  
  // Simple transforms for visual feedback
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);

  // Shared animation function
  const animateCardExit = useCallback((direction) => {
    const targetX = direction === 'left' ? -ANIMATION_CONFIG.exit.distance : direction === 'right' ? ANIMATION_CONFIG.exit.distance : 0;
    const targetY = direction === 'up' ? -ANIMATION_CONFIG.exit.distance : 0;
    
    if (direction === 'up') {
      animate(y, targetY, {
        type: "spring",
        stiffness: ANIMATION_CONFIG.exit.stiffness,
        damping: ANIMATION_CONFIG.exit.damping,
        onComplete: () => onComplete(direction)
      });
    } else {
      animate(x, targetX, {
        type: "spring",
        stiffness: ANIMATION_CONFIG.exit.stiffness,
        damping: ANIMATION_CONFIG.exit.damping,
        onComplete: () => onComplete(direction)
      });
    }
  }, [onComplete, x, y]);
  
  const handleDrag = useCallback((event, info) => {
    const { offset } = info;
    const xVal = offset.x;
    const yVal = offset.y;
    
    if (Math.abs(xVal) > 50 || Math.abs(yVal) > 50) {
      if (xVal > 50) {
        setFeedback({ text: 'MOON', color: FEEDBACK_COLORS.MOON });
      } else if (yVal < -50) {
        setFeedback({ text: 'PUMP', color: FEEDBACK_COLORS.PUMP });
      } else if (xVal < -50) {
        setFeedback({ text: 'DUMP', color: FEEDBACK_COLORS.DUMP });
      }
    } else {
      setFeedback(null);
    }
  }, []);
  
  const handleDragEnd = useCallback((event, info) => {
    if (isAnimating) return;
    
    setFeedback(null);
    const { offset, velocity } = info;
    
    // Simple threshold detection
    const shouldCommit = 
      Math.abs(offset.x) > 100 || 
      Math.abs(velocity.x) > 500 ||
      (offset.y < -80 && Math.abs(offset.y) > Math.abs(offset.x)) ||
      (offset.y < -300 && Math.abs(velocity.y) > 300);

    if (shouldCommit) {
      setIsAnimating(true);
      
      // Determine direction
      const direction = Math.abs(offset.x) > Math.abs(offset.y) 
        ? (offset.x > 0 ? 'right' : 'left')
        : 'up';
      
      animateCardExit(direction);
    } else {
      // Snap back to center
      animate(x, 0, { type: "spring", stiffness: ANIMATION_CONFIG.snapback.stiffness, damping: ANIMATION_CONFIG.snapback.damping });
      animate(y, 0, { type: "spring", stiffness: ANIMATION_CONFIG.snapback.stiffness, damping: ANIMATION_CONFIG.snapback.damping });
    }
  }, [isAnimating, setIsAnimating, animateCardExit, x, y]);

  const handleButtonClick = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    animateCardExit(direction);
  }, [isAnimating, setIsAnimating, animateCardExit]);

  return (
    <div className="card-wrapper">
      <motion.div
        className="card"
        style={{ x, y, rotate, scale, position: 'relative' }}
        drag={!isAnimating}
        dragConstraints={false}
        dragElastic={0.9}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: ANIMATION_CONFIG.entrance.stiffness, damping: ANIMATION_CONFIG.entrance.damping }}
      >
        <SwipeCard 
          token={token} 
          onButtonClick={handleButtonClick}
          isAnimating={isAnimating}
        />
        
        {/* Feedback badge - part of the card content */}
        {feedback && (
          <motion.div
            className="swipe-feedback"
            style={{
              color: feedback.color,
              borderColor: feedback.color,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {feedback.text}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

DraggableCard.displayName = 'DraggableCard';

export default CardStack; 