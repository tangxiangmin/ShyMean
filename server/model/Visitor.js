/**
 * Created by admin on 2017/7/15.
 */
let Model = require("../core/Model");
let axios = require("axios");

let Visitor = new Model("shymean_visitor");
Object.assign(Visitor, {
    saveVisitRecord(ip, referrer = ""){
        return this.getIpLocation(ip).then(res=>{
            let { country="", province="", city="", district="" } = res;
            return this.insert({
                ip,
                referrer,
                country,
                province,
                city,
                district,
                created_at: Date.now()/1000
            })
        })
        // this.insert({
        //     ip,
        //     referrer,
        //     created_at: Date.now()/1000
        // });
    },
    getIpLocation(ip){
        let url = `http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=${ip}`;
        return axios.get(url).then(res=>{
            return res.data;
        });
    }
});

module.exports = Visitor;