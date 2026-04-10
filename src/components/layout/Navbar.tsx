import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    
    // If navigating to a page (not a section)
    if (path && !sectionId) {
      navigate(path);
      return;
    }
    
    // If already on homepage, scroll to section
    if (location.pathname === '/' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else if (sectionId) {
      // Navigate to homepage first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  };

  const menuItems = [
    { label: 'SireIQ', sectionId: 'sireiq' },
    { label: 'Fycra', sectionId: 'fycra' },
    { label: 'Products', sectionId: 'products' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/8e349754-a378-4d24-aa39-58005d777cc5.png" 
            alt="Vytreon Logo" 
            className="h-8 w-auto" 
          />
          <span className="text-xl font-bold text-foreground">Vytreon</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={() => handleNavigation(item.path || '', item.sectionId)}
              className="text-muted-foreground hover:text-accent transition-colors text-base font-medium"
            >
              {item.label}
            </button>
          ))}
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 text-white px-6 py-2.5 rounded-lg font-semibold"
          >
            Launch Vytreon OS
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path || '', item.sectionId)}
                className="text-muted-foreground hover:text-accent text-left text-base font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/dashboard');
              }}
              className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/80 text-white w-full font-semibold"
            >
              Launch Vytreon OS
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
