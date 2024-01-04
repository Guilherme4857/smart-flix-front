import axios from "axios"
import config from "../config.json"

export default class Api {
    
    constructor(props) {
        const { controller } = props

        this.axios = axios.create({
            baseURL: `${config.SERVER_URL}/${controller}`
        })
    }
    
    post = async  args => await this.axios.post(args.url? args.url : "", args.data)
    
    get = async (url = "") => await this.axios.get(url)

    put = async args => await this.axios.put(args.url? args.url : "", args.data)

    delete = async (url = "") => await this.axios.delete(url)
}
