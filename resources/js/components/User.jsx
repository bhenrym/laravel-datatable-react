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
    const classNamees = useStyles();

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
            <TableContainer component={Paper}>
                <Table className={classNamees.table} size="small" aria-label="a dense table">
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
                                <TableCell component="th" >
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

            <br /> <br /> <br />

            <div  className="YrnehPaper-root YrnehTableContainer-root YrnehPaper-elevation1 YrnehPaper-rounded">
                <table className="YrnehTable-root YrnehTableRowStriped YrnehTableRowHover YrnehTableCellSizeSmall YrnehTableCellBorder">
                    <thead className="YrnehTableHead-root">
                        <tr className="YrnehTableRow-root YrnehTableRow-head ">
                            <th className="YrnehTableCell-root YrnehTableCell-head YrnehTableCell-alignRight  " scope="col">Dessert&nbsp;(100g&nbsp;serving)</th>
                            <th className="YrnehTableCell-root YrnehTableCell-head  " scope="col">Calories</th>
                            <th className="YrnehTableCell-root YrnehTableCell-head  " scope="col">Fat&nbsp;(g)</th>
                            <th className="YrnehTableCell-root YrnehTableCell-head  " scope="col">Carbs&nbsp;(g)</th>
                            <th className="YrnehTableCell-root YrnehTableCell-head  " scope="col">Protein&nbsp;(g)</th>
                        </tr>
                    </thead>
                    <tbody className="YrnehTableBody-root">
                        <tr className="YrnehTableRow-root ">
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Dessert (100g serving)">Frozen yoghurt </td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Calories">159</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Fat&nbsp;(g)">6</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Carbs&nbsp;(g)">24</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Protein&nbsp;(g)">4</td>
                        </tr>
                        <tr className="YrnehTableRow-root ">
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Dessert (100g serving)">Ice cream </td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Calories">237</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Fat&nbsp;(g)">9</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Carbs&nbsp;(g)">37</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Protein&nbsp;(g)">4.3</td>
                        </tr>
                        <tr className="YrnehTableRow-root ">
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Dessert (100g serving)">Eclairsdfas </td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Calories">262</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Fat&nbsp;(g)">16</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Carbs&nbsp;(g)">&nbsp;</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Protein&nbsp;(g)">
                                Es fácil ver aquí cómo cada celda de encabezado en la tabla, provee información para el resto de las celdas en la columna a la que pertenece. Algunos agentes, como los navegadores de voz, hacen el mismo análisis cuando deben informar al usuario qué celda de encabezado está asociada a una celda en particular. Pero en algunos casos, las ambigüedades necesitan ser evitadas y es por este motivo que HTML provee algunos atributos como
                            </td>
                        </tr>
                        <tr className="YrnehTableRow-root ">
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Dessert (100g serving)">Ice cream </td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Calories">237</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Fat&nbsp;(g)">9</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Carbs&nbsp;(g)">37</td>
                            <td className="YrnehTableCell-root YrnehTableCell-body  " data-label="Protein&nbsp;(g)">4.3</td>
                        </tr>

                    </tbody>
                </table>
            </div>






            <div className="">

                <table>

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
                            <td >Visa - 3412</td>
                            <td data-label="Due Date">04/01/2016</td>

                            <td data-label="Amount">$1,190</td>
                            <td data-label="Period"></td>
                        </tr>
                        <tr>
                            <td data-label="Account">Visa - 6076</td>
                            <td data-label="Due Date">03/01/2016</td>
                            <td data-label="Amount">$2,443</td>
                            <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td data-label="Account">Corporate AMEX</td>
                            <td data-label="Due Date">03/01/2016</td>
                            <td data-label="Amount">$1,181</td>
                            <td data-label="Period">02/01/2016 - 02/29/2016</td>
                        </tr>
                        <tr>
                            <td data-label="Acount">Visa - 3412</td>
                            <td data-label="Due Date">02/01/2016</td>
                            <td data-label="Amount">$842</td>
                            <td data-label="Period">01/01/2016 - 01/31/2016</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <br /> <br /> <br />
        </>
    );
}


// DOM element
if (document.getElementById("user")) {
    ReactDOM.render(<User />, document.getElementById("user"));
}
















