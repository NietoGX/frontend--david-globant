import { ProductRepository } from '../domain/product-repository';
import { ProductDetail } from '../domain/product';
import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class GetProductDetail {
    constructor(private readonly repository = inject(IID.productRepository)) {}

    async execute(id: string): Promise<ProductDetail> {
        return this.repository.getProductDetail(id);
    }
}
