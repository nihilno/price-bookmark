import { Dispatch, SetStateAction } from "react";

export {};

declare global {
  type ModalProps = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
  };

  type ScrapedProduct = {
    productName: string;
    currentPrice: number;
    currencyCode?: string;
    productImageUrl?: string;
  };
}
