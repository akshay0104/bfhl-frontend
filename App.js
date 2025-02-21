import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

    const backendUrl = 'https://bfhl-backend-lrmu.onrender.com/bfhl';

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const response = await axios.post(backendUrl, parsedData);
            setResponseData(response.data);
        } catch (error) {
            alert('Invalid JSON Input');
        }
    };

    const handleOptionChange = (event) => {
        const options = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="container">
            <h1>BFHL Frontend</h1>
            <textarea
                rows="5"
                cols="50"
                placeholder='Enter JSON Input: {"data": ["M","1","334","4","B"]}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            <select multiple onChange={handleOptionChange}>
                <option value="alphabets">Alphabets</option>
                <option value="numbers">Numbers</option>
                <option value="highest_alphabet">Highest Alphabet</option>
            </select>

            <div className="response">
                {selectedOptions.map(option => (
                    <div key={option}>
                        <strong>{option}:</strong> {JSON.stringify(responseData[option] || [])}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
