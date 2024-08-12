import { EItemState } from "../config/enums";

export interface ProductType {
    id: number;
    productName: string;
    description: string;
}

export interface Product {
  serialNumber: string;
  productType: string;
  date: string;
  userName: string;
  state: EItemState;
}