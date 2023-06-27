import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import { AddSharp, CloseOutlined, PlusOneSharp, RemoveCircle, RemoveDoneOutlined, RemoveSharp } from "@mui/icons-material"
import { shades } from "../../theme";
import styled from "@emotion/styled";
import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from "../../state";

const FlexBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0)

    return (
        <Box
            display={isCartOpen ? "block" : "none"}
            backgroundColor="rgba(0,0,0,0.4)"
            position="fixed"
            zIndex="10"
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
        >
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >
                <Box
                    padding="30px"
                    overflow="auto"
                    height="100%"
                >
                    <FlexBox mb="15px">
                        <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen())}>
                            <CloseOutlined />
                        </IconButton>
                    </FlexBox>

                    <Box>
                        {
                            cart.map((item) => (
                                <Box key={`${item.attributes.name}-${item.id}`}>
                                    <FlexBox p="15px 0">
                                        <Box flex="1 1 40%">
                                            <img
                                                alt={item?.name}
                                                width="123px"
                                                height="164px"
                                                src={`http://localhost:2999${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                            />
                                        </Box>
                                        <Box flex="1 1 60%">
                                            <FlexBox mb="5px">
                                                <Typography fontWeight="bold">{item.attributes.name}</Typography>
                                                <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}><RemoveSharp /></IconButton>
                                            </FlexBox>
                                            <Typography>{item.attributes.shortDescription}</Typography>
                                            <FlexBox>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    border={`1.5px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                                                        <RemoveSharp />
                                                    </IconButton>
                                                    <Typography>{item.count}</Typography>
                                                    <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                                                        <AddSharp />
                                                    </IconButton>
                                                </Box>
                                                {/* PRICE */}
                                                <Typography fontWeight="bold">${item.attributes.price}</Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider />
                                </Box>
                            ))
                        }
                    </Box>

                    {/* ACTIONS */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[300],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                m: "20px 0",
                            }}
                            onClick={() => { navigate("/checkout"); dispatch(setIsCartOpen()); }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
};

export default CartMenu;