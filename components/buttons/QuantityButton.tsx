import { Button, ButtonGroup } from "@heroui/button";
import { TbMinus, TbPlus } from "react-icons/tb";

interface IProps {
    qty: number;
    onAdd: () => void;
    onRemove: () => void;
    isCompact?: boolean;
}

export default function QuantityButton(props: IProps) {
    const { qty, onAdd, onRemove, isCompact = false } = props;
    
    return <ButtonGroup
    className="w-full font-bold"
    color="primary"
    variant="bordered"
    size="sm"
  >
    <Button className={`px-0 min-w-${isCompact ? 8 : 12}`} startContent={<TbPlus size={16} />} onPress={onAdd} />
    <Button className={`hover:cursor-auto font-semibold !px-0 ${isCompact && "min-w-12"}`}>{qty}</Button>
    <Button className={`px-0 min-w-${isCompact ? 8 : 12}`} startContent={<TbMinus size={16} />} onPress={onRemove} isDisabled={qty === 0} />
  </ButtonGroup>
}