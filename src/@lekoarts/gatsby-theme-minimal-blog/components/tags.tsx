/** @jsx jsx */
import { jsx, Link as TLink, Heading, Box, Flex } from "theme-ui"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"

type PostsProps = {
  list: {
    fieldValue: string
    totalCount: number
  }[]
}

const Tags = ({ list }: PostsProps) => {
  const { tagsPath, basePath } = useMinimalBlogConfig()

  return (
    <Layout>
      <Seo title="Tags" />
      <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
        <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
            Tags
        </Heading>
        <TLink
          as={Link}
          sx={{ variant: `links.secondary`, marginY: 2 }}
          to={replaceSlashes(`/${basePath}/writing`)}
        >
          View all writing
        </TLink>
      </Flex>      
      <Box mt={[4, 5]} mb={[5, 5, 6]}>
        {list.map((listItem) => (
          <Box key={listItem.fieldValue} mb={[1, 1, 2]} sx={{ display: `inline-block` }}>
            <TLink
              as={Link}
              sx={{ variant: `links.listItem`, mr: 2 }}
              to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`)}
            >
              {listItem.fieldValue} <span sx={{ color: `secondary` }}>({listItem.totalCount})</span>
            </TLink>
          </Box>
        ))}
      </Box>
    </Layout>
  )
}

export default Tags