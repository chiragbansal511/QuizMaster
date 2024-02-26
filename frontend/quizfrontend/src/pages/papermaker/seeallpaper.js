import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

async function getdata() {
    const response = await axios.get(
        'http://localhost:80/seepaper',
        {
            headers: {
                Authorization: "Bearer " + Cookies.get("accessToken"),
            },
        }
    );

    return response;
}


export default function Seeallpaper() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {

        getdata()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function seepaper(paper) {

        navigate("/seepaper", {
            state:
            {
                paper: paper,
            }
        })
    }

    function editpaper(paper) {

        navigate("/editpaper", {
            state:
            {
                paper: paper,
            }
        })
    }

    async function deletepaper(paper) {
        console.log(Cookies.get("accessToken"))
        const response = await axios.delete(
            'http://localhost:80/deletepaper',
            {
                data: { papername: paper },
                headers: {
                    Authorization: "Bearer " + Cookies.get("accessToken"),
                },
            }
        );
        console.log(response)
        window.location.reload()
    }

    return (
        <div>
            {data && data.map((item, index) => (
                <div>
                    <div>paper : {item.papername}</div>
                    <button key={index} onClick={() => seepaper(item.papername)}>See</button>
                    <button key={index} onClick={() => editpaper(item.papername)}>Edit</button>
                    <button key={index} onClick={() => deletepaper(item.papername)}>Delete</button>
                </div>
            ))}
        </div>
    );
}