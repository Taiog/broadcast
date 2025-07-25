import type { DialogProps } from "@mui/material/Dialog";
import type { PaperProps } from "@mui/material/Paper";
import Paper from "@mui/material/Paper";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

export type DialogType = Partial<DialogProps & { key: string }>;

export const dialogs$ = new BehaviorSubject<DialogType[]>([]);

export function openDialog(dialog: DialogType) {
	dialog.key = dialog.key || uuidv4();

	dialog.PaperComponent = (props: PaperProps) => (
		<Paper
			{...props}
			style={{
				position: 'absolute',
				padding: 0,
				boxShadow:
					'0px 3px 5px -1px var(--color-theme-dialog-shadow), 0px 3px 5px -1px var(--color-theme-dialog-shadow), 0px 1px 18px 0px var(--color-theme-dialog-shadow)',
			}}
			className={`${props.className} ${dialog.className}`}
		/>
	);

	dialogs$.next([...dialogs$.value, dialog]);

	return () => closeDialog(dialog);
}

export function closeDialog(dialog: Partial<DialogProps>) {
	dialogs$.next(dialogs$.value.filter(it => it !== dialog));
}