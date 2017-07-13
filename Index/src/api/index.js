/**
 * Created by admin on 2017/6/9.
 * 用于配置相关请求信息
 */
import axios from "axios"
import store from "@/store"

axios.defaults.headers["Cache-Control"] = "max-age=604800";

axios.interceptors.request.use(
    config=>{
        store.commit("setLoading", true);
        return config;
    },
    error=>{

    }
);
axios.interceptors.response.use(
    response=>{
        store.commit("setLoading", false);
        return response;
    },
    error=>{

    }
);
