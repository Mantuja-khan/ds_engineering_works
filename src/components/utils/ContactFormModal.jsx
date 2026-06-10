import { useState } from 'react'
import { FaTimes, FaSpinner } from 'react-icons/fa'

function ContactFormModal({ isOpen, onClose, productName = '', serviceType = '' }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: productName ? `Inquiry about ${productName}` : 'Product Inquiry',
    message: productName ? `I am interested in learning more about ${productName}. Please provide detailed information including pricing, specifications, and lead times.` : '',
    productInterest: productName || serviceType || '',
    formType: 'product-inquiry'
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
      const submissionData = {
        ...formState,
        timestamp: new Date().toISOString()
      }

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
          message: 'Thank you for your inquiry! We will contact you within 24 hours with detailed information.'
        })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          onClose()
          setSubmitResult(null)
          setFormState({
            name: '',
            email: '',
            phone: '',
            company: '',
            subject: '',
            message: '',
            productInterest: '',
            formType: 'product-inquiry'
          })
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to send inquiry')
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Sorry, there was an error sending your inquiry. Please try again or contact us directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Product Inquiry</h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="modal-name" className="block mb-1 text-sm font-medium text-neutral-700">
              Full Name *
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="modal-email" className="block mb-1 text-sm font-medium text-neutral-700">
              Email Address *
            </label>
            <input
              type="email"
              id="modal-email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="your.email@company.com"
            />
          </div>

          <div>
            <label htmlFor="modal-phone" className="block mb-1 text-sm font-medium text-neutral-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="+91 93541 30059"
            />
          </div>

          <div>
            <label htmlFor="modal-company" className="block mb-1 text-sm font-medium text-neutral-700">
              Company Name
            </label>
            <input
              type="text"
              id="modal-company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="modal-message" className="block mb-1 text-sm font-medium text-neutral-700">
              Message *
            </label>
            <textarea
              id="modal-message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 text-sm border rounded-md border-neutral-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
              placeholder="Please provide details about your requirements..."
            ></textarea>
          </div>

          {submitResult && (
            <div className={`p-3 rounded-md text-sm border-l-4 ${
              submitResult.success 
                ? 'bg-success-50 text-success-700 border-success-400' 
                : 'bg-error-50 text-error-700 border-error-400'
            }`}>
              {submitResult.message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm text-neutral-600 border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center px-4 py-2 text-sm text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                'Send Inquiry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactFormModal