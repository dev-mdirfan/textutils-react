import React, { useState } from 'react'

export default function TextForm({ heading, boxHeading = "Enter Your Text Here", mode, showAlert }) {
    const [text, setText] = useState('Enter your text here');
    // text = "Your new text"; // wrong way to change the state
    // setText("Your new text"); // correct way to change the state
    const [copySuccess, setCopySuccess] = useState('Text copied to clipboard!');

    const handleUpClick = () => {
        // console.log("Uppercase was clicked");
        let newText = text.toUpperCase();
        setText(newText);
        showAlert("Converted to UPPERCASE!", "warning")
    }
    const handleOnChange = (event) => {
        // console.log("On Change");
        setText(event.target.value);
    }
    const handleLowClick = () => {
        // console.log("Lowercase was clicked");
        let newText = text.toLowerCase();
        setText(newText);
        showAlert("Converted to lowercase!", "warning")
    }

    const handleCapClick = () => {
        // console.log("Capitalize Later");
        // let newText = text.split('.')
        // for (let i = 0; i < newText.length; i++) {
        //     let sentence = newText[i]
        //     for (let i = 0; i < sentence.length; i++) {
        //         if (sentence[i] !== ' ') {
        //             sentence[i] = sentence[i].toUpperCase();
        //             break;
        //         }
        //     }
        // }
        // console.log(newText);
        let newText = text
            .split(/([.!?]\s*)/) // Split text based on punctuation followed by whitespace
            .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)) // Capitalize the first character
            // .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)) // Capitalize the first character and lowercase the rest
            .join(''); // Rejoin the sentences without losing punctuation
        setText(newText);
        showAlert("Text has been Capitalized!", "warning")
    }

    function timeRead(text) {
        const wordsPerMinute = 125;
        const wordCount = text.split(' ').filter(word => word.trim().length > 0).length;
        const timeInMinutes = wordCount / wordsPerMinute;

        if (timeInMinutes < 1) {
            return `${Math.round(timeInMinutes * 60)} Seconds`;
        } else if (timeInMinutes < 60) {
            return `${Math.round(timeInMinutes * 10) / 10} Minutes`;
        } else {
            return `${Math.round((timeInMinutes / 60) * 10) / 10} Hours`;
        }
    }


    const clearText = () => {
        let newText = '';
        setText(newText);
        showAlert("Text input is cleared, Write your text now!", "warning")
    }

    const speak = () => {
        const msg = new SpeechSynthesisUtterance(text);
        const toggle = document.getElementById('toggle');

        msg.onend = () => {
            if (toggle) toggle.innerHTML = "Speak";
        };

        if (toggle.textContent === "Speak") {
            window.speechSynthesis.speak(msg);
            toggle.innerHTML = "Stop";
        } else {
            toggle.innerHTML = "Speak";
            window.speechSynthesis.cancel();
        }
        showAlert("Reading text stay tunned!", "warning")
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopySuccess('Text copied to clipboard!');
                showAlert(copySuccess, "warning")
            })
            .catch(() => {
                setCopySuccess('Failed to copy text.');
                showAlert(copySuccess, "warning")
            });
    };

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        showAlert("Extra Spaces or Tabs are removed!", "warning")
    }

    return (
        <>
            <div className='container my-3' style={{color: mode === 'light' ? 'black' : 'white'}}>
                <h3>{heading}</h3>
                <div className="mb-3">
                    <label htmlFor="textBox" className="form-label">{boxHeading}</label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="textBox" rows="10" style={{backgroundColor: mode === 'light' ? 'white' : '#343a40', color: mode === 'light' ? 'black' : 'white'}}></textarea>
                </div>
                <div>
                    <h5 className='my-3'>Convert to:</h5>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-start">
                                <button className="btn btn-primary mx-1" onClick={handleUpClick}>Uppercase</button>
                                <button className="btn btn-primary mx-1" onClick={handleLowClick}>Lowercase</button>
                                <button className="btn btn-primary mx-1" onClick={handleCapClick}>Capitalize</button>
                                <button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <button className="btn btn-outline-secondary mx-1" onClick={clearText}>Clear Text</button>
                                <button className="btn btn-warning mx-1" onClick={speak} id="toggle">Speak</button>
                                <button className="btn btn-info mx-1" onClick={handleCopyClick}>Copy to Clipboard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-3" style={{color: mode === 'light' ? 'black' : 'white'}}>
                <h5>Your Text Summary:</h5>
                <div className='mx-3'>
                    <p>
                        {text.split(' ').filter(word => word.trim().length > 0).length} Words,
                        {text.length} Characters,
                        {text.split('\n').length} Lines,
                        {text.split('.').filter(sentence => sentence.trim().length > 0).length} Sentences
                    </p>
                    <p>{timeRead(text)} Read</p>
                </div>
            </div>

            <div className='container my-3' style={{color: mode === 'light' ? 'black' : 'white'}}>
                <h5>Preview:</h5>
                <div className='mx-3'>
                    <details>
                        <summary>Preview Text</summary>
                        <p>{text.length > 0 ? text : "Enter text to preview here"}</p>
                    </details>
                </div>
            </div>
            <div className='container my-3' style={{color: mode === 'light' ? 'black' : 'white'}}>
                <h5>Example Texts:</h5>
                <div className='mx-3'>
                    <div className=''>
                        Capitalization: &nbsp; &nbsp;<pre style={{ display: 'inline', backgroundColor: mode === 'light' ? "#cfe2ff" : '#0d6efd' }}>enter your text here. mohd irfaN          . hELlo.   enter Your Text HERE.</pre>

                    </div>
                </div>
            </div>
        </>
    )
}
