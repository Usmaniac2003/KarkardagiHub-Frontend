import { Navigate, Route } from "react-router-dom";
import Login from "./pages/General/Login";
import  {Routes} from "react-router-dom";
import Page404 from "./pages/General/Page404";
import Home from "./pages/General/Home";
import Signup from "./pages/General/Signup";
import ManagerPanel from "./pages/Manager/ManagerPanel";
import AdminPanel from "./pages/Admin/AdminPanel";
import StaffPanel from "./pages/Staff/StaffPanel";
import NoPanel from "./pages/General/NoPanel";
import { useAuth } from "./context/Auth";

const ProtectedRoute = ({ element, condition }) => {
  return condition ? element : <Page404/>;
};
export default function App() {
  const {user}=useAuth();
  return (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/adminpanel" element={<ProtectedRoute element={<AdminPanel />} condition={user?.role==="admin"}></ProtectedRoute>} />
    <Route exact path="/managerpanel" element={<ProtectedRoute element={<ManagerPanel />} condition={user?.role==="manager"}></ProtectedRoute>} />
    <Route exact path="/staffpanel" element={<ProtectedRoute element={<StaffPanel />} condition={user?.role==="staff"}></ProtectedRoute>} /> 
    <Route exact path="/nopanel" element={<ProtectedRoute element={<NoPanel />} condition={user?.role==="user"}></ProtectedRoute>} />
    <Route path="/register" element={<Signup></Signup>} />
    <Route path="/home"  element={<Home></Home>} />
    <Route path="*" element={<Page404 />} />
  </Routes>
  );
}

