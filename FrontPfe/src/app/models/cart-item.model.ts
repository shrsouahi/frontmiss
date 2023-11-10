export interface CartItem {
  idArticle: number; // this property to identify the article
  selectedSize: string;
  quantity: number;
  price: number;
  name: string;
  originalPrice: number; //  this property to store the original price
  userId: number | null;
  image: string; // A single image URL
}
