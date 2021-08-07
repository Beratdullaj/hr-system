import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const productImageStyle = {
  filter: 'brightness(30%)'
};


 const ProductDetailedHeader: React.FC<{product: IProduct}> = ({product}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/categoryImages/${product!.photo}.jpg`} fluid style={productImageStyle}/>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={product.name}
                  style={{ color: "aqua" }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Buy</Button>
        <Button>Go Back</Button>
        <Button color="orange" floated="right"  as={Link} to ={`/managee/${product.id}`}>
          Edit
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProductDetailedHeader);
