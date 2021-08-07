import { observable, action, computed, configure, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IProduct } from '../models/product';
import { RootStore } from './rootStore';

configure({enforceActions: 'always'});

export default class ProductStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
  }



  @observable productRegistry = new Map();
  @observable product: IProduct | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get productsByDate() {
    return Array.from(this.productRegistry.values())
  }

  groupProductsByDate(products: IProduct[]){
    const sortedProducts = products.sort (
      (a,b) => parseInt(a.name) - parseInt(b.name)
    );
    return sortedProducts;
  }

  @action loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const products = await agent.Products.list();
      runInAction('loading products', () => {
        products.forEach(product => {
          this.productRegistry.set(product.id, product);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load products error', () => {
        this.loadingInitial = false;
      })
    }
  };


  @action loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product){
      this.product = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        runInAction('getting product',() => {
          this.product = product;
          this.loadingInitial = false;
        })
        return product;
      }catch (error) {
        runInAction('get product error', ()=> {
          this.loadingInitial = false
        })
        console.log(error);
      }
    }
  }

  @action clearProduct = () => {
    this.product = null;
  }

  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  }

  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      runInAction('create product', () => {
        this.productRegistry.set(product.id, product);
        this.submitting = false;
      });
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.update(product);
      runInAction('editing product', () => {
        this.productRegistry.set(product.id, product);
        this.product = product;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit product error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteProduct = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Products.delete(id);
      runInAction('deleting product', () => {
        this.productRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete product error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }

 
}