import React from 'react';
import './App.css';
import FormC from './FormC';
import config from './editor/config';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Field, Form} from "formik";

const Label = ({config}) => {
    return <Typography component={config.config.component} variant={config.config.variant}>
        {config.config.text}
    </Typography>
};

const ActionButton = ({config}) => {
    const c = config.config;
    return <Button
            style={config.style}
            type={c.type}
            fullWidth={c.fullWidth}
            variant={c.variant}
            color={c.color}
        >
        {c.text}
        </Button>
};



const InputField = ({config, errors}) => {
    console.log(errors);
    const c = config.config;
    return  <Field
        validateOnBlur
        validateOnChange
        name={c.name}
        render={({field, form}) => (
            <TextField
                style={config.style}
                value={field.value}
                onChange={event => {
                    const {value} = event.target;
                    form.setFieldValue(
                        field.name,
                        value
                    );
                }}
                error={errors[c.name]}
                helperText={errors[c.name]}
                variant={c.variant}
                margin={c.margin}
                required={c.required}
                fullWidth={c.fullWidth}
                name={c.name}
                label={c.label}
            />
        )}
    />

};


export const COMPONENTS_MAP = {
    "FormC": FormC,
    "Label": Label,
    "InputField": InputField,
    "ActionButton": ActionButton
};


function App() {
    return (
        <div className="App">
            {
                config.structure.components.map(c => {
                    const Component = COMPONENTS_MAP[c.componentType];
                    return <Component config={c}/>
                })
            }
        </div>
    );
}

export default App;
