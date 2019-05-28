import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/products/products';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';

    _listFilter:string;

    get listFilter():string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    imageWidth: number = 50;
    imageMargin:number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService){
      
    }

    onRatingClicked(message:string): void{
        this.pageTitle = 'Product List: ' + message;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit() : void {
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) => 
                  product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
}