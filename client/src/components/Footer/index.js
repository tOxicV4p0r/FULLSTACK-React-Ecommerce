import { Box, Typography, useTheme } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
    const { palette: { neutral } } = useTheme()

    return (
        <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20%, 30%, 40%)" >
                    <Typography
                        variant="h2"
                        fontWeight="bold"
                        mb="30px"
                        color={shades.primary[500]}
                    >
                        ECOMMER
                    </Typography>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                    </div>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">About Us</Typography>
                    <Typography mb="15px">Careers</Typography>
                    <Typography mb="15px">Our Stores</Typography>
                    <Typography mb="15px">Terms & Conditions</Typography>
                    <Typography mb="15px">Privacy Policy</Typography>
                </Box>

                <Box>
                    <Typography variant="h4" fontWeight="bold" mb="30px">Customer Care</Typography>
                    <Typography mb="15px">Help Center</Typography>
                    <Typography mb="15px">Track Your Order</Typography>
                    <Typography mb="15px">Corporate & Bulk Rurchasing</Typography>
                    <Typography mb="15px">Return & Refunds</Typography>
                </Box>

                <Box width="clamp(20%, 25%, 30%)" >
                    <Typography variant="h4" fontWeight="bold" mb="30px">Contact Us</Typography>
                    <Typography mb="15px">50 north Whatever, Washington, DC 10510</Typography>
                    <Typography mb="15px">Email: something@gmail.com</Typography>
                    <Typography mb="15px">(222)333-4444</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;