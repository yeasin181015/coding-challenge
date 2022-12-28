import { createBrowserRouter } from "react-router-dom";
import CardSection from "../components/card/cardSection";
import ProfileCard from "../components/card/profileCard";
import Main from "../layout/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <CardSection></CardSection>,
      },
    ],
  },
]);

export default router;
