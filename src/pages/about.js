import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Img from "gatsby-image";

import Section, { LargeSection } from '../components/Section';

import device from '../utils/breakpoints';

export default ({ data }) => {
  const now = new Date().getFullYear();
  const dating = now - 2009;
  const husband = now - 2013;
  const father = now - 2016;

  return (
    <>      
      <LargeSection>        
        <AboutImg fluid={data.kendavidson.childImageSharp.fluid} />              
        <Wrapper>          
          <AboutTitle>Hey I'm Ken</AboutTitle> 
          <p>
            A <strong>software developer</strong> based out of Ontario Canada.  I admittedly got into the development game pretty late in my <Link to="/resume#experience">career</Link> (most of my time spent on the front lines of support
            and implementation) although my <Link to="/resume#education">educational background</Link> and goals have always been on the development side.  I've primarily worked with backend/client using Java - more recently I've been working in more of
            a <i>full stack</i> role (even though I hate that term) using a number of Javascript frameworks - for more info check out some of my <Link to="/writing">articles</Link> or <Link to="/projects">projects</Link>.
          </p>
          <p>
            As proud as I am of my professional career, I'm even more proud of role of husbanding my wonderful wife Sue and fathering my (let's go with) rambunctious son Carson.  I always knew that I wasn't completely
            built for fatherhood, but the last {father} years have taught me a whole wack of new things about myself.  I've learned that what I originally thought patience was is no where near what is humanly possible, I've learned that no matter how many people
            "know what their talking about" no one really knows what their talking about and most importantly I've learned that there is nothing I love more than (other than golf) being woken up early on the 
            weekend to
          </p>        
          <div style={{margin: '2em'}}>
          <blockquote className="cite">
            <p>come play in other rooooom!!!</p>
          </blockquote>     
          </div>
          <p>
            which pretty much means just sit in the corner and watch him play with Transformers.
          </p>
          <p>
            When Sue's glorious enough to let me have some alone time (and the sun's out) theres a pretty good chances I'll be walking as many holes as possible at <a href="https://golfgranite.com/">Granite Ridge Golf Course</a>.  I can't say that I'm a 
            great <Link to="/golfing">golfer</Link>, even saying OK might be a little bit of a stretch, but it's an adiction I don't want to shake.  When the sun's down or it's too cold for golf I'm generally at home watching whatever terrible
            sci-fi I can find on Netflix or Amazon; while continuously reading about any flavour of the month framework that seems interesting.
          </p>
          <h2>Social Me</h2>
          <p>
            You won't find me on <a href="https://www.facebook.com">Facebook</a>, <a href="https://www.twitter.com">Twitter</a>, or 
            a number of other social sites/apps - since before Carson came along, I've tried to keep my social footprint to a bare minimum.  Although attempting to raise a son with plugged in grandparents 
            makes <a href="https://www.instagram.com/kenjdavidson">Instagram</a> a requirement.
          </p>
        </Wrapper>
        <Break/>        
      </LargeSection>  
      <Break/>  
      <Section>
        <h2>Colophon</h2> 
        <p>
          This website has been through a number of iterations over the years.  I realize that in this industry it's always important to have an online presence, but I've never
          truly been committed to the practice until recently.  From <a href="https://www.wordpress.com">Wordpress</a> (where I've generally always disliked PHP) to <a href="https://jekyllrb.com/">Jekyll</a> (that just felt like 
          it was missing some customization options) I've finally settled on <a href="https://www.gatsbyjs.org/">Gatsby.js</a> - with a number of common plugins:
        </p>
        <ul>
          <li><a href="https://kyleamathews.github.io/typography.js/">Typography.js</a> with <a href="https://fonts.google.com/specimen/Playfair+Display">Playfair Display</a> &amp; <a href="https://fonts.google.com/specimen/Merriweather">Merriweather Light</a> to try and make things pretty.</li>          
          <li><a href="https://styled-components.com/">Styled-components</a> provides 90% (with a touch of SCSS) globally styling the site.</li>        
        </ul>
        <p>
          I'm not really one for photography or combing through/creating custom graphics, so pretty much anything you see is stolen from Sue's instagram account.  I'm sure some will find the layout a little 
          sterile for their tastes, but I find it relaxing and calm.
        </p>
      </Section> 
    </>
  );
};

export const query = graphql`
  query AboutQuery {
    site {
      ...siteMetadata
    }
    kendavidson: file(relativePath: { eq: "about/kendavidson.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const AboutTitle = styled.h1`
  padding: 1em 0;

  @media ${device.max.tablet} {
    text-align: center;    
  }
`;

const AboutImg = styled(Img)`
  &::after {
    content: "";
    position: absolute;
    bottom: 0; left: 0;
    width: 80%; height: 50px;
    background: linear-gradient(rgba(var(--base01-rgb-r),var(--base01-rgb-g),var(--base01-rgb-b), 0) 0%, 
      rgba(var(--base01-rgb-r),var(--base01-rgb-g),var(--base01-rgb-b), 1) 100%)
  }

  width: 100% !important;  

  @media ${device.min.tablet} {
    float: left;
    shape-outside:polygon(0 0, 70% 0, 70% 10%, 70% 15%, 80% 20%, 80% 35%, 100% 55%, 100% 65%, 80% 75%, 90% 100%, 0 100%);
    margin-bottom: 1em;
    margin-right: 25px;

    max-width: 400px !important;
  } 
`;

const Wrapper = styled.div`
  @media ${device.max.tablet} {
    position: relative;
    margin-top: -300px;
    background: rgba(var(--base01-rgb-r),var(--base01-rgb-g),var(--base01-rgb-b), 0.75);  
  }
`;

const Break = styled.div`
  clear: both;
`;
