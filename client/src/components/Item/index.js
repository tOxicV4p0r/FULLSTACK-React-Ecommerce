import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { AddSharp, RemoveSharp } from "@mui/icons-material";
import { addToCart } from "../../state";

const item = {
    attributes: {
        price: 20,
        name: 'Floral Embroidered Kimono',
        shortDescription: 'Embrace bohemian elegance with this floral embroidered kimono.',
        longDescription: 'Elevate your outfit with the Floral Embroidered Kimono. This lightweight and flowy kimono features intricate floral embroidery that adds a touch of femininity and bohemian flair. The loose fit and open-front design make it a versatile layering piece for any season. Whether you wear it over a dress or pair it with jeans, this kimono will instantly enhance your look.',
        category: 'toprated',
        image: {
            data: {
                attributes: {
                    formats: {
                        medium: { url: '#' },
                    }
                }
            }
        }
    },
};

const Item = ({
    // item,
    width = 300
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
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
            <Box
                position="relative"
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <img
                    alt={item.name}
                    width="300px"
                    height="400px"
                    src={`http://localhost:2999${url}`}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                />
                <Box
                    display={isHovered ? "block" : "none"}
                    position="absolute"
                    bottom="10%"
                    left="0"
                    width="100%"
                    padding="0 5%"
                >
                    <Box display="flex" justifyContent="space-between">
                        <Box
                            display="flex"
                            alignContent="center"
                            backgroundColor={shades.neutral[100]}
                            borderRadius="3px"
                        >
                            <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                                <RemoveSharp />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton onClick={() => setCount(count + 1)}>
                                <AddSharp />
                            </IconButton>
                        </Box>

                        <Button
                            onClick={() => { dispatch(addToCart({ item: { ...item, count } })) }}
                            sx={{ backgroundColor: shades.primary[300], color: "white" }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box mt="3px">
                <Typography variant="subtitle2" color={neutral.dark}>
                    {
                        category
                            .replace(/([A-Z])/g, "$1")
                            .replace(/^./, (str) => str.toUpperCase())
                    }
                </Typography>
                <Typography>{name}</Typography>
                <Typography fontWeight="bold">${price}</Typography>
            </Box>
        </Box>
    )
};

export default Item;