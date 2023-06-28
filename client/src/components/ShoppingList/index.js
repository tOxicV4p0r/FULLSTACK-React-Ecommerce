import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { fetchItems } from "../../service/api";
import Item from "../Item";
import { Box, Skeleton, Stack, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";

const skel = (round) => {
    let el = []
    for (let i = 0; i < round; i++) {
        el.push(
            <Stack spacing={1}>
                <Skeleton variant="rectangular" width="100%" height="400px" />
                <Skeleton variant="rectangular" width="30%" height="14px" />
                <Skeleton variant="rectangular" width="70%" height="20px" />
                <Skeleton variant="rectangular" width="10%" height="15px" />
            </Stack>
        )
    }

    return el;
};

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const items = useSelector(state => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    const getItems = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const dataJson = await fetchItems();
        dispatch(setItems(dataJson.data));
        setIsLoading(false);
        // console.log("🚀 ~ file: index.js:9 ~ ShoppingList ~ items:", dataJson.data)
    };

    useEffect(() => {
        getItems();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

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
                    value !== 'all' && items
                        .filter(item => item.attributes.category === value)
                        .map((e) => (
                            <Item item={e} key={`${e.name}-${e.id}`} />
                        ))
                }
                {
                    isLoading ?
                        skel(5)
                        : null
                }
            </Box>
        </Box>
    )
};

export default ShoppingList;