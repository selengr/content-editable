import { memo, useCallback, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme, Typography } from "@mui/material";
import useActionOpenDialog from "@/hook/useActionOpenDialog";
import ConfirmDialog from "@/components/confirm-dialog/ConfirmDialog";
import AdvancedFormulaEditor from "@/components/AdvancedFormulaEditor";
import CreateCalculatorDialog from "./CreateCalculatorDialog";


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
    const [open, setOpen] = useState<boolean>(false);


    const handleCreateNewPage = useCallback(async () => {

    }, []);





    return (
        <>
            <LoadingButton
                variant="text"
                onClick={() => setOpen(true)}
                // loading={}
                fullWidth
                sx={buttonSx}
            >
                ایجاد محاسبه‌گر
            </LoadingButton>

            <CreateCalculatorDialog open={open} setOpen={setOpen} />

        </>
    );
};

export default CreateCalculator;
