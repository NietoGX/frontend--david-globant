import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class AddToCart {
    constructor(private readonly cartRepository = inject(IID.cartRepository)) { }

    async execute(item: { id: string, colorCode: number, storageCode: number }): Promise<number> {
        const newCount = await this.cartRepository.addToCart(item.id, item.colorCode, item.storageCode);
        return newCount;
    }
}
