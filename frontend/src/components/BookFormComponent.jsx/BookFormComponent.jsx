import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import CheckMarkIcon from "../IconAnimations/CheckMarkIcon";
import FormSelect from "../FormikComponents/FormSelect";
import FormTextField from "../FormikComponents/FormTextField";

/**
 * Regular expression link to
 * https://stackoverflow.com/a/39990702/7514621
 */
const MOBILE_REG_EXP =
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

const SLIDE_LEFT_OPACITY = {
    initial: {
        x: "300px",
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.5,
        },
    },
    exit: {
        x: "-300px",
        opacity: 0,
    },
};

/**
 *
 * @param {{ services: string[], setActiveService?: number, dialogMode?: boolean, handleClose?: function }} props
 */
function BookFormComponent(props) {
    const classes = makeStyles((theme) => ({
        card: {
            maxWidth: "600px",
            width: "100%",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& :not(:last-child)": {
                marginBottom: "0.3rem",
            },
        },
        group: {
            display: "flex",
            justifyContent: "space-evenly",
            "& :not(:last-child)": {
                marginRight: "0.2rem",
            },
            "@media (max-width: 500px)": {
                display: "unset",
                justifyContent: "unset",
                "& :not(:last-child)": {
                    marginRight: "unset",
                    marginBottom: "0.3rem",
                },
            },
        },
    }))();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (values, { resetForm }) => {
        setIsLoading(true);
        resetForm();
    };

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
                setIsSuccess(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                setIsSuccess(false);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const formSchema = Yup.object().shape({
        firstname: Yup.string(),
        lastname: Yup.string(),
        email: Yup.string().email("Invalid email address"),
        mobile: Yup.string().matches(MOBILE_REG_EXP, "Invailid mobile number"),
        service: Yup.string(),
        message: Yup.string(),
    });

    return (
        <>
            <Formik
                initialValues={{
                    firstname: "",
                    lastname: "",
                    email: "",
                    mobile: "",
                    service: "",
                    message: "",
                }}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
            >
                {(formik) => (
                    <Form className={classes.card}>
                        <Card
                            elevation={10}
                            sx={{
                                borderRadius: "6px",
                                background: "rgba(255, 255, 255, 0.8)",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                boxShadow: "6px 6px 5px rgba(0, 0, 0, 0.2)",
                                backdropFilter: "blur(5px)",
                                border: "1px solid rgba(200, 200, 200, 0.1)",
                            }}
                        >
                            <motion.div
                                initial={{ x: "-300px", opacity: 0 }}
                                animate={{
                                    x: 0,
                                    transition: {
                                        duration: 0.8,
                                    },
                                    opacity: 1,
                                }}
                                exit={{ x: "-300px" }}
                                transition={{ duration: 0.5 }}
                            >
                                <CardHeader
                                    title="Booking"
                                    titleTypographyProps={{
                                        variant: "h4",
                                        sx: {
                                            fontWeight: "400",
                                        },
                                    }}
                                />
                            </motion.div>
                            <CardContent className={classes.content}>
                                <motion.div
                                    variants={SLIDE_LEFT_OPACITY}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                >
                                    <FormSelect
                                        name="service"
                                        label="Select a service"
                                        value={props.setActiveService}
                                        values={props.services}
                                        size="small"
                                        sx={{ width: "60%" }}
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    className={classes.group}
                                    variants={SLIDE_LEFT_OPACITY}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                >
                                    <FormTextField
                                        name="firstname"
                                        label="First name"
                                        autoComplete="given-name"
                                        sx={{ width: "100%" }}
                                        required
                                    />
                                    <FormTextField
                                        name="lastname"
                                        label="Last name"
                                        autoComplete="family-name"
                                        sx={{ width: "100%" }}
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    className={classes.group}
                                    variants={SLIDE_LEFT_OPACITY}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                >
                                    <FormTextField
                                        name="email"
                                        label="Email"
                                        autoComplete="email"
                                        sx={{ width: "100%" }}
                                        required
                                    />
                                    <FormTextField
                                        name="mobile"
                                        label="Mobile"
                                        autoComplete="tel"
                                        sx={{
                                            width: "80%",
                                            "@media (max-width: 500px)": {
                                                width: "100%",
                                            },
                                        }}
                                        required
                                    />
                                </motion.div>
                                <motion.div
                                    variants={SLIDE_LEFT_OPACITY}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.5 }}
                                >
                                    <FormTextField
                                        name="message"
                                        label="Message (optional)"
                                        autoComplete="off"
                                        rows={6}
                                        sx={{
                                            width: "100%",
                                            zIndex: 1,
                                        }}
                                        multiline
                                    />
                                </motion.div>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "right" }}>
                                <motion.div
                                    style={{ display: "flex" }}
                                    initial={{
                                        x: -2,
                                        y: -70,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            duration: 1,
                                            delay: 1,
                                            bounce: 0.6,
                                        },
                                    }}
                                    exit={{
                                        x: -300,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                            transition: {
                                                duration: 0.2,
                                            },
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                            transition: {
                                                duration: 0.1,
                                            },
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            size="medium"
                                            sx={{
                                                color: "white",
                                                marginRight: "0.5rem",
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </motion.div>
                                    {props.dialogMode && (
                                        <motion.div
                                            whileHover={{
                                                scale: 1.05,
                                                transition: {
                                                    duration: 0.2,
                                                },
                                            }}
                                            whileTap={{
                                                scale: 0.95,
                                                transition: {
                                                    duration: 0.1,
                                                },
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="medium"
                                                sx={{
                                                    color: "white",
                                                    marginRight: "0.5rem",
                                                }}
                                                onClick={
                                                    props.handleClose || null
                                                }
                                            >
                                                Close
                                            </Button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>
            <Backdrop
                open={isLoading || isSuccess}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    transition: "all 1s fadeInOut",
                }}
            >
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <CircularProgress color="primary" size="5rem" />
                    </motion.div>
                )}
                {isSuccess && (
                    <CheckMarkIcon
                        width={100}
                        height={100}
                        offset={12}
                        color="#22bb33"
                    />
                )}
            </Backdrop>
        </>
    );
}

export default BookFormComponent;
