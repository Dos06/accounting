import DbService, {ADD, TABLE_EMPLOYEES, TABLE_ITEMS} from "../_services/DbService";
import {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import DataTable from "react-data-table-component";

export default function Items() {
    const columns = [
        {
            name: 'ID',
            selector: 'id',
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

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeName = event => {
        setName(event.target.value);
    }
    const onChangePrice = event => {
        setPrice(event.target.value);
    }
    const onSubmitAddForm = event => {
        addItem({name, price})
            .then(_ => {
                setName('')
                setPrice(0)
            })
            .catch(e => console.log(e))
        event.preventDefault()
    }

    async function addItem(data) {
        DbService.change(ADD, TABLE_ITEMS, data)
            .then(_ => loadData())
            .catch(e => console.log(e))
    }

    const loadData = () => {
        DbService.getAllByTable(TABLE_ITEMS).then(response => {
            setData((response.data).reverse().map(r => {
                return {
                    id: r.id,
                    name: r.name,
                    price: r.price,
                }
            }))
        })
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <h2 className="mt-5 text-center">All Items</h2>
            <Button variant={'dark'} className={'col-2 offset-5'} onClick={handleShow}>ADD</Button>
            <DataTable
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationOptions}
            />

            <Modal show={show} animation={false} onHide={handleClose}>
                <Form onSubmit={onSubmitAddForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add to {TABLE_ITEMS}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Item name:</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={onChangeName}
                                type="text"
                                placeholder="Enter item name"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Item price:</Form.Label>
                            <Form.Control
                                value={price}
                                onChange={onChangePrice}
                                type="number"
                                placeholder="Enter item price"
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