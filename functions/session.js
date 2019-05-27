require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function handler(event) {
    try {
        const { skuIds, quantities } = JSON.parse(event.body);

        const areValidSkuIds = validateSkuIds(skuIds);
        if (!areValidSkuIds) throw new Error("An invalid SKU Id was provided");

        const skus = await retrieveSkus(skuIds);
        const areValidSkus = validateSkus(skus);
        if (!areValidSkus) throw new Error("One or more of these SKUs are not available for purchase");

        const lineItems = await generateLineItems(skus, quantities);
        const session = await createSession(lineItems);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, session }),
        };
    } catch (e) {
        console.log(`Error functions/session: \n${e}`)
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false }),
        };
    }
}

function retrieveSkus(skuIds) {
    const retrieveSkuPromises = skuIds.map((skuId) => {
        return stripe.skus.retrieve(skuId, { expand: ["product"] });
    });

    return Promise.all(retrieveSkuPromises);
}

/**
 * Validate that the SKU Ids provided have a valid prefix and are non empty.
 * @param {[]} skuIds An array of ids corresponding to Stripe SKU objects
 */
function validateSkuIds(skuIds) {
    if (!skuIds) return false;

    const allValid = skuIds.every((skuId) => {
        if (skuId.length === 0) return false;

        const [idPrefix, id] = skuId.split("_");
        if (idPrefix !== "sku" || !id) return false;

        return true;
    })

    return allValid;
}

/**
 * Checks to see whether every item is still available for purchase
 * @param {[]} skus An array of Stripe SKU objects
 */
function validateSkus(skus) {
    const allValid = skus.map(({ active }) => active);

    return allValid;
}

/**
 * Generate line items to be used in a purchase
 * @param {[]} skus An array of Stripe SKU objects
 * @param {{}} quantities An object where each key corresponds to an SKU id and the value is the number
 * of that item the user wishes to purchase
 */
async function generateLineItems(skus, quantities) {
    const lineItems = skus.map(({ id, attributes, product, image, price, currency }) => {
        const quantity = quantities[id] || 1;
        return {
            name: `${product.name} - ${attributes.size}`,
            description: product.description,
            images: [image],
            amount: price,
            currency: currency,
            quantity: quantity,
        }
    });

    return lineItems;
}

/**
 * Returns a Stripe Session object that represents the customers session as pay for
 * purchases through Checkout.
 * @param {[]} lineItems A list of items the customer would like to purchase
 */
async function createSession(lineItems) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        billing_address_collection: "required",
        success_url: 'https://pockets.fashion/purchase/success',
        cancel_url: 'https://pockets.fashion/purchase/cancel',
    });

    return session;
}

exports.handler = handler;