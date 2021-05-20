import {useEffect, useState} from "react";
import DbService, {TABLE_EMPLOYEES} from "../_services/DbService";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function Items(props) {
    const columns = [
        {
            name: '№',
            selector: 'count',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
        },
        {
            right: true,
            cell: (row) => (
                <Button variant={'danger'} onClick={() => {
                    // deleteItem(row.id)
                }}>DELETE</Button>
            )
        }
    ]

    const paginationOptions = {
        rowsPerPageText: 'Rows per page',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All'
    }

    const [employee, setEmployee] = useState({})
    const [data, setData] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)

    const loadData = () => {
        DbService.getOneByIdAndTable(props.id, TABLE_EMPLOYEES)
            .then(response => {
                setEmployee(response.data);
                let count = 1
                let price = 0
                setData(response.data.items.map(i => {
                    price += i.price
                    return {
                        count: count++,
                        name: i.name,
                        price: i.price,
                    }
                }));
                setTotalPrice(price)
            })
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <h2 className={'text-center mt-5'}>{employee.name}</h2>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />
            <h3 className={'text-center mt-4'}>Total price: {totalPrice}</h3>
        </>
    )
}