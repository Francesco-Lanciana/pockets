import React, { useState } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ImageSelector from "@components/ImageSelector/ImageSelector";
import { useMedia } from "@hooks/window-hooks";

import "./FadeCarousel.scss";

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
};

const MAX_IMAGE_WIDTH = 500;
const MAX_IMAGE_HEIGHT_PX = (5/4) * MAX_IMAGE_WIDTH;
const MAX_IMAGE_WIDTH_VH = (4/5) * 85;
const GAP_LARGE_SCREENS = 35; // px
const GAP_SMALL_SCREENS = 10; // vh
const SELECTOR_GAP_SMALL_SCREENS_VH = 30;
const SELECTOR_GAP_LARGE_SCREENS_PX = 150;
const getTotalGapSmallScreens = (numImages) => (GAP_SMALL_SCREENS * (numImages - 1)) + SELECTOR_GAP_SMALL_SCREENS_VH;
const getTotalGapLargeScreens = (numImages) => (GAP_LARGE_SCREENS * (numImages - 1)) + SELECTOR_GAP_LARGE_SCREENS_PX;

const FadeCarousel = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const numImagesShowing = useMedia(
        [
            `(min-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(4*MAX_IMAGE_WIDTH) + 3 * GAP_LARGE_SCREENS}px), (max-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(4*MAX_IMAGE_WIDTH_VH) + 3 * GAP_SMALL_SCREENS}vh)`,
            `(min-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(3*MAX_IMAGE_WIDTH) + getTotalGapLargeScreens(3)}px), (max-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(3*MAX_IMAGE_WIDTH_VH) + getTotalGapSmallScreens(3)}vh)`,
            `(min-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(2*MAX_IMAGE_WIDTH) + getTotalGapLargeScreens(2)}px), (max-height: ${MAX_IMAGE_HEIGHT_PX}px) and (min-width: ${(2*MAX_IMAGE_WIDTH_VH) + getTotalGapSmallScreens(2)}vh)`,
        ],
        // Column counts (relates to above media queries by array index)
        [4, 3, 2],
        // Default column count
        1
    );

    function handleSelect(e) {
        const index = parseInt(e.currentTarget.getAttribute("data-index"));

        setSelectedImageIndex(index);
    }

    const startImageIndex = selectedImageIndex + numImagesShowing > 4 ? 4 - numImagesShowing : selectedImageIndex;
    const endImageIndex = Math.min(selectedImageIndex + numImagesShowing, 4);
    const selectedImages = images.slice(startImageIndex, endImageIndex);

    return (
        <div className="fade-carousel">
            <TransitionGroup className="clothing-images">
                {selectedImages.map((image) => (
                    <CSSTransition classNames="fade" timeout={200} key={image.src}>
                        <div className="clothing-image-container" key={image.src}>
                            <Img
                                sizes={{ ...image.fluid, aspectRatio: 4 / 5 }}
                                fluid={image.fluid}
                                imgStyle={{ objectFit: "contain" }}
                                className="clothing-image"
                            />
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <div className="image-selector-container">
                {numImagesShowing < 4 &&
                    <ImageSelector images={images} onSelect={handleSelect} selected={selectedImageIndex} shown={[startImageIndex, endImageIndex-1]}/>
                }
            </div>
        </div>
    );
};

FadeCarousel.propTypes = propTypes;

export default FadeCarousel;
