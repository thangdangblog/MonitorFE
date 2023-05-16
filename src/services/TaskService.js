import BaseService from "./BaseServices";
import axios from 'axios';

class TaskSV extends BaseService {
    controller = "task"


    /**
     * Lấy thông tin những người được cao nhất
     * @returns 
     */
    async getTopList(datas) {
        return (await axios.post(this.getBaseUrl() + "top", datas)).data;
    }
}

const TaskService = new TaskSV();

export default TaskService;
