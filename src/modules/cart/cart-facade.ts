import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';


export class CartFacade {
    get addToCart() { return inject(IID.addToCartUseCase); }
}


export const cartFacade = new CartFacade();
