import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative py-20 bg-primary-800 text-white"
    >
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1600")'
          }}
        ></div>
      </div>

      <div className="container relative z-10 text-center">
        <div
          className={`max-w-3xl mx-auto ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Enhance Your Products?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Contact our team today to discuss your chemical impregnation and surface treatment needs.
            We'll develop a customized solution to meet your specific requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary bg-white text-primary-800 hover:bg-neutral-100">
              Contact Us Now
            </Link>
            <Link to="/process" className="btn btn-outline text-white border-white hover:bg-white/10">
              Learn About Our Process
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction