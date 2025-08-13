// src/components/Footer.jsx

import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  // Array para facilitar a adição ou remoção de redes sociais no futuro
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      url: 'https://www.instagram.com', // Substitua pelo seu link
      handle: '@takeurseat'
    },
    {
      name: 'Twitter',
      // O logo do "X" no Lucide ainda é chamado de Twitter
      icon: <Twitter size={24} />, 
      url: 'https://www.twitter.com', // Substitua pelo seu link
      handle: '@takeurseat'
    }
  ];

  return (
    // Usando a cor de fundo padrão das suas páginas
    <footer className="bg-rose-100 text-[#333]">
      <div className="container mx-auto py-8 px-4 text-center border-t border-gray-300">
        <h3 className="text-xl font-semibold mb-4">
          Siga nas Redes Sociais!
        </h3>
        <div className="flex justify-center items-center gap-6 md:gap-8">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors duration-300"
              aria-label={`Siga-nos no ${social.name}`}
            >
              {social.icon}
              {/* O @handle aparece apenas em telas um pouco maiores para não poluir o mobile */}
              <span className="hidden sm:inline font-medium">{social.handle}</span>
            </a>
          ))}
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Take Your Seat. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;