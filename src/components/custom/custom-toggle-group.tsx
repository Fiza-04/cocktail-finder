import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

interface CustomToggleGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  itemWidth?: string
  wrap?: boolean
}

//  reusable component for the alphabet and section toggles
export const CustomToggleGroup = ({
  options,
  value,
  onChange,
  itemWidth = "w-24",
  wrap = false,
}: CustomToggleGroupProps) => {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(val: string) => val && onChange(val)}
      className={`flex ${wrap ? "flex-wrap gap-1" : ""}`}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option}
          value={option}
          className={`px-3 py-1 ${itemWidth} h-10 text-xs md:text-sm font-semibold bg-gray-100 
                      hover:bg-gray-200 hover:text-black data-[state=on]:bg-green-200 data-[state=on]:text-black`}
        >
          {option}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
