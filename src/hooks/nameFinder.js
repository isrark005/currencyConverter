import React from 'react'
import { CountryName } from './countryName'
import useCurrencyInfo from './useCurrencyInfo'


export function NameFinder() {
    const countryNames = CountryName()

    const currencyInfo = useCurrencyInfo('usd')


   for (let i = 0; i < countryNames.length; i++) {
    let matchedCurrency;

        for (let j = 0; j  < currencyInfo.length; j++ ) {
            if (countryNames[i].currency_code === currencyInfo[j]) {
                matchedCurrency =  countryNames[i].country_name
            }
         }
            return matchedCurrency
    }


    return matchedCurrency
}
