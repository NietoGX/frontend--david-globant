import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class ProductsFacade {
    get getProductList() { return inject(IID.getProductListUseCase); }
    get getProductDetail() { return inject(IID.getProductDetailUseCase); }
}

export const productsFacade = new ProductsFacade();
