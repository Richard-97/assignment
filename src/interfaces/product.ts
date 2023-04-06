interface Identifier {
  id: number;
}

export interface CartItem extends Identifier {
  quantity: number;
}

export interface Product extends Identifier {
  name: string;
  unit_price_incl_vat: number;
  vat_category: number;
  stock_quantity: number;
}

export type ProductInCartDetails = CartItem & Product;
