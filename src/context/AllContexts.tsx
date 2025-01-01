import { createContext, Dispatch, SetStateAction } from "react";



/* --------------------------- Open Dialog Context: Value & Action -------------------------- */
export const ActionOpenDialogContext = createContext<Dispatch<
  SetStateAction<boolean>
> | null>(null);
export const OpenDialogContext = createContext<null | boolean>(null);

