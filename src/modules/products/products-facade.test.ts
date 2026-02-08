import { describe, it, expect, beforeEach } from 'vitest';
import { bootstrap } from '@/modules/shared/infrastructure/bootstrap';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';

describe('Products Facade', () => {
    let productsFacade: any;

    beforeEach(async () => {
        Ioc.instance.reset();
        bootstrap();
        // Re-import to ensure fresh execution if possible, or just import once.
        // Since it exports a const singleton, dynamic import will return the SAME module instance.
        // However, if the module failed to evaluate previously, it might re-evaluate?
        // Or we just rely on `bootstrap` filling the Ioc so when the singleton WAS created (if it was) it worked?
        // Wait, if it failed previously (in the failed run), the process exited.
        // In this run, we want to ensure it works.
        const module = await import('./products-facade');
        productsFacade = module.productsFacade;
    });

    it('should have getProductList defined', () => {
        expect(productsFacade.getProductList).toBeDefined();
    });

    it('should have getProductDetail defined', () => {
        expect(productsFacade.getProductDetail).toBeDefined();
    });
});
