import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { SiteMetadata } from '../../graphql/siteMetadata';

export const Brand = ({ meta, ...props }: { meta: SiteMetadata }) => {
  return (
    <Link to="/" id="brand">
      <div className="brand-wrapper">
        <img className="brand-image" src="/glorious.png" alt="Peakaboo!" />
        <span className="brand-name">{meta.author.name}</span>
      </div>
    </Link>
  );
};
