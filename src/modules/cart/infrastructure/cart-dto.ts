import { z } from 'zod';

export interface CartItemDto {
    id: string;
    colorCode: number;
    storageCode: number;
}

export const AddToCartResponseSchema = z.object({
    count: z.number(),
});
