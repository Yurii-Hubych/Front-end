interface IConfigs {
    apiGateway: string
}

export const configs:IConfigs = {
    apiGateway: import.meta.env.VITE_API_GATEWAY_URL_DEV || "http://localhost:3000"
}