<script setup>
import { ref } from 'vue'
import UserService from '../services/UserService';
import TaskService from '../services/TaskService';
import { message } from 'ant-design-vue';

const options = ref([{
    value: 'jack',
    label: 'Jack',
}, {
    value: 'lucy',
    label: 'Lucy',
}, {
    value: 'tom',
    label: 'Tom',
}]);

const person = ref(null);

const getListUser = async () => {
    const data = await UserService.getList();
    const listUser = [];
    if (data.Success) {

        for (let index = 0; index < data.Data.length; index++) {
            const element = data.Data[index];
            listUser.push({
                value: element.ID,
                label: `${element.code}: ${element.name}`
            });
        }
    }
    debugger
    options.value = listUser;
    person.value = listUser && listUser.length ? listUser[0].value : null;
}

const optionsType = ref([{
    value: 1,
    label: 'Bug',
}, {
    value: 2,
    label: 'PBI',
}]);

const options3 = ref([{
    value: 1,
    label: '1',
}, {
    value: 2,
    label: '2',
}, {
    value: 3,
    label: '3',
}, {
    value: 5,
    label: '5',
}, {
    value: 8,
    label: '8',
}, {
    value: 13,
    label: '13',
}, {
    value: 20,
    label: '20',
}, {
    value: 40,
    label: '40',
}, {
    value: 100,
    label: '100',
}]);

const valueArea = ref("");
const point = ref(1);
const type = ref(1);

const dataSource = ref([]);

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'TaskName',
        dataIndex: 'taskname',
        key: 'taskname',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Point',
        dataIndex: 'point',
        key: 'point',
    },
]

const handleChangeWork = () => {
    if (valueArea.value && valueArea.value.trim().length) {
        const arrayTask = valueArea.value.split("\n");
        const arrayTaskResult = [];
        dataSource.value = [];
        for (let index = 0; index < arrayTask.length; index++) {
            const task = arrayTask[index];
            const detail = splitFirstWord(task);
            arrayTaskResult.push(detail);

            dataSource.value.push({
                id: detail[0],
                taskname: detail[1],
                type: type.value,
                point: point.value,
            });

        }
    } else {
        dataSource.value = [];
    }


    // Xử lý phần hiển thị lên danh sách
};

function splitFirstWord(str) {
    // Trim leading and trailing white spaces
    str = str.trim();

    // Find the index of the first white space
    const firstSpaceIndex = str.indexOf(' ');

    if (firstSpaceIndex !== -1) {
        // Split the string into two parts
        const firstWord = str.substring(0, firstSpaceIndex);
        const restOfString = str.substring(firstSpaceIndex + 1);

        // Return an array with the first word and the rest of the string
        return [firstWord, restOfString];
    }

    // If there's no white space, return an array with the entire string as the first element
    return [str];
}


const handleChange = value => {
    handleChangeWork();
};
const handleChangeType = value => {
    handleChangeWork();
};
const handleChangePoint = value => {
    handleChangeWork();
};

const handleBlur = () => {
    console.log('blur');
};

const handleFocus = () => {
    console.log('focus');
};

const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const addRecord = async () => {

    const params = [];
    if (dataSource && dataSource.value && dataSource.value.length) {
        for (let index = 0; index < dataSource.value.length; index++) {
            const element = dataSource.value[index];
            params.push({
                TaskName: element.taskname,
                TaskID: element.id,
                Point: element.point,
                UserID: person.value,
                TaskType: element.type,
                CompleteDate: new Date().toISOString()
            });
        }
    }

    const data = await TaskService.insertMany(params);

    if (data.Success) {
        message.success('Thêm thành công');
        resetData();
    } else {
        message.success('Đã có lỗi xảy ra');
    }

}

const resetData = () => {
    valueArea.value = "";
    dataSource.value = []
}

const init = () => {
    getListUser();
}
// Chạy khởi tạo
init();
</script>

<template>
    <div>
        <div class="add-work">
            <div class="input-work">
                <label for="">Người làm:</label>
                <br>
                <a-select v-model:value="person" show-search placeholder="Select a person" style="width: 300px"
                    :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                    @change="handleChange"></a-select>
                <br>
                <br>
                <label for="">Point:</label>
                <br>
                <a-select v-model:value="point" style="width: 300px" :options="options3"
                    @change="handleChangePoint"></a-select>
                <br>
                <br>
                <label for="">Type:</label>
                <br>
                <a-select v-model:value="type" style="width: 300px" :options="optionsType"
                    @change="handleChangeType"></a-select>
                <br>
                <br>
                <label for="">Danh sách công việc:</label>
                <br>
                <a-textarea v-model:value="valueArea" style="height: 200px" @change="handleChangeWork" />
            </div>
            <div class="result-preview">
                <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key == 'type'">
                            <span>
                                <a-tag v-if="record.type == 1" color="volcano">
                                    Bug
                                </a-tag>
                                <a-tag v-if="record.type == 2" color="green">
                                    PBI
                                </a-tag>
                            </span>
                        </template>
                    </template>
                </a-table>
                <!-- <table class="table-result">
                <tr>
                    <th>ID</th>
                    <th>TaskName</th>
                    <th>Type</th>
                    <th>Point</th>
                </tr>
                <tr>
                    <td>12321</td>
                    <td>Hôm nay đẹp trời</td>
                    <td>Bug</td>
                    <td>1</td>
                </tr>
            </table> -->
            </div>
        </div>
        <div class="tool">
            <a-button type="primary" @click="addRecord">Thêm</a-button>
        </div>
    </div>
</template>

<style scoped>
table.table-result {
    border-collapse: collapse;
    width: 80%;
}

table.table-result th,
td,
tr {
    border: 1px solid gray;
    padding: 0 30px;
    text-align: center;
}

.add-work {
    display: flex;
}

.add-work>div {
    flex: 1;
    padding: 30px;
}

.tool {
    padding: 30px;
}
</style>
