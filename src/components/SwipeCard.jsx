import React from 'react';
import { motion } from 'framer-motion';
import './SwipeCard.css';

const SwipeCard = ({ token, onButtonClick, isAnimating }) => {
  // Handle button clicks
  const handleButtonClick = (direction) => {
    if (isAnimating) return;
    onButtonClick && onButtonClick(direction);
  };

  return (
    <div className="swipe-card">
      {/* Card Background */}
      <div className="card-background">
        <div className="card-gradient-overlay" />
      </div>

      {/* Header Section - Logo/Ticker on left, Time selector on right */}
      <div className="card-header">
        <div className="token-info">
          <div className="token-icon">
            {/* Simple dark circle placeholder */}
            <div className="token-icon-placeholder"></div>
          </div>
          <div className="token-name">{token.name}</div>
        </div>
        
        <div className="time-selector">
          <span>24h</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 5.5L8 11L13.5 5.5" stroke="#848889" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Chart Area - Placeholder wrapper for now */}
      <div className="chart-container">
        <div className="chart-wrapper">
          <svg width="320" height="337" viewBox="0 0 320 337" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_3_499)">
              <path d="M0 320.306L30 333L60 182.634L90 288.713L120 122.088L150 161.503L180 41.5281L210 107.578L240 4L270 94.5" stroke="#8EF0CC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <g filter="url(#filter1_d_3_499)">
              <circle cx="270" cy="96" r="6" fill="#8EF0CC"/>
            </g>
            <defs>
              <filter id="filter0_d_3_499" x="-4.00052" y="0" width="278.001" height="337" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.556863 0 0 0 0 0.941176 0 0 0 0 0.8 0 0 0 0.4 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_499"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_499" result="shape"/>
              </filter>
              <filter id="filter1_d_3_499" x="259" y="85" width="22" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_3_499"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.556863 0 0 0 0 0.941176 0 0 0 0 0.8 0 0 0 0.2 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_499"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_499" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Price Section - Mid-bottom with gradient overlay */}
      <div className="price-section">
        <div className="price-change">
          <span className="change-percentage">{token.change}</span>
        </div>
        <div className="current-price">{token.price}</div>
      </div>

      {/* Action Buttons - Always visible */}
      <div className="action-buttons">
        <motion.button 
          className="action-btn action-btn-left"
          onClick={() => handleButtonClick('left')}
          disabled={isAnimating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7081 24.2931C25.801 24.386 25.8747 24.4963 25.9249 24.6177C25.9752 24.7391 26.0011 24.8692 26.0011 25.0006C26.0011 25.132 25.9752 25.2621 25.9249 25.3835C25.8747 25.5048 25.801 25.6151 25.7081 25.7081C25.6151 25.801 25.5048 25.8747 25.3834 25.9249C25.2621 25.9752 25.1319 26.0011 25.0006 26.0011C24.8692 26.0011 24.739 25.9752 24.6177 25.9249C24.4963 25.8747 24.386 25.801 24.2931 25.7081L16.0006 17.4143L7.70805 25.7081C7.52041 25.8957 7.26592 26.0011 7.00055 26.0011C6.73519 26.0011 6.48069 25.8957 6.29305 25.7081C6.10541 25.5204 6 25.2659 6 25.0006C6 24.7352 6.10541 24.4807 6.29305 24.2931L14.5868 16.0006L6.29305 7.70806C6.10541 7.52042 6 7.26592 6 7.00056C6 6.73519 6.10541 6.4807 6.29305 6.29306C6.48069 6.10542 6.73519 6 7.00055 6C7.26592 6 7.52041 6.10542 7.70805 6.29306L16.0006 14.5868L24.2931 6.29306C24.4807 6.10542 24.7352 6 25.0006 6C25.2659 6 25.5204 6.10542 25.7081 6.29306C25.8957 6.4807 26.0011 6.73519 26.0011 7.00056C26.0011 7.26592 25.8957 7.52042 25.7081 7.70806L17.4143 16.0006L25.7081 24.2931Z" fill="#F08E8E"/>
          </svg>
        </motion.button>
        
        <motion.button 
          className="action-btn action-btn-center"
          onClick={() => handleButtonClick('up')}
          disabled={isAnimating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9225 2.23123C17.7992 2.12874 17.6531 2.05739 17.4965 2.0232C17.3399 1.989 17.1773 1.99296 17.0225 2.03475C16.8678 2.07654 16.7253 2.15493 16.6072 2.2633C16.489 2.37168 16.3987 2.50687 16.3438 2.65748L13.5938 10.2087L10.5737 7.28248C10.4723 7.18411 10.3512 7.10835 10.2184 7.06019C10.0856 7.01203 9.94403 6.99257 9.80313 7.00308C9.66223 7.01359 9.52516 7.05384 9.40095 7.12117C9.27674 7.18851 9.1682 7.2814 9.0825 7.39373C6.375 10.9412 5 14.51 5 18C5 20.9174 6.15893 23.7153 8.22183 25.7782C10.2847 27.8411 13.0826 29 16 29C18.9174 29 21.7153 27.8411 23.7782 25.7782C25.8411 23.7153 27 20.9174 27 18C27 10.5687 20.6513 4.49998 17.9225 2.23123ZM16 27C13.6139 26.9973 11.3262 26.0483 9.63896 24.361C7.95171 22.6738 7.00265 20.3861 7 18C7 15.25 8.01125 12.4012 10.0075 9.51998L13.3038 12.7175C13.4235 12.8337 13.5704 12.9182 13.7311 12.9631C13.8918 13.0081 14.0612 13.0121 14.2238 12.9748C14.3865 12.9376 14.5372 12.8602 14.6623 12.7497C14.7874 12.6393 14.8829 12.4993 14.94 12.3425L17.7237 4.70873C20.5262 7.25998 25 12.2387 25 18C24.9974 20.3861 24.0483 22.6738 22.361 24.361C20.6738 26.0483 18.3861 26.9973 16 27Z" fill="#D1F08E"/>
          </svg>
        </motion.button>
        
        <motion.button 
          className="action-btn action-btn-right"
          onClick={() => handleButtonClick('right')}
          disabled={isAnimating}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.25 5C19.6688 5 17.4088 6.11 16 7.98625C14.5912 6.11 12.3312 5 9.75 5C7.69528 5.00232 5.72539 5.81958 4.27248 7.27248C2.81958 8.72539 2.00232 10.6953 2 12.75C2 21.5 14.9737 28.5825 15.5262 28.875C15.6719 28.9533 15.8346 28.9943 16 28.9943C16.1654 28.9943 16.3281 28.9533 16.4737 28.875C17.0262 28.5825 30 21.5 30 12.75C29.9977 10.6953 29.1804 8.72539 27.7275 7.27248C26.2746 5.81958 24.3047 5.00232 22.25 5ZM16 26.85C13.7175 25.52 4 19.4612 4 12.75C4.00198 11.2256 4.60842 9.76423 5.68633 8.68633C6.76423 7.60842 8.22561 7.00198 9.75 7C12.1813 7 14.2225 8.295 15.075 10.375C15.1503 10.5584 15.2785 10.7153 15.4432 10.8257C15.6079 10.9361 15.8017 10.995 16 10.995C16.1983 10.995 16.3921 10.9361 16.5568 10.8257C16.7215 10.7153 16.8497 10.5584 16.925 10.375C17.7775 8.29125 19.8187 7 22.25 7C23.7744 7.00198 25.2358 7.60842 26.3137 8.68633C27.3916 9.76423 27.998 11.2256 28 12.75C28 19.4513 18.28 25.5188 16 26.85Z" fill="#8EF0CC"/>
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default SwipeCard; 