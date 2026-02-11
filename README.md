# LED JS - Interactive DJ Entertainment Website

A modern, mobile-first website for LED JS, a DJ business specializing in interactive entertainment experiences including LED wristbands, speed quizzing, and music bingo.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Modern UI**: Gradient backgrounds, smooth animations, and interactive elements
- **4 Main Pages**:
  - Home: Hero section, services preview, and CTAs
  - Services: Detailed information about LED wristbands, speed quizzing, and music bingo
  - About: Company story, values, gallery, and testimonials
  - Contact: Quote request form with validation
- **Interactive Navigation**: Sticky header with hamburger menu on mobile
- **Social Media Integration**: Links to Facebook, Instagram, Twitter, and YouTube
- **Quote Form**: Complete contact form with validation (ready for email service integration)

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **PostCSS** - CSS processing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd ledjs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📧 Email Integration for Quote Form

The contact form is ready for email integration. Choose one of these services:

### Option 1: EmailJS (Recommended for beginners)

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Set up email service and template
3. Install EmailJS SDK:
   ```bash
   npm install @emailjs/browser
   ```
4. Update `src/components/QuoteForm.jsx`:
   ```javascript
   import emailjs from '@emailjs/browser';

   // In handleSubmit function, replace the simulation with:
   await emailjs.send(
     'YOUR_SERVICE_ID',
     'YOUR_TEMPLATE_ID',
     formData,
     'YOUR_PUBLIC_KEY'
   );
   ```

### Option 2: Formspree

1. Create account at [Formspree](https://formspree.io/)
2. Get your form endpoint
3. Update `src/components/QuoteForm.jsx`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

### Option 3: Web3Forms

1. Get API key from [Web3Forms](https://web3forms.com/)
2. Update `src/components/QuoteForm.jsx`:
   ```javascript
   const response = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       access_key: 'YOUR_ACCESS_KEY',
       ...formData
     })
   });
   ```

## 🎨 Customization

### Update Brand Colors

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    500: '#A855F7',  // Purple
    600: '#9333EA',
    700: '#7C3AED',
  },
  secondary: {
    500: '#F472B6',  // Pink
    600: '#EC4899',
  },
  accent: {
    400: '#3B82F6',  // Blue
    500: '#06B6D4',  // Cyan
  },
}
```

### Update Contact Information

1. **Footer**: Edit `src/components/Footer.jsx`
   - Email address (line 75)
   - Phone number (line 83)
   - Location (line 91)

2. **Contact Page**: Edit `src/pages/Contact.jsx`
   - Update contact information array (lines 6-29)

### Update Social Media Links

Edit `src/components/Footer.jsx` (lines 14-19) to update social media URLs.

### Replace Placeholder Images

Replace placeholder images in:
- `src/pages/About.jsx` - Gallery and team photos
- `src/pages/Services.jsx` - Service images

## 📁 Project Structure

```
ledjs/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Header.jsx   # Navigation header
│   │   ├── Footer.jsx   # Footer with social links
│   │   ├── Hero.jsx     # Homepage hero section
│   │   ├── ServiceCard.jsx  # Service display card
│   │   └── QuoteForm.jsx    # Contact form
│   ├── pages/           # Page components
│   │   ├── Home.jsx     # Homepage
│   │   ├── Services.jsx # Services page
│   │   ├── About.jsx    # About page
│   │   └── Contact.jsx  # Contact/Quote page
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.js` to set base path:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🎯 Features Checklist

- ✅ Mobile-responsive design
- ✅ Quote request form with validation
- ✅ Social media integration
- ✅ Visual appeal with gradients and animations
- ✅ Clear service presentation
- ✅ Hamburger menu navigation
- ✅ Smooth scrolling
- ✅ Touch-friendly buttons (44px minimum height)
- ✅ SEO-optimized meta tags
- ⏳ Email service integration (needs configuration)

## 🔧 Troubleshooting

**Issue: Styles not loading**
- Clear browser cache
- Delete `node_modules` and run `npm install` again
- Check that Tailwind CSS is properly configured

**Issue: Routes not working in production**
- Ensure your hosting provider is configured for single-page applications
- For Netlify: Add `_redirects` file with `/* /index.html 200`
- For Vercel: Configuration is automatic

**Issue: Form not submitting**
- Check browser console for errors
- Ensure email service is properly configured
- Verify API keys and endpoints

## 📝 License

This project is created for LED JS. All rights reserved.

## 🤝 Support

For questions or support, contact:
- Email: info@ledjs.com
- Phone: (123) 456-7890

---

Built with ❤️ using React, Vite, and Tailwind CSS
