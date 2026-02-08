import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';



export class ProductsFacade {
    constructor(
        private readonly getProductListUseCase = inject(IID.getProductListUseCase),
        private readonly getProductDetailUseCase = inject(IID.getProductDetailUseCase)
    ) { }

    async getProductList(search?: string) {
        return this.getProductListUseCase.execute(search);
    }

    async getProductDetail(id: string) {
        return this.getProductDetailUseCase.execute(id);
    }
}
