import React from "react";
import CrudApi from "./../apiTable/components/CrudApi";
import YotaTable from "./tables-yota/YotaTable";

function App() {
    return (
        <>
            <h1>cOMPONENTS REACT JS</h1>
            <br/><br/><hr/>
            <YotaTable/>
            <br/><br/><hr/>
            <CrudApi/>
        </>
    );
}

export default App;
