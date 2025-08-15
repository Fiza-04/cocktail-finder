import { Breadcrumbs } from "../components/custom/breadcrumbs";
import { SearchFilter } from "../components/custom/search-filter";
import { CustomToggleGroup } from "../components/custom/custom-toggle-group";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../app/slices/filterSlice";
import type { RootState } from "../app/store";

interface HeaderSectionProps {
  selectedSection: string;
  onSectionChange: (value: string) => void;
}

export const HeaderSection = ({ 
  selectedSection, 
  onSectionChange 
}: HeaderSectionProps) => {
  
  const dispatch = useDispatch();
  // get search query from redux store
  const { search } = useSelector((state: RootState) => state.filters);

  return (
    <header className="space-y-4">
      <Breadcrumbs />
      <div className="flex flex-col sm:flex-row justify-between gap-4 w-[90vw]">
        <SearchFilter 
          value={search} 
          onSearch={(value) => dispatch(setSearch(value))} 
        />
        <CustomToggleGroup
          options={['Recipes', 'Charts', 'Favorites']}
          value={selectedSection}
          onChange={onSectionChange}
        />
      </div>
    </header>
  );
};
