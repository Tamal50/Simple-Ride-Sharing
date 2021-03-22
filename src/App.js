import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loginRoute, signupRoute, dashboard, rideId, searchResultRoute, destinationRoute } from "./routes/endpoints";


// Components
import Header from "./components/Header";

// PAGES Component
import Loading from "./pages/Loading";
import PrivateRoute from "./routes/PrivateRoute";
import { initFirebase } from "./firebase";
import NoAuthRoute from "./routes/NoAuthRoute";

import  Dashboard from "./pages/Dashboard";
import  RideSingle from "./pages/RideSingle";
import  Login from "./pages/Login";
import  Signup from "./pages/Signup";
import  SearchResult from "./pages/SearchResult";
import  Destination from "./pages/Destination";

import NotFound from "./pages/NotFound";

const backgroundStyle = {
  background: 'url("https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80") no-repeat',
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "40rem"
}

// style = { currentUser?.name? backgroundStyle: {} }
function App() {

  initFirebase();
  // const { currentUser } = useAuth();

  return (
    <div style={backgroundStyle}>
      <AuthProvider>
        <Router>
          <Header />
            <Switch>
              {/* {currentUser?.email && <Header />} */}
              <Route exact path={dashboard}>
                <Dashboard />
              </Route>


              <PrivateRoute exact path={destinationRoute}>
              <RideSingle />
              </PrivateRoute>

              <PrivateRoute exact path={rideId}>
              <Destination />
              </PrivateRoute>
              <Route exact path={searchResultRoute}>
                <SearchResult />
              </Route>
              <NoAuthRoute exact path={loginRoute}  > <Login />  </NoAuthRoute>
              <NoAuthRoute exact path={signupRoute}> <Signup /> </NoAuthRoute>
              <NoAuthRoute exact path="*" > <NotFound />  </NoAuthRoute>
            </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
