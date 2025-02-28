import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); 

  return (
    <Router>
      <div className="Page">
        <Routes>         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <h1>Blog</h1>
                  <BlogForm />
                  <BlogList />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
