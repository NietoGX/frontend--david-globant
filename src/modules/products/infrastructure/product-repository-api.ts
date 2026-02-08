import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CacheManager } from '@/modules/shared/infrastructure/cache-manager';
import { ProductRepository } from '@/modules/products/domain/product-repository';
import { Product, ProductDetail } from '@/modules/products/domain/product';
import { ProductListDtoSchema, ProductDetailDtoSchema } from './product-dto';
import { inject, IID } from '@/modules/shared/infrastructure/bootstrap/IID';

const CACHE_KEY_PRODUCTS = 'products_list';
const CACHE_KEY_PRODUCT_DETAIL_PREFIX = 'product_detail_';
const ONE_HOUR = 3600;

export class ProductRepositoryApi implements ProductRepository {
    constructor(
        private readonly httpClient: HttpClient = inject(IID.httpClient),
        private readonly cacheManager: CacheManager = inject(IID.cacheManager)
    ) { }

    async getProducts(): Promise<Product[]> {
        const cached = this.cacheManager.get<Product[]>(CACHE_KEY_PRODUCTS);
        if (cached) return cached;


        const products = await this.httpClient.get<Product[]>('/product', {
            schema: ProductListDtoSchema
        });

        this.cacheManager.set(CACHE_KEY_PRODUCTS, products, ONE_HOUR);
        return products;
    }

    async getProductDetail(id: string): Promise<ProductDetail> {
        const cacheKey = `${CACHE_KEY_PRODUCT_DETAIL_PREFIX}${id}`;
        const cached = this.cacheManager.get<ProductDetail>(cacheKey);
        if (cached) return cached;


        const product = await this.httpClient.get<ProductDetail>(`/product/${id}`, {
            schema: ProductDetailDtoSchema
        });

        this.cacheManager.set(cacheKey, product, ONE_HOUR);
        return product;
    }
}
