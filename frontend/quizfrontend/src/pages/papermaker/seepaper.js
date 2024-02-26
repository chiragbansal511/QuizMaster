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

export default function Seepaper() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const receivedData = location.state && location.state.paper;

    useEffect(() => {
        getdata(receivedData)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {data && data.length > 0 && (
                <div>
                    {data[0].answers.map((answer, index) => (
                        <div key={index}>
                            <div>Question : {data[0].questions[index]}</div>
                            <div>Answer : {answer}</div>
                            <div>
                                Options:
                                {data[0].options[index].map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
