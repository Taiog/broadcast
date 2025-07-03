import ArrowRight from "@mui/icons-material/ArrowRight";
import { Column } from "../screen/column";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface MenuListProps {
    selected: "contacts" | "messages" | null;
    onSelect: (option: "contacts" | "messages") => void;
}

interface MenuItem {
    key: "contacts" | "messages";
    label: string;
}

const menuItems: MenuItem[] = [
    { key: "contacts", label: "Contatos" },
    { key: "messages", label: "Mensagens" },
];

export function MenuList(props: MenuListProps) {
    const { onSelect, selected } = props

    return (
        <Column title="Informações">
            <List disablePadding>
                {menuItems.map(({ key, label }) => (
                    <ListItem key={key} disablePadding>
                        <ListItemButton
                            selected={selected === key}
                            onClick={() => onSelect(key)}
                        >
                            <ListItemText primary={label} className="text-gray-800" />
                            <ArrowRight className="text-gray-800" />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Column>
    );
}