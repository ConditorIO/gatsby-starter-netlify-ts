import React, { ReactNode, FC, ReactElement } from "react";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { String } from "../conditor/string";
import { Collection } from "../conditor/collection";
import { List } from "../conditor/list";
import { Markdown } from "../conditor/markdown";

export const BlogPostTemplate: FC<BlogPostTemplateProps> = ({
  meta,
  content,
}) => {
  return (
    <Collection name="posts" label="Posts" labelSingular="Post" data={meta}>
      <section className="section">
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                <String name="title" label="Title" />
              </h1>
              <p>
                <String name="description" />
              </p>

              <Markdown name="body" html={content} />

              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  <List name="tags" label="Tags">
                    {(tag: string) => (
                      <li key={tag}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    )}
                  </List>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Collection>
  );
};

type BlogPostTemplateProps = {
  meta: Record<string, any>;
  content: string;
};

const BlogPost: FC<Props> = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Collection name="posts" label="Posts" data={post.frontmatter}>
      <String name="title" hidden />
      <String name="description" hidden />
      <Layout>
        <Helmet titleTemplate="%s | Blog" title={post.frontmatter.title}>
          <meta name="description" content={post.frontmatter.description} />
        </Helmet>
        <BlogPostTemplate content={post.html} meta={post.frontmatter} />
      </Layout>
    </Collection>
  );
};

type Props = {
  data: {
    markdownRemark: {
      frontmatter: Record<string, any>;
      html: string;
    };
  };
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
