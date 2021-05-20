import {useEffect, useState} from "react";
import DbService, {EDIT, TABLE_EMPLOYEES, TABLE_ITEMS} from "../_services/DbService";
import {Button, Form, Modal} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Select from "react-select";

export default function EmployeeItems(props) {
    const [optionItems, setOptItems] = useState([])
    const [items, setItems] = useState([])

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
    ]

    const paginationOptions = {
        rowsPerPageText: 'Rows per page',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All'
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        DbService.getAllByTable(TABLE_ITEMS)
            .then(response => {
                setOptItems(response.data.map(i => {
                    return {
                        value: i.id,
                        label: i.name,
                    }
                }))
            })
    }

    const onSubmitForm = event => {
        let employeeId = employee.id
        let itemIds = []
        for (let i = 0; i < items.length; i++) {
            itemIds.push(items[i].value)
        }
        const data = {employeeId, itemIds}
        addItem(data)
            .catch(e => console.log(e))
        event.preventDefault()
    }

    async function addItem(data) {
        DbService.change(EDIT, TABLE_EMPLOYEES, data)
            .then(_ => loadData())
            .catch(e => console.log(e))
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <h2 className={'text-center mt-5'}>{employee.name}'s items</h2>
            <Button variant={'dark'} className={'col-2 offset-5'} onClick={handleShow}>EDIT ITEMS</Button>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />
            <h3 className={'text-center mt-4'}>Total price: {totalPrice}</h3>

            <Modal show={show} animation={false} onHide={handleClose}>
                <Form onSubmit={onSubmitForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to {TABLE_ITEMS}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Items:</Form.Label>
                            <Select options={optionItems} onChange={setItems} isMulti autoFocus/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            CLOSE
                        </Button>
                        <Button variant="dark" type={'submit'}>
                            SAVE
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}