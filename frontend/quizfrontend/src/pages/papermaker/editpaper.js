import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

async function getdata(paper) {
    const response = await axios.get(
        'http://localhost:80/paper',
        {
            headers: {
                Authorization: "Bearer " + Cookies.get("accessToken"),
            },
            params: {
                papername: paper
            }
        }
    );
    console.log(response.data);
    return response;
}

export default function Editpaper() {
    const location = useLocation();
    const receivedData = location.state && location.state.paper;
    const [data, setData] = useState(null);
    const [name, setname] = useState(receivedData);

    useEffect(() => {
        getdata(receivedData)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
   
    async function update()
    {
        const response = await axios.patch(
            'http://localhost:80/updatepaper',
            {
              questions:data[0].questions,
              options : data[0].options,
              answers : data[0].answers,
              originalname: receivedData, 
              papername : name
            },
            {
              headers: {
                Authorization: "Bearer " + Cookies.get("accessToken"),
              },
            }
          );
         window.location.reload();
    }

    const handleQuestionChange = (e, index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[0].questions[index] = e.target.value;
            return newData;
        });
    };
    
    const handlenameChange = (e) => {
        setname(e.target.value);
      }

    const handleAnswerChange = (e, index) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[0].answers[index] = e.target.value;
            return newData;
        });
    };
    
    const handleOptionChange = (index1, index2, e) => {
        setData(prevData => {
            const newData = [...prevData];
            newData[0].options[index1][index2] = e.target.value;
            return newData;
        });
    };

    return (
        <div>
            <input type="text" value={name} onChange={(e)=>{handlenameChange(e)}}/>
            {data && data.length > 0 && (
                <div>
                    {data[0].answers.map((answer, index) => (
                        <div key={index}>
                            <div>Question</div>
                            <input type="text" value={data[0].questions[index]} onChange={(e) => handleQuestionChange(e, index)}/>
                            <div>Answer</div>
                            <input type="text" value={answer} onChange={(e) => handleAnswerChange(e, index)}/>
                            <div>
                                Options:
                                {data[0].options[index].map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <input type="text" value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={update}>update</button>
        </div>
    );
}
