export type RouteConfig = {
    id?: boolean | string,
    method?: 'GET' | 'POST',
    route: string,
    aliases?: string[],
    callback: (...args:any[]) => any
}

export type MessageType = string | any[] | {
    id?: string;
    _id?: string;
    route: string; // what to do at the endpoint
    callbackId: string; // unique id for the request (stored client-side)
    msg: any // data passed
  }

export type ClientObject = {
    id: string,
    routes: Map<string, RouteConfig>
}

export type SettingsObject = {
    id?: string
    appname?: string
    type?: string
    object?: {}
    propnames?: string[]
    settings?: {
        keys?: any[]
    }
}

export type UserObject = {
    id:string, 
    _id:string, //second reference (for mongodb parity)
    username:string,
    origin:string,
    socket?: WebSocket, 
    props: {},
    updatedPropNames: string[],
    sessions:string[],
    blocked:string[], //blocked user ids for access controls
    lastUpdate:number,
    lastTransmit:number,
    latency:number,
  }