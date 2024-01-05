import axios from "axios"
import config from "../config.json"

export default class Api {
    
    constructor(props) {
        const { controller } = props

        this.axios = axios.create({
            baseURL: `${config.SERVER_URL}/${controller}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken")
            }
        })

        this._logoutIfUnauthorized()
    }
    
    post = async  args => await this.axios.post(args.url? args.url : "", args.data)
    
    get = async (url = "") => await this.axios.get(url)

    put = async args => await this.axios.put(args.url? args.url : "", args.data)

    delete = async (url = "") => await this.axios.delete(url)

    _logoutIfUnauthorized = () => this.axios.interceptors.response.use(undefined, error => {
        if(error.response.status === 401)
        {
            localStorage.removeItem("userToken")
            window.location.replace("/login")
        }
        else
            throw error
    })
}
