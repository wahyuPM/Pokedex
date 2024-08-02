import React, { useState } from "react"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ComboboxProps } from "@/lib/interface"

const Combobox: React.FC<ComboboxProps> = ({ listData, setSelectedType, selected, placeholder = "Select some value..." }) => {

    const [open, setOpen] = useState(false)

    const onHandleSelect = (currentValue: string) => {
        setSelectedType((prev: string[]) =>
            prev.includes(currentValue)
                ? prev.filter((val) => val !== currentValue)
                : [...prev, currentValue]
        );
    }

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between dark:text-white capitalize"
            >
                {selected?.length > 0
                    ? selected?.map(val => listData?.find(item => item.name === val)?.name).join(', ')
                    : placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 dark:text-white" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
            <Command>
                <CommandInput placeholder={placeholder} />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                    <CommandList>
                        {listData?.map((item) => (
                            <CommandItem
                                key={item.name}
                                value={item.name}
                                className="capitalize"
                                disabled={selected?.length === 2 && !selected?.includes(item.name)}
                                onSelect={selected?.length === 2 && !selected?.includes(item.name) ? () => { } : (currentValue) => {
                                    onHandleSelect(currentValue)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4 text-green-500",
                                        selected?.includes(item.name) ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.name}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>
}

export default Combobox