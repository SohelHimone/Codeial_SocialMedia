
import {BrowserRouter as  Router,Routes, Route, Navigate } from 'react-router-dom';

import Home from "../pages/Home";
import Navbar from "./Navbar";
import { Login,Settings,UserProfile } from "../pages";
import SignUp from "../pages/SignUp";
import { useAuth } from '../hooks';


//here chidren contains conmponent and ...rest contain all props as well as exact ,path because they to are props
  // function PrivateRoute({ children, ...rest }) {
  //   const auth = useAuth();
  
  //   return (
  //     <Route
  //       {...rest}
  //       render={() => {
  //         if (auth.user) {
  //           return children;
  //         } else {
  //           return <Navigate to="/login" />;
  //         }
  //       }}
  //     />
  //   );
  // }


  function PrivateRoute({children}){

    const auth = useAuth();
  
    if(auth.user){
      return children;
    }
    return <Navigate to="/login" />
  }

  

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
       <Routes>
       <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/setting" element={<Settings />} /> */}
        <Route exact path="/setting" element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>}></Route>

            <Route exact path="/user/:userId" element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>}></Route>
        <Route exact path="/register" element={<SignUp/>} />
        <Route exact path="/login" element={<Login />} />
        <Route path="" element={<Page404/>}/>
        {/* <Route exact path="/user/:userid" element={<UserProfile />} /> */}
          
       </Routes>
      </Router>
  
    </div>
  );
}

export default App;






