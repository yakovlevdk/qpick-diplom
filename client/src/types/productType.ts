
export interface Specifications {
    storage?: string;
    color?: string;
    battery?: string;
}

export interface productType {
    _id?: string;
    title: string;
    type: string;
    imgUrl: string;
    category: string;
    price: number | '';
    description: string;
    specifications: {
        storage?: string | undefined;
        color?: string | undefined;
        battery?: string | undefined;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any; // Позволяет добавлять любые другие поля
    };
}