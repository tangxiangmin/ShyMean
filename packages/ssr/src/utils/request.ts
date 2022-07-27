import axios, {AxiosRequestConfig} from 'axios'
import {isBrowser, isDev} from "./index"

export interface BaseResponse<T> {
    code: number,
    data: T,
    msg: string
}

function createService(config: AxiosRequestConfig) {
    const service = axios.create(config)

    // function setHeaderAuthorization(config: AxiosRequestConfig) {
    //     const accessToken = 'xxx' // todo 替换token
    //     if (accessToken) {
    //         config.headers!.Authorization = `Bearer ${accessToken}`
    //     }
    // }

    service.interceptors.request.use((config) => {
        // setHeaderAuthorization(config)
        return config
    })

    service.interceptors.response.use((response) => {
        const {data} = response
        const isInValidCode = data.code && data.code !== 200
        if (!isInValidCode) return data

        // todo show Error
        return Promise.reject(new Error(data.msg || 'error'))
    })

    return service
}


// console.log('app create')
export default createService({
    timeout: 10000,
    // 通过nginx转发到server服务,port:3000,  server端服务使用内网域名，减少cdn查询延迟
    // baseURL: isBrowser ? `//${location.hostname}/api/` : `http://localhost:3000/`,
    baseURL: isDev ? `http://localhost:3000/` : (isBrowser ? `//${location.hostname}/api/` : 'http://server:3000')
})
