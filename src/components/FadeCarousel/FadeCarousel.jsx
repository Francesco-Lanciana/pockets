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

const FadeCarousel = ({ images, imagesMetaData }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [numImagesShowing, setNumImagesShowing] = useState(1);
    const calculatingImages = useRef(false);
    const maxImages = images.length;

    useEffect(() => {
        const imageAspectRatio = images[0].childImageSharp.fluid.aspectRatio;

        function calculateNumShownImages() {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            let numImages;

            if (windowHeight > (MAX_IMAGE_HEIGHT_PX*(4/3))) {
                numImages = Math.min(Math.floor((windowWidth - 150)/ (MAX_IMAGE_HEIGHT_PX*imageAspectRatio + 120)), maxImages);
            } else {
                const imageWidth = (3/4)*windowHeight*imageAspectRatio;
                const imageGap = 0.05*windowWidth;

                numImages = Math.min(Math.floor((windowWidth - 150) / (imageWidth + imageGap)), maxImages);
            }
            if (numImages < 1) setNumImagesShowing(1);
            else setNumImagesShowing(numImages);
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

    const startImageIndex = selectedImageIndex + numImagesShowing > maxImages ? maxImages - numImagesShowing : selectedImageIndex;
    const endImageIndex = Math.min(selectedImageIndex + numImagesShowing, maxImages);
    const selectedImages = images.slice(startImageIndex, endImageIndex);

    return (
        <div className="fade-carousel">
            <TransitionGroup className="clothing-images"  data-cropped-bottom={imagesMetaData.cropped === "bottom"}>
                {selectedImages.map((image, i) => (
                    <CSSTransition classNames="fade" timeout={200} key={image.childImageSharp.fluid.src}>
                        <div className="clothing-image-container" style={{'--aspect-ratio': image.childImageSharp.fluid.aspectRatio}}>
                            <Img
                                sizes={{ ...image.childImageSharp.fluid }}
                                fluid={image.childImageSharp.fluid}
                                imgStyle={{ objectFit: "contain" }}
                                className="clothing-image"
                            />
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <div className="image-selector-container">
                {numImagesShowing < maxImages &&
                    <ImageSelector images={images} onSelect={handleSelect} selected={selectedImageIndex} shown={[startImageIndex, endImageIndex-1]}/>
                }
            </div>
        </div>
    );
};

FadeCarousel.propTypes = propTypes;

export default FadeCarousel;
