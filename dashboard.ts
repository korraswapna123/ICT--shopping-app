import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  currentView: 'women' | 'men' | 'kids' | 'manage' = 'women';
  isSidebarOpen = true;

  selectedSubCategory: string | null = null;

  subCategories: any = {
    Women: ['Sarees', 'Kurtis', 'Frocks', 'Anarkalis', 'Tops', 'Trousers'],
    Men: ['Shirts', 'T-Shirts', 'Jeans', 'Trousers'],
    Kids: ['Toys', 'Frocks', 'Dresses', 'Shirts']
  };

  products: any[] = [];

  defaultProducts = [
    {
      id: 1,
      name: 'Silk Saree',
      category: 'Women',
      subCategory: 'Sarees',
      price: 2500,
      image: 'https://m.media-amazon.com/images/I/81zLz5Jq4PL.jpg'
    },
    {
      id: 2,
      name: 'Kurti',
      category: 'Women',
      subCategory: 'Kurtis',
      price: 1500,
      image: 'https://m.media-amazon.com/images/I/71k7dZzqG-L.jpg'
    },
    {
      id: 3,
      name: 'Men Shirt',
      category: 'Men',
      subCategory: 'Shirts',
      price: 1200,
      image: 'https://m.media-amazon.com/images/I/61xXH3cRZUL.jpg'
    },
    {
      id: 4,
      name: 'Toy Car',
      category: 'Kids',
      subCategory: 'Toys',
      price: 800,
      image: 'https://m.media-amazon.com/images/I/71b8nY2U6PL.jpg'
    }
  ];

  newProduct = {
    name: '',
    category: 'Women',
    subCategory: '',
    price: 0,
    image: ''
  };

  editingProductId: number | null = null;
  editedPrice: number = 0;

  ngOnInit() {
    const saved = localStorage.getItem('products');
    this.products = saved ? JSON.parse(saved) : this.defaultProducts;
    this.save();
  }

  save() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setView(view: 'women' | 'men' | 'kids' | 'manage') {
    this.currentView = view;
    this.selectedSubCategory = null;
  }

  setSubCategory(sub: string) {
    this.selectedSubCategory = sub;
  }

  addProduct() {
    if (
      !this.newProduct.name ||
      !this.newProduct.image ||
      !this.newProduct.subCategory ||
      this.newProduct.price <= 0
    ) {
      alert('Please fill all fields');
      return;
    }

    this.products.push({
      id: Date.now(),
      ...this.newProduct
    });

    this.save();

    this.newProduct = {
      name: '',
      category: 'Women',
      subCategory: '',
      price: 0,
      image: ''
    };
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.save();
  }

  startEdit(product: any) {
    this.editingProductId = product.id;
    this.editedPrice = product.price;
  }

  updatePrice(product: any) {
    product.price = this.editedPrice;
    this.editingProductId = null;
    this.save();
  }

  cancelEdit() {
    this.editingProductId = null;
  }

  getFilteredProducts() {
    const category =
      this.currentView.charAt(0).toUpperCase() +
      this.currentView.slice(1);

    return this.products.filter(p =>
      p.category === category &&
      (!this.selectedSubCategory || p.subCategory === this.selectedSubCategory)
    );
  }
}
