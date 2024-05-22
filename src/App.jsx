import React, { useEffect, useState } from 'react'
// import "./cuurency.css"

// const apiUrl = "https://open.er-api.com/v6/latest/NGN"

const App = () => {
    const [fromcurrency,setFromCurrency] = useState("USD")
    const [amount,setAmount] = useState(1)
    const [exchangeRate,setExchangeRate] = useState("")
    const [toCurrency,setToCurrency] = useState("NGN")
    const [amountToExChange,setAmountToExchange] = useState(null)

const handleCurrencyChange = (e)=>{
setFromCurrency(e.target.value)
}

const handleToChange =(e)=>{
    setToCurrency(e.target.value)
}
const fetchCurrencies = async (url)=>{

    const apiResponse = await fetch(`https://open.er-api.com/v6/latest/${fromcurrency}`,{
        method:"GET"
    })
    const response = await apiResponse.json()
    const allRates = response.rates
   const toCur = allRates[toCurrency]
    setExchangeRate(allRates[toCurrency])

    setAmountToExchange((amount * toCur).toFixed(2))

}

useEffect(()=>{
fetchCurrencies()

// console.log(currency);
},[toCurrency,amount,fromcurrency])


  return (
    <div className='curr-container'>
<h1>Currency converter</h1>
        <p>from</p>
        <input type="number"
        value={amount}
        onChange={(e)=> setAmount(e.target.value)}
        />
     <select value={fromcurrency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="NGN">NGN</option>
        <option value="EUR">EUR</option>
     </select>
     <p>to</p>
<input type="number"
value={exchangeRate}
onChange={()=> setExchangeRate()}
readOnly
/>
  <select value={toCurrency} onChange={handleToChange}>
        <option value="NGN">NGN</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
     </select>

     <p>{amount} {fromcurrency} to {toCurrency} = {amountToExChange}</p>
    </div>
  )
}

export default App
