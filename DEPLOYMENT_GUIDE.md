# DS Engineering Website - Hostinger Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Files to Upload to Hostinger

1. **Built Application Files** (from `dist/` folder after running `npm run build`)
2. **Configuration Files**:
   - `.htaccess` (for server configuration)
   - `robots.txt` (for SEO)
   - `sitemap.xml` (for search engines)

### ✅ Required Files List

```
public_html/
├── .htaccess                 # Server configuration (CRITICAL)
├── index.html               # Main application file
├── ds-logo.svg             # Company logo
├── assets/                 # CSS, JS, and other assets
│   ├── index-[hash].css    # Compiled CSS
│   ├── index-[hash].js     # Compiled JavaScript
│   └── [other assets]      # Images, fonts, etc.
└── [other static files]    # Any additional static files
```

## 🚀 Step-by-Step Deployment Process

### Step 1: Build the Application

```bash
# In your local development environment
npm run build
```

This creates a `dist/` folder with all production-ready files.

### Step 2: Access Hostinger File Manager

1. Log in to your Hostinger control panel
2. Navigate to **File Manager**
3. Go to the `public_html` directory
4. Clear any existing files (if this is a fresh deployment)

### Step 3: Upload Files

#### Option A: Using File Manager (Recommended)

1. **Upload the .htaccess file first**:
   - Upload the `.htaccess` file from the `public/` folder
   - This is CRITICAL for proper routing

2. **Upload all files from dist/ folder**:
   - Select all files from your local `dist/` folder
   - Upload them to the `public_html` directory
   - Maintain the folder structure

#### Option B: Using FTP Client

```bash
# FTP connection details (get from Hostinger)
Host: your-domain.com
Username: your-ftp-username
Password: your-ftp-password
Port: 21
```

### Step 4: Verify File Structure

After upload, your `public_html` should look like:

```
public_html/
├── .htaccess              ✅ CRITICAL - Must be present
├── index.html             ✅ Main app file
├── ds-logo.svg           ✅ Logo file
├── assets/               ✅ Contains CSS/JS
│   ├── index-abc123.css  ✅ Compiled styles
│   ├── index-def456.js   ✅ Compiled scripts
│   └── [images/fonts]    ✅ Other assets
└── vite.svg              ✅ Default Vite icon
```

### Step 5: Configure Domain (if needed)

1. **If using a custom domain**:
   - Point your domain to Hostinger nameservers
   - Update DNS settings in Hostinger control panel

2. **If using subdomain**:
   - Create subdomain in Hostinger control panel
   - Point it to the correct directory

## 🔧 .htaccess Configuration Details

The `.htaccess` file handles:

### ✅ React SPA Routing
```apache
# Redirects all routes to index.html for client-side routing
RewriteRule ^(.*)$ /index.html [QSA,L]
```

### ✅ Performance Optimization
- **Gzip Compression**: Reduces file sizes by 70-80%
- **Browser Caching**: 1 year for assets, 1 hour for HTML
- **MIME Types**: Proper file type handling

### ✅ Security Headers
- XSS Protection
- Content Type Options
- Frame Options (Clickjacking protection)
- Content Security Policy

### ✅ Error Handling
- Custom 404 pages redirect to React app
- Graceful error handling

## 🌐 SSL Certificate Setup

### Enable HTTPS (Recommended)

1. **In Hostinger Control Panel**:
   - Go to **SSL** section
   - Enable **Let's Encrypt SSL** (free)
   - Wait for activation (5-10 minutes)

2. **Force HTTPS** (uncomment in .htaccess):
   ```apache
   # Uncomment these lines in .htaccess
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## 📧 Email Configuration

### EmailJS Setup (for contact forms)

1. **Create EmailJS account**: https://www.emailjs.com/
2. **Get your credentials**:
   - Service ID
   - Template ID
   - Public Key
3. **Update in code** (if needed):
   ```javascript
   // In src/pages/Contact.jsx
   const result = await emailjs.send(
     'your_service_id',     // Replace with your Service ID
     'your_template_id',    // Replace with your Template ID
     formData,
     'your_public_key'      // Replace with your Public Key
   )
   ```

## 🔍 SEO Configuration

### Google Search Console

1. **Add your website**: https://search.google.com/search-console/
2. **Verify ownership**: Upload HTML file or DNS verification
3. **Submit sitemap**: `https://yourdomain.com/sitemap.xml`

### Google Analytics (Optional)

1. **Create GA4 property**: https://analytics.google.com/
2. **Add tracking code** to `index.html`:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

## 🧪 Testing After Deployment

### ✅ Functionality Tests

1. **Homepage loads correctly**
2. **Navigation works** (all menu items)
3. **Contact form submits** (test with real email)
4. **Responsive design** (test on mobile/tablet)
5. **All images load** properly
6. **Google Maps** displays correctly

### ✅ Performance Tests

1. **Page Speed**: Use Google PageSpeed Insights
2. **Mobile Friendly**: Use Google Mobile-Friendly Test
3. **SSL Certificate**: Check HTTPS works
4. **Compression**: Verify Gzip is working

### ✅ SEO Tests

1. **Meta tags** display correctly
2. **Structured data** is valid
3. **Sitemap** is accessible
4. **Robots.txt** is working

## 🚨 Troubleshooting

### Common Issues & Solutions

#### 1. **404 Errors on Page Refresh**
- **Problem**: React routes return 404
- **Solution**: Ensure `.htaccess` is uploaded and configured correctly

#### 2. **Images Not Loading**
- **Problem**: Broken image links
- **Solution**: Check file paths and ensure all assets are uploaded

#### 3. **CSS/JS Not Loading**
- **Problem**: Styling/functionality missing
- **Solution**: Verify `assets/` folder is uploaded with correct structure

#### 4. **Contact Form Not Working**
- **Problem**: Form submissions fail
- **Solution**: Check EmailJS configuration and API keys

#### 5. **Slow Loading**
- **Problem**: Poor performance
- **Solution**: Verify Gzip compression and caching headers

## 📞 Support Contacts

### Hostinger Support
- **Live Chat**: Available 24/7 in control panel
- **Knowledge Base**: https://support.hostinger.com/

### DS Engineering Technical
- **Email**: dsengineering2000@gmail.com
- **Phone**: +91 98110 32026

## 🔄 Future Updates

### Updating the Website

1. **Make changes** in development environment
2. **Test locally**: `npm run dev`
3. **Build**: `npm run build`
4. **Upload new files** to `public_html`
5. **Clear browser cache** for testing

### Backup Strategy

1. **Regular backups** via Hostinger control panel
2. **Version control** with Git
3. **Database backups** (if applicable)

---

**🎉 Congratulations! Your DS Engineering website is now live!**

Visit your domain to see the website in action. If you encounter any issues, refer to the troubleshooting section or contact support.