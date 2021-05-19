import {useEffect, useState} from "react";
import DbService, {TABLE_EMPLOYEES} from "../_services/DbService";

export default function Items(props) {
    const columns = []

    const [employee, setEmployee] = useState({})

    const loadData = () => {
        DbService.getOneByIdAndTable(props.id, TABLE_EMPLOYEES)
            .then(response => {
                setEmployee(response.data);
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <h2 className={'text-center mt-5'}>{employee.name}</h2>
        </>
    )
}