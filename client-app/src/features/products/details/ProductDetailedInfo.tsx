import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

export const ProductDetailedInfo: React.FC<{product: IProduct}> = ({product}) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="building" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{product.brand}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="info" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{product.description}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="usd" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {product.price}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
