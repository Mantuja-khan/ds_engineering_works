import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock mission image
const mission = "https://images.pexels.com/photos/3861457/pexels-photo-3861457.jpeg?auto=compress&cs=tinysrgb&w=800"

function TimelineEvent({ year, title, isLeft }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div 
      ref={ref}
      className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-4`}
    >
      <div className={`w-full md:w-1/2 px-4 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="p-3 bg-white rounded-lg shadow-md">
          <span className="inline-block px-2 py-1 mb-1 text-xs font-semibold text-white rounded-full bg-blue-600">
            {year}
          </span>
          <p className="text-sm text-gray-800">{title}</p>
        </div>
      </div>
    </div>
  )
}

function FinancialSection({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Function to convert full year format to abbreviated format
  const abbreviateYear = (fullYear) => {
    // Convert "2018-2019" to "18-19"
    const years = fullYear.split('-');
    const startYear = years[0].slice(-2);
    const endYear = years[1].slice(-2);
    return `${startYear}-${endYear}`;
  };

  // Prepare chart data with abbreviated years and include target
  const chartData = [
    ...data.map(item => ({
      year: abbreviateYear(item.year),
      turnover: parseFloat(item.turnover.replace('₹', '').replace(' Cr', '')),
      isTarget: false,
    })),
    // Add target data point
    {
      year: '24-25',
      turnover: 14,
      isTarget: true,
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-2 p-3 bg-blue-600 text-white font-semibold text-sm">
          <div>Financial Year</div>
          <div className="text-right">Turnover</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-2 p-3 hover:bg-gray-50">
              <div className="font-medium text-sm">{item.year}</div>
              <div className="text-right text-sm">{item.turnover}</div>
            </div>
          ))}
        </div>

        {/* Target Section */}
        <div className="p-3 bg-blue-50">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-blue-800 text-sm">Target 2024-2025</div>
            <div className="text-lg font-bold text-blue-600">₹14 Cr</div>
          </div>
        </div>
      </div>

      <div 
        ref={ref}
        className={`bg-white rounded-lg shadow-lg p-2 sm:p-4 ${inView ? 'animate-fade-in' : 'opacity-0'}`}
      >
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Growth Trajectory</h3>
        <div className="h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: window.innerWidth < 640 ? 10 : 12 }}
                interval={0}
                angle={window.innerWidth < 640 ? -45 : 0}
                textAnchor={window.innerWidth < 640 ? 'end' : 'middle'}
                height={window.innerWidth < 640 ? 60 : 30}
              />
              <YAxis 
                tick={{ fontSize: window.innerWidth < 640 ? 9 : 12 }}
                label={{ 
                  value: 'Turnover (₹ Cr)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fontSize: window.innerWidth < 640 ? '10px' : '12px' }
                }}
                width={window.innerWidth < 640 ? 35 : 50}
              />
              <Tooltip 
                formatter={(value, name, props) => [
                  `₹${value} Cr`,
                  props.payload.isTarget ? 'Target' : 'Turnover'
                ]}
                labelFormatter={(label) => `FY ${label}`}
                contentStyle={{ fontSize: window.innerWidth < 640 ? '12px' : '14px' }}
              />
              <Line 
                type="monotone" 
                dataKey="turnover" 
                stroke="#0284c7" 
                strokeWidth={2}
                dot={(props) => {
                  const { payload, cx, cy } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={payload.isTarget ? (window.innerWidth < 640 ? 6 : 8) : (window.innerWidth < 640 ? 3 : 4)}
                      fill={payload.isTarget ? '#ef4444' : '#0284c7'}
                      stroke={payload.isTarget ? '#dc2626' : '#0284c7'}
                      strokeWidth={payload.isTarget ? 3 : 2}
                      className={payload.isTarget ? 'animate-pulse' : ''}
                    />
                  );
                }}
                activeDot={{ r: window.innerWidth < 640 ? 6 : 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Legend */}
        <div className="flex items-center justify-center mt-2 sm:mt-4 space-x-3 sm:space-x-6">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-sky-600 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">Actual Turnover</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-red-600 animate-pulse"></div>
            <span className="text-xs sm:text-sm text-gray-600">Target (24-25)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissionCarousel({ missionInView }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const missions = [
    {
      title: "Our Mission",
      content: "To deliver innovative chemical solutions that enhance product performance, durability, and reliability while maintaining the highest standards of safety, quality, and environmental responsibility."
    },
    {
      title: "Our Vision", 
      content: "To be the global leader in chemical impregnation and surface treatment technologies, recognized for our innovation, quality, and customer-focused approach."
    },
    {
      title: "Our Values",
      content: "Safety and environmental responsibility • Quality and excellence in all we do • Innovation and continuous improvement • Integrity and ethical business practices • Customer focus and partnership"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === missions.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [missions.length])

  return (
    <div className="md:hidden">
      <div className="relative overflow-hidden bg-white rounded-lg shadow-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {missions.map((mission, index) => (
            <div key={index} className="w-full flex-shrink-0 p-4">
              <h3 className="mb-3 text-lg font-semibold text-blue-700 text-center">
                {mission.title}
              </h3>
              <p className="text-sm leading-relaxed text-center">
                {mission.content}
              </p>
            </div>
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center pb-4 space-x-2">
          {missions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function About() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const timelineEvents = [
    { year: 2021, title: "Bright Nickel Manual Process add for Special line for Suzuki Motor Cycle Parts" },
    { year: 2022, title: "Anodizing New Fully automatic line start with SCADA System" },
    { year: 2023, title: "Expansion into international markets with new distribution centers" },
    { year: 2024, title: "Chromatic New automatic line start with SCADA System" },
    { year: 2025, title: "Nickel & Tin Single Process Two Layer Plating" },
  ]

  const financialData = [
    { year: "2018-2019", turnover: "₹3.78 Cr" },
    { year: "2019-2020", turnover: "₹3.86 Cr" },
    { year: "2020-2021", turnover: "₹3.95 Cr" },
    { year: "2021-2022", turnover: "₹4.48 Cr" },
    { year: "2022-2023", turnover: "₹6.67 Cr" },
    { year: "2023-2024", turnover: "₹9.28 Cr" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .section { padding: 4rem 0; }
        .section-title { 
          font-size: 2rem; 
          font-weight: bold; 
          margin-bottom: 1rem; 
          color: #1f2937;
        }
        .section-subtitle { 
          color: #6b7280; 
          margin-bottom: 2rem; 
        }
        .card {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>

      {/* Header */}
      <section className="relative py-20 md:py-32 bg-blue-900">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/3861457/pexels-photo-3861457.jpeg?auto=compress&cs=tinysrgb&w=1600")'
            }}
          ></div>
        </div>
        <div 
          ref={headerRef}
          className={`container relative z-10 text-center px-4 ${headerInView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-bold text-white">About Our Company</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/90">
            Learn about our journey, mission, and the team behind ChemSolutions' innovation and excellence.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container px-4">
          <div className="grid items-center grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
            <div 
              ref={contentRef}
              className={contentInView ? 'animate-fade-in' : 'opacity-0'}
            >
              <h2 className="section-title text-xl md:text-2xl lg:text-3xl">Our Story</h2>
              <p className="mb-4 text-sm md:text-base lg:text-lg">
                M/S DS Engineering works prompted by Mr. Sukhbir Singh doing the 
                business suraface treatment since 2000 , Who had experiance last 24
                years in Surface treatment field.
              </p>
              <p className="mb-4 text-sm md:text-base">
                Over the past 25+ years, we've grown into a leading provider of chemical impregnation services and 
                surface treatment solutions, serving industries from aerospace and automotive to electronics and 
                medical devices. Our commitment to quality, safety, and innovation has remained unwavering throughout our journey.
              </p>
              <p className="text-sm md:text-base">
                Today, DS Engineering operates state-of-the-art facilities equipped with the latest technologies and 
                staffed by some of the industry's most talented chemists, engineers, and technicians. We continue to 
                push the boundaries of what's possible in chemical impregnation and surface treatments.
              </p>
            </div>
            <div 
              className={`relative rounded-lg overflow-hidden shadow-xl ${
                contentInView ? 'animate-slide-in-right' : 'opacity-0'
              }`}
            >
              <img 
                src={mission} 
                alt="Chemical laboratory" 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="section-title text-xl md:text-2xl lg:text-3xl">Company Timeline</h2>
            <p className="section-subtitle text-sm md:text-base">
              Our journey of growth, innovation, and excellence through the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 w-px h-full bg-blue-200 transform -translate-x-1/2 hidden md:block"></div>

            {/* Timeline Events */}
            <div className="space-y-8 md:space-y-0">
              {timelineEvents.map((event, index) => (
                <TimelineEvent
                  key={event.year}
                  year={event.year}
                  title={event.title}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Overview */}
      <section className="section">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="section-title text-xl md:text-2xl lg:text-3xl">Financial Growth</h2>
            <p className="section-subtitle text-sm md:text-base">
              Our consistent growth reflects our commitment to excellence and customer satisfaction.
            </p>
          </div>

          <FinancialSection data={financialData} />
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section bg-gray-50">
        <div 
          ref={missionRef}
          className="container px-4"
        >
          <div className={`max-w-3xl mx-auto text-center mb-8 md:mb-12 ${missionInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="section-title text-xl md:text-2xl lg:text-3xl">Our Mission, Vision & Values</h2>
            <p className="section-subtitle text-sm md:text-base">
              The principles that guide our operations and drive our commitment to excellence.
            </p>
          </div>

          {/* Mobile Carousel */}
          <MissionCarousel missionInView={missionInView} />

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className={`card ${missionInView ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
              <h3 className="mb-4 text-lg md:text-xl font-semibold text-blue-700">Our Mission</h3>
              <p className="text-sm md:text-base">
                To deliver innovative chemical solutions that enhance product performance, durability, and reliability 
                while maintaining the highest standards of safety, quality, and environmental responsibility.
              </p>
            </div>
            
            <div className={`card ${missionInView ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              <h3 className="mb-4 text-lg md:text-xl font-semibold text-blue-700">Our Vision</h3>
              <p className="text-sm md:text-base">
                To be the global leader in chemical impregnation and surface treatment technologies, recognized for 
                our innovation, quality, and customer-focused approach.
              </p>
            </div>
            
            <div className={`card ${missionInView ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
              <h3 className="mb-4 text-lg md:text-xl font-semibold text-blue-700">Our Values</h3>
              <ul className="pl-5 space-y-2 list-disc text-sm md:text-base">
                <li>Safety and environmental responsibility</li>
                <li>Quality and excellence in all we do</li>
                <li>Innovation and continuous improvement</li>
                <li>Integrity and ethical business practices</li>
                <li>Customer focus and partnership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About;