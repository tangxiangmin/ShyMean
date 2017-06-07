/**
 * Created by admin on 2017/6/7.
 */
import axios from "axios";

export const getStickArticles = (params)=>{
    return axios.get("blog/stick", { params }).then(res=>res.data)
};

export const getArticles = (params)=>{
    return axios.post("blog/index", params).then(res=>res.data)
};

export const getArticleDetail = (params)=>{
    return axios.post("blog/detail", params).then(res=>res.data)
};

export const getTags = (params)=>{
    return axios.get("blog/tags", {params}).then(res=>res.data)
};

export const getArchives = (params)=>{
    return axios.post("blog/archives", params).then(res=>res.data);
}
