/**
 * Created by admin on 2017/6/8.
 */
import axios from "axios"

export const getBooks = (params)=>{
    return axios.get("blog/books", {params}).then(res=>res.data)
}
