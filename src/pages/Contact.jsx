import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaSpinner } from 'react-icons/fa'

function ContactInfo({ icon, title, children }) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-white rounded-full bg-primary-600">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-base md:text-lg font-medium">{title}</h3>
        <div className="text-sm md:text-base text-neutral-600">{children}</div>
      </div>
    </div>
  )
}

function Map() {
  return (
    <div className="h-64 md:h-96 bg-neutral-200 rounded-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6357861335394!2d77.03749827536766!3d28.46489497583931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19c11a4edf0b%3A0x9e429ec94f4c0945!2sDS%20Engineering!5e0!3m2!1sen!2sin!4v1710327029494!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Company Location"
      ></iframe>
    </div>
  )
}

function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    productInterest: '',
    formType: 'general-contact'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Prepare form data with timestamp
      const submissionData = {
        ...formState,
        timestamp: new Date().toISOString()
      }

      // Send to Supabase Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitResult({
          success: true,
          message: result.message || 'Thank you for your message! We will get back to you within 24 hours.'
        })
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          productInterest: '',
          formType: 'general-contact'
        })
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitResult({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later or contact us directly at admin@dsengineeringworks.com'
      })
    } finally {
      setIsSubmitting(false)
      
      // Clear result message after 8 seconds
      setTimeout(() => {
        setSubmitResult(null)
      }, 8000)
    }
  }

  const productOptions = [
    'Zinc Plating (Alkaline, Barrel, Rack Type)',
    'Anodizing (Hard & Soft)',
    'Chromatising & Alodine',
    'Conversion Coating',
    'Zinc Nickel Plating',
    'Nickel & Tin Plating',
    'Powder Coating (CED, ED Coating)',
    'Chemical Impregnation',
    'Surface Treatment Solutions',
    'Custom Solution Required',
    'Other (Please specify in message)'
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      {/* Form Type Selection */}
      <div>
        <label className="block mb-2 text-sm font-medium text-neutral-700">
          Inquiry Type *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
            <input
              type="radio"
              name="formType"
              value="general-contact"
              checked={formState.formType === 'general-contact'}
              onChange={handleChange}
              className="mr-3 text-primary-600"
            />
            <span className="text-sm">General Inquiry</span>
          </label>
          <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-neutral-50">
            <input
              type="radio"
              name="formType"
              value="product-inquiry"
              checked={formState.formType === 'product-inquiry'}
              onChange={handleChange}
              className="mr-3 text-primary-600"
            />
            <span className="text-sm">Product/Service Inquiry</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-700">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            placeholder="your.email@company.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-neutral-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            placeholder="+91 93541 30059"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block mb-1 text-sm font-medium text-neutral-700">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formState.company}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            placeholder="Your company name"
          />
        </div>
      </div>

      {/* Product Interest (shown only for product inquiries) */}
      {formState.formType === 'product-inquiry' && (
        <div>
          <label htmlFor="productInterest" className="block mb-1 text-sm font-medium text-neutral-700">
            Product/Service of Interest
          </label>
          <select
            id="productInterest"
            name="productInterest"
            value={formState.productInterest}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          >
            <option value="">Select a product/service</option>
            {productOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )}
      
      <div>
        <label htmlFor="subject" className="block mb-1 text-sm font-medium text-neutral-700">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formState.subject}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          placeholder="Brief description of your inquiry"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-1 text-sm font-medium text-neutral-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-3 py-2 text-sm md:text-base border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          placeholder="Please provide detailed information about your requirements, including quantities, specifications, timeline, etc."
        ></textarea>
      </div>
      
      {submitResult && (
        <div className={`p-4 rounded-md text-sm md:text-base border-l-4 ${
          submitResult.success 
            ? 'bg-success-50 text-success-700 border-success-400' 
            : 'bg-error-50 text-error-700 border-error-400'
        }`}>
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-2">
              {submitResult.success ? '✅' : '❌'}
            </div>
            <div>{submitResult.message}</div>
          </div>
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-6 py-3 text-sm md:text-base text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Sending Message...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-neutral-500 text-center">
        By submitting this form, you agree to our privacy policy. We will respond within 24 hours.
      </p>
    </form>
  )
}

function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <>
      {/* Header */}
      <section className="relative py-20 md:py-32 bg-primary-900">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg?auto=compress&cs=tinysrgb&w=1600")'
            }}
          ></div>
        </div>
        <div 
          ref={ref}
          className={`container relative z-10 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-bold text-white">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/90">
            Get in touch with our team for inquiries, quotes, or to discuss your surface treatment needs.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6 text-xl md:text-2xl font-semibold">Get In Touch</h2>
              
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
                <ContactInfo icon={<FaMapMarkerAlt size={20} />} title="Our Location">
                  <address className="not-italic">
                    H-402, RIICO INDUSTRIAL AREA<br />
                    Khuskhera, Alwar, Rajasthan 301707<br />
                    India
                  </address>
                </ContactInfo>
                
                <ContactInfo icon={<FaPhone size={20} />} title="Phone">
                  <p>Main: <a href="tel:+919354130059" className="text-primary-600 hover:text-primary-700">+91 93541 30059</a></p>
                  <p>Support: <a href="tel:+919354130059" className="text-primary-600 hover:text-primary-700">+91 93541 30059</a></p>
                </ContactInfo>
                
                <ContactInfo icon={<FaEnvelope size={20} />} title="Email">
                  <p>Info: <a href="mailto:admin@dsengineeringworks.com" className="text-primary-600 hover:text-primary-700">admin@dsengineeringworks.com</a></p>
                  <p>Support: <a href="mailto:admin@dsengineeringworks.com" className="text-primary-600 hover:text-primary-700">admin@dsengineeringworks.com</a></p>
                </ContactInfo>
                
                <ContactInfo icon={<FaClock size={20} />} title="Business Hours">
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: Closed</p>
                </ContactInfo>
              </div>
              
              <Map />
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="p-6 md:p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl md:text-2xl font-semibold">Send Us a Message</h2>
                <p className="mb-6 text-sm md:text-base text-neutral-600">
                  Have questions about our surface treatment services? Fill out the form below and one of our experts will get back to you within 24 hours.
                </p>
                
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact