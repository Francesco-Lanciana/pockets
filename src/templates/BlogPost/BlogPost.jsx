import React, { useContext } from "react";
import { graphql, Link } from "gatsby";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import Layout from "@components/Layout/Layout";
import SEO from "@components/seo";

import BackIcon from "@images/long-arrow-left-solid.svg";

import "./BlogPost.scss";

const BlogPostPage = ({ data }) => {
    const {
        title,
        description,
        tags,
        authorGivenName,
        authorFamilyName,
        createdAt,
        updatedAt,
        content,
    } = data.contentfulBlogPost;

    return (
        <Layout>
            <div className="blog-post-page">
                <SEO
                    type="blog"
                    metadata={{
                        title,
                        description: description.description,
                        datePublished: createdAt,
                        dateModified: updatedAt,
                        authorGivenName,
                        authorFamilyName,
                    }}
                />
                hey
            </div>
        </Layout>
    );
};

export default BlogPostPage;

export const query = graphql`
    query BlogPageQuery($id: String!) {
        contentfulBlogPost(id: { eq: $id }) {
            id
            title
            description {
                description
            }
            tags
            authorGivenName
            authorFamilyName
            createdAt
            updatedAt
            content {
                content
            }
        }
    }
`;
