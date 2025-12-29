export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    quantity: number;
}

export interface CartState {
    items: Product[];
    discount: number;
    taxRate: number;
}
