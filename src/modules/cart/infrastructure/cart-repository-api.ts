import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CartRepository } from '../domain/cart-repository';
import { AddToCartResponseSchema } from './cart-dto';

export class CartRepositoryApi implements CartRepository {
    async addToCart(productId: string, colorCode: number, storageCode: number): Promise<number> {
        const response = await HttpClient.post<{ count: number }>('/cart', {
            id: productId,
            colorCode,
            storageCode
        }, {
            schema: AddToCartResponseSchema
        });

        return response.count;
    }
}
