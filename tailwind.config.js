/** @type {import('tailwindcss').Config} */
module.exports = {
  // Gebruik de systeeminstelling (licht/donker) voor dark mode.
  // Wil je handmatig schakelen met een 'dark' class, verander dit dan naar 'class'.
  darkMode: 'media',

  // Scan je app directory (Next.js app router) en components.
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // Optioneel: kleine utilities die je al gebruikt
      dropShadow: {
        sm: '0 1px 1px rgba(0,0,0,0.06)',
      },
      // Je gebruikt CSS-variabelen voor kleuren in globals.css; dat mag zo blijven.
    },
  },

  plugins: [
    // Voeg hier desgewenst plugins toe, bv. require('@tailwindcss/forms')
  ],
};
