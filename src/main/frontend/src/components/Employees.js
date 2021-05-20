import DataTable from "react-data-table-component";
import {Button, Form, Modal} from "react-bootstrap";
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
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeName = event => {
        setName(event.target.value);
    }
    const onSubmitForm = event => {
        addItem({name})
            .then(_ => {
                setName('')
            })
            .catch(e => console.log(e))
        event.preventDefault()
    }

    async function addItem(data) {
        DbService.change('add', TABLE_EMPLOYEES, data)
            .then(_ => loadData())
            .catch(e => console.log(e))
    }

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
            <Button variant={'dark'} className={'col-2 offset-5'} onClick={handleShow}>ADD</Button>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />

            <Modal show={show} animation={false} onHide={handleClose}>
                <Form onSubmit={onSubmitForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to {TABLE_EMPLOYEES}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Employee name:</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={onChangeName}
                                type="text"
                                placeholder="Enter name"
                                required
                            />
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