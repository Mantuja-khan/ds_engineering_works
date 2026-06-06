import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { FaFlask, FaIndustry, FaTint, FaClipboardCheck } from 'react-icons/fa'

function ServiceCard({ icon, title, description, link, delay, applications }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Only show first 3 applications on mobile
  const displayedApplications = window.innerWidth < 768 ? applications.slice(0, 3) : applications

  return (
    <div 
      ref={ref}
      className={`card ${inView ? `animate-fade-in delay-${delay}` : 'opacity-0'}`}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-white rounded-full bg-primary-600">
        {icon}
      </div>
      <h3 className="mb-2 text-lg md:text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-sm md:text-base text-neutral-600">{description}</p>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Applications:</h4>
        <ul className="list-disc pl-5 text-sm md:text-base text-neutral-600">
          {displayedApplications.map((app, index) => (
            <li key={index}>{app}</li>
          ))}
        </ul>
      </div>
      <Link to={link} className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm md:text-base">
        Learn more
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  )
}

function ServicesOverview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: <FaFlask size={20} />,
      title: "Chemical Impregnation",
      description: "Our advanced impregnation processes ensure optimal penetration and sealing of porous materials.",
      applications: [
        "Automotive components",
        "Industrial machinery",
        "Electronic enclosures",
        "Medical devices",
        "Aerospace parts"
      ],
      link: "/services#impregnation",
      delay: "100",
    },
    {
      icon: <FaTint size={20} />,
      title: "Surface Treatment",
      description: "Enhance product performance with specialized surface treatments for corrosion resistance and durability.",
      applications: [
        "Metal finishing",
        "Corrosion protection",
        "Wear resistance",
        "Decorative finishes",
        "Anti-galling treatments"
      ],
      link: "/services#surface-treatment",
      delay: "200",
    },
    {
      icon: <FaIndustry size={20} />,
      title: "Industrial Chemical Supply",
      description: "Premium-grade industrial chemicals custom-formulated for your specific manufacturing needs.",
      applications: [
        "Manufacturing processes",
        "Surface preparation",
        "Cleaning solutions",
        "Specialty coatings",
        "Process chemicals"
      ],
      link: "/services#chemical-supply",
      delay: "300",
    },
    {
      icon: <FaClipboardCheck size={20} />,
      title: "Consultation Services",
      description: "Expert guidance on process optimization, compliance, and custom chemical solutions.",
      applications: [
        "Process optimization",
        "Quality control",
        "Regulatory compliance",
        "Technical support",
        "Training programs"
      ],
      link: "/services#consultation",
      delay: "400",
    },
  ]

  return (
    <section id="services-overview" className="section bg-neutral-50">
      <div className="container">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto text-center mb-8 md:mb-12 ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="section-title text-xl md:text-3xl">Our Expert Services</h2>
          <p className="section-subtitle text-sm md:text-base">
            At DS Engineering, we offer a comprehensive range of chemical services designed to meet the 
            demanding requirements of modern industrial applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview