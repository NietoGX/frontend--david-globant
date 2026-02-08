import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductListContainer } from '@/modules/products/ui/product-list-container';
import { ProductsProvider } from '@/modules/products/infrastructure/products-provider';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';
import { IID } from '@/modules/shared/infrastructure/bootstrap/IID';
import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CacheManager } from '@/modules/shared/infrastructure/cache-manager';
import { Product } from '@/modules/products/domain/product';
import { initialize, resetInitialize } from '@/modules/shared/infrastructure/bootstrap';

vi.mock('next/navigation', () => ({
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/',
}));

const mockProducts: Product[] = [
    {
        id: '1',
        brand: 'Brand A',
        model: 'Model X',
        price: '100',
        imgUrl: 'http://example.com/img1.jpg',
    },
    {
        id: '2',
        brand: 'Brand B',
        model: 'Model Y',
        price: '200',
        imgUrl: 'http://example.com/img2.jpg',
    },
];

describe('Integration: Product List', () => {
    let mockHttpClient: HttpClient;
    let mockCacheManager: CacheManager;

    beforeEach(() => {
        Ioc.instance.reset();
        resetInitialize();

        mockHttpClient = {
            get: vi.fn(),
            post: vi.fn(),
        } as unknown as HttpClient;

        mockCacheManager = {
            get: vi.fn(),
            set: vi.fn(),
            remove: vi.fn(),
        } as unknown as CacheManager;

        Ioc.instance.override({
            [IID.httpClient]: () => mockHttpClient,
            [IID.cacheManager]: () => mockCacheManager,
        });

        initialize();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should display a list of products retrieved from the API when cache is empty', async () => {
        (mockCacheManager.get as ReturnType<typeof vi.fn>).mockReturnValue(null);
        (mockHttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);

        render(
            <ProductsProvider>
                <ProductListContainer />
            </ProductsProvider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Model X')).toBeInTheDocument();
        expect(screen.getByText('Brand A')).toBeInTheDocument();
        expect(screen.getByText('Model Y')).toBeInTheDocument();
        expect(screen.getByText('Brand B')).toBeInTheDocument();

        expect(screen.getByText('100 €')).toBeInTheDocument();
        expect(screen.getByText('200 €')).toBeInTheDocument();

        expect(mockCacheManager.get).toHaveBeenCalledWith('products_list');
        expect(mockHttpClient.get).toHaveBeenCalledWith('/product', expect.any(Object));
        expect(mockCacheManager.set).toHaveBeenCalledWith('products_list', mockProducts, 3600);
    });

    it('should display a list of products from cache when available', async () => {
        (mockCacheManager.get as ReturnType<typeof vi.fn>).mockReturnValue(mockProducts);

        render(
            <ProductsProvider>
                <ProductListContainer />
            </ProductsProvider>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Model X')).toBeInTheDocument();
        expect(screen.getByText('Model Y')).toBeInTheDocument();

        expect(mockHttpClient.get).not.toHaveBeenCalled();
    });
});
