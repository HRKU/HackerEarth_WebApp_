/* tslint:disable */
import {Category} from './category.model';
export class Products
{
    public _id? : string
    public ProductName : string;
    public Description : string;
    public photoByPath : string;
    public Cost : number;
    public stock : number;
    public category :[Category]
    public rating : number;

    constructor(p_name:string,p_desc:string,p_imagePath:string,p_price:number,p_rate:number)
    {

        this.ProductName = p_name;
        this.Description = p_desc;
        this.photoByPath = p_imagePath;
        this.Cost = p_price;
        this.rating = p_rate;



    }
}
