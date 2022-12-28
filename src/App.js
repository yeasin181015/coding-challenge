import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/routes";
function App() {
  return (
    <div>
      <div className="flex justify-center mt-12">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
