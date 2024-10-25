export const corsRules: browser.declarativeNetRequest.Rule[] = [
    {
        id: 1,
        priority: 1,
        action: {
            type: "modifyHeaders",
            responseHeaders: [
                {
                    header: "Access-Control-Allow-Origin",
                    operation: "set",
                    value: "*",
                },
                {
                    header: "Access-Control-Allow-Methods",
                    operation: "set",
                    value: "PUT, GET, HEAD, POST, DELETE, OPTIONS",
                },
                {
                    header: "Access-Control-Allow-Headers",
                    operation: "set",
                    value: "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                },
                {
                    header: "Access-Control-Allow-Credentials",
                    operation: "set",
                    value: "true",
                },
            ],
        },
        condition: {
            resourceTypes: [
                "xmlhttprequest",
                "image",
                "media",
            ],
        },
    },
];
