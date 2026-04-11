import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLaunch?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLaunch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, sectionId?: string) => {
    setMobileMenuOpen(false);
    if (path && !sectionId) { navigate(path); return; }
    if (location.pathname === '/' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }, 100);
    } else if (sectionId) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }, 300);
    }
  };

  const menuItems = [
    { label: 'Products', sectionId: 'products' },
    { label: 'Vytreon OS', sectionId: 'os' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/8e349754-a378-4d24-aa39-58005d777cc5.png" alt="Vytreon Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-foreground">Vytreon</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => handleNavigation(item.path || '', item.sectionId)} className="text-muted-foreground hover:text-accent transition-colors text-sm font-medium">
              {item.label}
            </button>
          ))}
          <Button 
            onClick={() => onLaunch ? onLaunch() : navigate('/dashboard')}
            className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-2.5 rounded-lg font-semibold text-sm"
          >
            Launch Vytreon OS
          </Button>
        </div>

        <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, i) => (
              <button key={i} onClick={() => handleNavigation(item.path || '', item.sectionId)} className="text-muted-foreground hover:text-accent text-left text-sm font-medium transition-colors">
                {item.label}
              </button>
            ))}
            <Button 
              onClick={() => { setMobileMenuOpen(false); onLaunch ? onLaunch() : navigate('/dashboard'); }}
              className="bg-accent hover:bg-accent/80 text-accent-foreground w-full font-semibold"
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
