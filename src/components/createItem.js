import React from 'react';
import axios from 'axios';

function CreateItem() {
    const categories = ["Food", "Snack", "Other"];
    const [values, setValues] = React.useState({name: '', quantity: 0, category: 'Food', list: 'mainList'});

    const handleInputChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };

    const handleSubmit = () => {
        const item = {
            name: values.name,
            quantity: values.quantity,
            category: values.category,
            list: values.list
        }

        axios.post('http://localhost:5000/items/add', item)
            .then(res => console.log(res.data));
    }


    return (
        <div>
            <h3>Add new item</h3>
            <div className="form-group">
                <label>Category: </label>
                <select
                    required name="category"
                    className="form-control"
                    value={values.category}
                    onChange={(event) => handleInputChange(event)}>
                    {
                        categories.map(function (cat) {
                            return <option
                                key={cat}
                                value={cat}>{cat}
                            </option>;
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Name: </label>
                <input type="text"
                       required name="name"
                       className="form-control"
                       value={values.name}
                       onChange={(event) => handleInputChange(event)}/>
            </div>

            <div className="form-group">
                <label>Quantity: </label>
                <input type="text"
                       required name="quantity"
                       className="form-control"
                       value={values.quantity}
                       onChange={(event) => handleInputChange(event)}/>
            </div>
            <button type="button" onClick={handleSubmit}>Add</button>
        </div>
    )
}

export default CreateItem