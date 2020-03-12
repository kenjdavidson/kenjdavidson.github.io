import React from "react";
import { graphql, Link } from "gatsby";

import PageHeader from '../components/PageHeader';
import Section  from '../components/Section';
import SEO from '../components/SEO';

import useSiteMetadata from '../hooks/useSiteMetadata';

export default ({ data }) => (
  <>      
  <SEO title={ `${useSiteMetadata().title} | Golfing` } 
    description="Golf Canada Member Handicap and Scores"
    slug="/golfing"></SEO>      
  <PageHeader>
    <div>
      <h3>"They call it golf because all the other four letter words were taken."</h3>
      <p>- Gary Player</p>
    </div>
  </PageHeader>   
  <Section>
    Sit back while I work on my first Gatsy plugin to pull in data from <a href="https://golfcanada.ca/">Golf Canada</a>.
  </Section>
  </>
);


export const query = graphql`
  query GolfQuery {
    site {
      ...siteMetadata
    }
  }
`;