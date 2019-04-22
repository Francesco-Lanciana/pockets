/**
 * 
 * NOTES: The container is needed to give the image the height of the preview, without it it's
 * height will be 0.
 */

import React from 'react';
import { format } from 'timeago.js';

import "./PostPreview.scss";

const PostPreview = ({ title, summary, tags, datePublished, author, readTime, image }) => (
    <div className="post-preview">
        <div className="post-details">
            <h2 className="post-title">{title}</h2>
            <div className="post-summary">{summary}</div>
            <div className="post-metadata">
                <div className="post-author">{author}</div>
                <div className="post-metadata-inline">
                    <span className="post-date-published">{format(datePublished)}</span>
                    <span className="dot-divider"></span>
                    <span className="post-read-time">{readTime || "6 mins"}</span>
                </div>
            </div>
        </div>
        <div className="post-image-container">
            <div className="post-image" style={{ backgroundImage: `url(${image})` }} aria-label={title}></div>
        </div>
    </div>
);

export default PostPreview;

