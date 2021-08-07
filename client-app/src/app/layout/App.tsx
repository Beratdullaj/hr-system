import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import DepartmentDashboard from "../../features/departments/dashboard/DepartmentDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import DepartmentForm from "../../features/departments/form/DepartmentForm";
import DepartmentDetails from "../../features/departments/details/DepartmentDetails";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductDetails from "../../features/products/details/ProductDetails";
import ProductForm from "../../features/products/form/ProductForm";
import PermissionDashboard from "../../features/permissions/dashboard/PermissionDashboard";
import PermissionDetails from "../../features/permissions/details/PermissionDetails";
import PermissionForm from "../../features/permissions/form/PermissionForm";
import TeamDashboard from "../../features/teams/dashboard/TeamDashboard";
import TeamDetails from "../../features/teams/details/TeamDetails";
import TeamForm from "../../features/teams/form/TeamForm";
import BranchDashboard from "../../features/branches/dashboard/BranchDashboard";
import BranchDetails from "../../features/branches/details/BranchDetails";
import BranchForm from "../../features/branches/form/BranchForm";
import ContractDashboard from "../../features/contracts/dashboard/ContractDashboard";
import ContractDetails from "../../features/contracts/details/ContractDetails";
import ContractForm from "../../features/contracts/form/ContractForm";
import ServiceDashboard from "../../features/services/dashboard/ServiceDashboard";
import ServiceDetails from "../../features/services/details/ServiceDetails";
import ServiceForm from "../../features/services/form/ServiceForm";
import VehicleDashboard from "../../features/vehicles/dashboard/VehicleDashboard";
import VehicleDetails from "../../features/vehicles/details/VehicleDetails";
import VehicleForm from "../../features/vehicles/form/VehicleForm";
import AboutUsDashboard from "../../features/about_us/dashboard/AboutUsDashboard";
import AboutUsDetails from "../../features/about_us/details/AboutUsDetails";
import AboutUsForm from "../../features/about_us/form/AboutUsForm";
import MemoDashboard from "../../features/memos/dashboard/MemoDashboard";
import MemoDetails from "../../features/memos/details/MemoDetails";
import MemoForm from "../../features/memos/form/MemoForm";
import FeedbackDashboard from "../../features/feedbacks/dashboard/FeedbackDashboard";
import FeedbackDetails from "../../features/feedbacks/details/FeedbackDetails";
import FeedbackForm from "../../features/feedbacks/form/FeedbackForm";
import TrainingDashboard from "../../features/trainings/dashboard/TrainingDashboard";
import TrainingDetails from "../../features//trainings/details/TrainingDetails";
import TrainingForm from "../../features//trainings/form/TrainingForm";
import HolidayDashboard from "../../features/holidays/dashboard/HolidayDashboard";
import HolidayDetails from "../../features/holidays/details/HolidayDetails";
import HolidayForm from "../../features/holidays/form/HolidayForm";
import ScheduleDashboard from "../../features/schedules/dashboard/ScheduleDashboard";
import ScheduleDetails from "../../features/schedules/details/ScheduleDetails";
import ScheduleForm from "../../features/schedules/form/ScheduleForm";
import NewDashboard from "../../features/news/dashboard/NewDashboard";
import NewDetails from "../../features/news/details/NewDetails";
import NewForm from "../../features/news/form/NewForm";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { LoginForm } from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";


const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if(token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded()
    }
  }, [getUser, setAppLoaded, token])

  if(!appLoaded) return <LoadingComponent content='Loading app'/>


  return (
    <Fragment>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <ToastContainer position='bottom-right'/>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                {/* Login Form */}
              <Route
                  exact
                  path="/login"
                  component={LoginForm}
                />
                {/* =============== */}
                <Route
                  exact
                  path="/departments"
                  component={DepartmentDashboard}
                />
                <Route path="/departments/:id" component={DepartmentDetails} />
                <Route
                  key={location.key}
                  path={["/createDepartment", "/manage/:id"]}
                  component={DepartmentForm}
                />

                {/* =============== */}

                <Route exact path="/products" component={ProductDashboard} />

                <Route path="/products/:id" component={ProductDetails} />

                <Route
                  // key={location.key}
                  path={["/createProducts", "/managee/:id"]}
                  component={ProductForm}
                />

                {/* =============== */}

                <Route
                  exact
                  path="/permissions"
                  component={PermissionDashboard}
                />

                <Route path="/permissions/:id" component={PermissionDetails} />

                <Route
                  // key={location.key}
                  path={["/createPermissions", "/manages/:id"]}
                  component={PermissionForm}
                />

                {/*====================*/}

                <Route exact path="/teams" component={TeamDashboard} />
                <Route path="/teams/:id" component={TeamDetails} />
                <Route
                  //key={location.key}
                  path={["/createTeams", "/team-manager/:id"]}
                  component={TeamForm}
                />

                {/*====================*/}

                <Route exact path="/branches" component={BranchDashboard} />
                <Route path="/branches/:id" component={BranchDetails} />
                <Route
                  //key={location.key}
                  path={["/createBranches", "/branch-manager/:id"]}
                  component={BranchForm}
                />

                {/*====================*/}

                <Route exact path="/contracts" component={ContractDashboard} />
                <Route path="/contracts/:id" component={ContractDetails} />
                <Route
                  //key={location.key}
                  path={["/createContracts", "/contract-manager/:id"]}
                  component={ContractForm}
                />

                {/* NOT FOUND ROUTE */}
                <Route component={NotFound} />

                <Route exact path="/services" component={ServiceDashboard}/>
               <Route path="/services/:id" component={ServiceDetails} />

              <Route
                // key={location.key}
                path={["/createServices", "/service-manager/:id"]}
                component={ServiceForm}
              />

              {/* =============== */}

              <Route exact path="/vehicles" component={VehicleDashboard}/>
              <Route path="/vehicles/:id" component={VehicleDetails} />
              <Route
                // key={location.key}
                path={["/createVehicle", "/vehicle-manager/:id"]}
                component={VehicleForm}
              />

              {/* =============== */}

              <Route exact path="/about_us" component={AboutUsDashboard}/>
              <Route path="/about_us/:id" component={AboutUsDetails} />
              <Route
                // key={location.key}
                path={["/createAboutUs", "/manage-about_us/:id"]}
                component={AboutUsForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/memos"
                component={MemoDashboard}
              />

              <Route path="/memos/:id" component={MemoDetails} />

              <Route
                // key={location.key}
                path={["/createMemos", "/memo-manager/:id"]}
                component={MemoForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/feedbacks"
                component={FeedbackDashboard}
              />

              <Route path="/feedbacks/:id" component={FeedbackDetails} />

              <Route
                // key={location.key}
                path={["/createFeedbacks", "/feedback-manager/:id"]}
                component={FeedbackForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/trainings"
                component={TrainingDashboard}
              />

              <Route path="/trainings/:id" component={TrainingDetails} />

              <Route
                // key={location.key}
                path={["/createTrainings", "/training-manager/:id"]}
                component={TrainingForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/holidays"
                component={HolidayDashboard}
              />

              <Route path="/holidays/:id" component={HolidayDetails} />

              <Route
                // key={location.key}
                path={["/createHolidays", "/holiday-manager/:id"]}
                component={HolidayForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/schedules"
                component={ScheduleDashboard}
              />

              <Route path="/schedules/:id" component={ScheduleDetails} />

              <Route
                // key={location.key}
                path={["/createSchedules", "/schedule-manager/:id"]}
                component={ScheduleForm}
              />

              {/* =============== */}

              <Route
                exact
                path="/news"
                component={NewDashboard}
              />

              <Route path="/news/:id" component={NewDetails} />

              <Route
                // key={location.key}
                path={["/createNews", "/newdetail-manager/:id"]}
                component={NewForm}
              />
                
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
