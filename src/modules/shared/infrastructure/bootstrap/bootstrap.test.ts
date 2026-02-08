import { describe, it, expect, beforeEach, vi } from 'vitest';
import { bootstrap } from './index';
import { Ioc } from '../core/Ioc';
import { IID } from './IID';

describe('Bootstrap', () => {
    beforeEach(() => {
        Ioc.instance.reset();
    });

    it('should register all expected dependencies', () => {
        bootstrap();

        // Verify Products dependencies
        expect(Ioc.instance.provideByKey(IID.productRepository)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.getProductListUseCase)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.getProductDetailUseCase)).toBeDefined();

        // Verify Cart dependencies
        expect(Ioc.instance.provideByKey(IID.cartRepository)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.addToCartUseCase)).toBeDefined();
    });
});
