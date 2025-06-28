import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Column from "../screen/Column";

interface MenuListProps {
    selected: "contacts" | "messages" | null;
    onSelect: (option: "contacts" | "messages") => void;
}

export function MenuList({ selected, onSelect }: MenuListProps) {
    return (
        <Column title="Menu">
            <List disablePadding>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === "contacts"}
                        onClick={() => onSelect("contacts")}
                    >
                        <ListItemText primary="Contatos" className="text-gray-800" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === "messages"}
                        onClick={() => onSelect("messages")}
                    >
                        <ListItemText primary="Mensagens" className="text-gray-800" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Column>
    );
}
