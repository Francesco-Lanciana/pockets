import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "@components/Layout/Layout";

import "./blog.scss";

const BlogPage = ({ data }) => (
    <div className="blog-page">
        <h1>Our blog</h1>

        <main className="blog-cards">
            {data.allContentfulBlogPost.edges.map(({ node: blogPost }) => (
                <div className="blog-card" key={blogPost.id}>
                    <Link to={`/blog/${blogPost.slug}`} className="blog-post-link">
                        <h2>{blogPost.title}</h2>
                    </Link>
                </div>
            ))}
        </main>
    </div>
);

export const query = graphql`
    query {
        allContentfulBlogPost {
            edges {
                node {
                    title
                    description {
                        description
                    }
                    slug
                    tags
                    authorGivenName
                    authorFamilyName
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export default BlogPage;
