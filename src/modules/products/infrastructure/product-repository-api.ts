import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CacheManager } from '@/modules/shared/infrastructure/cache-manager';
import { ProductRepository } from '@/modules/products/domain/product-repository';
import { Product, ProductDetail } from '@/modules/products/domain/product';
import { ProductListDtoSchema, ProductDetailDtoSchema } from './product-dto';

const CACHE_KEY_PRODUCTS = 'products_list';
const CACHE_KEY_PRODUCT_DETAIL_PREFIX = 'product_detail_';
const ONE_HOUR = 3600;

export class ProductRepositoryApi implements ProductRepository {
    async getProducts(): Promise<Product[]> {
        const cached = CacheManager.get<Product[]>(CACHE_KEY_PRODUCTS);
        if (cached) return cached;


        const products = await HttpClient.get<Product[]>('/product', {
            schema: ProductListDtoSchema
        });

        CacheManager.set(CACHE_KEY_PRODUCTS, products, ONE_HOUR);
        return products;
    }

    async getProductDetail(id: string): Promise<ProductDetail> {
        const cacheKey = `${CACHE_KEY_PRODUCT_DETAIL_PREFIX}${id}`;
        const cached = CacheManager.get<ProductDetail>(cacheKey);
        if (cached) return cached;


        const product = await HttpClient.get<ProductDetail>(`/product/${id}`, {
            schema: ProductDetailDtoSchema
        });

        CacheManager.set(cacheKey, product, ONE_HOUR);
        return product;
    }
}
