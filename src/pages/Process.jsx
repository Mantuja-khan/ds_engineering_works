import { useInView } from 'react-intersection-observer'
import { FaBoxOpen, FaSearch, FaBox, FaFlask, FaRecycle, FaWater, FaTemperatureLow, FaBoxes, FaClipboardCheck } from 'react-icons/fa'

function ProcessStep({ number, title, description, imageUrl, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div 
      ref={ref}
      className={`relative z-10 ${inView ? `animate-fade-in delay-${delay}` : 'opacity-0'}`}
    >
      <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-12">
        {/* Step Number */}
        <div className="flex items-center justify-center md:col-span-2">
          <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white rounded-full bg-primary-600">
            {number}
          </div>
        </div>
        
        {/* Content */}
        <div className="md:col-span-5">
          <h3 className="mb-2 text-xl font-semibold">{title}</h3>
          <p className="text-neutral-600">{description}</p>
        </div>
        
        {/* Image */}
        <div className="md:col-span-5">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={imageUrl} 
              alt={`Process step ${number}: ${title}`} 
              className="object-cover w-full h-48"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FlowChartStep({ icon, title, description, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 ${
        inView ? `animate-fade-in delay-${delay}` : 'opacity-0'
      }`}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 text-white rounded-full bg-primary-600">
        {icon}
      </div>
      <h4 className="mb-2 text-lg font-semibold text-center">{title}</h4>
      <p className="text-center text-neutral-600">{description}</p>
    </div>
  )
}

function Process() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const processSteps = [
    {
      number: 1,
      title: "Initial Consultation & Analysis",
      description: "We begin by understanding your specific needs and challenges. Our technical team analyzes your components, identifies porosity issues, and determines the optimal impregnation approach for your application.",
      imageUrl: "https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "100",
    },
    {
      number: 2,
      title: "Component Preparation",
      description: "Before impregnation, components undergo thorough cleaning to remove oils, machining residues, and contaminants that could interfere with the impregnation process. This ensures optimal penetration and sealing effectiveness.",
      imageUrl: "https://images.pexels.com/photos/5726843/pexels-photo-5726843.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "200",
    },
    {
      number: 3,
      title: "Vacuum Application",
      description: "Components are placed in a vacuum chamber where air is evacuated from the porous areas. This creates space for the sealant to penetrate during the subsequent pressure phase, ensuring maximum penetration into even the smallest porosity.",
      imageUrl: "https://images.pexels.com/photos/3693966/pexels-photo-3693966.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "300",
    },
    {
      number: 4,
      title: "Sealant Introduction",
      description: "While maintaining vacuum, our specially formulated impregnation sealant is introduced into the chamber. The sealant is designed to penetrate deeply into the porous structure while maintaining appropriate viscosity and curing characteristics.",
      imageUrl: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "400",
    },
    {
      number: 5,
      title: "Pressure Application",
      description: "The chamber is then pressurized, forcing the sealant deep into the porous areas of the components. This pressure cycle ensures complete penetration into all interconnected porosity, creating a permanent, pressure-tight seal.",
      imageUrl: "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "500",
    },
    {
      number: 6,
      title: "Excess Sealant Recovery",
      description: "After pressure impregnation, excess sealant is recovered for reuse. Our process is designed to minimize waste and environmental impact while maintaining the highest quality standards.",
      imageUrl: "https://images.pexels.com/photos/6195085/pexels-photo-6195085.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "600",
    },
    {
      number: 7,
      title: "Curing Process",
      description: "Components undergo a controlled curing process where the sealant polymerizes to form a permanent, solid seal within the porous areas. Depending on the specific sealant and application, this may involve heat curing or catalyst-activated curing.",
      imageUrl: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "700",
    },
    {
      number: 8,
      title: "Quality Verification",
      description: "Impregnated components undergo rigorous testing to verify seal integrity. Tests may include pressure testing, leak testing, and microscopic inspection to ensure that all porosity has been effectively sealed according to specifications.",
      imageUrl: "https://images.pexels.com/photos/8326490/pexels-photo-8326490.jpeg?auto=compress&cs=tinysrgb&w=1600",
      delay: "800",
    },
  ]

  const flowChartSteps = [
    {
      icon: <FaBoxOpen size={24} />,
      title: "Incoming Material Received",
      description: "Materials are received and logged into our tracking system",
      delay: "100"
    },
    {
      icon: <FaSearch size={24} />,
      title: "Incoming Material Inspection",
      description: "Quality control team performs initial inspection",
      delay: "200"
    },
    {
      icon: <FaBox size={24} />,
      title: "Part Loading",
      description: "Components are carefully loaded into processing baskets",
      delay: "300"
    },
    {
      icon: <FaFlask size={24} />,
      title: "Impregnation Process",
      description: "Vacuum and pressure cycles for optimal penetration",
      delay: "400"
    },
    {
      icon: <FaRecycle size={24} />,
      title: "Chemical Draining",
      description: "Excess sealant is recovered for reuse",
      delay: "500"
    },
    {
      icon: <FaWater size={24} />,
      title: "Cold Water Process",
      description: "Initial rinse cycle at controlled temperature",
      delay: "600"
    },
    {
      icon: <FaTemperatureLow size={24} />,
      title: "Hot Water Process",
      description: "Secondary rinse and curing acceleration",
      delay: "700"
    },
    {
      icon: <FaBoxes size={24} />,
      title: "Part Unloading and Air Drainer",
      description: "Components are unloaded and air-dried",
      delay: "800"
    },
    {
      icon: <FaClipboardCheck size={24} />,
      title: "Material Inspection",
      description: "Final quality control inspection",
      delay: "900"
    }
  ]

  return (
    <>
      {/* Header */}
      <section className="relative py-32 bg-primary-900">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1600")'
            }}
          ></div>
        </div>
        <div 
          ref={ref}
          className={`container relative z-10 text-center ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Our Process</h1>
          <p className="max-w-2xl mx-auto text-lg text-white/90">
            A detailed look at our chemical impregnation process from consultation to delivery.
          </p>
        </div>
      </section>

      {/* Impregnation Flow Chart */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Impregnation Flow Chart</h2>
            <p className="section-subtitle">
              Our streamlined process ensures consistent quality and efficient handling of your components
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {flowChartSteps.map((step, index) => (
              <FlowChartStep key={index} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Chemical Impregnation Process</h2>
            <p className="section-subtitle">
              Our advanced impregnation process seals porosity in castings and other components, 
              preventing leaks and enhancing performance. Here's how it works:
            </p>
          </div>

          {/* Process Flow Diagram */}
          <div className="relative mb-20">
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-8 w-1 bg-primary-200 -translate-x-1/2 z-0"></div>
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <ProcessStep key={index} {...step} />
              ))}
            </div>
          </div>

          {/* Process Benefits */}
          <div className="p-8 mt-16 rounded-lg bg-neutral-50">
            <h3 className="mb-6 text-2xl font-semibold text-center">Benefits of Our Process</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Superior Penetration</h4>
                <p className="text-neutral-600">
                  Our vacuum and pressure cycles ensure complete penetration of sealant into even the smallest porosity.
                </p>
              </div>
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Environmentally Responsible</h4>
                <p className="text-neutral-600">
                  Our process minimizes waste through efficient sealant recovery and reuse systems.
                </p>
              </div>
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Verified Quality</h4>
                <p className="text-neutral-600">
                  Comprehensive testing ensures that every component meets or exceeds specifications.
                </p>
              </div>
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Production Capacity</h4>
                <p className="text-neutral-600">
                  Our facilities can process high volumes efficiently without compromising quality.
                </p>
              </div>
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Flexibility</h4>
                <p className="text-neutral-600">
                  We can process components of various sizes, materials, and geometries.
                </p>
              </div>
              <div className="p-6 bg-white rounded-md shadow-sm">
                <h4 className="mb-2 text-lg font-medium text-primary-700">Customization</h4>
                <p className="text-neutral-600">
                  Process parameters can be customized to meet specific requirements for different applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Request Process Information CTA */}
      <section className="py-20 bg-primary-800 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Interested in Our Process?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Contact us today to discuss how our chemical impregnation process can solve porosity issues and enhance your product performance.
            </p>
            <a href="/contact" className="btn btn-primary bg-white text-primary-800 hover:bg-neutral-100">
              Request Technical Information
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Process