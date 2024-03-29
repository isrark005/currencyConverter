import { useState, useEffect, useId } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import CountryName from './hooks/countryName'
import { SearchBar } from './components/SearchBar'

function App() {
    const newId = new useId()
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)
    const currencyInfo = useCurrencyInfo(from)
    const [pastData, setPastData] = useState([])
    const countryNames = CountryName()
    const currencyInfoHis = (Math.round(useCurrencyInfo('usd').inr * 100) / 100).toFixed(2)
    const updatedCountryNamers = Object.values(countryNames) 
    const [search, setSearch] = useState('')

    useEffect(() => {

        const currentDate = new Date()
        const formattedDate = currentDate.toLocaleDateString('en-GB');
        
        const trackPrice = currencyInfoHis


        
        // console.log(trackPrice);
        // setPastData((prev) => [
        //     {
        //         date: formattedDate,
        //         price: trackPrice
        //     },
        //     ...prev.splice(0, 9)
        // ]);
    
       
        const intervalId = setInterval(() => {
            setPastData((prev) => [
                {
                    date: formattedDate,
                    price: trackPrice,
                    // id: Math.floor(Math.random() * 11)
                },
                ...prev
            ]);

            if(pastData.length > 10){
                pastData.shift()
            }
        

        }, 1000 * 60 * 60 * 24);
    
       
        return () => clearInterval(intervalId);
    }, []);
    
    


    
    const options = Object.keys(currencyInfo)
    // const options = Object.keys(currencyInfo)?.map(currencyCode => {
    //   return countryNames?.filter((country) => country?.currency_code === currencyCode ) 
      
    //  });

    

    const swap = ()=> {
      setFrom(to);
      setTo(from)
      setAmount(convertedAmount)
      setConvertedAmount(amount)
    }

    const convert = () => {
      setConvertedAmount(amount * currencyInfo[to])
      ;
    }
  return (
    <div
        className="flex-col w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-fixed"
        style={{
            backgroundImage: `url(https://images.pexels.com/photos/164637/pexels-photo-164637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        }}
    >
        <div className='w-full flex h-full items-center max-md:flex-col'>
        <div className="w-8/12 max-md:w-10/12">
            <div className="  max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 max-md:my-10">
                <h1 className=' text-3xl font-bold m-3 text-center '>Currency Converter</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                       convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) =>{
                              setAmount(amount)
                              setFrom(currency)
                            }}
                            selectCurrency={from}
                            onAmountChange={(amount)=> setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=> setTo(currency)}
                            selectCurrency={to} 
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
        <div className='w-4/12 backdrop-blur-sm shadow-2xl  h-full max-md:w-full overflow-y-scroll'>
            <div  className='m-10'><h2 className=' text-center font-bold text-xl text-white mb-2'>List of Countries <br/>with their currency name</h2>
            <SearchBar setSearch={setSearch} />
                <ul>
                {updatedCountryNamers?.filter((data)=> (
                    search.toLowerCase() === '' ? data : data.country_name.toLowerCase().includes(search)
                )).map((data, index)=> (
                    <li key={index} className='w=full mb-2 border-gray-60 border rounded-lg p-5 backdrop-blur-sm bg-white/50 capitalize'>{data.country_name} <span className=' float-right lowercase'> {data.currency_code}</span></li>
                )) }
                </ul>
               
            </div>
        </div>
        </div>
    </div>
);
}

export default App
