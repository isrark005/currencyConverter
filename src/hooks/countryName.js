import React, { useEffect, useState } from 'react';

export default function CountryName() {
    const [countries, setCountries] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/country.json');
                const data = await response.json();
                
                setCountries(data);
            } catch (error) {
                console.error('Error in fetching country name', error);
            }
        };

        fetchData();
    }, []); 

    return countries 
}
