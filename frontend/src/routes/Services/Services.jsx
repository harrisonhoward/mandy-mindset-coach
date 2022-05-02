import React from "react";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import ServicesCard from "../../components/ServicesCard/ServicesCard";

import fadeInOut from "../../animations/fadeInOut";

const SERVICES_DETAILS = [
    {
        title: "Wellness and Career Life Coaching",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Adipisci, debitis quae. Error id accusamus praesentium nemo " +
            "ullam odit molestias labore quo non itaque dicta vitae, eum " +
            "possimus dolore quasi inventore? Animi sequi culpa harum.",
        image: "https://cdn.pixabay.com/photo/2017/03/28/12/06/chairs-2181916_960_720.jpg",
    },
    {
        title: "Corporate Team Building",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Adipisci, debitis quae. Error id accusamus praesentium nemo " +
            "ullam odit molestias labore quo non itaque dicta vitae, eum " +
            "possimus dolore quasi inventore? Animi sequi culpa harum.",
        image: "https://cdn.pixabay.com/photo/2017/03/28/12/06/chairs-2181916_960_720.jpg",
    },
    {
        title: "Leadership and Resilience Programs",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
            "Adipisci, debitis quae. Error id accusamus praesentium nemo " +
            "ullam odit molestias labore quo non itaque dicta vitae, eum " +
            "possimus dolore quasi inventore? Animi sequi culpa harum.",
        image: "https://cdn.pixabay.com/photo/2017/03/28/12/06/chairs-2181916_960_720.jpg",
    },
];

function Services() {
    return (
        <motion.div {...fadeInOut()} transition={{ duration: 0.5 }}>
            <Grid
                container
                columnSpacing={3}
                justifyContent="space-evenly"
                marginTop="3rem"
                marginBottom="3rem"
                rowGap="1rem"
            >
                {SERVICES_DETAILS.map((service, index) => (
                    <Grid item key={index}>
                        <ServicesCard {...service} />
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
}

export default Services;