import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import Item from "../Item";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector(state => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const getItems = async () => {
        const items = await fetch('http://localhost:2999/api/items?populate=image', { method: "GET" })
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
        // console.log("🚀 ~ file: index.js:9 ~ ShoppingList ~ items:", itemsJson.data)
    };

    useEffect(() => {
        getItems();
    }, []) // elint-disable-line react-hooks/exhaustive-deps

    return (
        <Box width="80%" margin="80px auto">
            <Typography variant="h3" textAlign="center">
                Our Featured <b>Products</b>
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: { display: isNonMobile ? "block" : "none" }
                }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap"
                    }
                }}
            >
                <Tab value="all" label="ALL" />
                <Tab value="newArrivals" label="NEW ARRIVALS" />
                <Tab value="bestSellers" label="BEST SELLERS" />
                <Tab value="topRated" label="TOP RATED" />
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {
                    value === 'all' && items.map((e) => (
                        <Item item={e} key={`${e.name}-${e.id}`} />
                    ))
                }
                {
                    value != 'all' && items
                        .filter(item => item.attributes.category === value)
                        .map((e) => (
                            <Item item={e} key={`${e.name}-${e.id}`} />
                        ))
                }
            </Box>
        </Box>
    )
};

export default ShoppingList;