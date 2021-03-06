import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import { Link } from '../link';
import { socialIcons } from '../social';
import styled from 'styled-components';

const StyledSocialList = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;

  li {
    display: inline-block;
    padding: 14px;

    a {
      display: block;
      color: ${({ theme }) => theme.primary.grey7};
    }

    a:hover {
      transform: scale(1.25);
    }
  }
`;

export interface SocialLink {
  name: string;
  display: string;
  account: string;
  href: string;
  icon: string;
}

export interface SocialLinksProps extends HtmlHTMLAttributes<HTMLUListElement> {
  socialLinks: SocialLink[];
}

export const SocialList: FunctionComponent<SocialLinksProps> = ({
  socialLinks,
  ...rest
}) => {
  return (
    <StyledSocialList className="social-link-list" {...rest}>
      {socialLinks.map((link) => {
        const Icon: any = socialIcons[link.icon];
        return (
          <li key={`social-${link.name}`} className="social-link-item">
            {' '}
            <Link to={link.href}>
              {Icon && <Icon className="social-link-item-icon" />}
            </Link>
          </li>
        );
      })}
    </StyledSocialList>
  );
};
