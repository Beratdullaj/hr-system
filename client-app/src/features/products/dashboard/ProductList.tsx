import React, {  useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ProductListItem } from './ProductListItem';

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {productsByDate} = rootStore.productStore;
  return (
    

    <Grid container>
    <Grid.Row columns={3}>
        {productsByDate.map(product => (
          <Grid.Column key={product.id} style={{marginBottom: '10px'}}>
            <ProductListItem product={product}/>
          </Grid.Column>
         
        ))}
    </Grid.Row>
  </Grid>
    
  );
  
  
};

export default observer(ProductList);
