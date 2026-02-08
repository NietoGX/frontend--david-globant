
import { Product } from '../domain/product';
import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class GetProductList {
    constructor(private readonly repository = inject(IID.productRepository)) { }

    async execute(searchTerm?: string): Promise<Product[]> {
        const products = await this.repository.getProducts();

        if (!searchTerm) {
            return products;
        }

        const terms = searchTerm.toLowerCase().split(' ').filter(t => t.length > 0);

        return products.filter(product => {
            const productText = `${product.brand} ${product.model}`.toLowerCase();
            return terms.every(term => productText.includes(term));
        });
    }
}
