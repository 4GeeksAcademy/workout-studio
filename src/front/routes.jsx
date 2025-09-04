import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import LogInSignUp from "./components/LogInSignUp";
import ExercisesSection from "./components/ExercisesSection";
<<<<<<< HEAD
import Routines from "./components/Routines";
=======
import Membership from "./components/Memberships";
>>>>>>> 2e66cc9724fcdb42201587222dd0f26a80c8645b


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

<<<<<<< HEAD
        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="login" element={<LogInSignUp />} />
        <Route path="/section" element={<ExercisesSection />} />
        <Route path="/routines" element={<Routines/>}/>
=======
      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="login" element={<LogInSignUp />} />
      <Route path="/section" element={<ExercisesSection />} />
      <Route path="/member" element={<Membership />} />
>>>>>>> 2e66cc9724fcdb42201587222dd0f26a80c8645b




    </Route>
  )
);