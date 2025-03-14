import Image from "next/image";
import { IconButton } from "@mui/material";
// public
import TrashIcon from "@/../public/images/home-page/trash.svg";


interface IPurchaseOrderProduct {
  title: string
}

interface IPurchaseOrderDetail {
  description: string | null
  purchaseOrderProductModels: IPurchaseOrderProduct[]
}

interface CartItemProps {
  detail: IPurchaseOrderDetail
  index: number
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
}



export function CartItem({ detail, index, isSelected, onSelect, onRemove }: CartItemProps) {
 
  return (
    <div className="flex items-center justify-between p-4 border border-[#DDE1E6] rounded-2xl">
      <div className="flex flex-col">
        <span className="text-xs text-[#393939]">بابت: </span>
        <h6 className="text-[#393939] font-bold">{detail.purchaseOrderProductModels[0]?.title || "محصول"}</h6>
        {/* <span className="text-xs text-[#393939]">
          تعداد:{" "}
          <span className="font-bold">
            {new Intl.NumberFormat("fa-IR").format(item.quantity)} عدد
          </span>
        </span> */}
        {detail.description && <span className="text-sm text-[#404040]">{detail.description}</span>}
      </div>

      <IconButton
        // onClick={onRemove}
        onClick={(e) => {
          e.stopPropagation() 
          onRemove()
        }}
        sx={{
          width: "52px",
          height: "52px",
        }}
      >
        <Image src={TrashIcon} alt="delete" width={24} height={24} />
      </IconButton>
    </div>
  );
}
