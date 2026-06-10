import { FaWhatsapp, FaPhone } from 'react-icons/fa';

function FloatingButtons() {
  const whatsappNumber = "+919354130059";
  const phoneNumber = "+919354130059";

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-50">
      <div className="group relative">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={24} />
        </a>
        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with Us
        </span>
      </div>
      <div className="group relative">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Call us"
        >
          <FaPhone size={20} className="rotate-180" />
        </a>
        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Us
        </span>
      </div>
    </div>
  );
}

export default FloatingButtons;