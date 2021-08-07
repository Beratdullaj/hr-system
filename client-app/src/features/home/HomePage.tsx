import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { LoginForm } from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

export const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const {openModal} = rootStore.modalStore
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Company X
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header as="h2" inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to="/products" size="huge" inverted>
              Go to products
            </Button>
          </Fragment>
        ): (
          <Fragment>
            <Header as="h2" inverted content={'Welcome to Company'} />
            <Button onClick={() => openModal(<LoginForm/>)} size="huge" inverted>
              Login!
            </Button>
            <Button onClick={() => openModal(<RegisterForm/>)}size="huge" inverted>
              Register!
            </Button>
          </Fragment>
        )}
      </Container>

      <Container style={{ marginTop: "7em" }}>
        <h1>Home page</h1>
        <h3>
          Go to <Link to="/departments">Departments</Link>
        </h3>
        <h3>
          Go to <Link to="/products">Products</Link>
        </h3>
        <h3>
          Go to <Link to="/permissions">Permissions</Link>
        </h3>
        <h3>
          Go to <Link to="/teams">Teams</Link>
        </h3>
        <h3>
          Go to <Link to="/branches">Branches</Link>
        </h3>
        <h3>
          Go to <Link to="/contracts">Contracts</Link>
        </h3>
      </Container>
    </Segment>
  );
};

export default HomePage;
