import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section 
      ref={ref}
      className="relative min-h-screen pt-24 bg-gradient-to-r from-primary-900 to-primary-700 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{
            backgroundImage: "url('https://i.pinimg.com/1200x/79/26/c0/7926c0b017720102df45d45f060f5899.jpg')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease-in-out',
          }}
        ></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 ${
              inView ? 'animate-fade-in' : 'opacity-0'
            }`}
          >
            Advanced Chemical Solutions for Industrial Excellence
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 ${
              inView ? 'animate-slide-up delay-100' : 'opacity-0'
            }`}
          >
            DS Engineering delivers cutting-edge chemical impregnation processes and surface treatment 
            technologies that enhance product performance, durability, and reliability.
          </p>
          <div 
            className={`flex flex-wrap gap-4 ${
              inView ? 'animate-slide-up delay-200' : 'opacity-0'
            }`}
          >
            <Link to="/services" className="btn btn-primary text-sm md:text-base">
              Explore Our Services
            </Link>
            <Link to="/contact" className="btn btn-outline text-white border-white hover:bg-white/10 text-sm md:text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a 
          href="#services-overview" 
          className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-white bg-white/20 rounded-full animate-bounce"
          aria-label="Scroll down"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero