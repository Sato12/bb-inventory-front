export enum EItemState {
  DELIVERED = "DELIVERED",
  IN_STOCK = "IN_STOCK",
}

export enum ERemoteCalls {
  URL = "http://invent-LoadB-XTQrrJuGi1r1-9e74e53c1fd282a9.elb.us-east-1.amazonaws.com:8080",
  PATH_STATE = "/V1/itemState",
  PATH_TYPES = "/V1/itemTypes",
  GET = "GET",
  POST = "POST",
  UPDATE = "PATCH",
}


export enum EView {
    REGISTRY = 'REGISTRY',
    WAREHOUSE = 'WAREHOUSE'
}
