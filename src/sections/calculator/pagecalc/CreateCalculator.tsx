import { memo, useCallback, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { SxProps, Theme, Typography } from "@mui/material";
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
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


    const handleCreateNewPage = useCallback(async () => {

    }, []);





    return (
        <>
            <LoadingButton
                variant="text"
                onClick={() =>   setOpenConfirmDialog(true)}
                // loading={}
                fullWidth
                sx={buttonSx}
            >
                ایجاد محاسبه‌گر
            </LoadingButton>

            {openConfirmDialog && (
                <ConfirmDialog
                    content={
                        <>
                            <Typography fontWeight="700">
                                آیا از عملیات حذف گروه سوال اطمینان دارید؟
                            </Typography>
                            <Typography
                                sx={{
                                    marginTop: "15px",
                                    fontSize: "14px",
                                    textAlign: "justify",
                                    fontWeight: "700",
                                }}
                            >
                                <PiWarningOctagonFill
                                    size="1.35rem"
                                    color="#ffc107"
                                    className="inline-block ml-1"
                                />
                                در صورت زدن دکمه تایید، گروه سوال به همراه تمام سوالات آن حذف
                                می‌شوند
                            </Typography>
                        </>
                    }
                    open={openConfirmDialog}
                    title="حذف گروه سوال"
                    loading={loadingDeleteData}
                    onClose={() => setOpenConfirmDialog(false)}
                    cancelText="انصراف"
                    action={
                        <LoadingButton
                            type="submit"
                            fullWidth
                            disableRipple
                            variant="contained"
                            loading={loadingDeleteData}
                            sx={{
                                height: "50px",
                                fontWeight: "400",
                                fontSize: "15px",
                                borderRadius: "10px",
                                borderColor: "#1758BA",
                                boxShadow: "none",
                                "&.MuiButtonBase-root:hover, &.MuiButtonBase-root:active": {
                                    bgcolor: "#1758BA",
                                    boxShadow: "none",
                                },
                            }}
                            onClick={async () => {
                                try {
                                    setLoadingDeleteData(true);
                                    const res: any = await AxiosApi.delete(
                                        `/question-group/${groupId}`
                                    );
                                    if (res.data) {
                                        toast.success("گروه سوال با موفقیت حذف شد");
                                        deleteQuestionGroup(groupId);
                                    } else {
                                        toast.error("ناموفق بود مجددا امتحان فرمایید");
                                    }
                                } catch (error) {
                                    console.log(error);
                                } finally {
                                    setAnchorEl(null);
                                    setLoadingDeleteData(false);
                                }
                            }}
                        >
                            تایید
                        </LoadingButton>
                    }
                />
            )}
        </>
    );
};

export default CreateCalculator;
