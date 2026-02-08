import { ProductRepository } from '../domain/product-repository';
import { Product } from '../domain/product';
import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class GetProductList {
    constructor(private readonly repository = inject(IID.productRepository)) {}

    async execute(searchTerm?: string): Promise<Product[]> {
        const products = await this.repository.getProducts();

        if (!searchTerm) {
            return products;
        }

        const term = searchTerm.toLowerCase();
        return products.filter(product => {
            const matchBrand = product.brand.toLowerCase().includes(term);
            const matchModel = product.model.toLowerCase().includes(term);

            return matchBrand || matchModel;
        });
    }
}
