import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setInHovered] = useState(false);
    const { palette: { neutral } } = useTheme();

    const { category, price, name, image } = item.attributes;
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url },
                }
            }
        }
    } = image;

    return (
        <Box width={width}>

        </Box>
    )
};

export default Item;