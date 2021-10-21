import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./app.scss"
import { sendString } from "./tasks";

export default function App() {
    const [state, setState] = useState({
        error: false,
        inputValue: "",
    });

    function updateInputValue(event: any) {
        setState({
            error: event.target.value.length < 8,
            inputValue: event.target.value,
        });
    }

    async function goRequest() {
        await sendString(state.inputValue);
    }

    return (
        <div className="container">
            <TextField
                fullWidth
                error={state.error}
                label="Enter String"
                variant="outlined"
                helperText={state.error && "String length shoud be more than 8 chars"}
                value={state.inputValue}
                onChange={updateInputValue}
            />
            <div className="buttons">
                <Button variant="contained" color="primary" onClick={goRequest}>
                    Go
                </Button>
                <Button variant="contained" color="secondary">
                    NodeJS
                </Button>
            </div>
        </div>
    );
}
