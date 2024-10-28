import React from 'react'

export default function About(props) {
    let myStyle = {
        color: props.mode === 'dark' ? 'white' : 'black',
        backgroundColor: props.mode === 'dark' ? '#495057' : 'white',
    }

    return (
        <div className='container my-3' style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
            <h1 className='my-3'>About Us</h1>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong>Project Overview</strong>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                        <strong>textutils:</strong> A text semantic checker and manipulator / analyzer.
                        <br />It is a text analysis web app built using React.js.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <strong>Key Features</strong>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                        <ul>
                    <li>Capitalize / Lower Case / Upper Case</li>
                    <li>Remove extra spaces and tabs</li>
                    <li>Text to speech using react-speech</li>
                    <li>Counts words, characters, lines, and sentences</li>
                    <li>Find and replace functionality</li>
                </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" style={myStyle} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <strong>Tech Stack</strong>
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body" style={myStyle}>
                        <ul>
                    <li>Bootstrap 5</li>
                    <li>React</li>
                    <li>React Router DOM</li>
                </ul>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
