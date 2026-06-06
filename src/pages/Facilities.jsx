import { useInView } from 'react-intersection-observer'
import { FaFlask, FaShieldAlt, FaCogs, FaMicroscope, FaRecycle, FaTruckLoading } from 'react-icons/fa'

function FacilityFeature({ icon, title, description, imageUrl, reverse = false }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div 
      ref={ref}
      className={`grid items-center grid-cols-1 gap-8 lg:grid-cols-2 ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
    >
      <div className={inView ? 'animate-fade-in' : 'opacity-0'}>
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 mr-4 text-white rounded-full bg-primary-600">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <p className="text-neutral-600">{description}</p>
      </div>
      <div 
        className={`relative overflow-hidden rounded-lg shadow-xl ${
          inView ? reverse ? 'animate-slide-in-right' : 'animate-slide-in-right' : 'opacity-0'
        }`}
      >
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-64"
        />
      </div>
    </div>
  )
}

function Facilities() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const facilities = [
    {
      icon: <FaFlask size={20} />,
      title: "Chemical Laboratory",
      description: "Our state-of-the-art chemical laboratory is equipped with advanced analytical instruments for formula development, quality control, and material testing. Our chemists work in this controlled environment to develop and optimize chemical solutions tailored to specific customer requirements.",
      imageUrl: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: <FaCogs size={20} />,
      title: "Impregnation Processing Area",
      description: "The core of our operations, our impregnation processing area features multiple vacuum chambers, pressure vessels, and automated handling systems. This facility enables us to process components of various sizes and materials with precise control over impregnation parameters.",
      imageUrl: "https://images.pexels.com/photos/3846257/pexels-photo-3846257.jpeg?auto=compress&cs=tinysrgb&w=1600",
      reverse: true,
    },
    {
      icon: <FaMicroscope size={20} />,
      title: "Quality Control Center",
      description: "Our dedicated quality control center is where we conduct rigorous testing to ensure that every processed component meets our exacting standards. Equipment includes optical and electron microscopes, spectroscopy tools, and mechanical testing apparatus to verify penetration depth, seal integrity, and material properties.",
      imageUrl: "https://images.pexels.com/photos/8326366/pexels-photo-8326366.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: <FaShieldAlt size={20} />,
      title: "Safety Systems",
      description: "Safety is paramount in chemical processing. Our facilities feature comprehensive safety systems including automated ventilation, chemical containment measures, emergency response equipment, and continuous monitoring systems. All areas are designed with redundant safety features to protect our team and the environment.",
      imageUrl: "https://images.pexels.com/photos/256253/pexels-photo-256253.jpeg?auto=compress&cs=tinysrgb&w=1600",
      reverse: true,
    },
    {
      icon: <FaRecycle size={20} />,
      title: "Environmental Management",
      description: "Our environmental management system includes advanced waste treatment facilities, air purification systems, and water recycling infrastructure. These systems ensure that our operations minimize environmental impact and comply with all regulations while recovering and reusing resources where possible.",
      imageUrl: "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      icon: <FaTruckLoading size={20} />,
      title: "Logistics & Warehousing",
      description: "Our modern logistics center facilitates efficient handling of incoming components and outgoing finished products. The warehouse maintains proper storage conditions for chemicals and materials, with inventory management systems ensuring traceability throughout the process.",
      imageUrl: "https://images.pexels.com/photos/6169662/pexels-photo-6169662.jpeg?auto=compress&cs=tinysrgb&w=1600",
      reverse: true,
    },
  ]

  return (
    <>
      {/* Header */}
      <section className="relative py-32 bg-primary-900">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1600")'
            }}
          ></div>
        </div>
        <div 
          ref={ref}
          className={`container relative z-10 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Our Facilities</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            Explore our modern facilities designed for safe, efficient, and precise chemical processing.
          </p>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">State-of-the-Art Infrastructure</h2>
            <p className="section-subtitle">
              Our purpose-built facilities combine cutting-edge technology with rigorous safety measures to deliver 
              exceptional chemical processing services.
            </p>
          </div>

          <div className="space-y-20">
            {facilities.map((facility, index) => (
              <FacilityFeature key={index} {...facility} />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Interested in Seeing Our Facilities?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Schedule a visit to our facility or request a virtual tour to see our advanced chemical processing capabilities in action.
            </p>
            <a href="/contact" className="btn btn-primary bg-white text-primary-800 hover:bg-neutral-100">
              Schedule a Tour
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Facilities