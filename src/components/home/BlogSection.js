import React from "react";
import Section from "./Section";

const Excerpt = ({ post }) => (
  <article>
    <header>{ post.frontmatter.title }</header>
    <main>{ post.frontmatter.excerpt }</main>
    <footer><a href={ post.fields.slug }>Keep reading</a></footer>
  </article>      
);

export default ({ posts }) => (
  <Section>
    <header>Writings</header>
    <main>
    { posts.map((post) => (
        <Excerpt key={ post.node.id } post={ post.node }></Excerpt>
      ))
    }    
    </main>
    <footer>Read more</footer>
  </Section>
);
