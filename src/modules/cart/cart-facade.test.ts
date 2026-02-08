import { describe, it, expect, beforeEach } from 'vitest';
import { bootstrap, resetBootstrap } from '@/modules/shared/infrastructure/bootstrap';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';

describe('Cart Facade', () => {
    let cartFacade: any;

    beforeEach(async () => {
        Ioc.instance.reset();
        resetBootstrap();
        bootstrap();
        const module = await import('./cart-facade');
        cartFacade = module.cartFacade;
    });

    it('should have addToCart defined', () => {
        expect(cartFacade.addToCart).toBeDefined();
    });
});
