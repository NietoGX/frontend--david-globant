import { describe, it, expect, beforeEach } from 'vitest';
import { initialize, resetInitialize } from '@/modules/shared/infrastructure/bootstrap';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';
import { CartFacade } from './cart-facade';

describe('Cart Facade', () => {
    let cartFacade: CartFacade;

    beforeEach(() => {
        Ioc.instance.reset();
        resetInitialize();
        const facades = initialize();
        cartFacade = facades.cartFacade;
    });

    it('should have addToCart defined', () => {
        expect(cartFacade.addToCart).toBeDefined();
    });
});
