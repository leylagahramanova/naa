import React, { useState } from "react";
import "./Sidebar.css";
import logo from "./img/image.png";
import library from "./img/library.png";
import meteorology from "./img/meteorology.png";
import museum from "./img/museum.png";
import settings  from "./img/settings.png";
import khayal from "./img/khayal.png";
import { ChevronDown, ChevronUp, Home } from "lucide-react";

const Sidebar: React.FC = () => {
  const [naaWebsiteExpanded, setNaaWebsiteExpanded] = useState(true);
  const [libraryExpanded, setLibraryExpanded] = useState(false);
  const [meteorologyExpanded, setMeteorologyExpanded] = useState(false);
  const [museumExpanded, setMuseumExpanded] = useState(false);

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <span className="logo-text">NAA Control Panel</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* NAA Website */}
        <div className="nav-section">
          <button
            className={`nav-button ${naaWebsiteExpanded ? "expanded" : ""}`}
            onClick={() => setNaaWebsiteExpanded(!naaWebsiteExpanded)}
          >
            <span className="nav-icon">
              <Home size={20} />
            </span>
            <span>NAA Website</span>
            <span className="caret">
              {naaWebsiteExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {naaWebsiteExpanded && (
            <div className="nav-submenu">
              <button className="nav-submenu-item act">Post</button>
              <button className="nav-submenu-item">Media Library</button>
              <button className="nav-submenu-item">System Settings</button>
            </div>
          )}
        </div>

        {/* Library */}
        <div className="nav-section">
          <button
            className={`nav-button ${libraryExpanded ? "expanded" : ""}`}
            onClick={() => setLibraryExpanded(!libraryExpanded)}
          >
            <span className="nav-icon"><img src={library} alt="Library" /></span>
            <span>Library</span>
            <span
              className={`caret ${libraryExpanded ? "rotate" : ""}`}
            >
              {libraryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
        </div>

        {/* Meteorology */}
        <div className="nav-section">
          <button
            className={`nav-button ${meteorologyExpanded ? "expanded" : ""}`}
            onClick={() => setMeteorologyExpanded(!meteorologyExpanded)}
          >
            <span className="nav-icon"><img src={meteorology} alt="Meteorology" /></span>
            <span>Meteorology</span>
            <span
              className={`caret ${meteorologyExpanded ? "rotate" : ""}`}
            >
              {meteorologyExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
        </div>

        {/* Museum */}
        <div className="nav-section">
          <button
            className={`nav-button ${museumExpanded ? "expanded" : ""}`}
            onClick={() => setMuseumExpanded(!museumExpanded)}
          >
            <span className="nav-icon"> <img src={museum} alt="Museum" /></span>
            <span>Museum</span>
            <span
              className={`caret ${museumExpanded ? "rotate" : ""}`}
            >
              {museumExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="settings-button">
          <span className="settings-icon"><img src={settings} alt="" /></span>
          <span>Settings</span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            <img src={khayal} alt="User" />
          </div>
          <div className="user-info">
            <div className="user-name">Khayal Ahmadli</div>
            <div className="user-username">khahmadli</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
