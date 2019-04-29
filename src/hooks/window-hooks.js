import { useState, useEffect, useRef } from "react";

export function useMedia(queries, values, defaultValue) {
    const isSingleQuery = !Array.isArray(queries);
    const isSingleValue = !Array.isArray(values);
    const queriesArray = isSingleQuery ? [queries] : queries;

    // Array containing a media query list for each query
    const mediaQueryLists = queriesArray.map((q) => typeof window !== 'undefined' ? window.matchMedia(q) : { matches: defaultValue });

    // Function that gets value based on matching media query
    const getValue = () => {        
        // Get index of first media query that matches
        const index = mediaQueryLists.findIndex((mql) => mql.matches);

        if (isSingleQuery && isSingleValue) return index === 0 ? values : defaultValue;

        // Return related value or defaultValue if none
        return typeof values[index] !== "undefined" ? values[index] : defaultValue;
    };

    // State and setter for matched value
    const [value, setValue] = useState(getValue);

    useEffect(
        () => {
            // Event listener callback
            // Note: By defining getValue outside of useEffect we ensure that it has ...
            // ... current values of hook args (as this hook callback is created once on mount).
            const handler = () => setValue(getValue);
            // Set a listener for each media query with above handler as callback.
            mediaQueryLists.forEach((mql) => mql.addListener(handler));
            // Remove listeners on cleanup
            return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
        },
        [] // Empty array ensures effect is only run on mount and unmount
    );

    return [value, setValue];
}

/**
 * Returns whether or not a component should be pinned depending on the scroll position
 */
export function useScrollBasedPin(initialState, options) {
    const [isPinned, setIsPinned] = useState(initialState);
    const scrollRecord = useRef(0);

    const { pinThreshold = 0, downScrollTolerance = 2, upScrollTolerance = 5 } = options || {};

    useEffect(() => {
        const getDocumentHeight = () => {
            const { body } = document;

            return Math.max(body.scrollHeight, body.offsetHeight, body.clientHeight);
        };

        const isOutOfBounds = (scrollY) => {
            const viewportHeight = window.innerHeight;
            const documentHeight = getDocumentHeight();

            const pastTop = scrollY < 0;
            const pastBottom = scrollY + viewportHeight > documentHeight;

            return pastTop || pastBottom;
        };

        const getPinState = (scrollY) => {
            const scrollDirection = scrollY >= scrollRecord.current ? "down" : "up"
            const distanceScrolled = Math.abs(scrollY - scrollRecord.current)
            const scrollPosPastThreshold = scrollY > pinThreshold

            if (
                scrollDirection === "down" &&
                scrollPosPastThreshold &&
                distanceScrolled > downScrollTolerance
            ) {
                return "unpin"
            } else if (
                scrollDirection === "up" &&
                distanceScrolled > upScrollTolerance ||
                !scrollPosPastThreshold
            ) {
                return 'pin'
            } else {
                return 'constant'
            }
        };

        const listener = () => {
            var scrollY = window.pageYOffset;

            if (!isOutOfBounds(scrollY)) {
                const action = getPinState(scrollY);

                if (action === 'pin' && !isPinned) setIsPinned(true)
                if (action === 'unpin' && isPinned) setIsPinned(false)
            }
            scrollRecord.current = scrollY <= 0 ? 0 : scrollY; // For Mobile or negative scrolling
        };

        document.addEventListener("scroll", listener);

        return () => {
            document.removeEventListener("scroll", listener);
        };
    }, [isPinned]);

    return isPinned;
}
