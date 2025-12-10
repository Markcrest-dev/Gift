# 🎁 Global Gift Exchange

A modern, full-featured Christmas gifting application that allows users to send and receive gifts globally with options for cash or cryptocurrency redemption.

![Christmas Theme](https://img.shields.io/badge/Theme-Christmas-red?style=for-the-badge)
![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌟 Features

### 🏠 Landing Page
- Animated hero section with Christmas countdown timer
- "How It Works" section
- Featured gifts showcase
- Features highlight with parallax effects
- Customer testimonials
- Responsive design with mobile menu
- Snowfall animation effects

### 🔐 Authentication System
- User registration with email verification
- Login with demo account support
- Password strength indicator
- Form validation
- Social login placeholders (Google, Facebook)
- Session management with localStorage

**Demo Login Credentials:**
- Email: `demo@gift.com`
- Password: `Demo123!`

### 🛍️ Marketplace
- 20 curated gift products across 6 categories
- Advanced filtering system:
  - Category filter (Electronics, Fashion, Toys, etc.)
  - Gender filter (Male, Female, Unisex)
  - Price range filter
  - Rating filter (4.0+, 4.5+)
- Real-time search functionality
- Sorting options (Price, Rating, Newest, Featured)
- Grid and List view toggle
- Auto-applying filters (no Apply button needed)

### 🎁 Gift Detail Pages
- Large product images
- Full product specifications
- Customer reviews (mock data)
- Star ratings
- Quantity selector
- "Send This Gift" functionality
- "Add to Wishlist" feature
- Related gifts recommendations

### 📤 Send Gift Flow (4 Steps)
1. **Recipient Details**: Name, email, country
2. **Personalize**: Custom message, delivery date, anonymous option
3. **Payment**: Card/PayPal/Crypto selection with card formatting
4. **Review & Confirm**: Order summary with 5% service fee

### 📥 Receive Gift Flow
- Gift display with sender information
- Personal message viewing
- 4 Redemption Options:
  - 📦 Physical delivery (with shipping form)
  - 💵 Cash value (bank details)
  - ₿ Cryptocurrency (BTC/ETH/USDT/BNB)
  - ❤️ Charity donation (5 charities)
- Success confirmation with confetti animation

### 📊 User Dashboard
- Dynamic statistics (Sent, Received, Pending, Wishlist)
- Recent activity timeline
- Wishlist management (up to 4 items displayed)
- User profile display
- Activity feed with gift history

### ⚡ Advanced Features
- Social sharing (Facebook, Twitter, WhatsApp, Email)
- Copy gift link to clipboard
- Email notifications (simulated with localStorage)
- Gift recommendations based on browsing history
- Welcome email on signup
- Contact form with submission handling

### 📄 Legal & Compliance
- Comprehensive Privacy Policy
- Detailed Terms of Service
- Cookie consent banner (GDPR/CCPA compliant)
- About page with company mission
- Contact page with multiple contact methods

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server) OR any HTTP server

### Installation

1. **Clone or download the repository**
```bash
cd /path/to/Gift
```

2. **Start a local server**

Using Python:
```bash
python3 -m http.server 8080
```

Using PHP:
```bash
php -S localhost:8080
```

Using Node.js (http-server):
```bash
npx http-server -p 8080
```

3. **Open in browser**
```
http://localhost:8080
```

## 📁 Project Structure

```
Gift/
├── index.html              # Landing page
├── signup.html             # Registration page
├── login.html              # Login page
├── verify-email.html       # Email verification
├── dashboard.html          # User dashboard
├── marketplace.html        # Gift marketplace
├── gift-detail.html        # Product detail page
├── send-gift.html          # Send gift flow
├── receive-gift.html       # Receive/claim gift
├── about.html              # About page
├── contact.html            # Contact page
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── styles/
│   ├── index.css          # Main design system
│   ├── components.css     # Reusable components
│   ├── animations.css     # Animation styles
│   └── landing.css        # Landing page styles
├── js/
│   ├── main.js            # Core utilities
│   ├── auth.js            # Authentication logic
│   ├── animations.js      # Animation scripts
│   ├── marketplace.js     # Marketplace functionality
│   ├── send-gift.js       # Send gift logic
│   └── receive-gift.js    # Receive gift logic
├── images/
│   ├── hero/              # Hero section images
│   └── gifts/             # Product images
└── data/
    └── gifts.json         # Gift catalog data
```

## 🎨 Design System

### Color Palette
- **Ruby Red**: `#C41E3A` - Primary brand color
- **Deep Crimson**: `#8B0000` - Darker accent
- **Forest Green**: `#0F4C3A` - Christmas green
- **Gold**: `#FFD700` - Festive accent
- **Cream**: `#FFF8F0` - Light background
- **White**: `#FFFFFF` - Pure white

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Key Features
- Responsive breakpoints: 480px, 768px, 1024px
- Smooth transitions (300ms)
- Card-based layouts
- Christmas-themed animations

## 🧪 Testing

### Manual Testing Checklist

**Authentication Flow:**
- ✅ Signup with validation
- ✅ Email verification (any 6-digit code)
- ✅ Login with demo account
- ✅ Logout functionality
- ✅ Password strength indicator

**Marketplace:**
- ✅ Product grid loads 20 items
- ✅ Search filters correctly
- ✅ Category filters work
- ✅ Price range filters work
- ✅ Sorting functions properly

**Gift Flow:**
- ✅ Send gift (4-step form)
- ✅ Receive gift page loads
- ✅ Redemption options work
- ✅ Dashboard updates after sending

**Responsive Design:**
- ✅ Mobile (< 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (> 1024px)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 💾 Data Storage

This is a **frontend prototype** using `localStorage` for data persistence:

- **User Data**: Stored in `localStorage` as `user`
- **Auth Token**: Stored as `authToken`
- **Sent Gifts**: Array in `sentGifts`
- **Gift Claims**: Array in `giftClaims`
- **Wishlist**: Array in `wishlist`
- **Notifications**: Array in `notifications`
- **Cookie Consent**: Object in `cookieConsent`

**Note**: All data is stored locally in the browser and will persist across sessions but is not synced to a server.

## 🎯 Key User Flows

### Flow 1: New User Registration
1. Click "Get Started" on landing page
2. Fill signup form
3. Verify email (enter any 6-digit code)
4. Redirected to dashboard
5. See welcome message with confetti

### Flow 2: Sending a Gift
1. Login with demo account
2. Browse marketplace
3. Click gift → "View Details"
4. Click "Send This Gift"
5. Complete 4-step form
6. See success message
7. Dashboard updates with sent gift

### Flow 3: Receiving a Gift
1. Navigate to `/receive-gift.html`
2. View gift details and message
3. Choose redemption method
4. Fill out claim form
5. Confirm and celebrate!

## 🔧 Configuration

### Demo Account
Edit `js/auth.js` to modify demo credentials:
```javascript
const DEMO_ACCOUNT = {
  email: 'demo@gift.com',
  password: 'Demo123!',
  // ...
};
```

### Gift Catalog
Edit `data/gifts.json` to add/modify products:
```json
{
  "id": "unique-id",
  "name": "Product Name",
  "price": 99.99,
  "currency": "USD",
  // ...
}
```

## 📈 Performance Optimization

- **Images**: Optimized PNGs (<500KB each)
- **CSS**: Minimal external dependencies
- **JavaScript**: Vanilla JS (no frameworks)
- **Animations**: CSS-based with GPU acceleration
- **Loading**: Lazy loading for images
- **Caching**: LocalStorage for data persistence

## 🚢 Deployment

### Option 1: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Set source to main branch
4. Access at `https://username.github.io/repo-name`

### Option 2: Netlify
1. Drag and drop folder to Netlify
2. Or connect GitHub repository
3. Auto-deploy on push

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts

## 🤝 Contributing

This is a demo project for educational purposes. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

## 📝 License

MIT License - See LICENSE file for details

## 🎉 Credits

- **Design**: Custom Christmas-themed UI
- **Icons**: Emoji-based (no external dependencies)
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Images**: Generated AI images for product showcase

## 📞 Support

For questions or issues:
- Email: support@giftexchange.com
- Twitter: @GiftExchange
- Phone: +1 (555) 123-4567

---

**Built with ❤️ for the Christmas season 🎄**

*Last Updated: December 9, 2025*
