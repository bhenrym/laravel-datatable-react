import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import axios from "axios";

const queryIni = {
    order_column: "id",
    order_direction: "desc", //
    limit: 10, //inicia cuantos registros mostrar
};

function User() {
    const [data, setData] = useState({ hits: [] });


    useEffect(() => {
        const fetchData = async () => {
            axios.get("/userTable",{
                order_column: "id",
                order_direction: "desc", //
                limit: 10, //inicia cuantos registros mostrar
            }).then((response) => {
                console.log(response);
            });
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center">
                        <div className="card-header">
                            <h2>React Component in Laravel</h2>
                        </div>

                        <div className="card-body">
                            I'm tiny React component in Laravel app!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;

// DOM element
if (document.getElementById("user")) {
    ReactDOM.render(<User />, document.getElementById("user"));
}
