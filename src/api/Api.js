import axios from "axios"

export default class Api {
    
    isInternalError = false
    
    constructor(props) {
        const { controller } = props

        this.axios = axios.create({
            baseURL: `${process.env.REACT_APP_SERVER_URL}/${controller}`,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("userToken")
            }
        })

        this._logoutIfUnauthorized()
        this._internalError()
    }
    
    post = async  args => await this.axios.post(args.url? args.url : "", args.data)
    
    get = async (url = "") => await this.axios.get(url)

    put = async args => await this.axios.put(args.url? args.url : "", args.data)

    delete = async (url = "") => await this.axios.delete(url)

    _logoutIfUnauthorized = () => this.axios.interceptors.response.use(undefined, error => {
        if(error.response.status === 401)
        {
            localStorage.removeItem("userToken")
            
            if(window.location.pathname !== "/login")
                window.location.replace("/login")
        }
        
        throw error
    })

    _internalError = () => this.axios.interceptors.response.use(undefined, error => {
        const status = error.response?.status

        this.isInternalError = status === undefined || (status !== 401 && status >= 400 && status <= 599)

        throw error
    })
}
