import { describe, it, expect, beforeEach } from 'vitest';
import { initialize, resetInitialize } from './index';
import { Ioc } from '../core/Ioc';
import { IID } from './IID';

describe('Bootstrap', () => {
    beforeEach(() => {
        Ioc.instance.reset();
        resetInitialize();
    });

    it('should register all expected dependencies', () => {
        initialize();

        expect(Ioc.instance.provideByKey(IID.productRepository)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.getProductListUseCase)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.getProductDetailUseCase)).toBeDefined();

        expect(Ioc.instance.provideByKey(IID.cartRepository)).toBeDefined();
        expect(Ioc.instance.provideByKey(IID.addToCartUseCase)).toBeDefined();
    });
});
