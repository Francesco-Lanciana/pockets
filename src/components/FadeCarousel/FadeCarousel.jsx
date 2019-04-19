import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ImageSelector from "@components/ImageSelector/ImageSelector";

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

const MAX_IMAGE_HEIGHT_PX = 480;
const IMAGE_GAP_PX = 100;
const IMAGE_SELECTOR_WIDTH_PX = 150;

const FadeCarousel = ({ images, imagesMetaData }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [numImagesShowing, setNumImagesShowing] = useState(1);
    const [maxWidth, setMaxWidth] = useState(5000);
    const calculatingImages = useRef(false);
    const maxImages = images.length;
    const allImagesShowing = numImagesShowing >= maxImages;

    useEffect(() => {
        const imageAspectRatio = images[0].childImageSharp.fluid.aspectRatio;

        function calculateNumShownImages() {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const imageGap = windowWidth > 750 ? IMAGE_GAP_PX : 80;
            // We have capped image heights to 75% of the screen height or 480px, which is smaller.
            const imagesMaxHeightReached = windowHeight > MAX_IMAGE_HEIGHT_PX * (4 / 3);
            const imageWidth = imagesMaxHeightReached ? MAX_IMAGE_HEIGHT_PX * imageAspectRatio : (3 / 4) * windowHeight * imageAspectRatio;
            let numImages;

            numImages = Math.min(
                Math.floor((windowWidth - IMAGE_SELECTOR_WIDTH_PX + imageGap) / (imageWidth + imageGap)),
                maxImages
            );

            if (numImages < 1) setNumImagesShowing(1);
            else setNumImagesShowing(numImages);

            /* This is more or less to try center everything once all the images are shown, 
            and 5000 was chosen because it's big enough that it won't affect anything before all 
            images are shown */
            const maxWidth = numImages >= maxImages ? (imageWidth * numImages) + (imageGap * (numImages - 1)) : 5000;
            if (numImages >= maxImages) setMaxWidth(maxWidth);

            calculatingImages.current = false;
        }

        function handleResize(event) {
            if (!calculatingImages.current) {
                calculatingImages.current = true;
                window.requestAnimationFrame(calculateNumShownImages);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return function cleanup() {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleSelect(e) {
        const index = parseInt(e.currentTarget.getAttribute("data-index"));

        setSelectedImageIndex(index);
    }

    const startImageIndex =
        selectedImageIndex + numImagesShowing > maxImages
            ? maxImages - numImagesShowing
            : selectedImageIndex;
    const endImageIndex = Math.min(selectedImageIndex + numImagesShowing, maxImages);
    const selectedImages = images.slice(startImageIndex, endImageIndex);

    return (
        <div className="fade-carousel">
            <TransitionGroup
                className="clothing-images"
                data-cropped-bottom={(imagesMetaData.croppedBottom || "").includes(1)}
            >
                <div className="clothing-images-inner-container" style={{ maxWidth }}>
                    {selectedImages.map((image, i) => {
                        return (
                            <CSSTransition
                                classNames="fade"
                                timeout={200}
                                key={image.childImageSharp.fluid.src}
                            >
                                <div
                                    className="clothing-image-container"
                                    style={{ "--aspect-ratio": image.childImageSharp.fluid.aspectRatio }}
                                >
                                    <Img
                                        sizes={{ ...image.childImageSharp.fluid }}
                                        fluid={image.childImageSharp.fluid}
                                        imgStyle={{ objectFit: "cover" }}
                                        className="clothing-image"
                                    />
                                </div>
                            </CSSTransition>
                        );
                    })}
                </div>
            </TransitionGroup>
            <div className="image-selector-container">
                {!allImagesShowing && (
                    <ImageSelector
                        images={images}
                        onSelect={handleSelect}
                        selected={selectedImageIndex}
                        shown={[startImageIndex, endImageIndex - 1]}
                    />
                )}
            </div>
        </div>
    );
};

FadeCarousel.propTypes = propTypes;

export default FadeCarousel;
