import { DEFAULT_SEO } from "../seo-config";

const generateBlogJSONLD = ({ title, description, url, imageUrl, datePublished, dateModified, authorGivenName, authorFamilyName }) => {
    return {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: title,
        image: [imageUrl],
        datePublished,
        dateModified,
        description,
        author: {
            "@type": "Person",
            givenName: authorGivenName,
            familyName: authorFamilyName,
            worksFor: {
                "@type": "Organization",
                name: "Pockets",
            }
        },
        publisher: {
            "@type": "Organization",
            name: "Pockets",
            email: "pocketsfash@gmail.com",
            slogan: "Bringing fashion into the 21st century",
            logo: {
                "@type": "ImageObject",
                url:
                    "https://storage.googleapis.com/pockets-clothing-images/pockets-logo.png",
            },
        },
    };
};

const generateItemJSONLD = ({ name, description, category, price, currency, imageUrl, sku }) => {
    return {
        "@context": "http://schema.org",
        "@type": "WebPage",
        mainEntityOfPage: {
            "@type": "Product",
            name,
            description,
            category,
            sku,
            image: imageUrl,
            offers: {
                "@type": "Offer",
                availability: "http://schema.org/InStock",
                price,
                priceCurrency: currency,
            },
        },
        primaryImageOfPage: {
            "@type": "ImageObject",
            contentUrl: imageUrl,
        }
    };
};

const generateJSONLD = (type) => {
    switch (type) {
        case "blog":
            return generateBlogJSONLD;
        case "item":
            return generateItemJSONLD;
        default:
            throw new Error("The type of JSONLD you are after doesn't exist");
    }
}

export { generateJSONLD };
