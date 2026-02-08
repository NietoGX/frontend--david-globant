import { describe, it, expect, beforeEach } from 'vitest';
import { initialize, resetInitialize } from '@/modules/shared/infrastructure/bootstrap';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';
import { ProductsFacade } from './products-facade';

describe('Products Facade', () => {
    let productsFacade: ProductsFacade;

    beforeEach(() => {
        Ioc.instance.reset();
        resetInitialize();
        const facades = initialize();
        productsFacade = facades.productsFacade;
    });

    it('should have getProductList defined', () => {
        expect(productsFacade.getProductList).toBeDefined();
    });

    it('should have getProductDetail defined', () => {
        expect(productsFacade.getProductDetail).toBeDefined();
    });
});
