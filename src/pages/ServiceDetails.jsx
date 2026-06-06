import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { FaCheckCircle, FaArrowLeft, FaIndustry, FaAward, FaTools } from 'react-icons/fa'
import { mainServices } from '../data/servicesData'
import ContactFormModal from '../components/utils/ContactFormModal'

function ServiceDetails() {
  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const service = mainServices.find(s => s.id === id)

  if (!service) {
    return (
      <div className="container py-32 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Service not found</h2>
        <Link to="/services" className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
          Return to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        
        {/* Back Link */}
        <Link 
          to="/services" 
          className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium mb-8 transition-colors group"
        >
          <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> 
          Back to all services
        </Link>

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Small, constrained image */}
          <div className="w-full md:w-80 flex-shrink-0">
            <img 
              src={service.imageUrl} 
              alt={service.title} 
              className="w-full h-64 object-cover rounded-2xl shadow-sm border border-neutral-100"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-primary-600">
                {service.icon}
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 leading-tight">
                {service.title}
              </h1>
            </div>
            
            <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
              {service.description}
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-sm"
            >
              Get Quote Now
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-10 border-t border-neutral-100 pt-10">
          
          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
              <FaTools className="mr-2 text-neutral-400" />
              Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-3 flex-shrink-0"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
              <FaIndustry className="mr-2 text-neutral-400" />
              Applications
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.applications.map((app, index) => (
                <span key={index} className="bg-neutral-50 text-neutral-700 px-3 py-1.5 rounded-md text-sm border border-neutral-200">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
              <FaAward className="mr-2 text-neutral-400" />
              Benefits
            </h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-neutral-700">
                  <FaCheckCircle className="mt-1.5 mr-3 text-success-500 flex-shrink-0 text-sm" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={service.title}
        serviceType="surface-treatment"
      />
    </div>
  )
}

export default ServiceDetails
