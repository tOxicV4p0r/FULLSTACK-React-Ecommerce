import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../state";
import Item from "../../components/Item";
import { baseURL, fetchItem, fetchItems } from "../../service/api";
import { AddSharp, FavoriteBorderOutlined, RemoveSharp } from "@mui/icons-material";
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { shades } from "../../theme";

const ItemDetails = () => {
    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState("description");
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const getItem = async () => {
        const dataJson = await fetchItem(itemId);
        setItem(dataJson.data);
    };

    const getItems = async () => {

        const dataJson = await fetchItems();
        setItems(dataJson.data);
    };

    useEffect(() => {
        getItem();
        getItems();
    }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            width="80%"
            m="80px auto"
        >
            <Box
                display="flex"
                flexWrap="wrap"
                columnGap="40px"
            >
                {/* IMAGES */}
                <Box flex="1 1 40%" mb="40px">
                    <img
                        alt={item?.attributes?.name}
                        width="100%"
                        height="100%"
                        src={`${baseURL}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        style={{ objectFit: "contain" }}
                    />
                </Box>

                {/* ACTIONS */}
                <Box flex="1 1 50%" mb="40px">
                    <Box display="flex" justifyContent="space-between">
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>

                    <Box m="65px 0 25px 0">
                        <Typography variant="h3">{item?.attributes.name}</Typography>
                        <Typography>${item?.attributes.price}</Typography>
                        <Typography sx={{ mt: "20px" }}>{item?.attributes.longDescription}</Typography>
                    </Box>

                    {/* COUNT ANT BUTTON */}
                    <Box display="flex" alignContent="center" minHeight="50px">
                        <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[300]}`}
                            mr="20px"
                            p="2px 5px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveSharp />
                            </IconButton>
                            <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddSharp />
                            </IconButton>
                        </Box>
                        <Button
                            sx={{
                                backgroundColor: "#222222",
                                color: "white",
                                borderRadius: 0,
                                minWidth: "150px",
                                padding: "10px 40px",
                                "&:hover": { color: "black" }
                            }}
                            onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                        >
                            Add To Cart
                        </Button>
                    </Box>

                    <Box>
                        <Box m="20px 0 5px 0" display="flex">
                            <FavoriteBorderOutlined />
                            <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                        </Box>
                        <Typography>CATEGORY: {item?.attributes?.category}</Typography>
                    </Box>

                </Box>
            </Box>

            {/* INFORMATION */}
            <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {
                    value === "description" ?
                        <div>{item?.attributes?.longDescription}</div>
                        :
                        <div></div>
                }
                {
                    value === "reviews" ?
                        <div>{item?.attributes?.shortDescription}</div>
                        :
                        <div></div>
                }
            </Box>

            {/* RELATED ITEMS */}
            <Box mt="50px" width={"100%"}>
                <Typography variant="h3" fontWeight="bold">
                    Related Products
                </Typography>
                <Box
                    mt="20px"
                    display="flex"
                    flexWrap="wrap"
                    columnGap="1.33%"
                    justifyContent="space-between"
                >
                    {
                        items.slice(0, 4).map((item, i) => {
                            return <Item key={`${item.name}-${i}`} item={item} />
                        })
                    }
                </Box>
            </Box>

        </Box >
    )
};

export default ItemDetails;