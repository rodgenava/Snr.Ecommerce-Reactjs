import { createContext, useReducer } from "react";
import { DownloadStatuses } from "../Componets/DownloadsContainer";

const DownloadsContext = createContext({});

const downloadsReducer = (state, action) => {
    switch (action.type) {
        case "NEW": return [
            {
                id: new Date().getTime(),
                state: DownloadStatuses.PreDownload,
                ...action.newItem,
            },
            ...state
         ];
         case "ITEM_CHANGED":

            const item = state.filter((i) => i.id == action.item.id);

            if(item.length > 0){
                item[0].state = action.item.state
            }
            console.log(item[0]);
            return state;

        default: return state;
      }
} 



export const DownloadsProvider = ({ children }) => {

    const [downloads, downloadsDispatcher] = useReducer(downloadsReducer, []);

    return (
        <DownloadsContext.Provider value={{ downloads, downloadsDispatcher }}>
            {children}
        </DownloadsContext.Provider>
    )
}

export default DownloadsContext;