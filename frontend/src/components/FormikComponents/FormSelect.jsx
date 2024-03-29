import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    FormHelperText,
    Tooltip,
    useMediaQuery,
} from "@mui/material";
import { useField } from "formik";

/**
 *
 * @param {import("@mui/material").SelectProps & { values: string[] }} props
 */
function FormTextField(props) {
    const { name, values, ...rest } = props;
    const [field, meta, helpers] = useField({
        name,
        type: "text",
        value: props.defaultValue || "",
    });

    useEffect(() => {
        if (rest.value) {
            helpers.setValue(rest.value);
        }
    }, []);

    // Force a rerender after 1 second to realign tooltip
    const [, forceRender] = useState();
    useEffect(() => {
        const timer = setTimeout(() => {
            forceRender(Date.now());
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (evt) => {
        helpers.setValue(evt.target.value);
    };

    const isMobile = useMediaQuery("(max-width: 600px)");
    const [tooltipOpen, setToolTipOpen] = useState(false);

    return (
        <>
            <Tooltip
                title={field.value}
                placement="top"
                open={isMobile || tooltipOpen}
                onMouseEnter={() => setToolTipOpen(true)}
                onMouseOut={() => setToolTipOpen(false)}
                arrow
            >
                <TextField
                    {...rest}
                    value={field.value}
                    onChange={handleChange}
                    error={!!meta.error}
                    disabled={values.includes(rest.value)}
                    select
                >
                    <MenuItem value={props.defaultValue || ""}>
                        {props.defaultValue || "\xa0"}
                    </MenuItem>
                    {values.map((value) => (
                        <MenuItem
                            key={value}
                            value={value}
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "pre-wrap",
                            }}
                        >
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            </Tooltip>
            <FormHelperText sx={{ color: "red" }}>{meta.error}</FormHelperText>
        </>
    );
}

export default FormTextField;
