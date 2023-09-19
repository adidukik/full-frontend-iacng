import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { BrowserRouter } from "react-router-dom";
import { PagesRouter } from "./routes/PagesRouter.tsx";

function App() {
  return (
    <BrowserRouter>
      <PagesRouter />
    </BrowserRouter>
  );
}

export default App;
