import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class AddToCart {
    constructor(private readonly cartRepository = inject(IID.cartRepository)) { }

    async execute(productId: string, colorCode: number, storageCode: number): Promise<number> {
        const newCount = await this.cartRepository.addToCart(productId, colorCode, storageCode);
        return newCount;
    }
}
