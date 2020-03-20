import React, {useEffect} from 'react';
import axios from 'axios';
import CreateItem from "../components/createItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

function ShoppingList() {
    const categories = ["Food", "Snack", "Other"];
    const [items, setItems] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState({id: '', name: '', quantity: 0, category: ''});

    useEffect(() => {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleDeleteItem = (id) => {
        axios.delete('http://localhost:5000/items/' + id)
            .then(response => {
                console.log(response.data)
            });

        let newItems = items.filter(i => {
            return i._id !== id;
        });
        setItems(newItems);
    };

    const handleClickOpen = (item) => {
        setOpen(true);
        setModalInfo({id: item._id, name: item.name, quantity: item.quantity, category: item.category})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditItem = (event) => {
        setModalInfo({...modalInfo, [event.target.name]: event.target.value});
    };

    const handleSaveEdit = () => {
        const item = {
            name: modalInfo.name,
            quantity: modalInfo.quantity,
            category: modalInfo.category
        };

        console.log("id ", modalInfo.id)
        axios.post('http://localhost:5000/items/update/' + modalInfo.id, item)
            .then(res => console.log(res.data));

        items.map(newItem => {
            if (newItem._id === modalInfo.id) {
                newItem.name = modalInfo.name;
                newItem.quantity = modalInfo.quantity;
                newItem.category = modalInfo.category;
            }
        })
    };

    const updateItems = () => {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                setItems(response.data);
            })
    }

    return (
        <div>
            <CreateItem items={items} onChange={updateItems}/>
            <h3>Shopping List</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.length > 0 ? (items.map(function (item) {
                        return <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.category}</td>
                            <td>
                                <button type="button" onClick={() => {
                                    handleClickOpen(item)
                                }}>Edit
                                </button>
                                <button type="button" onClick={() => {
                                    handleDeleteItem(item._id)
                                }}>Delete
                                </button>
                            </td>
                        </tr>
                    })) : (
                        <tr>Loading...</tr>
                    )
                }
                </tbody>
            </table>

            <div>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <DialogTitle id="alert-dialog-slide-title">Edit item</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <textarea name="name" value={modalInfo.name} onChange={(event) => handleEditItem(event)}/>
                            <textarea name="quantity" value={modalInfo.quantity}
                                      onChange={(event) => handleEditItem(event)}/>
                            <select
                                required name="category"
                                className="form-control"
                                value={modalInfo.category}
                                onChange={(event) => handleEditItem(event)}>
                                {
                                    categories.map(function (cat) {
                                        return <option
                                            key={cat}
                                            value={cat}>{cat}
                                        </option>;
                                    })
                                }
                            </select>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Close</Button>
                        <Button onClick={handleSaveEdit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default ShoppingList