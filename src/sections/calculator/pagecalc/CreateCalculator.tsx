import { memo, useCallback, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material";
import useActionOpenDialog from "@/hook/useActionOpenDialog";


const buttonSx: SxProps<Theme> = {
    height: 52,
    width: "100%",
    display: "flex",
    color: "#6F6F6F",
    cursor: "pointer",
    marginTop: "10px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #DDE1E6",
    "&:hover": {
        backgroundColor: "#F7F7FF"
    }
};


const CreateCalculator = () => {
    const setOpenDialog = useActionOpenDialog();



    const handleCreateNewPage = useCallback(async () => {

    }, []);





    return (
        <LoadingButton
            variant="text"
            onClick={() => setOpenDialog(true)}
            // loading={}
            fullWidth
            sx={buttonSx}
        >
            ایجاد محاسبه‌گر
        </LoadingButton>
    );
};

export default CreateCalculator;
