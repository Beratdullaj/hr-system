import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {  user, logout } = rootStore.userStore;
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Company
        </Menu.Item>
        <Dropdown item text="CRUDS">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Departments"
                as={NavLink}
                to="/departments"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Permissions"
                as={NavLink}
                to="/permissions"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Branches"
                as={NavLink}
                to="/branches"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Teams"
                as={NavLink}
                to="/teams"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Projects"
                as={NavLink}
                to="/projects"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Products"
                as={NavLink}
                to="/products"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Schedules"
                as={NavLink}
                to="/schedules"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="News"
                as={NavLink}
                to="/news"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Holidays"
                as={NavLink}
                to="/holidays"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="FeedBacks"
                as={NavLink}
                to="/feedBacks"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* ============================================== */}

        <Dropdown item text="CRUDS">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Trainings"
                as={NavLink}
                to="/trainings"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Memos"
                as={NavLink}
                to="/memos"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Services"
                as={NavLink}
                to="/services"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Vehicles"
                as={NavLink}
                to="/vehicles"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Contracts"
                as={NavLink}
                to="/contracts"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="Distributions"
                as={NavLink}
                to="/distributions"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="About_Us"
                as={NavLink}
                to="/about_us"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Menu.Item
                style={{ backgroundColor: "grey" }}
                name="StockRequests"
                as={NavLink}
                to="/stockRequests"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* =================================== */}

        <Dropdown item text="Buttons">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createDepartment"
                positive
                content="Create Department"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createPermissions"
                positive
                content="Create Permissions"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createBranches"
                positive
                content="Create Branches"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createTeams"
                positive
                content="Create Teams"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createProjects"
                positive
                content="Create Projects"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createProducts"
                positive
                content="Create Products"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createSchedules"
                positive
                content="Create Schedules"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createNews"
                positive
                content="Create News"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createHolidays"
                positive
                content="Create Holidays"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createFeedBacks"
                positive
                content="Create FeedBacks"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* ================================== */}

        <Dropdown item text="Buttons">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createTrainings"
                positive
                content="Create Trainings"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createMemos"
                positive
                content="Create Memos"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createServices"
                positive
                content="Create Services"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createVehicles"
                positive
                content="Create Vehicles"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createContracts"
                positive
                content="Create Contracts"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createDistributions"
                positive
                content="Create Distributions"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createAbout_Us"
                positive
                content="Create About_Us"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <Button
                as={NavLink}
                to="/createStockRequests"
                positive
                content="Create StockRequests"
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
