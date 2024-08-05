import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import Feed from "./views/Feed";
import UserProfile from "./views/UserProfile";
import NavBar from "./components/NavBar";
import { setClientId } from "./store/clientSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClientId("mC3fORUFX8WFpE5wnaZ35qZUw4PXMWdzzzRmZCDO8lQ"));
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Feed />} />
        <Route path='/user/:username' element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
