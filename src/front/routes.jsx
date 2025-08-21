import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import LogIn from "./components/LogIn";
import SignUp from "./components/Signup";
import Test from "./components/Test";
import Test2 from "./components/Test2";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route index element={<Home />} />
        <Route path="single/:theId" element={<Single />} />
        <Route path="demo" element={<Demo />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="test" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
      </Route>
    )
);