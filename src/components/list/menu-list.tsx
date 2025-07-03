
import { ArrowRight } from "@mui/icons-material";
import { Column } from "../screen/column";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface MenuListProps {
    selected: "contacts" | "messages" | null;
    onSelect: (option: "contacts" | "messages") => void;
}

export function MenuList(props: MenuListProps) {
    const { onSelect, selected } = props

    return (
        <Column title="Informações">
            <List disablePadding>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === "contacts"}
                        onClick={() => onSelect("contacts")}
                    >
                        <ListItemText primary="Contatos" className="text-gray-800" />
                        <ArrowRight className="text-gray-800" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selected === "messages"}
                        onClick={() => onSelect("messages")}
                    >
                        <ListItemText primary="Mensagens" className="text-gray-800" />
                        <ArrowRight className="text-gray-800" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Column>
    );
}