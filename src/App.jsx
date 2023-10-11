import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import AddBlog from "./components/addBlog";
import ViewBlogs from "./components/viewBlogs";
import EditBlog from "./components/editBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="viewBlog" element={<ViewBlogs />} />
          <Route path="editBlog" element={<EditBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
