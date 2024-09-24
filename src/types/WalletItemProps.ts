import {IconType} from "react-icons";

export interface WalletItemProps {
    icon: IconType;
    label: string;
    subLabel?: string;
    onClick?: () => void;
    addNew?: boolean;
}
