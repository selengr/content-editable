"use client";

import { CgClose } from "react-icons/cg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AdvancedFormulaEditor from "@/components/AdvancedFormulaEditor";



const CreateCalculatorDialog = ({ open }: { open: boolean }) => {



    const handleClose = () => {
        // setOpen((prev) => !prev);
    };

    return (
        <Dialog
            open={open}
            dir="ltr"
            maxWidth="md"
            sx={{
                overflow: "hidden",
                scrollbarWidth: "none",
                "& .MuiPaper-root": {
                    borderRadius: "24px",
                    margin: "10px",
                },
                "& .MuiDialog-container": {
                    backdropFilter: "blur(4px)",
                    backgroundColor: "hsl(0deg 0% 100% / 50%)",
                },
            }}
        >
            {!open && (
                <div className="flex items-center justify-start">
                    <button className="mx-4 mt-4 mb-0" onClick={handleClose}>
                        <CgClose color="#404040" width={25} height={25} size="1.5rem" />
                    </button>
                </div>
            )}
            <DialogContent
                dir="rtl"
                sx={{
                    maxHeight: "75vh",
                    scrollbarWidth: "thin",
                    maxWidth: "100%",
                    // width: "450px",
                    paddingX: 1,
                    paddingBottom: 0,
                    paddingTop: 0,
                }}
            >

                <AdvancedFormulaEditor />

            </DialogContent>

        </Dialog >
    );
}

export default CreateCalculatorDialog;
