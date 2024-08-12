import { useEffect, useState } from "react";
import { Product, ProductType } from "../entity/productTypes";
import { EItemState } from "../config/enums";
import { getItemTypes, insertItem } from "../config/RemoteCalls";

const Registration = () => {
  const initialState: Product = {
    serialNumber: "",
    productType: "",
    state: EItemState.IN_STOCK,
    userName: "",
    date: "",
  };

  const initialPrdTypes: ProductType[] = [];

  const [product, setProduct] = useState(initialState);
  const [prdTypes, setPrdTypes] = useState(initialPrdTypes);

  useEffect(() => {
    const fetchData = async () => {
      const validCall = await getItemTypes();
      if (!validCall) return;

      setPrdTypes(validCall);
      return validCall;
    };

    // Call the async function
    fetchData();
  }, []);

  const onInputSerialNumber = (e: any) => {
    const input = e.target;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  const handleOnChange = (e: any) => {
    console.log(e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePrdTypeClick = (e: any) => {
    setProduct({ ...product, productType: e.target.text });
  };

  const gapsValidation = () => {
    if (
      product.date.trim() === "" ||
      product.productType.trim() === "" ||
      product.serialNumber.trim() === "" ||
      product.state.trim() === "" ||
      product.userName.trim() === ""
    ) {
      alert("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resultValidation = gapsValidation();

    if (!resultValidation) return;

    const validResult = await insertItem(product);

    if(!validResult) return;
    alert("Se agregó producto");
    setProduct(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container-xxl cont p-5">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-3">Registro de inventario</h1>
              <div className="col-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  name="userName"
                  onChange={handleOnChange}
                  value={product.userName}
                />
              </div>
              <div className="row mb-3">
                <div className="col-md-5 col-sm-12">
                  <div className="dropdown d-grid">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Productos
                    </button>
                    {prdTypes.length > 0 ? (
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {prdTypes.map((prd, index) => (
                          <li key={index}>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={handlePrdTypeClick}
                            >
                              {prd.productName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handlePrdTypeClick}
                          >
                            Action
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handlePrdTypeClick}
                          >
                            Another action
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handlePrdTypeClick}
                          >
                            Something else here
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-sm-12 col-md-1"></div>
                <div className="col-md-6 col-sm-12">
                  <input
                    type="text"
                    name="serialNumber"
                    onInput={onInputSerialNumber}
                    onChange={handleOnChange}
                    className="form-control"
                    placeholder="Número de serie"
                    value={product.serialNumber}
                  />
                </div>
              </div>
              <div className="col-12 mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={(e: any) => {
                    handleOnChange(e);
                  }}
                  value={product.date}
                />
              </div>

              <div className="d-grid col-12 pb-4">
                <button className="btn btn-primary">Guardar y enviar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Registration;
