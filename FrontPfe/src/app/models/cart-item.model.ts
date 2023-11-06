export interface CartItem {
  idArticle: number; // Add this property to identify the article
  selectedSize: string;
  quantity: number;
  price: number;
  name: string; // Add properties like name, size, and any other relevant properties
  originalPrice: number; // Add this property to store the original price
  // Add other properties as needed
  userId: number | null;
}
