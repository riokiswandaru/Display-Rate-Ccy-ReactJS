import { React, useState, useEffect } from "react";
import axios from 'axios';


const Currency = () => {
    const [currencyRates, setCurrencyRates] = useState([])
    const [baseCcyRates, setBaseCcyRates] = useState("")

    let ccy = ""
    let listOfCurrency = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"]

    for (let i = 0; i < listOfCurrency.length; i++) {

        if (i === (listOfCurrency.length - 1)) {
            ccy += listOfCurrency[i]
        } else {
            ccy += listOfCurrency[i] + ','
        }
    }

    useEffect(() => {
        axios.get(`https://api.currencyfreaks.com/latest?apikey=6449304f23f1410e91867aa6c27e2ec3&symbols=${ccy}`)
            .then(({ data }) => {
                setCurrencyRates(data.rates)
                setBaseCcyRates(data.base)
            })
        // eslint-disable-next-line
    }, [])

    function ccySell(rate) {
        return (rate - (rate * (5 / 100))).toString()
    }

    function ccyBuy(rate) {
        return (rate + (rate * (5 / 100))).toString()
    }

    const dataRates = []
    for (let i = 0; i < listOfCurrency.length; i++) {
        dataRates.push(
            <tr key={i}>
                <td>{listOfCurrency[i]}</td>
                <td>{ccyBuy(currencyRates[listOfCurrency[i]])}</td>
                <td>{currencyRates[listOfCurrency[i]]}</td>
                <td>{ccySell(currencyRates[listOfCurrency[i]])} </td>
            </tr>
        )
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Currency</th>
                        <th>We Buy</th>
                        <th>Exchange Rate</th>
                        <th>We Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {dataRates}
                </tbody>
            </table >
            <div>Rates are based from 1 {baseCcyRates} <br /> This Application uses API from https://currencyfreaks.com </div>
        </div>
    )
}


export default Currency