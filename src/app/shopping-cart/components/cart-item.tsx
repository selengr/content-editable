interface IPurchaseOrderProduct {
  title: string
}

interface IPurchaseOrderDetail {
  description: string | null
  purchaseOrderProductModels: IPurchaseOrderProduct[]
}

interface InvoiceItemProps {
  detail: IPurchaseOrderDetail
  index: number
}

export function InvoiceItem({ detail, index }: InvoiceItemProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#F7F7FF] rounded-lg">
      <div className="flex items-center gap-2">
        <span className="font-bold text-[#161616]">{index}.</span>
        <span className="font-medium text-[#161616]">{detail.purchaseOrderProductModels[0]?.title || "محصول"}</span>
      </div>
      {detail.description && (
        <span className="text-sm text-[#404040] truncate max-w-[150px]">{detail.description}</span>
      )}
    </div>
  )
}



// interface InvoiceItemProps {
//   index: number;
//   item: {
//     title: string;
//     quantity: number;
//     price: number;
//     type?: string;
//   };
// }

// //invoice item

// export function InvoiceItem({ index, item }: InvoiceItemProps) {
//   return (
//     <div className="bg-[#F7F7FF] rounded-2xl p-3">
//       <span className="text-xs text-[#393939] block">
//         ردیف {new Intl.NumberFormat("fa-IR").format(index)}:{" "}
//         <span className="font-bold">
//           {new Intl.NumberFormat("fa-IR").format(item.quantity)} عدد{" "}
//           {item.type || ""} بابت {item.title}
//         </span>
//       </span>
//       <span className="font-bold text-[#393939] block text-left mt-1">
//         {new Intl.NumberFormat("fa-IR").format(item.price / 1000)} هزار تومان
//       </span>
//     </div>
//   );
// }
