import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { shades } from '../../theme';

const importAll = (r) => {
    return r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {})
}

const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(handleClick, hasPrev, label) => (
                <IconButton
                    onClick={handleClick}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateBefore sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderArrowNext={(handleClick, hasPrev, label) => (
                <IconButton
                    onClick={handleClick}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        color: "white",
                        padding: "5px",
                        zIndex: "10",
                    }}
                >
                    <NavigateNext sx={{ fontSize: 40 }} />
                </IconButton>
            )}
        >
            {Object.values(heroTextureImports).map((image, index) => (
                <Box key={`carousel-image-${index}`}>
                    <img
                        src={image}
                        alt={`carousel-${index}`}
                        style={{
                            width: "100%",
                            height: "700px",
                            objectFit: "cover",
                            backgroundAttachment: "fixed",
                        }}
                    />
                    <Box
                        color="white"
                        padding="20px"
                        borderRadius="1px"
                        textAlign="left"
                        backgroundColor="rgb(0,0,0,0.4)"
                        position="absolute"
                        top="46%"
                        left={isNonMobile ? "10%" : "0"}
                        right={isNonMobile ? null : "0"}
                        margin={isNonMobile ? null : "0 auto"}
                        maxWidth={isNonMobile ? null : "240px"}
                    >
                        <Typography color={shades.neutral[500]}>-- NEW ITEMS</Typography>
                        <Typography variant='h1'>Summer Sale</Typography>
                        <Typography
                            color={shades.neutral[500]}
                            sx={{ textDecoration: "underline" }}
                        >
                            Discover More
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    )
};

export default MainCarousel;