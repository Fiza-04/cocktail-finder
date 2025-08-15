import { Search } from "lucide-react";
import { Input } from "../ui/input"

interface SearchFilterProps {
    value: string;
    onSearch: (value: string) => void;
}

export const SearchFilter = ({ value, onSearch }: SearchFilterProps) => {
  return (
    <div className="relative w-64">
      <Search 
        className="absolute left-3 top-[48%] transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}