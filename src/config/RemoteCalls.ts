import { Product } from "../entity/productTypes";
import { EItemState, ERemoteCalls } from "./enums";

export async function insertItem(product: Product) {
  const url = `${ERemoteCalls.URL}${ERemoteCalls.PATH_STATE}`;
  const headers = new Headers();
  headers.append("Connection", "keep-alive");
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify(product);

  const request = new Request(url, {
    body,
    headers,
    method: ERemoteCalls.POST,
  });

  try {
    const remoteCall = await fetch(request);
    const result = await remoteCall.json();
    console.log(result);
    if (remoteCall.status !== 200) throw result || remoteCall;
    return true;
  } catch (error) {
    console.log(error);
    alert("Hubo un error. Intentelo más tarde");
    return false;
  }
}


export async function getItemTypes() {
    const url = `${ERemoteCalls.URL}${ERemoteCalls.PATH_TYPES}`;
    const headers = new Headers();
    headers.append("Connection", "keep-alive");
    headers.append("Content-Type", "application/json");
  
  
    const request = new Request(url, {
      headers,
      method: ERemoteCalls.GET,
    });
  
    try {
      const remoteCall = await fetch(request);
      const result = await remoteCall.json();
      console.log(result);
      if (remoteCall.status !== 200) throw result || remoteCall;
      return result.data;
    } catch (error) {
      console.log(error);
      alert("Hubo un error al traer tipos de producto. Intentelo más tarde");
      return false;
    }
  }

  export async function getItems(serialNumber: string) {
    const url = `${ERemoteCalls.URL}${ERemoteCalls.PATH_STATE}?serialNumber=${serialNumber}`;
    const headers = new Headers();
    headers.append("Connection", "keep-alive");
    headers.append("Content-Type", "application/json");
  
  
    const request = new Request(url, {
      headers,
      method: ERemoteCalls.GET,
    });
  
    try {
      const remoteCall = await fetch(request);
      const result = await remoteCall.json();
      console.log(result);
      if (remoteCall.status !== 200) throw result || remoteCall;
      return result.data;
    } catch (error) {
      console.log(error);
      alert("Hubo un error al traer el producto. Intentelo más tarde");
      return false;
    }
  }

  export async function deliverItem(serialNumber: string) {
    const url = `${ERemoteCalls.URL}${ERemoteCalls.PATH_STATE}`;
  const headers = new Headers();
  headers.append("Connection", "keep-alive");
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({serialNumber, state: EItemState.DELIVERED});

  const request = new Request(url, {
    body,
    headers,
    method: ERemoteCalls.UPDATE,
  });

  try {
    const remoteCall = await fetch(request);
    const result = await remoteCall.json();
    console.log(result);
    if (remoteCall.status !== 200) throw result || remoteCall;
    return result.data;
  } catch (error) {
    console.log(error);
    alert("Hubo un error. Intentelo más tarde");
    return false;
  }
  }
