import { useState, useId, useEffect } from 'react'
import { InputBox, UsdHistory } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { CountryName } from './hooks/countryName'

function App() {
 
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)
    const id = useId()
    const countryNames = CountryName()
    const currencyInfo = useCurrencyInfo(from)
    const usdInrVal =  useCurrencyInfo("usd")
    const date = new Date().toLocaleDateString('en-GB')
    const [pastData, setPastData] = useState([])
   

    useEffect(() => {
        
        setPastData((prev) => [
            {
                date: date,
                price: <UsdHistory />
            },
            ...prev.slice(0, 9)
        ]);
    
       
        const intervalId = setInterval(() => {
            setPastData((prev) => [
                {
                    date: date,
                    price: <UsdHistory />
                },
                ...prev.slice(0, 9)
            ]);
        }, 24 * 60 * 60 * 1000);
    
       
        return () => clearInterval(intervalId);
    }, []);
    


    
    const options = Object.keys(currencyInfo)
    // const options = Object.keys(currencyInfo).map(currencyCode => {
    //     const countryNameObject = Object.values(countryNames).find(country => country.currency_code === currencyCode);
    //     return countryNameObject ? countryNameObject.country_name : currencyCode;
    //   });
    

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
        className=" w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url(https://images.pexels.com/photos/164637/pexels-photo-164637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        }}
    >
        <div className="w-8/12">
            <div className="  max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
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
        <div className='w-4/12 backdrop-blur-sm shadow-2xl  h-full'>
            <div  className='m-10'><h2 className=' text-center font-bold text-xl text-white mb-2'>Track of Indian Rupees as 1USD <br/>in last 10 days</h2>
                <ul>
                {pastData?.map((data)=> (
                    <li  className='w=full mb-2 border-gray-60 border rounded-lg p-5 backdrop-blur-sm bg-white/50'>{data.date} <span className=' float-right'> ₹{data.price}</span></li>
                ))}
                </ul>
            </div>
        </div>
    </div>
);
}

export default App
