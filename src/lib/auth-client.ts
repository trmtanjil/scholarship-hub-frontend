import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    fetchOptions:{credentials:"include"},

    plugins:[
        {
            id:"next-cookies-request",
            fetchPlugins:[
                {
                    id:"next-cookies-request-plugin",
                    name:"next-cookies-request-plugin",
                    hooks:{
                        async onRequest(ctx){
                            if(typeof window==="undefined"){
                                const {cookies}= await import("next/headers");
                                const headers= await cookies();
                                ctx.headers.set("cookie",headers.toString());

                            }
                        }
                    }
                }
            ]
        }
    ]
})