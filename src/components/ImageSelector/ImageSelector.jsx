import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import "./ImageSelector.scss";

const propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            aspectRatio: PropTypes.number,
            sizes: PropTypes.string,
            src: PropTypes.string,
            srcSet: PropTypes.string,
            tracedSVG: PropTypes.string,
        })
    ),
    onSelect: PropTypes.func,
    selected: PropTypes.number,
    shown: PropTypes.arrayOf(PropTypes.number),
};

const ImageSelector = ({ images, selected, shown, onSelect }) => {
    const isImageShown = (index) => {
        const [start, end] = shown;
        return index >= start && index <= end;
    };

    return (
        <div className="image-selector">
            {images.map((image, i) => (
                <div
                    className="image-container"
                    key={image.childImageSharp.fluid.src}
                    data-index={i}
                    data-selected={i === selected}
                    data-shown={isImageShown(i)}
                    onClick={onSelect}
                >
                    <Img
                        sizes={{ ...image.childImageSharp.fluid, aspectRatio: 4 / 5 }}
                        fluid={image.childImageSharp.fluid}
                        imgStyle={{ objectFit: "contain" }}
                        className="clothing-image"
                    />
                </div>
            ))}
        </div>
    );
};

ImageSelector.propTypes = propTypes;

export default ImageSelector;
