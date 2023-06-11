import React from 'react'
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Search() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/'+input)
    }
    const [searched, setSearched] = useState([]);
    let params = useParams();
    const getSearched = async (name) => {
        const {data} = await 
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=36e8fccb0cf24b6cbd6ea63f85b8acf1&query=${name}`);
        setSearched(data.results)
        setInput('')
    }
    useEffect (()=> {
        getSearched(params.search)
        // eslint-disable-next-line
    }, [params.search]);
    return (
       <>
        <div className="container">
            <Form onSubmit={submitHandler}>
            <div>
                <FaSearch />
                <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
        </Form>
        </div>
        <div className="container">
        <Grid>
        {searched.map((item) => {
            return (
                <Card key={item.id}>
                <Link to={'/recipeDetails/'+item.id}>
                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>
                </Link>
                </Card>
            )
        })}
    </Grid>
    </div>
       </>
    )
}

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4rem 0 2rem;
    div {
        width: 50%;
        position: relative;
        margin: auto;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        @media(max-width: 575px) {
            width:80%;
        }
    }
    input {
        background: linear-gradient(35deg, #494949, #313131);
        border: none;
        outline: none;
        padding: 1rem 3rem;
        color: #fff;
        border-radius: 1rem;
        font-size: 1.5rem;
        width: 100%;
        margin: auto;
    }
    svg {
        position: absolute;
        top: 50%;
        left: 0;
        color: #fff;
        transform: translate(100%, -50%)
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 3rem;
`;
const Card = styled.div`
    grid-column: span 3;
    margin: 2.4rem 0;
    img {
        width: 100%;
        height: 100%;
        border-radius: 2rem;
        
    }
    a {
        text-align: center;
        text-decoration: none;
    }
    h4 {
        text-align: center;
        text-decoration: none;
        
    }
`

export default Search