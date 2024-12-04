export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface ITokenPayload {
    _id: string;
    _roles: string[];
    status: string;
    isBlocked: boolean;
    iat: number;
    exp: number;
}