"use client"

import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { CartItem, InvoiceItem } from "./components/cart-item"
// import { InvoiceItem } from "./components/invoice-item"
// import { cn } from "@/lib/utils"

// // Sample data structure
// interface CartItemType {
//   id: string
//   title: string
//   quantity: number
//   price: number
//   type: string
// }

// export default function PaymentPage() {
//   const [cartItems, setCartItems] = useState<CartItemType[]>([
//     // For testing, uncomment this sample data
//     /*
//     {
//       id: "1",
//       title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
//       quantity: 300,
//       price: 700000,
//       type: "ظرفیت"
//     }
//     */
//   ])

//   const handleRemoveItem = (id: string) => {
//     setCartItems(cartItems.filter((item) => item.id !== id))
//   }

//   // Calculate totals
//   const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
//   const tax = Math.round(subtotal * 0.1) // 10% tax
//   const total = subtotal + tax

//   // Format currency
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("fa-IR").format(amount / 1000) + " هزار تومان"
//   }

//   return (
//     <div dir="rtl" className="container mx-auto py-4 md:py-8 px-4 min-h-screen">
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
//         {/* Shopping Cart Section */}
//         <Card className="lg:col-span-8 h-full">
//           <CardHeader className="bg-[#F7F7FF] rounded-t-lg p-3">
//             <CardTitle className="text-center text-base font-bold text-[#161616]">سبد خرید</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 h-[calc(100%-60px)]">
//             {cartItems.length > 0 ? (
//               <ScrollArea className="h-[calc(100vh-200px)]">
//                 <div className="space-y-3 px-2 md:px-8">
//                   {cartItems.map((item) => (
//                     <CartItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
//                   ))}
//                 </div>
//               </ScrollArea>
//             ) : (
//               <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
//                 <div className="relative w-full h-64 mb-4">
//                   <Image
//                     src="/images/home-page/empty-shopping-cart.svg"
//                     alt="سبد خرید خالی"
//                     fill
//                     className="object-contain"
//                   />
//                 </div>
//                 <p className="text-[#404040] font-bold text-base mt-4">در حال حاضر سبد خرید شما خالی است</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Invoice Section */}
//         <Card className="lg:col-span-4 h-full flex flex-col">
//           <CardHeader className="bg-[#F7F7FF] rounded-t-lg p-3">
//             <CardTitle className="text-center text-base font-bold text-[#161616]">صورتحساب</CardTitle>
//           </CardHeader>
//           <CardContent className="p-4 flex flex-col flex-grow">
//             <ScrollArea className="flex-grow mb-4">
//               <div className="space-y-2">
//                 {cartItems.map((item, index) => (
//                   <InvoiceItem key={item.id} index={index + 1} item={item} />
//                 ))}
//               </div>
//             </ScrollArea>

//             <Card className="bg-[#F7F7FF] p-4 mt-auto">
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-sm text-[#393939]">مجموع:</span>
//                   <span className="font-bold text-[#393939]">{formatCurrency(subtotal)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-[#393939]">مالیات:</span>
//                   <span className="font-bold text-[#393939]">{formatCurrency(tax)}</span>
//                 </div>
//                 <Separator className="my-2" />
//                 <div className="flex justify-between">
//                   <span className="text-sm text-[#393939]">قابل پرداخت:</span>
//                   <span className="font-bold text-[#393939]">{formatCurrency(total)}</span>
//                 </div>
//               </div>
//             </Card>

//             <Button
//               className={cn(
//                 "mt-4 h-13 bg-[#1758BA] hover:bg-[#1246A1] text-white rounded-lg",
//                 "transition-colors duration-200",
//               )}
//               disabled={cartItems.length === 0}
//             >
//               پرداخت صورت حساب
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }



interface CartItemType {
  id: string
  title: string
  quantity: number
  price: number
  type: string
}



import Image from "next/image";
// mui
import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
// public
import TrashIcon from "@/../public/images/home-page/trash.svg";
import { InvoiceItem } from "./components/cart-item"
import { CartItem } from "./components/invoice-item"

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([

    {
      id: "345",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 370,
      price: 751000,
      type: "ظرفیت"
    },
    {
      id: "11",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 3,
      price: 456000,
      type: "ظرفیت"
    },
    {
      id: "22",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 31,
      price: 654000,
      type: "ظرفیت"
    },
    {
      id: "33",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 40,
      price: 655000,
      type: "ظرفیت"
    },
    {
      id: "44",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 10,
      price: 732000,
      type: "ظرفیت"
    },
    {
      id: "55",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 35,
      price: 755000,
      type: "ظرفیت"
    },
    {
      id: "66",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 38,
      price: 800000,
      type: "ظرفیت"
    },
    {
      id: "77",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 39,
      price: 700000,
      type: "ظرفیت"
    },
    {
      id: "88",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 11,
      price: 790000,
      type: "ظرفیت"
    },
    {
      id: "99",
      title: "انتشار عمومی - فرم نظرسنجی دانشگاه",
      quantity: 30,
      price: 700000,
      type: "ظرفیت"
    },
  ])

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = Math.round(subtotal * 0.1) 
  const total = subtotal + tax

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fa-IR").format(amount / 1000) + " هزار تومان"
  }




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
            {cartItems.length > 0 &&
                <div className="space-y-3 px-2 md:px-8">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
                ))}
              </div>
              }
            {cartItems.length === 0 && (
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
        <div className="mb-10 overflow-y-auto flex-grow">
        <div className="space-y-2">
                {cartItems.map((item, index) => (
                  <InvoiceItem key={item.id} index={index + 1} item={item} />
                ))}
              </div>
        </div>
        <div>
          <div className="bg-[#F7F7FF] rounded-[20px] w-ful text-center] my-[6px] mx-1 flex justify-center items-center flex-col p-4">
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                مجموع:
              </span>
              <span className="font-bold text-[#393939]">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                مالیات:
              </span>
              <span className="font-bold text-[#393939]">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-[13px] text-[#393939] font-[500px]">
                قابل پرداخت:
              </span>
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
  );
}
