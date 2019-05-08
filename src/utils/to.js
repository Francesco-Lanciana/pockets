function to(promise) {
    return promise
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(`Looks like there was a problem. Status Code: ${res.status}`);
            }

            return res.json().then((data) => {
                return [null, data];
            });

            //if (!res.data.success) return [`The following request was unsuccessful: ${res.metadata.url}`];
        })
        .catch((err) => [err]);
}

export default to;