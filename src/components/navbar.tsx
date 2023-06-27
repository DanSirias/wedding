import React from 'react';
import '../App.css';
import logo from './images/RDlogo.svg'; 


interface NavbarProps {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }

export const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
    return (
        <nav>
          <div>{title}</div>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      );
}