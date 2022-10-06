const addQueryParam = (url:string, key:string, value:string) => {
	if (url.includes("?"))return `${url}&${key}=${value}`;
	else return `${url}?${key}=${value}`;
}

const httpReq = async (url:string, method:string = "GET", params:any = {}) => {
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.error("invalid method");
        return false;
    }
    let headers:any = {}
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
                cache: 'no-cache',
                headers: headers
            });
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache',
                // mode: 'no-cors',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params) // body data type must match "Content-Type" header
            });
        }
        const data = await response.json();
        if (!response.ok) {
            return Promise.resolve(JSON.stringify(data));
        }
        return Promise.resolve(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
}

export {httpReq};