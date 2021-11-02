/** @jsx jsx */
import * as React from "react"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title"
import { jsx, Box, Heading } from 'theme-ui'
import { Link } from 'gatsby'

const NotFound = () => (  
  <Layout>    
    <Heading as="h1" variant="styles.h1">
      Welp...
    </Heading>
    <section sx={{ my: 5, mb: [5,5,6], variant: `layout.content`, p: { fontSize: [1, 2, 3], mt: 2 } }}>      
        <p>Looks like you should have taken a left turn at Albuquerque! There isn't much (I know) so you've only got a couple options:</p>        
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/writing">Writing</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
    </section>
  </Layout>
)

export default NotFound
