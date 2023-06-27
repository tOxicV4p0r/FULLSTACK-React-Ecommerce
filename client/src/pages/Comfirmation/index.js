import { Alert, AlertTitle, Box } from "@mui/material";

const Confirmation = () => {
    return (
        <Box m="90px auto" width="80%" height="50vh">
            <Alert>
                <AlertTitle>Success</AlertTitle>
                You have successfully made an order -{" "}
                <strong>Congrats on making your purchase</strong>
            </Alert>
        </Box>
    )
};

export default Confirmation;