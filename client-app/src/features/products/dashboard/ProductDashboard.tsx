import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ProductList from './ProductList';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProductDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProducts, loadingInitial} = rootStore.productStore

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loadingInitial)
    return <LoadingComponent content="Loading products" />;
    
  return (
    <Grid>
      <Grid.Column width={13}>
        <ProductList />
      </Grid.Column>
      <Grid.Column width={3}>
        <h2>Products filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDashboard);
