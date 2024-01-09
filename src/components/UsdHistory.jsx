import { useState } from 'react'
import useCurrencyInfo from '../hooks/useCurrencyInfo'


export function UsdHistory() {
    
    const currencyInfo = (Math.round(useCurrencyInfo('usd').inr * 100) / 100).toFixed(2)
    

    return currencyInfo
       
}
