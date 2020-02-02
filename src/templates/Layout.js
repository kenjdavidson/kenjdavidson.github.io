import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ meta }) => (
  <header>
    <h1>{ meta.title }</h1>
    <h3>{ meta.description }</h3>
    <Navigation links={ meta.links }></Navigation>
    <Social links={ meta.social }></Social>
  </header>
);
const StyledHeader = styled(Header)``;

const Navigation = ({ links }) => (
  <nav className="main-nav">
    <ul>
      { links.map((link) => ( 
        <Link to={ link.href }></Link>
      ))}
    </ul>
  </nav>
);

const Social = ({ links }) => (
  <nav className="social-nav">
    <span>Social</span>
    <ul>
      { links.map((link) => {
        const icon = link.icon.split(' ');
        return (
          <li key={ link.name }>
            <FontAwesomeIcon icon="address-book" />
          </li>
        ); 
      })}      
    </ul>
  </nav>
);

const Main = ({ children }) => (
  <main>
  { children }
  </main>
);
const StyledMain = styled.main``;

const Footer = () => (
  <footer></footer>
);
const StyledFooter = styled.footer``;

export { 
  StyledHeader as Header,
  StyledMain as Main,
  StyledFooter as Footer
};

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          links {
            title
            href
          }
          social {
            name
            account
            profile
            icon
          }
        }
      }
    }
  `);
  console.log(data.site.siteMetadata);
  return (
    <>
      <Header meta={ data.site.siteMetadata }></Header>
      <Main>{ children }</Main>
      <Footer></Footer>
    </>
  )
};
