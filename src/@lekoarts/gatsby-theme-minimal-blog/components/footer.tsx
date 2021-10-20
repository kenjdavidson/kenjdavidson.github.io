/** @jsx jsx */
import { jsx, Box, Link } from "theme-ui"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"
import { FaGithub, FaLinkedin, FaInstagram, FaStackOverflow, FaTwitter, FaGit } from 'react-icons/fa'
import { MdEmail, MdOutlineEmail } from 'react-icons/md'

const Footer = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <footer>
      <Box sx={{
          boxSizing: `border-box`,
          display: `flex`,
          justifyContent: `center`,
          mb: 3,
          color: `secondary`,
          a: {
            variant: `links.secondary`,
            fontSize: `1.5em`,
            mx: `0.5em`          
          },
          flexDirection: `row`
        }}
      >
        <Link href="https://github.com/kenjdavidson"><FaGithub/></Link>
        <Link href="https://linkedin.com/kenjdavidson"><FaLinkedin/></Link>
        <Link href="https://instagram.com/kenjdavidson"><FaInstagram/></Link>
        <Link href="https://stackoverflow.com/users/4196620/kendavidson"><FaStackOverflow/></Link>
        <Link href="https://twitter.com/kenjdavidson"><FaTwitter/></Link>
        <Link href="mailto:ken.j.davidson@live.ca"><MdOutlineEmail/></Link>
      </Box>
      <Box sx={{
          boxSizing: `border-box`,
          display: `flex`,
          justifyContent: `space-between`,
          color: `secondary`,
          a: {
            variant: `links.secondary`,
          },
          flexDirection: [`column`, `column`, `row`],
          variant: `dividers.top`,
        }}
      >
        <div>
          &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
        </div>
        <div>
          <Link
            aria-label="Link to the theme's GitHub repository"
            href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog"
          >
            Theme
          </Link>
          {` `}
          by
          {` `}
          <Link
            aria-label="Link to the theme author's website"
            href="https://www.lekoarts.de?utm_source=minimal-blog&utm_medium=Theme"
          >
            LekoArts
          </Link>
        </div>
      </Box>
    </footer>
  )
}

export default Footer