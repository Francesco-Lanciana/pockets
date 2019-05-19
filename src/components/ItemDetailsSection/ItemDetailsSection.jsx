import React, { useEffect, useRef } from "react";

//import Heart from "@images/heart.svg";
import HeartsRanking from "@components/HeartsRanking/HeartsRanking";

import "./ItemDetailsSection.scss";

const ItemDetailsSection = ({ pockets, materials = "" }) => {
    const itemDetailsSectionEl = useRef(null);
    // acceptable roomy glorious

    useEffect(() => {
        function onIntersect(entries) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                } else {
                    entry.target.classList.remove("in-view");
                }
            });
        }

        function initObserver() {
            const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
            const childrenToObserve = itemDetailsSectionEl.current.getElementsByClassName(
                "pocket-review-container"
            );
            for (let i in childrenToObserve) {
                if (!childrenToObserve.hasOwnProperty(i)) {
                    continue;
                }
                observer.observe(childrenToObserve[i]);
            }
        }

        if (window.IntersectionObserver) {
            initObserver();
        } else {
            document.querySelectorAll(".pocket-review-container").forEach((el) => {
                el.classList.add("in-view");
            });
        }
    }, []);

    const sortedPockets = pockets
        .map((pocket) => ({ ...pocket }))
        .sort((a, b) => getRank(b.classification) - getRank(a.classification));

    return (
        <div className="item-details-section">
            <h2 className="section-heading">Pockets Review</h2>
            <hr data-margin-med />
            <div className="pocket-reviews" ref={itemDetailsSectionEl}>
                {sortedPockets.map(({ type, classification }) => (
                    <div className="pocket-review-container" data-classification={classification} key={type}>
                        <div className="pocket-image-container">
                            <HeartsRanking numHearts={getRank(classification)} />
                        </div>
                        <div className="pocket-review">
                            <h3 className="pocket-type">
                                <span>{parsePocketType(type)}</span>
                            </h3>
                            <h4 className="pocket-classification">{classification}</h4>
                            <p className="pocket-explanation">{getPocketExplanation(classification)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="clothing-materials">
                <h3 className="section-heading">Materials</h3>
                <hr data-margin-small />
                <ul>
                    {parseMaterials(materials).map((material) => (
                        <li className="material" key={material}>{material}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

function parseMaterials(materials) {
    const individualMaterials = materials.trim().split(",");

    return individualMaterials;
}

function parsePocketType(pocketType) {
    const parsedType = pocketType.split(/(?=[A-Z])/).join(" ");

    return parsedType;
}

function getRank(classification) {
    switch (classification) {
        case "none":
            return 0;
        case "acceptable":
            return 1;
        case "roomy":
            return 2;
        case "glorious":
            return 3;
        default:
            return 1;
    }
}

function getPocketExplanation(classification) {
    switch (classification) {
        case "acceptable":
            return "These pockets will only just fit an iPhone X with a slim case";
        case "roomy":
            return "These will fit an Samsung Note without an issue";
        case "glorious":
            return "Fits a phone, wallet, and more - truly glorious";
        default:
            return "";
    }
}

export default ItemDetailsSection;
