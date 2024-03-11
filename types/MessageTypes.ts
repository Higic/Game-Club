import { UserOutput } from "./DBTypes";

type MessageResponse = {
    message: string;
};

type ErrorResponse = MessageResponse & {
    stack?: string;
};

type UserResponse = MessageResponse & {
    user: UserOutput;
};

type LoginResponse = MessageResponse & {
    token: string;
    user: UserOutput;
};


export type {
    UserResponse,
    LoginResponse,
    MessageResponse,
    ErrorResponse
};
