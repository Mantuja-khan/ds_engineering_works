import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaTimes, FaCogs } from 'react-icons/fa'
import logoImg from '../../assets/image.png'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Services', path: '/services' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logoImg} alt="DS Engineering" className="h-12 w-auto object-contain" />
          <div className="flex flex-col">
            <span className={`text-xl font-bold leading-tight transition-colors ${isScrolled ? 'text-primary-700' : 'text-white'}`} itemProp="name">
              DS Engineering
            </span>
            <span className={`text-xs leading-tight transition-colors ${isScrolled ? 'text-neutral-600' : 'text-white/80'}`} itemProp="description">
              Surface Treatment Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-primary-600' 
                        : isScrolled 
                          ? 'text-neutral-800 hover:text-primary-600' 
                          : 'text-white hover:text-gray-200'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className={`p-2 md:hidden transition-colors ${isScrolled ? 'text-neutral-900' : 'text-white'}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-white">
            <div className="w-full max-w-sm p-6 mx-auto">
              <div className="flex justify-between mb-8">
                <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
                  <img src={logoImg} alt="DS Engineering" className="h-10 w-auto object-contain" />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-primary-700 leading-tight">
                      DS Engineering
                    </span>
                    <span className="text-xs text-neutral-600 leading-tight">
                      Surface Treatment Solutions
                    </span>
                  </div>
                </Link>
                <button
                  className="p-2"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <nav>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `block py-2 text-lg font-medium ${
                            isActive ? 'text-primary-600' : 'text-neutral-800 hover:text-primary-600'
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header