import { GetProductList } from '@/modules/products/application/get-product-list.use-case';
import { GetProductDetail } from '@/modules/products/application/get-product-detail.use-case';
import { ProductRepositoryApi } from '@/modules/products/infrastructure/product-repository-api';
import { AddToCart } from '@/modules/cart/application/add-to-cart.use-case';
import { CartRepositoryApi } from '@/modules/cart/infrastructure/cart-repository-api';
import { Ioc } from '../core/Ioc';
import { IID } from './IID';

export function bootstrap(): Ioc {
  return Ioc.instance

    .singleton(IID.productRepository, () => new ProductRepositoryApi())
    .singleton(IID.getProductListUseCase, () => new GetProductList())
    .singleton(IID.getProductDetailUseCase, () => new GetProductDetail())

    .singleton(IID.cartRepository, () => new CartRepositoryApi())
    .singleton(IID.addToCartUseCase, () => new AddToCart());
}
