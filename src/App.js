import './App.css';
import React, { useState } from 'react';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = '#343a40';
      showAlert("Dark Mode has been enabled!", "success")
    }
    else {
      setMode('light')
      document.body.style.backgroundColor = 'white';
      showAlert("Light Mode has been enabled!", "success")
    }
  }

  const showAlert = (message, type) => {
    let lower = message.toLowerCase();
    lower = lower.charAt(0).toUpperCase() + lower.slice(1);
    setAlert({
      message: lower,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <div className="container my-3">
          <Alert alert={alert} />
          <Routes>
            {/* /users --> component 1
            /users/contact --> component 2 */}
            <Route exact path="/" element={<TextForm heading="Text Analyzer App" boxHeading="Write your desired text here to analyze the text:" mode={mode} showAlert={showAlert} />}>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
