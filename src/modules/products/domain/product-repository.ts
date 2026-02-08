import { Product, ProductDetail } from './product';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    getProductDetail(id: string): Promise<ProductDetail>;
}
