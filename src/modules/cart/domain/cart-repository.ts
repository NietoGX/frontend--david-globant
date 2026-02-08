export interface CartRepository {
    addToCart(productId: string, colorCode: number, storageCode: number): Promise<number>;
}
