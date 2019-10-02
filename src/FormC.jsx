import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {COMPONENTS_MAP} from "./App";
import * as yup from 'yup';
import {Field, Form, Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const { buildYup } = require("json-schema-to-yup");



function FormC({config}) {

    const [error, setError] = React.useState(false);
    const [errorCode, setErrorCode] = React.useState(null);

    const yupSchema = buildYup(config.validation, {});


    const classes = useStyles();

    return (
        <Container style={config.style} component="main" maxWidth="xs">
            <CssBaseline/>

            <Formik
                initialValues={{
                    userName: "",
                    password: "",
                    rememberMe: false
                }}
                onSubmit={(values) => {
                    setError(false);

                }}
                validationSchema={yupSchema}
            >
                {({errors, touched}) => (
                    <Form className={classes.form} autoComplete={'off'}>
                        {
                            config.children.map(c => {
                                const Component = COMPONENTS_MAP[c.componentType];
                                return <Component config={c} errors={errors}/>
                            })
                        }

                    </Form>
                )}
            </Formik>


        </Container>)
}



const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default FormC;