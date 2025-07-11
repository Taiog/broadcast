import { createContext, memo, useContext } from "react";
import { closeDialog, dialogs$ } from "./dialog-facade";
import MatDialog, { type DialogProps } from "@mui/material/Dialog";
import useBehavior from "../../core/hooks/use-behavior";

const DialogContext = createContext<Partial<DialogProps> | null>(null);

export function useCloseDialog() {
    const dialog = useContext(DialogContext);

    return () => closeDialog(dialog!);
}

function DialogApp() {
    const dialogs = useBehavior(dialogs$);

    return (
        <>
            {dialogs.map(dialog => {
                const { key, ...dialogWithoutKey } = dialog;

                return (
                    <DialogContext.Provider key={key} value={dialog}>
                        <MatDialog
                            open={true}
                            onClose={() => closeDialog(dialog)}
                            classes={{
                                paper: 'rounded-8',
                            }}
                            {...dialogWithoutKey}
                        />
                    </DialogContext.Provider>
                );
            })}
        </>
    );
}

export default memo(DialogApp);