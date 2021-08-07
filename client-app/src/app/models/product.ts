export interface IProduct{
    id: string ;
    name: string;
    brand: string;
    description: string;
    category: string;
    price: string;
    photo: string;
}

// export interface IProductFormValues extends Partial<IProduct> {
//     price?: string;
// }

// export class ProductFormValues implements IProductFormValues {
//     id?: string = undefined;
//     name: string = '';
//     brand: string = '';
//     description: string = '';
//     category: string = '';
//     price: string = '';
//     photo: string = '';

//     constructor(init?: IProductFormValues) {
//         if(init){
            
//         }
//         Object.assign(this, init);
        
        
//     }
// }