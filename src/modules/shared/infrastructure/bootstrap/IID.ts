import { GetProductList } from '@/modules/products/application/get-product-list.use-case';
import { GetProductDetail } from '@/modules/products/application/get-product-detail.use-case';
import { ProductRepository } from '@/modules/products/domain/product-repository';
import { AddToCart } from '@/modules/cart/application/add-to-cart.use-case';
import { CartRepository } from '@/modules/cart/domain/cart-repository';
import { Ioc } from '../core/Ioc';

export const IID = {

  productRepository: 'productRepository',
  getProductListUseCase: 'getProductListUseCase',
  getProductDetailUseCase: 'getProductDetailUseCase',


  cartRepository: 'cartRepository',
  addToCartUseCase: 'addToCartUseCase',
} as const;

export interface DependencyMap {
  [IID.productRepository]: ProductRepository;
  [IID.getProductListUseCase]: GetProductList;
  [IID.getProductDetailUseCase]: GetProductDetail;
  [IID.cartRepository]: CartRepository;
  [IID.addToCartUseCase]: AddToCart;
}

export function inject<K extends keyof DependencyMap>(key: K): DependencyMap[K] {
  return Ioc.instance.provideByKey<DependencyMap[K]>(key);
}
