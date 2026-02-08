import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CartRepository } from '../domain/cart-repository';
import { AddToCartResponseSchema } from './cart-dto';
import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

export class CartRepositoryApi implements CartRepository {
    constructor(
        private readonly httpClient: HttpClient = inject(IID.httpClient)
    ) { }

    async addToCart(productId: string, colorCode: number, storageCode: number): Promise<number> {
        const response = await this.httpClient.post<{ count: number }>('/cart', {
            id: productId,
            colorCode,
            storageCode
        }, {
            schema: AddToCartResponseSchema
        });

        return response.count;
    }
}
