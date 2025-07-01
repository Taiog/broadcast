import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Column from "../screen/column";
import { ArrowRight } from "@mui/icons-material";

interface MenuListProps {
    selected: "contacts" | "messages" | null;
    onSelect: (option: "contacts" | "messages") => void;
}

function MenuList(props: MenuListProps) {
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

export default MenuList