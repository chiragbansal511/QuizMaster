import React from "react";
import { useState } from "react";

export default  function Addpaper()
{
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
  
    // Function to handle changes in the question input
    const handleQuestionChange = (e) => {
      setQuestion(e.target.value);
    };
  
    // Function to handle changes in the answer input
    const handleAnswerChange = (e) => {
      setAnswer(e.target.value);
    };
  
    // Function to handle changes in the options inputs
    const handleOptionChange = (index, e) => {
      const updatedOptions = [...options];
      updatedOptions[index] = e.target.value;
      setOptions(updatedOptions);
    };
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform any action with the submitted data here, such as sending it to a server
      console.log({ question, answer, options });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input type="text" id="question" value={question} onChange={handleQuestionChange} />
        </div>
        <div>
          <label htmlFor="answer">Answer:</label>
          <input type="text" id="answer" value={answer} onChange={handleAnswerChange} />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };