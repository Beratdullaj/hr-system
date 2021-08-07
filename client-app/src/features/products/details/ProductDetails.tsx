import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { ProductDetailedInfo } from "./ProductDetailedInfo";
import { ProductDetailedChat } from "./ProductDetailedChat";
import { ProductDetailedSideBar } from "./ProductDetailedSideBar";
import ProductDetailedHeader from "./ProductDetailedHeader";

interface DetailParams {
  id: string;
}

const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { product, loadProduct, loadingInitial } = rootStore.productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id]);

  if (loadingInitial) return <LoadingComponent content="Loading product..." />;

  if (!product) return <h2>Product not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ProductDetailedHeader product={product} />
        <ProductDetailedInfo product={product}/>
        <ProductDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ProductDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetails);
