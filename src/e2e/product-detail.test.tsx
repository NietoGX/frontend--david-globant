import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductDetailContainer } from '@/modules/products/ui/product-detail-container';
import { ProductsProvider } from '@/modules/products/infrastructure/products-provider';
import { CartProvider } from '@/modules/cart/infrastructure/cart-provider';
import { Ioc } from '@/modules/shared/infrastructure/core/Ioc';
import { IID } from '@/modules/shared/infrastructure/bootstrap/IID';
import { HttpClient } from '@/modules/shared/infrastructure/http-client';
import { CacheManager } from '@/modules/shared/infrastructure/cache-manager';
import { ProductDetail } from '@/modules/products/domain/product';
import { initialize, resetInitialize } from '@/modules/shared/infrastructure/bootstrap';
import { useParams } from 'next/navigation';

vi.mock('next/navigation', () => ({
    useParams: vi.fn(),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
    }),
    usePathname: () => '/product/1',
}));

const mockProductDetail: ProductDetail = {
    id: '1',
    brand: 'Brand A',
    model: 'Model X',
    price: '100',
    imgUrl: 'http://example.com/img1.jpg',
    cpu: 'CPU-1',
    ram: '8GB',
    os: 'Android',
    displayResolution: '1080p',
    battery: '4000mAh',
    primaryCamera: ['12MP'],
    secondaryCmera: '8MP',
    dimentions: '150x70x8mm',
    weight: '180g',
    options: {
        colors: [{ code: 1, name: 'Black' }],
        storages: [{ code: 1, name: '128GB' }],
    },
};

describe('Integration: Product Detail', () => {
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

        (useParams as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ id: '1' });

        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: vi.fn(),
                setItem: vi.fn(),
                removeItem: vi.fn(),
                clear: vi.fn(),
            },
            writable: true,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should display product details retrieved from the API when cache is empty', async () => {
        (mockCacheManager.get as ReturnType<typeof vi.fn>).mockReturnValue(null);
        (mockHttpClient.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockProductDetail);

        render(
            <Providers>
                <ProductDetailContainer />
            </Providers>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getAllByText('Model X')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Brand A').length).toBeGreaterThan(0);
        expect(screen.getAllByText('100 €').length).toBeGreaterThan(0);

        expect(screen.getByText('CPU-1')).toBeInTheDocument();
        expect(screen.getByText('8GB')).toBeInTheDocument();
        expect(screen.getByText('Android')).toBeInTheDocument();

        expect(mockCacheManager.get).toHaveBeenCalledWith('product_detail_1');
        expect(mockHttpClient.get).toHaveBeenCalledWith('/product/1', expect.any(Object));
        expect(mockCacheManager.set).toHaveBeenCalledWith('product_detail_1', mockProductDetail, 3600);
    });

    it('should display product details from cache when available', async () => {
        (mockCacheManager.get as ReturnType<typeof vi.fn>).mockReturnValue(mockProductDetail);

        render(
            <Providers>
                <ProductDetailContainer />
            </Providers>
        );

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        expect(screen.getAllByText('Model X')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Brand A').length).toBeGreaterThan(0);

        expect(mockHttpClient.get).not.toHaveBeenCalled();
    });
});

const Providers = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>
        <ProductsProvider>
            {children}
        </ProductsProvider>
    </CartProvider>
);
