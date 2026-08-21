import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import nodeLogoWebp from "assets/images/node-logo-blue.webp";
import nodeLogoPng from "assets/images/node-logo-blue.png";

const WHATSAPP_NUMBER = "593991593780";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

function WhatsAppButton() {
  const location = useLocation();
  const [isCardOpen, setIsCardOpen] = useState(false);

  // No mostrar en el dashboard administrativo
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isCardOpen && (
        <div className="w-72 overflow-hidden rounded-2xl shadow-2xl">
          <div className="relative bg-[#25D366] px-5 pb-5 pt-4 text-center">
            <button
              type="button"
              onClick={() => setIsCardOpen(false)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/20"
            >
              <FaTimes className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <p className="px-4 text-base font-bold leading-snug text-white">
              ¿Necesitas ayuda? Habla con nosotros.
            </p>
            <p className="mt-2 text-sm font-semibold text-white/90">
              Habla directamente con Node
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-4 py-4 transition-colors hover:bg-gray-50"
          >
            <picture>
              <source srcSet={nodeLogoWebp} type="image/webp" />
              <img
                src={nodeLogoPng}
                alt="Node"
                className="h-11 w-11 shrink-0 rounded-full object-contain bg-[#061021] p-1.5"
              />
            </picture>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-gray-900">Node</span>
              <span className="block text-xs text-gray-500">Soporte de ventas</span>
              <span className="flex items-center gap-1 text-xs font-medium text-[#25D366]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                en línea
              </span>
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsCardOpen((open) => !open)}
        aria-label="Chatea con nosotros por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl"
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
}

export default WhatsAppButton;
