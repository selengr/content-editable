"use client"

import { useState } from "react"
import Image from "next/image"
import { LoadingButton } from "@mui/lab"
import { CartItem } from "./components/invoice-item"
import { InvoiceItem } from "./components/cart-item"
// import { InvoiceItem,CartItem  } from "./component"
// import { CartItem } from "./components/cart-item"

interface CartItemType {
  id: string
  title: string
  quantity: number
  price: number
  type: string
}

interface IPurchaseOrder {
  purchaseOrderId: number
  totalAmount: number
  tax: number
  payAble: number | null
  purchaseOrderDetailModels: IPurchaseOrderDetail[]
}

interface IPurchaseOrderProduct {
  title: string
}

interface IPurchaseOrderDetail {
  description: string | null
  purchaseOrderProductModels: IPurchaseOrderProduct[]
}

export default function PaymentPage() {
  const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrder>({
    purchaseOrderId: 1,
    totalAmount: 200000000,
    tax: 20000000,
    payAble: null,
    purchaseOrderDetailModels: [
      {
        description: "klwkrdfhj",
        purchaseOrderProductModels: [
          {
            title: "kk",
          },
        ],
      },
      {
        description: "testesths wfjchfc jhvg fhjfv",
        purchaseOrderProductModels: [
          {
            title: "hiiiiii",
          },
        ],
      },
    ],
  })

  // Track the selected item index, default to 0 (first item)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleRemoveDetail = (index: number) => {
    setPurchaseOrder((prev) => {
      const updatedDetails = [...prev.purchaseOrderDetailModels]
      updatedDetails.splice(index, 1)

      // Update selected index if needed
      if (selectedIndex >= updatedDetails.length) {
        setSelectedIndex(Math.max(0, updatedDetails.length - 1))
      } else if (index === selectedIndex && updatedDetails.length > 0) {
        // If we removed the selected item, select the next one
        setSelectedIndex(Math.min(selectedIndex, updatedDetails.length - 1))
      }

      return {
        ...prev,
        purchaseOrderDetailModels: updatedDetails,
      }
    })
  }

  const handleSelectItem = (index: number) => {
    setSelectedIndex(index)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount / 1000) + " هزار تومان"
  }

  // Use the values directly from the purchaseOrder object
  const subtotal = purchaseOrder.totalAmount
  const tax = purchaseOrder.tax
  const total = purchaseOrder.payAble ?? subtotal + tax

  return (
    <div dir="rtl" className="container mx-auto py-8 flex justify-center h-screen ">
      <div className="w-[500px] h-full"></div>
      <div className="w-[70%] bg-white rounded-[20px] mx-[6px] p-2 ">
        <div className="bg-[#F7F7FF] rounded-lg w-ful h-[52px] text-center] mb-8  flex justify-center items-center ">
          <h3 className="text-[#161616] font-bold text-base">سبد خرید</h3>
        </div>
        <div className="w-full h-[90%] justify-center items-center overflow-y-auto">
          <div className="px-16 h-full">
            {purchaseOrder.purchaseOrderDetailModels.length > 0 ? (
              <div className="space-y-3 px-2 md:px-8">
                {purchaseOrder.purchaseOrderDetailModels.map((detail, index) => (
                  <CartItem
                    key={index}
                    detail={detail}
                    index={index}
                    isSelected={index === selectedIndex}
                    onSelect={() => handleSelectItem(index)}
                    onRemove={() => handleRemoveDetail(index)}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-[80%] justify-center items-center flex flex-col">
                <Image
                  src="/images/home-page/empty-shopping-cart.svg"
                  alt="empty"
                  width={200}
                  height={200}
                  className="w-full h-full max-h-[400px]"
                />
                <span className="text-[#404040] font-bold text-[15px] -mt-20">در حال حاضر سبد خرید شما خالی است</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[30%] bg-white rounded-[20px] p-2 flex flex-col justify-between">
        <div className="bg-[#F7F7FF] rounded-lg w-full min-h-[52px] text-center mb-3 flex justify-center items-center ">
          <h3 className="text-[#161616] font-bold text-base">صورتحساب</h3>
        </div>
        <div className="mb-10 overflow-y-auto flex-grow">
          <div className="space-y-2">
            {purchaseOrder.purchaseOrderDetailModels.length > 0 && (
              <InvoiceItem
                key={selectedIndex}
                index={selectedIndex + 1}
                detail={purchaseOrder.purchaseOrderDetailModels[selectedIndex]}
              />
            )}
          </div>
        </div>
        <div>
          <div className="bg-[#F7F7FF] rounded-[20px] w-ful text-center] my-[6px] mx-1 flex justify-center items-center flex-col p-4">
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">مجموع:</span>
              <span className="font-bold text-[#393939]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">مالیات:</span>
              <span className="font-bold text-[#393939]">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">قابل پرداخت:</span>
              <span className="font-bold text-[#393939]">{formatCurrency(total)}</span>
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
  )
}

