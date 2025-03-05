import Image from "next/image";
// mui
import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
// public
import TrashIcon from "@/../public/images/home-page/trash.svg";

export default function PaymentPage() {
  // let test = [1, 2, 3, 4, 5,6,7,8,9,8,6,4,3]
  let test = [];
  return (
    <div
      dir="rtl"
      className="container mx-auto py-8 flex justify-center h-screen "
    >
      <div className="w-[500px] h-full"></div>
      <div className="w-[70%] bg-white rounded-[20px] mx-[6px] p-2 ">
        <div className="bg-[#F7F7FF] rounded-lg w-ful h-[52px] text-center] mb-8  flex justify-center items-center ">
          <h3 className="text-[#161616] font-bold text-base">سبد خرید</h3>
        </div>
        <div className="w-full h-[90%] justify-center items-center overflow-y-auto">
          <div className="px-16 h-full">
            {test.length > 0 &&
              test.map(() => (
                <div className="rounded-[20px] border-[1px] border-[#DDE1E6] h-[84px] flex justify-between p-4 m-3">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#393939]">بابت: </span>
                    <div className="flex">
                      <h6 className="text-[#393939] font-bold">
                        انتشار عمومی - فرم نظرسنجی دانشگاه{" "}
                      </h6>
                    </div>
                    <span className="text-[13px] text-[#393939]">
                      تعداد: <span className="font-bold">۳۰۰ عدد</span>
                    </span>
                  </div>

                  <IconButton
                    // onClick={() =>
                    //    handleRemoveShop(index)
                    // }
                    sx={{
                      width: "52px",
                      height: "52px",
                    }}
                  >
                    <Image
                      src={TrashIcon}
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </IconButton>
                </div>
              ))}
            {test.length === 0 && (
              <div className="w-full h-[80%] justify-center items-center flex flex-col">
                <Image
                  src="/images/home-page/empty-shopping-cart.svg"
                  alt="empty"
                  width={200}
                  height={200}
                  className="w-full h-full max-h-[400px]"
                />
                <span className="text-[#404040] font-bold text-[15px] -mt-20">
                  در حال حاضر سبد خرید شما خالی است
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[30%] bg-white rounded-[20px] p-2 flex flex-col justify-between">
        <div className="bg-[#F7F7FF] rounded-lg w-full min-h-[52px] text-center mb-3 flex justify-center items-center ">
          <h3 className="text-[#161616] font-bold text-base">صورتحساب</h3>
        </div>
        <div className="mb-10 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5].map(() => (
            <div className="bg-[#F7F7FF] rounded-[20px] w-ful text-center] my-[7px] mx-1 flex justify-center items-center flex-col p-4">
              <span className="text-[13px] text-[#393939] w-full">
                ردیف ۱:{" "}
                <span className="font-bold">
                  ۳۰۰ عدد ظرفیت بابت انتشار عمومی - فرم نظرسنجی دانشگاه
                </span>
              </span>
              <span className="font-bold text-[#393939] w-full text-end">
                ۷۰۰ هزار تومان
              </span>
            </div>
          ))}
        </div>
        <div>
          <div className="bg-[#F7F7FF] rounded-[20px] w-ful text-center] my-[6px] mx-1 flex justify-center items-center flex-col p-4">
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                مجموع:
              </span>
              <span className="font-bold text-[#393939]">۷۰۰ هزار تومان</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                مالیات:
              </span>
              <span className="font-bold text-[#393939]">۷۰ هزار تومان</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                قابل پرداخت:
              </span>
              <span className="font-bold text-[#393939]">٧۷ هزار تومان</span>
            </div>
          </div>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1758BA",
              borderRadius: "10px",
              height: "52px",
              width: "100%",
              marginX: "6px",
              marginY: "16px",
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "#1758BA",
              },
            }}
          >
            <span className="text-[14px] font-[500px]">پرداخت صورت حساب</span>
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
