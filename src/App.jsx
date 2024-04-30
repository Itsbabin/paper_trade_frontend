import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";
import Singin from "./pages/auth/Singin";
import Login from "./pages/auth/Login";
import Layout from "./Layout";
import Profile from "./pages/auth/Profile";
import { useEffect } from "react";
import Cookies from "js-cookie";
import AxiosRequest from "./utils/axiosRequest";
import { backendUrl } from "./const";
import { useDispatch } from "react-redux";
import { login } from "./reducers/userReducer";
import Markets from "./pages/Markets";
  
function App() {  
  
  let dispatch = useDispatch();
  useEffect(() => {
    async function runOne() {
      if (Cookies.get("jwt") !== undefined) {
        let response = await AxiosRequest(
          "get",
          `${backendUrl}/user/profile`,
          {},
          {
            token: Cookies.get("jwt"),
          }
        );
        response.status && dispatch(login(response.data.user));
      }
    }
    
    runOne();
  }, []);
  return (
    <>
     <Navbar/>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="singin" element={<Singin />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="markets" element={<Markets />} />
            <Route path="about" element={<About />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
    </>
  );
}

export default App;
