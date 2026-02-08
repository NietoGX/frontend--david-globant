import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';


export class CartFacade {
    readonly addToCart = inject(IID.addToCartUseCase);
}


export const cartFacade = new CartFacade();
