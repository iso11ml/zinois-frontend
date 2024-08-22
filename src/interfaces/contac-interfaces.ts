export interface Contact {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    address: string;
    userId: string;
}

export interface CreateContact {
    name: string;
    lastName: string;
    phone: string;
    address: string;
    userId: string | undefined;
}
