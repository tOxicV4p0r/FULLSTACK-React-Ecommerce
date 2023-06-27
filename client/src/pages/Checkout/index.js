import { useSelector } from "react-redux";
import { Formik } from "formik"
import * as yup from "yup"
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { shades } from "../../theme";
import { useState } from "react";
import Shipping from "../../components/Shipping";
import Payment from "../../components/Payment";
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_live_51HEwcAAMXhWGrkC4kWWtctqnb3seFcFhAZaTvGXQtt7Cx22r3sbLx8Y1RsJM5DOvIjXWmj8wa0sJBpjUpsBa3zVc00QoLewo4R")

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    email: "",
    phoneNumber: "",
}

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required"),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),

            firstName: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            lastName: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            country: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            street1: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            street2: yup.string(),
            city: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            state: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
            zipCode: yup.string().when("isSameAddress", { is: false, then: () => yup.string().required("required") }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
    }),
];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector(state => state.cart.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (value, actions) => {
        setActiveStep(activeStep + 1);
        if (isFirstStep && value.shippingAddress.isSameAddress) {
            // console.log(value);
            actions.setFieldValue("shippingAddress", {
                ...value.billingAddress, isSameAddress: true,
            })
        } else {
            makePayment(value);
        }

        actions.setTouched({})
    }

    const makePayment = async (value) => {
        const stripe = await stripePromise;
        const reqBody = {
            userName: [value.firstName, value.lastName].join(" "),
            email: value.email,
            product: cart.map((id, count) => {
                return { id, count }
            }),
        }

        const res = await fetch("http://localhost:2999/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reqBody),
        });

        const session = await res.json();
        await stripe.redirectToCheckout({
            sessionId: session.id,
        })
    }

    return (
        <Box width="80%" m="100px auto">
            <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}
                >
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {
                                    isFirstStep ?
                                        <Shipping
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            setFieldValue={setFieldValue}
                                        />
                                        :
                                        isSecondStep ?
                                            <Payment
                                                values={values}
                                                errors={errors}
                                                touched={touched}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                            />
                                            : null
                                }

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    gap="20px"
                                >
                                    {
                                        !isSecondStep ?
                                            <Button
                                                fullWidth
                                                color="primary"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: shades.primary[200],
                                                    boxShadow: "none",
                                                    color: "white",
                                                    borderRadius: 0,
                                                    padding: "15px 40px"
                                                }}
                                                onClick={() => setActiveStep(activeStep - 1)}
                                            >
                                                Back
                                            </Button>
                                            : null
                                    }
                                    <Button
                                        fullWidth
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: shades.primary[400],
                                            boxShadow: "none",
                                            color: "white",
                                            borderRadius: 0,
                                            padding: "15px 40px"
                                        }}
                                        onClick={() => setActiveStep(activeStep + 1)}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </form>
                        )
                    }
                </Formik>
            </Box>
        </Box>
    )
};

export default Checkout;