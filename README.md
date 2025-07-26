# Crypto Card Swiper

A Tinder-style card swiper for crypto tokens built with React and Framer Motion. Features smooth drag interactions, visual feedback, and swipe detection.

## Features

- 🎯 **Smooth Drag Interactions**: Powered by Framer Motion for buttery-smooth animations
- 📱 **Touch & Mouse Support**: Works seamlessly on both desktop and mobile devices
- 🎨 **Visual Feedback**: Cards rotate and scale while being dragged
- 🔍 **Swipe Detection**: Detects left, right, and up swipes with velocity and distance thresholds
- 📊 **Crypto Token Display**: Shows token name, price, and price change
- 🎨 **Modern UI**: Beautiful gradient design with glassmorphism effects

## Demo

The app displays a SHIB token card with:
- Token name and logo placeholder
- Current price: $0.000012
- Price change: -23% (with color-coded styling)

## Swipe Actions

- **Swipe Left**: Console logs "Swiped LEFT"
- **Swipe Right**: Console logs "Swiped RIGHT" 
- **Swipe Up**: Console logs "Swiped UP"

## Tech Stack

- **React 18** - UI framework
- **Framer Motion** - Animation library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Getting Started

### Prerequisites

- Node.js 20.19.0 or higher (required for Vite 7.x)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd crypto-card-swiper
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── SwipeCard.jsx      # Main card component with drag logic
│   └── SwipeCard.css      # Card styling
├── App.jsx                # Main app component
├── App.css               # App layout styling
└── main.jsx              # App entry point
```

## Component API

### SwipeCard

```jsx
<SwipeCard 
  token={tokenData} 
  onSwipe={handleSwipe} 
/>
```

#### Props

- `token` (object): Token data with `name`, `price`, and `change` properties
- `onSwipe` (function): Callback function called when card is swiped

#### Token Data Format

```javascript
{
  name: "SHIB",
  price: "$0.000012", 
  change: "-23%"
}
```

## Customization

### Adding More Tokens

You can easily add more tokens by creating an array of token objects and mapping over them:

```javascript
const tokens = [
  { name: "SHIB", price: "$0.000012", change: "-23%" },
  { name: "BTC", price: "$43,250", change: "+5.2%" },
  { name: "ETH", price: "$2,650", change: "+12.8%" }
];
```

### Modifying Swipe Thresholds

Adjust the swipe sensitivity in `SwipeCard.jsx`:

```javascript
const swipeThreshold = 100;      // Distance threshold
const velocityThreshold = 500;   // Velocity threshold
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own ideas!

## Future Enhancements

- [ ] Multiple card stack
- [ ] Swipe animations (cards flying off screen)
- [ ] More token data (market cap, volume, etc.)
- [ ] Swipe history tracking
- [ ] Custom swipe actions per direction
- [ ] Integration with real crypto APIs
