import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import rows from "./rowsData";

/*

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";




const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

*/

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



import axios from "axios";

const queryIni = {
    order_column: "id",
    order_direction: "desc", //
    limit: 10, //inicia cuantos registros mostrar
};





export default function User() {
    const classes = useStyles();

    const [data, setData] = useState({ hits: [] });


    useEffect(() => {
        const fetchData = async () => {
            axios.get("/userTable", {
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

        <>
            <div id="yrneh-table">
                <h1 className="title">Material UI - Responsive Table</h1>

                <table>
                    <caption>Statement Summary</caption>
                    <thead>
                        <tr>
                            <th scope="col">Account</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Period</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Accountet ">Visa - 3412</td>
                            <td data-label="Due Date">04/01/2016</td>

                            <td data-label="Amount">$1,190</td>
                            <td data-label="Period"></td>
                        </tr>
                        <tr>
                            <td scope="row" data-label="Account">Visa - 6076</td>
                            <td data-label="Due Date">03/01/2016</td>
                            <td data-label="Amount">$2,443</td>
                            <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td scope="row" data-label="Account">Corporate AMEX</td>
                            <td data-label="Due Date">03/01/2016</td>
                            <td data-label="Amount">$1,181</td>
                            <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td scope="row" data-label="Acount">Visa - 3412</td>
                            <td data-label="Due Date">02/01/2016</td>
                            <td data-label="Amount">$842</td>
                            <td data-label="Period">01/01/2016 - 01/31/2016</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <br /> <br /> <br />
            <Paper className="container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat (g)</TableCell>
                            <TableCell align="right">Carbs (g)</TableCell>
                            <TableCell align="right">Protein (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(({ id, name, calories, fat, carbs, protein }) => (
                            <TableRow key={id}>
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell align="right" >{calories}</TableCell>
                                <TableCell align="right" >{fat}</TableCell>
                                <TableCell align="right" >{carbs}</TableCell>
                                <TableCell align="right" >{protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>


            <br />

            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}


// DOM element
if (document.getElementById("user")) {
    ReactDOM.render(<User />, document.getElementById("user"));
}
















