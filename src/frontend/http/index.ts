import { RouteConfig} from "@brainsatplay/liveserver-common/general.types";
import { safeStringify } from "@brainsatplay/liveserver-common/parse.utils";
import { randomId } from "@brainsatplay/liveserver-common";

function createURL (path:string, remote:string|URL) {
    let baseUrl = (remote instanceof URL) ? remote : new URL(remote)
    console.log('baseUrl.pathname',baseUrl.pathname)
    console.log('baseUrl',path)
    path = (baseUrl.pathname === '/') ? path : baseUrl.pathname + path
    let href = (new URL(path, baseUrl.href)).href
    return href
}

class HTTPClient {

    routes: Map<string, RouteConfig> = new Map()
    remote?: URL
    id: string = randomId()

    constructor() {

    }

    setRemote = (base:string, path:string) => {
        this.remote = (path) ? new URL(path, base) : new URL(base)
        // return this.join()
    }


    // Create a Custom Route Scoped to Your ID
    addRoute = async (config: RouteConfig) => {        
        if (this.remote){

            config.id = this.id
            this.routes.set(config.route, config)

            return await fetch(createURL('/addRoute', this.remote), {
                method: 'POST', 
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: safeStringify({id: this.id, message: config})
            })
        } else return false
    }

    send = async (route:string, ...args:any[]) => {

        if (route === '/addRoute') return await this.addRoute(args[0])
        else if (this.remote){
            return await fetch(createURL(route, this.remote), {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                },
                body: safeStringify({id: this.id, message: args})
            }).then(async (res) => {
                const json = await res.json()
                if (!res.ok) return json.message
                else return json.message
            }).catch((err) => {
                return err.message
            })
        } else return false
    }
    
}


let http = new HTTPClient()

// Export Instantiated Session
export {http, HTTPClient}
export default http