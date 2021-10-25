import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./app.scss";
import { shaRequest, stringRequest } from "./tasks";

export default function App() {
    const [stringInput, setStringInput] = useState({
        error: false,
        value: "",
    });
    const [shaView, setShaView] = useState({
        error: false,
        value: null as null | string,
    });

    const [shaInput, setShaInput] = useState({
        error: false,
        value: "",
    });
    const [stringView, setStringView] = useState({
        error: false,
        value: null as null | string,
    });

    function updateStringInputvalue(event: any) {
        setStringInput({
            error: event.target.value.length < 8,
            value: event.target.value,
        });
    }

    function updateShaInputValue(event: any) {
        setShaInput({
            error: false,
            value: event.target.value,
        });
    }

    async function shaReq(server: "go" | "node") {
        if (shaInput.error) {
            return;
        }
        try {
            const res = await shaRequest(shaInput.value, "go");
            setStringView({
                error: false,
                value: res,
            });
        } catch (err) {
            setStringView({
                error: true,
                value: "" + err,
            });
        }
    }

    async function stringReq(server: "go" | "node") {
        if (stringInput.error) {
            return;
        }
        try {
            const res = await stringRequest({ InputString: stringInput.value }, "go");
            setShaView({
                error: false,
                value: res,
            });
        } catch (err) {
            setShaView({
                error: true,
                value: "" + err,
            });
        }
    }

    return (
        <div className="main">
            <div className="container">
                <h2 className="header">String to Sha256</h2>
                {shaView.value && (
                    <div className={`view ${shaView.error ? "error" : ""}`}>{shaView.value}</div>
                )}
                <TextField
                    fullWidth
                    error={stringInput.error}
                    label="Enter String"
                    variant="outlined"
                    helperText={stringInput.error && "String length shoud be more than 8 chars"}
                    value={stringInput.value}
                    onChange={updateStringInputvalue}
                />
                <div className="buttons">
                    <Button variant="contained" color="primary" onClick={() => stringReq("go")}>
                        Go
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => stringReq("node")}>
                        NodeJS
                    </Button>
                </div>
            </div>
            <div className="container">
                <h2 className="header">Sha256 to String</h2>
                {stringView.value && (
                    <div className={`view ${stringView.error ? "error" : ""}`}>
                        {stringView.value}
                    </div>
                )}
                <TextField
                    fullWidth
                    error={shaInput.error}
                    label="Enter Sha256"
                    variant="outlined"
                    helperText={shaInput.error && "Error"}
                    value={shaInput.value}
                    onChange={updateShaInputValue}
                />
                <div className="buttons">
                    <Button variant="contained" color="primary" onClick={() => shaReq("go")}>
                        Go
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => shaReq("node")}>
                        NodeJS
                    </Button>
                </div>
            </div>
        </div>
    );
}
