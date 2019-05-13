/**
 * solidColor is not yet implemented by browsers so we have to use a linearGradient
 * with a single stop as a workaround
 */

import React from "react";

import "./HeartsRanking.scss";

const HeartsRanking = ({ numHearts = 1 }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="341.87"
            height="267.35"
            viewBox="0 0 341.87 267.35"
            className="hearts-ranking"
        >
            <defs>
                <linearGradient id="heart-greyed-fill">
                    <stop offset="100%" stopColor="grey" stopOpacity="0.1"/>
                </linearGradient>
                <linearGradient id="heart-inner-fill">
                    <stop offset="100%" stopColor="red" />
                </linearGradient>
                <radialGradient
                    id="secondary-hearts-inner-fill"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffb7b7" />
                    <stop offset="1" stopColor="#ff7192" />
                </radialGradient>
                <radialGradient
                    id="main-heart-middle-fill"
                    cx="143.55"
                    cy="59.96"
                    r="83.01"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffb7b7" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#ff7192" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient
                    id="main-heart-outer-fill"
                    cx="138.24"
                    cy="55.24"
                    r="98.25"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ffb7b7" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#ff7192" stopOpacity="0.3" />
                </radialGradient>
                <radialGradient
                    id="heart-2-middle-fill"
                    cx="-0.89"
                    cy="147.95"
                    r="62.76"
                    gradientTransform="matrix(1, 0, 0, 1, 53.37, 32.79)"
                    href="#main-heart-middle-fill"
                    xlinkHref="#main-heart-middle-fill"
                />
                <radialGradient
                    id="heart-2-inner-fill"
                    cx="3.52"
                    cy="151.87"
                    r="50.12"
                    gradientTransform="matrix(1, 0, 0, 1, 53.37, 32.79)"
                    href="#secondary-hearts-inner-fill"
                    xlinkHref="#secondary-hearts-inner-fill"
                />
                <radialGradient
                    id="heart-2-outer-fill"
                    cx="-4.9"
                    cy="144.38"
                    r="74.28"
                    gradientTransform="matrix(1, 0, 0, 1, 53.37, 32.79)"
                    href="#main-heart-outer-fill"
                    xlinkHref="#main-heart-outer-fill"
                />
                <radialGradient
                    id="heart-3-middle-fill"
                    cx="-230.2"
                    cy="-40.82"
                    r="62.76"
                    gradientTransform="matrix(-1, 0, 0, 1, 58.8, 224.07)"
                    href="#main-heart-middle-fill"
                    xlinkHref="#main-heart-middle-fill"
                />
                <radialGradient
                    id="heart-3-inner-fill"
                    cx="-225.79"
                    cy="-36.9"
                    r="50.12"
                    gradientTransform="matrix(-1, 0, 0, 1, 58.8, 224.07)"
                    href="#secondary-hearts-inner-fill"
                    xlinkHref="#secondary-hearts-inner-fill"
                />
                <radialGradient
                    id="heart-3-outer-fill"
                    cx="-234.22"
                    cy="-44.39"
                    r="74.28"
                    gradientTransform="matrix(-1, 0, 0, 1, 58.8, 224.07)"
                    href="#main-heart-outer-fill"
                    xlinkHref="#main-heart-outer-fill"
                />


            </defs>
            <title>Asset 3</title>
            <g className="hearts" data-hearts-highlighted={numHearts}>
                <g className="main-heart">
                    <path
                        d="M239.26,63.92A36,36,0,0,0,172.5,45.1a36,36,0,1,0-54.37,46l51.08,51.09a4.66,4.66,0,0,0,6.58,0l51.09-51.09A35.94,35.94,0,0,0,239.26,63.92Z"
                        className="main-heart-inner heart-inner"
                    />
                    <path
                        d="M256.09,58.43A45.11,45.11,0,0,0,172.5,34.86a45.1,45.1,0,1,0-68.09,57.56l64,64a5.82,5.82,0,0,0,8.24,0l64-64A45,45,0,0,0,256.09,58.43Z"
                        className="main-heart-middle heart-middle"
                    />
                    <path
                        d="M271.43,53.43a53.39,53.39,0,0,0-98.93-27.9A53.38,53.38,0,1,0,91.92,93.66l75.71,75.71a6.89,6.89,0,0,0,9.75,0l75.71-75.71A53.24,53.24,0,0,0,271.43,53.43Z"
                        className="main-heart-outer heart-outer"
                    />
                </g>
                <g className="heart-2">
                    <path
                        d="M138,179.33A34.1,34.1,0,0,0,74.75,161.7,34.1,34.1,0,1,0,23.4,205.37L71.91,253.6a4.41,4.41,0,0,0,6.23,0l48.22-48.51A34,34,0,0,0,138,179.33Z"
                        className="heart-2-middle heart-middle"
                    />
                    <path
                        d="M125.29,183.52a27.24,27.24,0,0,0-50.51-14.08,27.24,27.24,0,1,0-41,34.88l38.74,38.51a3.51,3.51,0,0,0,5,0L116,204.07A27.17,27.17,0,0,0,125.29,183.52Z"
                        className="heart-2-inner heart-inner"
                    />
                    <path
                        d="M149.59,175.52a40.37,40.37,0,0,0-74.86-20.88A40.36,40.36,0,1,0,14,206.33l57.41,57.08a5.23,5.23,0,0,0,7.37,0L135.81,206A40.27,40.27,0,0,0,149.59,175.52Z"
                        className="heart-2-outer heart-outer"
                    />
                </g>
                <g className="heart-3">
                    <path
                        d="M215.62,207.68,264,256a4.4,4.4,0,0,0,3.11,1.29,4.45,4.45,0,0,0,3.12-1.29l48.33-48.41a34.1,34.1,0,1,0-51.51-43.48,34.11,34.11,0,1,0-51.45,43.56Z"
                        className="heart-3-middle heart-middle"
                    />
                    <path
                        d="M226,206.65l38.65,38.59a3.51,3.51,0,0,0,5,0l38.6-38.65a27.24,27.24,0,1,0-41.14-34.73A27.23,27.23,0,1,0,226,206.65Z"
                        className="heart-3-inner heart-inner"
                    />
                    <path
                        d="M206.17,208.62l57.28,57.2a5.22,5.22,0,0,0,3.69,1.53,5.31,5.31,0,0,0,3.69-1.53L328,208.53a40.36,40.36,0,1,0-61-51.47,40.36,40.36,0,1,0-60.89,51.56Z"
                        className="heart-3-outer heart-outer"
                    />
                </g>
            </g>
        </svg>
    );
};

export default HeartsRanking;
