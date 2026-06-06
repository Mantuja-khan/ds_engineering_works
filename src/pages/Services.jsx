import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FaChevronDown, FaChevronUp, FaIndustry, FaShieldAlt, FaCogs, FaFlask, FaTint, FaTools, FaAward, FaCertificate, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContactFormModal from '../components/utils/ContactFormModal'
import { mainServices, dropdownServices } from '../data/servicesData'

function ServiceCard({ icon, title, description, imageUrl, delay, id }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div 
        ref={ref}
        id={id}
        className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
          inView ? `animate-fade-in delay-${delay}` : 'opacity-0'
        }`}
      >
        {/* Service Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
            {icon}
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-2">
              <span className="bg-success-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ISO Certified
              </span>
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Quality Assured
              </span>
            </div>
          </div>
        </div>

        {/* Service Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-neutral-900 mb-3">{title}</h3>
          <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-2">{description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Quote
            </button>
            <Link
              to={`/service/${id}`}
              className="flex-1 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 text-center"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={title}
        serviceType="surface-treatment"
      />
    </>
  )
}

function ServiceDropdown({ title, services, icon, delay }) {
  const [isOpen, setIsOpen] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 ${
        inView ? `animate-fade-in delay-${delay}` : 'opacity-0'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
              <p className="text-sm text-neutral-600">{services.length} specialized services</p>
            </div>
          </div>
          <div className="text-primary-600 transition-transform duration-300">
            {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
          </div>
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-6 pb-6 space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-primary-50 rounded-lg hover:from-primary-100 hover:to-secondary-100 transition-all duration-300 group">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"></div>
                <span className="font-medium text-neutral-800 group-hover:text-primary-700 transition-colors">
                  {service.name}
                </span>
              </div>
              <a
                href={`#${service.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })



  return (
    <>
      {/* Header */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/3846262/pexels-photo-3846262.jpeg?auto=compress&cs=tinysrgb&w=1600")'
            }}
          ></div>
        </div>
        <div 
          ref={ref}
          className={`container relative z-10 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-100 bg-white/10 backdrop-blur-sm rounded-full">
                <FaCertificate className="mr-2" />
                ISO Certified Services
              </span>
            </div>
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              Professional Surface Treatment Services
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-100 leading-relaxed">
              DS Engineering offers comprehensive surface treatment solutions including zinc plating, anodizing, 
              powder coating, and chemical impregnation services with over 25 years of industry expertise.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-primary-200 text-sm md:text-base">Service Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-primary-200 text-sm md:text-base">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
                <div className="text-primary-200 text-sm md:text-base">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-primary-200 text-sm md:text-base">Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories with Dropdowns */}
      <section className="section bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl bg-gradient-to-r from-primary-700 to-secondary-600 bg-clip-text text-transparent">
              Our Service Categories
            </h2>
            <p className="section-subtitle text-lg text-neutral-600">
              Explore our specialized service categories with detailed sub-services and technical specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {dropdownServices.map((category, index) => (
              <ServiceDropdown key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl">Complete Service Portfolio</h2>
            <p className="section-subtitle text-lg">
              Comprehensive surface treatment solutions for all your industrial needs with guaranteed quality and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Chemical Solutions */}
      <section className="section bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl">Additional Chemical Solutions</h2>
            <p className="section-subtitle text-lg">
              Beyond our core services, we offer specialized chemical solutions for unique industrial requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chemical Supply */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-accent-600 to-warning-600 text-white rounded-xl mb-4">
                <FaFlask size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Industrial Chemical Supply</h3>
              <p className="text-neutral-600 mb-4">Premium-grade industrial chemicals and specialty formulations for manufacturing processes.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 mb-4">
                <li>Process chemicals</li>
                <li>Cleaning solutions</li>
                <li>Specialty coatings</li>
                <li>Custom formulations</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-accent-600 to-warning-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-accent-700 hover:to-warning-700 transition-all duration-300">
                Request Catalog
              </button>
            </div>

            {/* Consultation Services */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-success-600 to-secondary-600 text-white rounded-xl mb-4">
                <FaCogs size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Technical Consultation</h3>
              <p className="text-neutral-600 mb-4">Expert guidance on process optimization, compliance, and custom chemical solutions.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 mb-4">
                <li>Process optimization</li>
                <li>Quality control</li>
                <li>Regulatory compliance</li>
                <li>Training programs</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-success-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-success-700 hover:to-secondary-700 transition-all duration-300">
                Schedule Consultation
              </button>
            </div>

            {/* Quality Testing */}
            <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl mb-4">
                <FaAward size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Quality Testing Services</h3>
              <p className="text-neutral-600 mb-4">Comprehensive testing and analysis services to ensure product quality and compliance.</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-neutral-600 mb-4">
                <li>Material analysis</li>
                <li>Coating thickness testing</li>
                <li>Corrosion resistance testing</li>
                <li>Quality certification</li>
              </ul>
              <button className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="section bg-gradient-to-br from-neutral-900 to-primary-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl text-white">What Our Customers Say</h2>
            <p className="section-subtitle text-lg text-primary-100">
              Trusted by leading companies across various industries for our quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaAward key={i} size={16} />
                  ))}
                </div>
              </div>
              <p className="text-primary-100 mb-4 italic">
                "DS Engineering's zinc plating services have significantly improved our product durability. 
                Their quality and turnaround time are exceptional."
              </p>
              <div className="border-t border-white/20 pt-4">
                <div className="font-semibold">Rajesh Kumar</div>
                <div className="text-sm text-primary-200">Production Manager, Auto Components Ltd.</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaAward key={i} size={16} />
                  ))}
                </div>
              </div>
              <p className="text-primary-100 mb-4 italic">
                "The anodizing quality is outstanding. DS Engineering has been our trusted partner 
                for surface treatment solutions for over 5 years."
              </p>
              <div className="border-t border-white/20 pt-4">
                <div className="font-semibold">Priya Sharma</div>
                <div className="text-sm text-primary-200">Quality Head, Precision Engineering</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaAward key={i} size={16} />
                  ))}
                </div>
              </div>
              <p className="text-primary-100 mb-4 italic">
                "Professional service, competitive pricing, and excellent technical support. 
                DS Engineering delivers on all fronts consistently."
              </p>
              <div className="border-t border-white/20 pt-4">
                <div className="font-semibold">Amit Patel</div>
                <div className="text-sm text-primary-200">Procurement Manager, Industrial Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold">
              Ready to Enhance Your Products?
            </h2>
            <p className="mb-8 text-lg md:text-xl text-primary-100 leading-relaxed">
              Contact our technical team today to discuss your surface treatment requirements. 
              We'll provide customized solutions that meet your specific needs and quality standards.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-neutral-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Get Free Quote
              </a>
              <div className="flex items-center space-x-6">
                <a 
                  href="tel:+919811032026" 
                  className="flex items-center space-x-2 text-primary-100 hover:text-white transition-colors"
                >
                  <FaPhone size={20} />
                  <span className="font-semibold">+91 98110 32026</span>
                </a>
                <a 
                  href="mailto:dsengineering2000@gmail.com" 
                  className="flex items-center space-x-2 text-primary-100 hover:text-white transition-colors"
                >
                  <FaEnvelope size={20} />
                  <span className="font-semibold">Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services;