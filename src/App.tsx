import { useState } from "react";
import "./App.css";
import Registration from "./components/Registration";
import Warehouse from "./components/Warehouse";
import { EView } from "./config/enums";

function App() {
  const [view, setView] = useState("");

  const handleView = (e: any) => {
    const value = e.target.id;
    console.log(e.target);

    if (value === "REV") {
      setView(EView.WAREHOUSE);
    } else {
      setView(EView.REGISTRY);
    }
  };

  return (
    <>
      {!view ? (
        <>
          <h1>¿Qué accion deseas llevar a cabo?</h1>
          <div className="d-grid gap-2 col-6 mx-auto my-5">
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleView}
            >
              <h2 id='REG'>Registrar Productos</h2>
            </button>
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleView}
            >
              <h2 id='REV'>Revisar inventario actual</h2>
            </button>
          </div>
        </>
      ) : view === EView.WAREHOUSE ? (
        <Warehouse></Warehouse>
      ) : (
        <Registration></Registration>
      )}
    </>
  );
}

export default App;
