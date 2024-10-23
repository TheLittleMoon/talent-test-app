import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Talent Test App
        </Link>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary-foreground">
          <Link to="/" className="block py-2 px-4 text-primary hover:bg-primary hover:text-primary-foreground">
            Home
          </Link>
          <Link to="/about" className="block py-2 px-4 text-primary hover:bg-primary hover:text-primary-foreground">
            About
          </Link>
          <Link to="/contact" className="block py-2 px-4 text-primary hover:bg-primary hover:text-primary-foreground">
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}