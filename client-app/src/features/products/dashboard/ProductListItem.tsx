import React from "react";
import { Item, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { IProduct } from "../../../app/models/product";

export const ProductListItem: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteProduct, submitting, target } = rootStore.productStore;
  return (
    <Segment.Group>
      <Segment
        style={{
          height: "230px",
        }}
      >
        <Item>
          <Item.Content>
            <Item.Image
              size="medium"
              src={`/assets/categoryImages/${product!.photo}.jpg`}
              wrapped
              ui={false}
              rounded
            />
          </Item.Content>
        </Item>
      </Segment>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as="a">{product.name}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment style={{ height: "70px" }}>
        <Item.Extra>
          <Button
            as={Link}
            to={`/products/${product.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          <Button
            name={product.id}
            loading={target === product.id && submitting}
            onClick={(e) => deleteProduct(e, product.id)}
            floated="right"
            content="Delete"
            color="red"
          />
        </Item.Extra>
      </Segment>

      {/* <Segment>
        <Item.Image size="tiny" circular src="/assets/user.png" />
        <Item.Description>Uploaded by Agent</Item.Description>
      </Segment> */}
    </Segment.Group>
  );
};




