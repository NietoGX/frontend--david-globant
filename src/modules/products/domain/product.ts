export interface Product {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl?: string;
}

export interface ProductColor {
    code: number;
    name: string;
}

export interface ProductStorage {
    code: number;
    name: string;
}

export interface ProductDetail extends Product {
    cpu: string;
    ram: string;
    os: string;
    displayResolution?: string;
    battery?: string;
    primaryCamera?: string | string[];
    secondaryCmera?: string | string[];
    dimentions?: string;
    weight?: string;
    options: {
        colors: ProductColor[];
        storages: ProductStorage[];
    };
}
