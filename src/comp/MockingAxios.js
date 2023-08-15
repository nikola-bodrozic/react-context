import React, { useEffect, useState } from "react";
import axiosInstance from '../mock';

const MockingAxios = () => {
    const [getCall, setGetCall] = useState("");
    const [postCall, setPostCall] = useState("");
    useEffect(() => {
        // mocked axios GET
        axiosInstance
            .get("/users")
            .then(function (response) {
                setGetCall(JSON.stringify(response.data))
            });

        // mocked axios POST
        axiosInstance
            .post("/users", { firstName: "Foo" })
            .then(function (response) {
                setPostCall(JSON.stringify(response.data))
            });
    }, []);
    return (
        <>
            <div className="card">
                {getCall} | {postCall}
            </div>
        </>
    );
};

export default MockingAxios;