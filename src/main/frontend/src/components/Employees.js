import DataTable from "react-data-table-component";
import {Button, Form, Modal} from "react-bootstrap";
import DbService, {ADD, DELETE, TABLE_EMPLOYEES} from "../_services/DbService";
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
                        setToDeleteId(row.id)
                        handleShowDelete()
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
    const [toDeleteId, setToDeleteId] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [name, setName] = useState('');
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const onChangeName = event => {
        setName(event.target.value);
    }
    const onSubmitAddForm = event => {
        addItem({name})
            .then(_ => {
                setName('')
            })
            .catch(e => console.log(e))
        event.preventDefault()
    }

    async function addItem(data) {
        DbService.change(ADD, TABLE_EMPLOYEES, data)
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
            <Button variant={'dark'} className={'col-2 offset-5'} onClick={handleShowAdd}>ADD</Button>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />

            <Modal show={showDelete} animation={false} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm to delete</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        CLOSE
                    </Button>
                    <Button variant="danger" type={'submit'}
                            onClick={() => deleteItem(toDeleteId).then(_ => handleCloseDelete())}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} animation={false} onHide={handleCloseAdd}>
                <Form onSubmit={onSubmitAddForm}>
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
                        <Button variant="secondary" onClick={handleCloseAdd}>
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