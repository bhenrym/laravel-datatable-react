import React from "react";
import CrudApi from "./../apiTable/components/CrudApi";
import YotaTable from "./tables-yota/YotaTable";

function App() {
    return (
        <>
            <CrudApi></CrudApi>
            <h1>Ejercicios con React</h1>
            < YotaTable />
        </>
    );
}

export default App;
