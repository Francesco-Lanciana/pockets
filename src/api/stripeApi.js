import to from "@utils/to";

const StripeApi = {
    createSession(skuIds, quantities) {
        const url = `/.netlify/functions/session`;
        const data = { skuIds, quantities };
        const body = JSON.stringify(data);

        return to(fetch(url, { method: "POST", body }));
    }
}

export default StripeApi;
