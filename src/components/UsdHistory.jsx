import React, {useState, useEffect} from 'react'
import useCurrencyInfo from '../hooks/useCurrencyInfo'


export function UsdHistory() {
    const [usdTrack, setUsdTrack] = useState([])
    const currencyInfo = useCurrencyInfo('usd')

    return (
       <div>
        {currencyInfo.inr}
       </div>
    )
}
