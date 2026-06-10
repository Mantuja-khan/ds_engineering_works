# DS Engineering Website

## Industrial Surface Treatment Solutions

DS Engineering is a leading provider of chemical impregnation, surface treatment, zinc plating, anodizing, and powder coating services in India since 2000.

### 🚀 Features
- **Modern React SPA** - Built with React 18 and Vite
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Professional UI/UX** - Clean, modern design with smooth animations
- **SEO Optimized** - Meta tags, structured data, and performance optimization
- **Backend Integration** - Supabase Edge Functions for form handling
- **Email Notifications** - Automatic email notifications to company Gmail
- **Interactive Maps** - Google Maps integration for location
- **Service Showcase** - Comprehensive service listings with detailed information

### 🛠 Services Offered

- **Zinc Plating** (Alkaline, Barrel, Rack Type)
- **Anodizing** (Hard & Soft)
- **Chromatising & Alodine**
- **Conversion Coating**
- **Zinc Nickel Plating**
- **Nickel & Tin Plating**
- **Powder Coating** (CED, ED Coating)
- **Chemical Impregnation**
- **Surface Treatment Solutions**

### 📧 Contact Form Backend

The website includes a complete backend solution for handling contact form submissions:

#### Features:
- **Secure Form Processing** - Supabase Edge Functions handle form submissions
- **Email Notifications** - Automatic emails sent to company email (admin@dsengineeringworks.com)
- **Rich HTML Emails** - Professional email templates with company branding
- **Form Validation** - Client and server-side validation
- **Product Inquiries** - Specialized forms for product/service inquiries
- **Mobile Responsive** - Forms work perfectly on all devices

#### Email Content Includes:
- Customer contact details (name, email, phone, company)
- Inquiry type (general or product-specific)
- Product/service of interest
- Detailed message
- Timestamp with Indian timezone
- Professional HTML formatting
- Direct reply-to customer email

### 📁 Project Structure

```
ds-engineering-website/
├── public/
│   ├── .htaccess              # Server configuration for hosting
│   ├── ds-logo.svg           # Company logo
│   └── index.html            # Main HTML file
├── src/
│   ├── assets/               # Images and static assets
│   ├── components/           # React components
│   │   ├── home/            # Home page components
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   └── utils/           # Utility components
│   ├── pages/               # Page components
│   └── styles/              # CSS and styling files
├── supabase/
│   └── functions/           # Edge Functions for backend
│       └── send-contact-email/ # Email handling function
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js          # Vite build configuration
└── .htaccess               # Server configuration
```

### 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ds-engineering-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials and email configuration.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### 🌐 Backend Setup (Supabase)

#### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API

#### 2. Deploy Edge Function
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy send-contact-email
```

#### 3. Set Environment Variables
In your Supabase project dashboard, go to Settings > Edge Functions and add:
- `SMTP_HOST`: smtp.gmail.com
- `SMTP_PORT`: 587
- `SMTP_USER`: admin@dsengineeringworks.com
- `SMTP_PASS`: your-gmail-app-password
- `COMPANY_EMAIL`: admin@dsengineeringworks.com

#### 4. Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this password in the `SMTP_PASS` environment variable

### 🌐 Deployment to Hostinger

#### Method 1: Upload Built Files

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to Hostinger**
   - Upload all files from the `dist/` folder to your `public_html` directory
   - Make sure the `.htaccess` file is included for proper routing

#### Method 2: Direct Upload

1. **Prepare files**
   - Copy all files from the `public/` folder
   - Copy the `.htaccess` file to the root of `public_html`

2. **File structure in public_html**
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── assets/
   ├── ds-logo.svg
   └── [other built files]
   ```

### 📋 .htaccess Configuration

The included `.htaccess` file provides:

- **React SPA Routing** - Handles client-side routing
- **Security Headers** - XSS protection, content type options
- **Performance Optimization** - Gzip compression, browser caching
- **Mobile Optimization** - Mobile-specific headers and caching
- **MIME Types** - Proper file type handling
- **Error Handling** - Custom error pages
- **SEO Optimization** - Proper redirects and headers

### 🔒 Security Features

- Content Security Policy (CSP)
- XSS Protection
- Clickjacking protection
- File access restrictions
- Server signature hiding
- Secure form submission with validation

### ⚡ Performance Features

- Gzip compression
- Browser caching (1 year for assets, 1 hour for HTML)
- Image optimization
- Minified CSS/JS
- Lazy loading
- Mobile-optimized loading

### 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly interface
- Optimized for mobile networks
- Proper viewport configuration
- iOS Safari compatibility
- Android browser optimization

### 📧 Email Features

- **Professional HTML emails** with company branding
- **Automatic notifications** to company Gmail
- **Customer details** included in every email
- **Product inquiry tracking** with specific product interests
- **Timestamp tracking** with Indian timezone
- **Reply-to functionality** for direct customer communication
- **Mobile-responsive** email templates

### 🎨 Design System

- **Colors**: Primary (Blue), Secondary (Teal), Accent (Amber)
- **Typography**: Inter (body), Montserrat (headings)
- **Spacing**: 8px grid system
- **Components**: Consistent button styles, cards, forms

### 📧 Contact Information

- **Address**: H-402, RIICO INDUSTRIAL AREA, Khuskhera, Alwar, Rajasthan, 301707, India
- **Phone**: +91 93541 30059
- **Email**: admin@dsengineeringworks.com
- **Website**: [Your Domain]

### 🤝 Support

For technical support or inquiries about our services, please contact us through:
- Website contact form (automatically sends email to company)
- Email: admin@dsengineeringworks.com
- Phone: +91 93541 30059

### 📄 License

© 2024 DS Engineering. All rights reserved.

---

**Built with ❤️ for DS Engineering - Excellence in Surface Treatment Since 2000**

**Backend powered by Supabase Edge Functions for reliable, secure form processing and email delivery.**