import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLenis } from 'lenis/react';
import '../css/header.css';

const Header = ({ isLandingPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();

  // Handle scroll to toggle the scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    if(isLandingPage){
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll smoothly to a specific section
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      lenis.scrollTo(element);
    }
  };

  const handleLinkClick = (id) => {
    if (isLandingPage) {
      handleScrollToSection(id); // Scroll to section if on landing page
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const handleScrollOnClick = (path)=>{
    if(path === location.pathname){
      lenis.scrollTo(0, { duration: 0 });
    }
    else{
      navigate(path);
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isLandingPage ? '' : 'default'}`}>
      {/* <div className="name">The Zenith</div> */}
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <HamburgerMenu handleLinkClick={handleLinkClick} handleScrollOnClick={handleScrollOnClick} />
      <ul className="pc-menu">
        <li onClick={()=>handleScrollOnClick('/')}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          Events
          <IoIosArrowDown
            style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleLinkClick('page2')}>Conference</li>
              <li onClick={() => handleLinkClick('page3')}>Webinar</li>
              <li onClick={() => handleLinkClick('page4')}>Workshop</li>
            </ul>
          )}
        </li>
        <li onClick={()=>handleScrollOnClick('/about')}>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li onClick={()=>handleScrollOnClick('/playground')}>
          <NavLink to="/playground">Play Ground</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

const HamburgerMenu = ({ handleLinkClick, handleScrollOnClick }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="hamburger-container">
      <div className="hamburger-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`hamburger-nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li onClick={()=>{toggleMenu(); handleScrollOnClick('/')}}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="dropdown" onClick={toggleDropdown}>
          <div className="dropdown-header">
            Events
            <IoIosArrowDown
              style={{
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => { toggleMenu(); handleLinkClick('page2'); }}>Conference</li>
              <li onClick={() => { toggleMenu(); handleLinkClick('page3'); }}>Webinar</li>
              <li onClick={() => { toggleMenu(); handleLinkClick('page4'); }}>Workshop</li>
            </ul>
          )}
        </li>
        <li onClick={()=>{toggleMenu(); handleScrollOnClick('/about')}}>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li onClick={()=>{toggleMenu(); handleScrollOnClick('/playground')}}>
          <NavLink to="/playground">Play Ground</NavLink>
        </li>
      </ul>
    </div>
  );
};
