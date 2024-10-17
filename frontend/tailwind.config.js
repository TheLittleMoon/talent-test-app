/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths to match your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#40E0D0',  // You are extending the color palette with custom colors
        'primary-foreground': '#ffffff',
        secondary: '#FF8C00',
        'secondary-foreground': '#ffffff',
        accent: '#FFA500',
        'accent-foreground': '#ffffff',
        background: '#F0F8FF',
        foreground: '#333333',
        card: '#ffffff',
        'card-foreground': '#333333',
        popover: '#ffffff',
        'popover-foreground': '#333333',
        muted: '#f1f5f9',
        'muted-foreground': '#64748b',
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#40E0D0',
      },
    },
  },
  plugins: [],
};