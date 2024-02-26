import React from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Addpaper() {
  const [papername, setpapername] = useState('');
  const [question, setQuestion] = useState([""]);
  const [answer, setAnswer] = useState([""]);
  const [options, setOptions] = useState([Array(4).fill(null)]);
  const [count, setCount] = useState(1);
  const element = new Array(count).fill(" ");
  const opt = new Array(4).fill(" ");

  const handleQuestionChange = (e, index) => {
    let q = [...question];
    q[index] = e.target.value;
    setQuestion(q);
  };

  const handleAnswerChange = (e, index) => {
    let a = [...answer];
    a[index] = e.target.value;
    setAnswer(a);
  };

  const handleOptionChange = (index1, index2, e) => {
    const newOptions = [...options];
    newOptions[index1][index2] = e.target.value;
    setOptions(newOptions);
  };

  const add = () => {
    setOptions([...options, Array(4).fill(null)]);
    setCount(count + 1);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await axios.post(
      'http://localhost:80/addpaper',
      {
        papername: papername, 
      },
      {
        headers: {
          Authorization: "Bearer " + Cookies.get("accessToken"),
        },
      }
    );

    if (response.data === "1") {
      console.log({ question, answer, options });
      const response = await axios.post(
        'http://localhost:80/addquestions',
        {
          questions:question,
          options : options,
          answers : answer,
          papername: papername, 
        },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("accessToken"),
          },
        }
      );
      console.log(response);
    }

    else {
      setpapername("");
      alert("Paper already exists");
    }
  };

  async function handlepapername(e) {
    e.preventDefault();
    setpapername(e.target.value);
  }



  return (
    <div>
      <div>
        <label htmlFor="question">Paper name:</label>
        <input type="text" id="papername" value={papername} onChange={handlepapername} />
      </div>
      {
        element.map((element, index1) => (
          <form key={index1} onSubmit={handleSubmit}>

            <div>
              <label htmlFor="question">Question:</label>
              <input type="text" id="question" value={question[index1]} onChange={(e) => handleQuestionChange(e, index1)} />
            </div>
            <div>
              <label htmlFor="answer">Answer:</label>
              <input type="text" id="answer" value={answer[index1]} onChange={(e) => handleAnswerChange(e, index1)} />
            </div>
            <div>
              <label>Options:</label>
              {opt.map((option, index2) => (
                <div key={index2}>
                  <input
                    type="text"
                    value={options[index1][index2]}
                    onChange={(e) => handleOptionChange(index1, index2, e)}
                  />
                </div>
              ))}
            </div>

          </form>
        ))
      }
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button onClick={add}>add</button>
    </div>
  );
};