import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private productURL = 'api/products/products.json';
    constructor(private http : HttpClient){

    }

    getProducts(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productURL).pipe(
            tap(data => console.log('All:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An error occurred: ${errorMessage}`;
        }else{
            errorMessage = `Server return code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}