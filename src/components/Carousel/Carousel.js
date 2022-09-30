import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: "Welcome Banner",
        imgPath: "images/banner/welcome.png",
    },
    {
        label: "Jumping Prohibited",
        imgPath: "images/banner/noJumping.png",
    },
    {
        label: "Assist Verification",
        imgPath: "images/banner/assistVerification.png",
    },
    {
        label: "You need to be patient",
        imgPath: "images/banner/bePatient.png",
    },
    {
        label: "You need to be verified",
        imgPath: "images/banner/getVerified.png",
    },
    {
        label: "Secure Today!",
        imgPath: "images/banner/secureWith2FA.png",
    },
    {
        label: "Share Link",
        imgPath: "images/banner/shareLink.png",
    },
    {
        label: "Support Page",
        imgPath: "images/banner/support.png",
    },
    {
        label: "Updated Info",
        imgPath: "images/banner/updateInfo.png",
    },
    {
        label: "Limited Board View",
        imgPath: "images/banner/limitedBoardView.png",
    },
];

export default function CarouselFrontPage() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Grid>
            <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                interval={10000}
            >
                {images.map((step, index) => (
                    <Grid item={12} key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                margin="auto"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                component="img"
                                sx={{
                                    overflow: "hidden",
                                    width: "75%",
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </Grid>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                style={{ backgroundColor: "transparent" }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        variant="outlined"
                        disabled={activeStep === maxSteps - 1}
                        style={{ color: "white" }}
                    >
                        Next
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        variant="outlined"
                        style={{ color: "white" }}
                    >
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Grid>
    );
}
