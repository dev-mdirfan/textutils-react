import './App.css';
import React, { useState } from 'react';
import About from './components/About';
import Aboutprev from './components/Aboutprev';
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

  const removeBodyClasses = () => {
    document.body.classList.remove('bg-light');
    document.body.classList.remove('bg-dark');
    document.body.classList.remove('bg-primary');
    document.body.classList.remove('bg-success');
    document.body.classList.remove('bg-warning');
    document.body.classList.remove('bg-danger');
  }

  const toggleMode = (cls) => {
    // console.log(cls);
    removeBodyClasses();
    if (cls !== null) {
      document.body.classList.add('bg-'+cls);
      // setMode(cls)
    }
    else {
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
            <Route exact path="/" element={<TextForm heading="TextUtils - Text Analyzer App" boxHeading="Write your desired text here to analyze the text:" mode={mode} showAlert={showAlert} />}>
            </Route>
            <Route exact path="/about" element={<About mode={mode} />}>
            </Route>
            <Route exact path="/about-previous" element={<Aboutprev />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
