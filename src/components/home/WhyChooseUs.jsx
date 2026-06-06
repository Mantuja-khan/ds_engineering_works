import { useInView } from 'react-intersection-observer'
import { FaCertificate, FaUsers, FaChartLine, FaLeaf, FaAward, FaCogs, FaShieldAlt, FaClock, FaIndustry, FaTools, FaMedal, FaGlobe } from 'react-icons/fa'
import excellenceTreatment from "../../assets/excellence_treatment.jpg"

function FeatureItem({ icon, title, description, delay, stats, highlight = false }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${highlight
        ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white'
        : 'bg-white hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50'
        } ${inView ? `animate-slide-up delay-${delay}` : 'opacity-0'}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-200 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-200 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${highlight
            ? 'bg-white/20 text-white'
            : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
            }`}>
            {icon}
          </div>
          {stats && (
            <div className="text-right">
              <div className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-primary-600'}`}>
                {stats.number}
              </div>
              <div className={`text-xs font-medium ${highlight ? 'text-white/80' : 'text-neutral-500'}`}>
                {stats.label}
              </div>
            </div>
          )}
        </div>

        <h3 className={`mb-4 text-xl font-bold transition-colors duration-300 ${highlight
          ? 'text-white'
          : 'text-neutral-900 group-hover:text-primary-700'
          }`}>
          {title}
        </h3>

        <p className={`text-sm leading-relaxed ${highlight
          ? 'text-white/90'
          : 'text-neutral-600 group-hover:text-neutral-700'
          }`}>
          {description}
        </p>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-200 transition-colors duration-300"></div>
    </div>
  )
}

function WhyChooseUs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <FaCertificate size={24} />,
      title: "ISO Certified Excellence",
      description: "Our processes meet the highest international standards with ISO 9001:2015, ISO 14001:2015, and specialized chemical processing certifications ensuring world-class quality in every project.",
      delay: "100",
      stats: { number: "ISO", label: "Certified" },
      highlight: true
    },
    {
      icon: <FaUsers size={24} />,
      title: "Expert Technical Team",
      description: "Our highly skilled chemists, engineers, and technicians bring over 25+ years of combined experience in advanced surface treatment and chemical impregnation technologies.",
      delay: "200",
      stats: { number: "25+", label: "Years Exp" }
    },
    {
      icon: <FaChartLine size={24} />,
      title: "Proven Performance Results",
      description: "Our innovative solutions have been scientifically proven to enhance product performance by up to 40% while extending operational service life by 2-3x across various industries.",
      delay: "300",
      stats: { number: "40%", label: "Performance" }
    },
    {
      icon: <FaIndustry size={24} />,
      title: "State-of-the-Art Facility",
      description: "Modern 15,000 sq ft facility equipped with automated processing lines, SCADA systems, precision control mechanisms, and cutting-edge equipment for superior treatment results.",
      delay: "400",
      stats: { number: "15K", label: "Sq Ft" },
      highlight: true
    },
    {
      icon: <FaLeaf size={24} />,
      title: "Eco-Friendly Solutions",
      description: "We prioritize sustainable practices with environmentally responsible formulations, waste reduction programs, and green chemistry approaches that minimize environmental impact.",
      delay: "500",
      stats: { number: "100%", label: "Green Tech" }
    },
    {
      icon: <FaAward size={24} />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes with advanced testing equipment ensure every component meets or exceeds specifications with zero-defect manufacturing standards.",
      delay: "600",
      stats: { number: "99.9%", label: "Quality Rate" }
    },
    {
      icon: <FaTools size={24} />,
      title: "Advanced Technology",
      description: "Cutting-edge automated processing lines with real-time monitoring, precision control systems, and Industry 4.0 integration for consistent, reliable results.",
      delay: "700",
      stats: { number: "24/7", label: "Automation" },
      highlight: true
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Comprehensive Safety",
      description: "Industry-leading safety protocols with comprehensive training programs, advanced safety systems, and strict adherence to international safety standards.",
      delay: "800",
      stats: { number: "Zero", label: "Incidents" }
    },
    {
      icon: <FaClock size={24} />,
      title: "Fast Turnaround",
      description: "Efficient processing capabilities with optimized workflows ensure quick turnaround times without compromising quality, meeting tight production schedules.",
      delay: "900",
      stats: { number: "48Hr", label: "Delivery" }
    },
    {
      icon: <FaMedal size={24} />,
      title: "Industry Recognition",
      description: "Recognized as a leading surface treatment provider with multiple industry awards and certifications from prestigious organizations and satisfied clients.",
      delay: "1000",
      stats: { number: "10+", label: "Awards" }
    },
    {
      icon: <FaGlobe size={24} />,
      title: "Pan-India Service",
      description: "Comprehensive service network covering major industrial hubs across India with dedicated logistics support and regional technical assistance.",
      delay: "1100",
      stats: { number: "15+", label: "States" },
      highlight: true
    },
    {
      icon: <FaCogs size={24} />,
      title: "Custom Solutions",
      description: "Tailored chemical solutions designed specifically for your unique requirements, with dedicated R&D support and continuous process optimization.",
      delay: "1200",
      stats: { number: "500+", label: "Solutions" }
    },
  ]

  return (
    <section className="section bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-200 to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary-200 to-transparent rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2 mb-20">
          {/* Content Section */}
          <div>
            <div
              ref={ref}
              className={inView ? 'animate-fade-in' : 'opacity-0'}
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-primary-700 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
                  <FaAward className="mr-2" />
                  Why Choose DS Engineering
                </span>
              </div>

              <h2 className="section-title text-3xl md:text-5xl bg-gradient-to-r from-primary-700 via-secondary-600 to-primary-800 bg-clip-text text-transparent mb-6">
                Excellence in Surface Treatment Since 2000
              </h2>

              <p className="section-subtitle text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">
                With over 25 years of pioneering experience in chemical impregnation and advanced surface treatment technologies,
                DS Engineering has established itself as the industry leader, delivering exceptional quality, innovation, and customer satisfaction.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-2 gap-6 p-8 bg-white rounded-2xl shadow-xl border border-primary-100">
                <div className="text-center group">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    ₹14Cr
                  </div>
                  <div className="text-sm font-medium text-neutral-600">Target Revenue 2024-25</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    500+
                  </div>
                  <div className="text-sm font-medium text-neutral-600">Satisfied Clients</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-accent-600 to-success-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    15+
                  </div>
                  <div className="text-sm font-medium text-neutral-600">Service Types</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-success-600 to-primary-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-sm font-medium text-neutral-600">Customer Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`relative rounded-3xl overflow-hidden shadow-2xl ${inView ? 'animate-slide-in-right' : 'opacity-0'
              }`}
          >
            <img
              src={excellenceTreatment}
              alt="DS Engineering Excellence in Surface Treatment"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>

            {/* Floating Badges */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">25+</div>
                <div className="text-xs font-medium text-neutral-600">Years Experience</div>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 mb-1">ISO</div>
                <div className="text-xs font-medium text-neutral-600">Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs