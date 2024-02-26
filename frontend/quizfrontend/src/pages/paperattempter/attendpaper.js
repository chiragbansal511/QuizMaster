import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Attendpaper() {
    const [paper, setPaper] = useState("");
    const [mentor, setMentor] = useState("");
    const [data, setData] = useState(null);
    const [answers, setAnswers] = useState("");
    const [marks , setMarks] = useState(null);

    function handleanswers(event, index) {
        const ans = [...answers]; // Assuming answers is your state variable
        ans[index] = event.target.value;
        setAnswers(ans);
        console.log(ans);
    }

    function handleChangementor(e) {
        setMentor(e.target.value);
    }

    function handleChangepapername(e) {
        setPaper(e.target.value);
    }

    async function handlesubmit() {

        const response = await axios.post(
            'http://localhost:80/attendpaper',
            {
                mentor: mentor,
                papername: paper
            },

            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );
        console.log(response.data);
        setData(response.data);
    }

    async function handlepapersubmit(e) {
 
        const response = await axios.post(
            'http://localhost:80/checkpaper',
            {
                mentor: mentor,
                papername: paper,
                answers : answers
            },

            {
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );

        setMarks(response);
 
    }

    return (
        <div>
            {data == null ?

                < div >
                    <label htmlFor="mentor">Mentor name</label>
                    <input type="text" id="mentor" value={mentor} onChange={handleChangementor} />
                    <label htmlFor="paper">Paper name</label>
                    <input type="text" id="paper" value={paper} onChange={handleChangepapername} />
                    <button onClick={handlesubmit}>Submit</button>
                </div>
                : <div>
                    {data.questions.map((e, index) => (
                        <div key={index}>
                            <div>question: {e}</div>
                            <div>options : {data.options[index].map((e, index1) => (
                                <div key={index1}>
                                    <label htmlFor="">{e}</label>
                                    <input type="checkbox" value={e} name="checkbox" className={index} onChange={(event) => handleanswers(event, index)} />
                                </div>
                            ))}</div>
                        </div>
                    ))}

                    <button onClick={handlepapersubmit}>Submit</button>
                </div>
            }

           {marks == null ? <div></div>: <div>{JSON.stringify(marks.data)}</div>}
        </div >
    );
}
