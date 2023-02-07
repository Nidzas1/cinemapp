import axios from "axios"
import { useEffect, useState } from "react"

const Prices = () => {

    const [category, setCategory] = useState('')
    const [price, setPrice] = useState()

    const [account, setAccount] = useState()
    const [auth, setAuth] = useState(false)

    const [prices, setPrices] = useState([])

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
        }
        catch (err) {
            console.log(err)
        }
    }

    const deletePrice = (id) => {

        try {
            axios.delete(`http://localhost:5000/deletePrices/${id}`)
            .then(console.log(id))
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {auth && account.role === 'ADMIN' ?
                <>
                    <div className="prices">
                        <h1>Prices page</h1>
                        Category: <input type='text' onChange={e => setCategory(e.target.value)} /><br />
                        Price: <input type='text' onChange={e => setPrice(e.target.value)} /><br />
                        <button onClick={insertPrice}>insert</button>
                    </div>
                    <div className="allPrices">
                        {prices.map((price) => (
                            <>
                                <h1>{price.category}:</h1>
                                <h2>{price.price} RSD</h2>
                                <button onClick={() => deletePrice(price.price_id)}>DELETE</button>
                            </>
                        ))}
                    </div>
                </>
                :
                <div className="allPrices">
                {prices.map((price) => (
                    <>
                        <h1>{price.category}:</h1>
                        <h2>{price.price} RSD</h2>
                    </>
                ))}
            </div>
            }
        </>
    )
}

export default Prices