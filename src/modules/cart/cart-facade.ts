import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

import { CartItemDto } from '@/modules/cart/infrastructure/cart-dto';

export class CartFacade {
    constructor(
        private readonly addToCartUseCase = inject(IID.addToCartUseCase)
    ) { }

    async addToCart(item: CartItemDto) {
        return this.addToCartUseCase.execute(item);
    }
}
