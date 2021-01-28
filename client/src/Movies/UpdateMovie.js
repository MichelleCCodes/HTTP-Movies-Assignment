import React, { useEffect, useState } from 'react'; 
import { useHistory, useParams, Redirect } from 'react-router-dom'; 
import axios from 'axios'; 

const initialItem = {
    id:'',
    title: '', 
    director: '', 
    metascore: '', 
    stars: []
}

function UpdateMovie (props) {
const { push } = useHistory(); 
const [item, setItem] = useState(initialItem); 
const { id } = useParams(); 

useEffect(()=> {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then((res)=> {
        setItem(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, []);

// HELPER FUNCTIONS 
const changeHandler = (ev) => {
    ev.persist(); 
    let value = ev.target.value; 
    if (ev.target.name === 'metascore'){
        value = parseInt(value);
    }

    setItem({
        ...item, 
        [ev.target.name]: value
    });
};

const submitHandler = (ev) => {
    ev.preventDefault(); 
    axios
    .put(`http://localhost:5000/api/movies/${id}`, item)
    .then(res => {
        console.log(res.data)
        props.setMovieList(res.data); 
    })
    .catch(err => {
        console.log(err);
    });
};

    return (
        <div>
        <form onSubmit={submitHandler}>
            <input
            name="title"
            type="text"
            value={item.title}
            placeholder="change title"
            onChange={changeHandler}
            />
            <input
            name="director"
            type="text"
            value={item.director}
            placeholder="change director"
            onChange={changeHandler}
            />
            <input
            name="metascore"
            type="text"
            value={item.metascore}
            placeholder="change director"
            onChange={changeHandler}
            />
            <input
            name="stars"
            type="text"
            value={item.stars}
            placeholder="change stars"
            onChange={changeHandler}
            />
            <button>Update Movie Details</button>
        </form>
        </div>
    )
}

export default UpdateMovie;