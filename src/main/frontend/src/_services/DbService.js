import axios from "axios";

const API = 'http://localhost:8080/';

export const ADD = 'add';
export const DELETE = 'delete';
export const EDIT = 'edit';

export const TABLE_EMPLOYEES = 'employees';
export const TABLE_ITEMS = 'items';

class DbService {
    async getAllByTable(table) {
        return axios.get(API + table)
    }

    async getOneByIdAndTable(id, table) {
        return axios.get(API + table + '/' + id)
    }

    async change(action, table, item) {
        if (action === ADD) {
            return axios.post(`${API}${ADD}/${table}`, item)
        }
        if (action === DELETE) {
            return axios.delete(`${API}${DELETE}/${table}`, {data: item})
        }
        if (action === EDIT) {
            return axios.put(`${API}${EDIT}/${table}`, item)
        }
    }
}

export default new DbService()
