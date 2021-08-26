
import axios from "axios";
import React, { useEffect, useState } from 'react';
import "./css/app.css";



const YotaTable = () => {

    const [data, setData] = useState({});


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


            <div className="YotaPaper-root YotaTableContainer-root YotaPaper-elevation1 YotaPaper-rounded">
                <table className="YotaTable-root YotaTableRowStriped YotaTableRowHover YotaTableCellSizeSmall YotaTableCellBorder">
                    <thead className="YotaTableHead-root">
                        <tr className="YotaTableRow-root YotaTableRow-head ">
                            <th className="YotaTableCell-root YotaTableCell-head YotaTableCell-alignRight  " scope="col">Dessert&nbsp;(100g&nbsp;serving)</th>
                            <th className="YotaTableCell-root YotaTableCell-head  " scope="col">Calories</th>
                            <th className="YotaTableCell-root YotaTableCell-head  " scope="col">Fat&nbsp;(g)</th>
                            <th className="YotaTableCell-root YotaTableCell-head  " scope="col">Carbs&nbsp;(g)</th>
                            <th className="YotaTableCell-root YotaTableCell-head  " scope="col">Protein&nbsp;(g)</th>


                        </tr>
                    </thead>
                    <tbody className="YotaTableBody-root">
                        <tr className="YotaTableRow-root ">
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Dessert (100g serving)">Frozen yoghurt </td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Calories">159</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Fat&nbsp;(g)">6</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Carbs&nbsp;(g)">24</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Protein&nbsp;(g)">4</td>
                        </tr>
                        <tr className="YotaTableRow-root ">
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Dessert (100g serving)">Ice cream </td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Calories">237</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Fat&nbsp;(g)">9</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Carbs&nbsp;(g)">37</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="">4.3</td>
                        </tr>
                        <tr className="YotaTableRow-root ">
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Dessert (100g serving)">Es fácil ver aquí cómo </td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Calories">262</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Fat&nbsp;(g)">16</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Carbs&nbsp;(g)">&nbsp;</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Protein&nbsp;(g)">
                                Es fácil ver aquí cómo cada celda de encabezado en la tabla, provee información para el resto de las celdas en la columna a la que pertenece. Algunos agentes, como los navegadores de voz, hacen el mismo análisis cuando deben informar al usuario qué celda de encabezado está asociada a una celda en particular. Pero en algunos casos, las ambigüedades necesitan ser evitadas y es por este motivo que HTML provee algunos atributos como
                            </td>
                        </tr>
                        <tr className="YotaTableRow-root ">
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Dessert (100g serving)">Ice cream </td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Calories">237</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Fat&nbsp;(g)">9</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Carbs&nbsp;(g)">37</td>
                            <td className="YotaTableCell-root YotaTableCell-body  " data-label="Protein&nbsp;(g)">4.3</td>
                        </tr>

                    </tbody>
                </table>
            </div>






        </>
    );
}


export default YotaTable;













