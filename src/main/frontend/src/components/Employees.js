import DataTable from "react-data-table-component";
import {Button} from "react-bootstrap";
import DbService, {DELETE, TABLE_EMPLOYEES} from "../_services/DbService";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Employees() {
    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true,
        },
        {
            name: 'Total price',
            selector: 'price',
            sortable: true,
        },
        {
            right: true,
            cell: (row) => (
                <>
                    <Link to={`/employee/${row.id}`}>
                        <Button variant={'info'} className={'mr-2'}>DETAILS</Button>
                    </Link>
                    <Button variant={'danger'} onClick={() => {
                        deleteItem(row.id)
                    }}>DELETE</Button>
                </>
            )

        }
    ]

    const paginationOptions = {
        rowsPerPageText: 'Rows per page',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All'
    }

    async function deleteItem(id) {
        DbService.change(DELETE, TABLE_EMPLOYEES, id)
            .then(_ => loadData())
            .catch(e => console.log(e))
    }

    const [data, setData] = useState([]);

    const loadData = () => {
        DbService.getAllByTable(TABLE_EMPLOYEES).then(response => {
            setData((response.data).reverse().map(r => {
                let amount = 0
                let price = 0
                r.items.forEach(i => {
                    amount += 1
                    price += i.price
                })
                return {
                    id: r.id,
                    name: r.name,
                    amount: amount,
                    price: price,
                }
            }))
        })
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <>
            <h2 className="mt-5 text-center">Employees</h2>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />
        </>
    )
}