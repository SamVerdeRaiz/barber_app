export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/521XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 group"
    >
      {/* 🔥 TOOLTIP */}
      <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
        ¿Dudas? Escríbenos
      </span>

      {/* 🔥 BOTÓN */}
      <div className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition flex items-center justify-center">
        
        {/* ICONO WHATSAPP REAL */}
        <svg
          className="w-6 h-6"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 .4C7.3.4.3 7.4.3 16c0 2.8.7 5.4 2.1 7.8L.2 31.6l8-2.1c2.3 1.2 4.9 1.9 7.8 1.9 8.7 0 15.7-7 15.7-15.6S24.7.4 16 .4zm0 28.7c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5c-1.2-2-1.9-4.3-1.9-6.8C3.2 8.6 8.6 3.2 16 3.2s12.8 5.4 12.8 12.8S23.4 29.1 16 29.1zm7-9.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.2-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7 0-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.9-.7h-.8c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 3s1.3 3.5 1.5 3.7c.2.2 2.6 4 6.3 5.5.9.4 1.6.6 2.2.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5z"/>
        </svg>

      </div>
    </a>
  );
}