import React from "react";
import { Link, graphql } from "gatsby";

import PostPreview from "@components/PostPreview/PostPreview";
import Layout from "@components/Layout/Layout";

import "./blog.scss";

const BlogPage = ({ data }) => (
    <Layout>
        <div className="blog-page">
            <h1 className="blog-title">Our blog</h1>

            <main className="blog-cards">
                {data.allContentfulBlogPost.edges.map(({ node: blogPost }) => (
                    <article className="post-preview-container" key={blogPost.id}>
                        <Link to={`/blog/${blogPost.slug}`} className="blog-post-link">
                            <PostPreview
                                title={blogPost.title}
                                summary={blogPost.summary.summary}
                                tags={blogPost.tags}
                                author={blogPost.authorGivenName + " " + blogPost.authorFamilyName}
                                datePublished={blogPost.createdAt}
                                dateUpdated={blogPost.updatedAt}
                                image={blogPost.heroImage.fixed.src}
                            />
                        </Link>
                    </article>
                ))}
            </main>
        </div>
    </Layout>
);

export const query = graphql`
    query {
        allContentfulBlogPost {
            edges {
                node {
                    title
                    summary {
                        summary
                    }
                    slug
                    tags
                    authorGivenName
                    authorFamilyName
                    createdAt
                    updatedAt
                    heroImage {
                        fixed(height: 200) {
                            src
                        }
                    }
                }
            }
        }
    }
`;

export default BlogPage;
