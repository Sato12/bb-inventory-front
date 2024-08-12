import { useEffect, useState } from "react";
import { Product } from "../entity/productTypes";
import { EItemState } from "../config/enums";
import { deliverItem, getItems } from "../config/RemoteCalls";

const Warehouse = () => {
  const initialState: Product = {
    serialNumber: "",
    productType: "",
    state: EItemState.IN_STOCK,
    userName: "",
    date: "",
  };

  const [product, setProduct] = useState(initialState);
  const [consultNumber, setConsultNumber] = useState("");

  useEffect(() => {}, []);

  const onInputSerialNumber = (e: any) => {
    const input = e.target;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  const handleOnChange = (e: any) => {
    console.log(e.target.value);
    setConsultNumber(e.target.value);
  };

  const handleDeliver = async () => {
    const validResult = await deliverItem(consultNumber);

    if (!validResult) return;
    alert("Consulta existosa");
    setProduct(validResult);
  };

  const gapsValidation = () => {
    if (consultNumber.trim() === "") {
      alert("Todos los campos son obligatorios");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resultValidation = gapsValidation();

    if (!resultValidation) return;

    const validResult = await getItems(consultNumber);

    if (!validResult) return;
    alert("Consulta existosa");
    setProduct(validResult);
  };

  return (
    <div>
      <div className="container-xxl cont p-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-5">Entregar Inventario</h1>
            {product.serialNumber ? (
              <>
                <div className="container statecard">
                  <div className="row">
                    <div className="col-12 pt-2 fw-bold">
                      <span>{product.productType}</span>
                    </div>
                    {product.state === EItemState.IN_STOCK ? (
                      <>
                        <div className="col-12 py-1">
                          {product.serialNumber}
                        </div>
                        <button
                          className="col-12 btn btn-primary fr"
                          onClick={handleDeliver}
                        >
                          Entregar
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="col-12 py-1">
                          {product.serialNumber}
                        </div>
                        <button className="col-12 btn btn-entregado">
                          Entregado
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-12 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Inserte número"
                    name="userName"
                    onInput={onInputSerialNumber}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="d-grid col-12 pb-4">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Consultar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
