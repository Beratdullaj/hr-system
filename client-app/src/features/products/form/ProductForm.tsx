import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createProduct,
    editProduct,
    submitting,
    product: initialFormState,
    loadProduct,
    clearProduct,
  } = rootStore.productStore;

  const [product, setProduct] = useState<IProduct>({
    id: "",
    name: "",
    brand: "",
    description: "",
    category: "",
    price: "",
    photo: "",
  });

  useEffect(() => {
    if (match.params.id && product.id.length === 0) {
      loadProduct(match.params.id).then(
        () => initialFormState && setProduct(initialFormState)
      );
    }
    return () => {
      clearProduct();
    };
  }, [
    loadProduct,
    clearProduct,
    match.params.id,
    initialFormState,
    product.id.length,
  ]);

  const handleSubmit = () => {
    if (product.id.length === 0) {
      let newProduct = {
        ...product,
        id: uuid(),
      };
      createProduct(newProduct).then(() =>
        history.push(`/products/${newProduct.id}`)
      );
    } else {
      editProduct(product).then(() => history.push(`/products/${product.id}`));
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProduct({ ...product, [name]: value });
  };
  

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          value={product.name}
        />
        <Form.Input
          onChange={handleInputChange}
          name="brand"
          placeholder="Brand"
          value={product.brand}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={product.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="category"
          value={product.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="photo"
          placeholder="Photo"
          value={product.photo}
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => history.push("/products")}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
      
    </Segment>
  );
};

export default observer(ProductForm);
