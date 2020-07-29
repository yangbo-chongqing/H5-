import Axios from "axios";
import QS from "qs";
const withCredentials = true;
// const baseURL = "http://www.mlxc365.com";
// const baseURL = "http://124.70.130.183:8081/grid"
const baseURL = "http://119.3.196.255:7604"; //云阳正式服务器
// const baseURL = "http://119.3.196.255:8096";
// const baseURL = "http://192.168.168.118:8090"; //黄魏阳本地地址

const request = (instance) => {
    instance.interceptors.response.use(msg => {
        if (~~msg.status === 200) {
            msg = msg.data;
        }
        return msg
    })
};

const handleArea = (currentObject) => {
    const area = currentObject.$store.state.area;
    const length = area.length;
    switch (length) {
        case 1: //省级账号
            return { province: area[0] };
        case 2: //市级账号
            return { province: area[0], city: area[1] };
        case 3: //区/县级账号
            return { province: area[0], city: area[1], district: area[2] };
        case 4: //街道/镇级账号
            return {
                province: area[0],
                city: area[1],
                district: area[2],
                street: area[3]
            };
        case 5: //社区/村级账号
            return {
                province: area[0],
                city: area[1],
                district: area[2],
                street: area[3],
                community: area[4]
            };
        default: //默认区域
            return { province: 28 };
    }
}

//get方法
export const get = ({ url, data, currentObject = null }) => {
    const instance = new Axios.create({
        withCredentials,
        // timeout,
        baseURL,
        method: "GET",
    });

    request(instance);
    if (currentObject !== null) {
        let userArea = handleArea(currentObject);
        data = {...data, ...userArea };
    }

    return instance({ url, params: data });
};

//post方法
export const post = ({ url, data, currentObject = null }) => {
    const instance = new Axios.create({
        method: "POST",
        withCredentials,
        //  timeout,
        baseURL,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
                // "Content-type": "application/json"
        }
    });

    request(instance);
    if (currentObject !== null) {
        let userArea = handleArea(currentObject);
        data = {...data, ...userArea };
    }
    return instance({ url, data: QS.stringify(data) });
};

//上传图片
export const upImg = ({ url, data }) => {
    const instance = new Axios.create({
        method: "POST",
        withCredentials,
        //timeout,
        baseURL,
        headers: {
            "Content-type": "multipart/form-data"
        }
    });
    request(instance);
    return instance({ url, data });
}