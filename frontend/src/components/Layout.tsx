// components/Layout.tsx

import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

