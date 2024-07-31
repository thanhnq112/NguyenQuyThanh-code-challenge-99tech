import './App.css';
import svgs from './loadSvgAssets';
import { prices } from './prices';
import { useState } from 'react';

function App() {

    const currencies = prices.map(price => price.currency);

    const [selectedInputInit, setSelectedInputInit] = useState(currencies[0])
    const [selectedOutputInit, setSelectedOutputInit] = useState(currencies[0])

    const [valueInput, setValueInput] = useState(0)
    const [valueOutput, setValueOutput] = useState(0)

    const handleInputInit = (event) => {
        setSelectedInputInit(event.target.value)
    }

    const handleOutputInit = (event) => {
        setSelectedOutputInit(event.target.value)
    }

    const handleValueInput = (event) => {
        setValueInput(event.target.value)
    }

    const handleValueOutput = (event) => {
        const initSrc = prices.find(price => price.currency === selectedInputInit).price
        const initDes = prices.find(price => price.currency === selectedOutputInit).price

        const out = valueInput * initDes / initSrc
        setValueOutput(out.toFixed(2))
    }

    return (
        <div className="App">

            <div className='container'>
                <div className='src'>
                    <label className='title' for="input-amount">Amount to send</label>
                    <div className='input-value'>
                        <input type="number" id="input-amount" className='number-field' onChange={handleValueInput} />

                        <select className="input-init" onChange={handleInputInit}>
                            {currencies.map((currency, index) =>
                                <option key={index} value={currency} >{currency}</option>
                            )}
                        </select>

                        <img className='image' src={svgs.find(el => el.includes('/'.concat(selectedInputInit, '.')))} alt="" />
                    </div>
                </div>

                <div className='des'>
                    <label className='title' for="output-amount">Amount to receive</label>
                    <div className='output-value'>
                        <input type="number" id="output-amount" className='number-field' value={valueOutput} disabled />

                        <select className="output-init" onChange={handleOutputInit}>
                            {currencies.map((currency, index) =>
                                <option key={index} value={currency} >{currency}</option>
                            )}
                        </select>

                        <img className='image' src={svgs.find(el => el.includes('/'.concat(selectedOutputInit, '.')))} alt="" />
                    </div>
                </div>
                <div className='btn' onClick={handleValueOutput}>convert</div>
            </div>
        </div>
    );
}

export default App;
