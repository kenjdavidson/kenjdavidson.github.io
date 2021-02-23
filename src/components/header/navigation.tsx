import { Link } from 'gatsby';
import React from 'react';

export const Navigation = ({ ...props }) => {
  return (
    <nav className="nav">
      <Link
        id="nav-item-bio"
        className="nav-item"
        to="/about"
        activeClassName="active"
        partiallyActive={true}
      >
        <span className="nav-item-title">About</span>
        <span className="nav-item-summary">
          Any takers on writing me a sweet bio?
        </span>
      </Link>
      <Link
        id="nav-item-writing"
        className="nav-item"
        to="/writing"
        activeClassName="active"
        partiallyActive={true}
      >
        <span className="nav-item-title">Writing</span>
        <span className="nav-item-summary">
          For the odd time I feel inspired enough to post
        </span>
      </Link>
      <Link
        id="nav-item-projects"
        className="nav-item"
        to="/projects"
        activeClassName="active"
        partiallyActive={true}
      >
        <span className="nav-item-title">Projects</span>
        <span className="nav-item-summary">
          Some things I've finished and some things I haven't
        </span>
      </Link>
    </nav>
  );
};
