import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/utils/ScrollToTop'
import FloatingButtons from './components/utils/FloatingButtons'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import Services from './pages/Services'
import Process from './pages/Process'
import Contact from './pages/Contact'
import ServiceDetails from './pages/ServiceDetails'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "DS Engineering | Industrial Surface Treatment Solutions"
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="text-center">
          <div className="relative mb-8">
            {/* Animated Logo */}
            <div className="inline-block w-20 h-20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                <circle cx="50" cy="50" r="48" fill="url(#gradient1)" stroke="url(#gradient2)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:0.9}} />
                    <stop offset="100%" style={{stopColor:'#e0f2fe', stopOpacity:0.8}} />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#0ea5e9', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#075985', stopOpacity:1}} />
                  </linearGradient>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:'#0284c7', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:'#0369a1', stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <text x="50" y="40" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" textAnchor="middle" fill="url(#textGradient)">DS</text>
                <text x="50" y="58" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="normal" textAnchor="middle" fill="url(#textGradient)">ENGINEERING</text>
                <circle cx="25" cy="25" r="3" fill="#0284c7" opacity="0.3"/>
                <circle cx="75" cy="75" r="2" fill="#0284c7" opacity="0.4"/>
                <circle cx="80" cy="30" r="2.5" fill="#0284c7" opacity="0.2"/>
                <rect x="35" y="65" width="30" height="2" fill="url(#textGradient)" opacity="0.8"/>
                <rect x="40" y="68" width="20" height="1.5" fill="url(#textGradient)" opacity="0.6"/>
              </svg>
            </div>
            
            {/* Loading Spinner */}
            <div className="inline-block w-16 h-16 border-4 border-t-white border-r-primary-200 border-b-primary-300 border-l-primary-100 rounded-full animate-spin"></div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">DS Engineering</h1>
          <p className="text-lg text-primary-100 mb-4">Industrial Surface Treatment Solutions</p>
          <p className="text-primary-200 animate-pulse">Loading excellence in surface treatment...</p>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-primary-800 rounded-full mt-6 mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-white to-primary-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default App