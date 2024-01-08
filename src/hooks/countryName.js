import React, { useEffect, useState } from 'react';

export default function CountryName() {
    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/country.json');
                const data = await response.json();
                const value = Object.values(data)
                setCountries(value);
            } catch (error) {
                console.error('Error in fetching country name', error);
            }
        };

        fetchData();
    }, []); 

    return countries 
}
