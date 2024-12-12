
// Configuration: Whitelist and Blacklist (not used in this version)
// whitelist = [ "^http.?://www.zibri.org$", "zibri.org$", "test\\..*" ];  // regexp for whitelisted urls
const blacklistUrls: string[] = [];           // regexp for blacklisted urls
const whiteListUrls: string[] = [ ".*" ];   // regexp for whitelisted origins

// Function to check if a given URI or origin is listed in the whitelist or blacklist
function isUrlInList(uri: any, listing: any) {
    console.log(uri)

    let isListed = false;
    if (typeof uri === "string") {
        listing.forEach((pattern) => {
            if (uri.match(pattern) !== null) {
                isListed = true;
            }
        });
    } else {
        // When URI is null (e.g., when Origin header is missing), decide based on the implementation
        isListed = true; // true accepts null origins, false would reject them
    }
    return isListed;
}

export const ProxyService = {
    async fetch(request: Request) {
        const event = { request: request };

        const isPreflightRequest = (event.request.method === "OPTIONS");

        const originUrl = new URL(event.request.url);
        const originUrlParams = new URLSearchParams(originUrl.search);

        // Function to modify headers to enable CORS
        function setupCORSHeaders(headers: any) {
            headers.set("Access-Control-Allow-Origin", event.request.headers.get("origin"));
            if (isPreflightRequest) {
                headers.set("Access-Control-Allow-Methods", event.request.headers.get("access-control-request-method"));
                const requestedHeaders = event.request.headers.get("access-control-request-headers");

                if (requestedHeaders) {
                    headers.set("Access-Control-Allow-Headers", requestedHeaders);
                }

                headers.delete("X-Content-Type-Options"); // Remove X-Content-Type-Options header
            }
            return headers;
        }

        const targetUrl = decodeURIComponent(decodeURIComponent(originUrlParams.get("url")!));

        const originHeader = event.request.headers.get("origin");

        if ((!isUrlInList(targetUrl, blacklistUrls)) && (isUrlInList(originHeader, whiteListUrls))) {
            let customHeaders = event.request.headers.get("x-cors-headers");

            if (customHeaders !== null) {
                try {
                    customHeaders = JSON.parse(customHeaders);
                } catch (e) {}
            }

            if (originUrl.search.startsWith("?")) {
                const filteredHeaders = {};
                for (const [key, value] of event.request.headers.entries()) {
                    if (
                        (key.match("^origin") === null) &&
                        (key.match("eferer") === null) &&
                        (key.match("^cf-") === null) &&
                        (key.match("^x-forw") === null) &&
                        (key.match("^x-cors-headers") === null)
                    ) {
                        filteredHeaders[key] = value;
                    }
                }

                if (customHeaders !== null) {
                    Object.entries(customHeaders).forEach((entry) => (filteredHeaders[entry[0]] = entry[1]));
                }

                const newRequest = new Request(event.request, {
                    redirect: "follow",
                    headers: filteredHeaders
                });

                const response = await fetch(targetUrl, newRequest);
                let responseHeaders = new Headers(response.headers);
                const exposedHeaders = [];
                const allResponseHeaders = {};
                for (const [key, value] of response.headers.entries()) {
                    exposedHeaders.push(key);
                    allResponseHeaders[key] = value;
                }
                exposedHeaders.push("cors-received-headers");
                responseHeaders = setupCORSHeaders(responseHeaders);

                responseHeaders.set("Access-Control-Expose-Headers", exposedHeaders.join(","));
                responseHeaders.set("cors-received-headers", JSON.stringify(allResponseHeaders));

                // Try get charset from html response
                const responseBuffer = await response.arrayBuffer();
                const charsetRegex = /<meta.*?charset=['"](.*?)['"].*?>/i;
                const charset = charsetRegex.exec(new TextDecoder().decode(responseBuffer));

                const decoder = new TextDecoder(originUrlParams.get("charset") ?? (charset ? charset[1] : "utf-8"));
                const decodedText = decoder.decode(responseBuffer);

                const responseInit = {
                    headers: responseHeaders,
                    status: isPreflightRequest ? 200 : response.status,
                    statusText: isPreflightRequest ? "OK" : response.statusText
                };
                return new Response(decodedText, responseInit);

            } else {
                let responseHeaders = new Headers();
                responseHeaders = setupCORSHeaders(responseHeaders);

                let country = false;
                let colo = false;
                if (typeof event.request.cf !== "undefined") {
                    country = event.request.cf.country || false;
                    colo = event.request.cf.colo || false;
                }

                return new Response(
                    "PROXY\n\n" +
                    "\n" +
                    (customHeaders !== null ? "\nx-cors-headers: " + JSON.stringify(customHeaders) : ""),
                    {
                        status: 200,
                        headers: responseHeaders
                    }
                );
            }
        } else {
            return new Response(
                "Nope",
                {
                    status: 403,
                    statusText: 'Forbidden',
                    headers: {
                        "Content-Type": "text/html"
                    }
                }
            );
        }
    }
}

