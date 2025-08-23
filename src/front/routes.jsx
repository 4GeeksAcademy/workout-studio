import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
<<<<<<< HEAD
import LogInSignUp from "./components/LogInSignUp";

=======
import LogIn from "./components/LogIn";
import SignUp from "./components/Signup";
import Test from "./components/Test";
import Test2 from "./components/Test2";
import ExercisesSection from "./components/ExercisesSection";
>>>>>>> 21b8c9c4ee06baaf17c6397e8c8c20c210318a8d

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
<<<<<<< HEAD
<<<<<<< HEAD
        <Route index element={<Home />} />
        <Route path="single/:theId" element={<Single />} />
        <Route path="demo" element={<Demo />} />
<<<<<<< HEAD
        <Route path="login" element={<LogInSignUp />} />
=======
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="test" element={<Test />} />
        <Route path="test2" element={<Test2 />} />
=======

=======
        
>>>>>>> f708852ae44022f35abf0c64372ebad71409c187
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/section" element={<ExercisesSection />} />
<<<<<<< HEAD
>>>>>>> 4063261 (:sparkles: Card implementation)
>>>>>>> 21b8c9c4ee06baaf17c6397e8c8c20c210318a8d
=======

>>>>>>> f708852ae44022f35abf0c64372ebad71409c187
      </Route>
    )
);