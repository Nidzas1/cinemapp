import axios from "axios"
import { useEffect, useState } from "react"
import "./prices.scss";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
const Prices = () => {

    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()

    const [account, setAccount] = useState()
    const [auth, setAuth] = useState(false)

    const [prices, setPrices] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(sessionStorage.getItem('auth'))
        setAccount(JSON.parse(sessionStorage.getItem('user')))
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/allPrices')
            .then(res => res.json())
            .then(data => setPrices(data))
    }, [])

    const insertPrice = (e) => {
        e.preventDefault()
        try {
            axios.post('http://localhost:5000/insertPrices', {
                category: category,
                price: price
            })
            window.location.reload(false);
        }
        catch (err) {
            console.log(err)
        }

        
    }

    const deletePrice = (id) => {

        try {
            axios.delete(`http://localhost:5000/deletePrices/${id}`)
            .then(console.log(id))
            window.location.reload(false);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
        <Navbar />
            {auth && account.role === 'ADMIN' ?
                <> <div className="allPrices">
                    <div className="table">
                    <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map((price) => (
                            <>
                                  <tr>
                            <td>{price.category}</td>
                            <td>{price.price} $</td>
                            <td><button onClick={() => deletePrice(price.price_id)} className="delete">DELETE</button></td>
                        </tr>
                            </>
                        ))}
                        </tbody> 
                  </table>
                  </div>
                    
                    <div className="prices">
                        <h2>Add new price</h2>
                        <div className="input">
                        <input type="text" placeholder="Category" className="formControl" onChange={e => setCategory(e.target.value)}/>
                        <input type="text" placeholder="Price" className="formControl" onChange={e => setPrice(e.target.value)} />
                        <button onClick={insertPrice} className="insertButton">Insert</button>
                    </div>
                      </div>
                    </div>
                </>
                :
                
                <div className="allPrices1"> 
                    <table className="fl-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                {prices.map((price) => (
                    <>
                    
                        <tr>
                            <td>{price.category}</td>
                            <td>{price.price} $</td>
                        </tr>
                       
                    </>
                ))}
                 </tbody> 
                  </table>
            
                </div>
            }
        </>
    )
}

export default Prices