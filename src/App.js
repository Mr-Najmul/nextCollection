import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute/AuthRoute";
import AddProduct from "./component/AddProduct/AddProduct";
import Admin from "./component/Admin/Admin";
import Checkout from "./component/Checkout/Checkout";
import Login from "./component/Login/Login";
import Order from "./component/Order/Order";
import SearchForm from "./component/SearchForm/SearchForm";
import Shop from "./component/Shop/Shop";
import TopNavBar from "./component/TopNavBar/TopNavBar";
import { fireAuth } from "./Firebase/FirebaseAuthentication";

export const UserContext = createContext({});
function App() {
  const [LoggedInUserInfo, setLoggedInUserInfo] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      fireAuth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          setLoggedInUserInfo(userAuth);
          setIsLoggedIn(true);
        } else {
          setLoggedInUserInfo({});
          setIsLoggedIn(false);
        }
        setPageLoading(false);
      });
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={[LoggedInUserInfo, setLoggedInUserInfo, isLoggedIn, setIsLoggedIn]}
    >
      <Router>
        {pageLoading ? (
          <div
            className="d-flex justify-content-center align-items-center bg-dark"
            style={{ height: "100vh" }}
          >
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Switch>
            <Route exact path="/">
              <TopNavBar />
              <SearchForm />
              <Shop />
            </Route>
            <Route path="/home">
              <TopNavBar />
              <SearchForm />
              <Shop />
            </Route>
            <Route path="/login">
              <TopNavBar />
              <Login />
            </Route>
            <AuthRoute path="/checkout/:productId">
              <TopNavBar />
              <Checkout />
            </AuthRoute>
            <AuthRoute path="/orders">
              <TopNavBar />
              <Order />
            </AuthRoute>
            <AuthRoute path="/admin">
              <Admin />
            </AuthRoute>
            <AuthRoute path="/product/add">
              <AddProduct />
            </AuthRoute>
          </Switch>
        )}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
