import { Link } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaCogs } from 'react-icons/fa'
import logoImg from '../../assets/image.png'

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logoImg} alt="DS Engineering" className="h-12 w-auto object-contain bg-white rounded p-1" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-tight">
                  DS Engineering
                </span>
                <span className="text-xs text-neutral-400 leading-tight">
                  Surface Treatment Solutions
                </span>
              </div>
            </div>
            <p className="mb-4 text-neutral-400">
              Your trusted partner in chemical impregnation and surface treatment solutions since 2000.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-400 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/process" className="text-neutral-400 hover:text-white">Our Process</Link>
              </li>
              <li>
                <Link to="/facilities" className="text-neutral-400 hover:text-white">Facilities</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#zinc-plating" className="text-neutral-400 hover:text-white">
                  Zinc Plating
                </Link>
              </li>
              <li>
                <Link to="/services#anodizing" className="text-neutral-400 hover:text-white">
                  Anodizing
                </Link>
              </li>
              <li>
                <Link to="/services#chromatising" className="text-neutral-400 hover:text-white">
                  Chromatising
                </Link>
              </li>
              <li>
                <Link to="/services#powder-coating" className="text-neutral-400 hover:text-white">
                  Powder Coating
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary-500" />
                <span>
                  Plot No. 195, Sector-24<br />
                  Faridabad, Haryana 121005<br />
                  India
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary-500" />
                <a href="tel:+919811032026" className="hover:text-white">
                  +91 98110 32026
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary-500" />
                <a href="mailto:dsengineering2000@gmail.com" className="hover:text-white">
                  dsengineering2000@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-neutral-800">
          <p className="text-center text-neutral-500">
            &copy; {new Date().getFullYear()} DS Engineering. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer