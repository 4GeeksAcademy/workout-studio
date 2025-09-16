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
import Routines from "./components/Routines";
import Membership from "./components/Memberships";

import UserInterface from "./components/UserInterface"
import RoutineCreate from "./components/RoutineCreate";
import AdminPannel from "./components/AdminPannel";
import TrainerDashboard from "./components/TrainerDashboard";
import HomeSection from "./components/HomeSection";
import AboutGyronStudio from "./components/AboutUs";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<HomeSection/>} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />
        <Route path="login" element={<LogInSignUp />} />
        <Route path="/section" element={<ExercisesSection />} />
        <Route path="/routines" element={<Routines/>}/>
        <Route path="/member" element={<Membership />} />
        <Route path="/adminpannel" element={<AdminPannel/>}/>
        <Route path="trainer" element={<TrainerDashboard/>}/>
        <Route path="/user" element={<UserInterface />} />
        <Route path="/createroutine" element={<RoutineCreate/>}/>
        <Route path="/about" element={<AboutGyronStudio/>} />


    </Route>
  )
);