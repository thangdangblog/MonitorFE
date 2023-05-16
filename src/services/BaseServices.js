import axios from 'axios';

class BaseService {
    controller = "";

    getBaseUrl() {
        return window.__APP.BaseUrl + "/" + this.controller + "/";
    }

    async getList() {
        return (await axios.get(this.getBaseUrl())).data;
    }

    async insertMany(datas) {
        return (await axios.post(this.getBaseUrl() + "many", datas)).data;
    }
}

export default BaseService;
