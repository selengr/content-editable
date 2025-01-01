import { memo, useCallback, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme } from "@mui/material";


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
    const [newPageIsLoading, setNewPageIsLoading] = useState<boolean>(false);



    const handleCreateNewPage = useCallback(async () => {

    }, []);



    return (
        <LoadingButton
            variant="text"
            onClick={handleCreateNewPage}
            loading={newPageIsLoading}
            fullWidth
            sx={buttonSx}
        >
            ایجاد محاسبه‌گر
        </LoadingButton>
    );
};

export default CreateCalculator;
