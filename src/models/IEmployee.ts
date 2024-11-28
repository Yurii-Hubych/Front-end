export interface IEmployee {
    _id: string;
    name: string;
    surname: string;
    roles: string[];
    _position?: _position;
    _department?: _department;
    isBlocked: boolean;
}

type _position = {
    name: string;
}

type _department = {
    name: string[];
}