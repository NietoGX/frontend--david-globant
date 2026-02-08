import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

/**
 * Products Facade
 * Exposes all use cases for the products module
 */
export class ProductsFacade {
    readonly getProductList = inject(IID.getProductListUseCase);
    readonly getProductDetail = inject(IID.getProductDetailUseCase);
}

// Export singleton instance
export const productsFacade = new ProductsFacade();
