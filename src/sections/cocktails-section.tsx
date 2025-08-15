// sections/cocktails-section.tsx
import { CustomToggleGroup } from "../components/custom/custom-toggle-group";
import { CocktailCards } from "../components/custom/cocktail-cards";
import { useDispatch } from "react-redux";
import { setLetter } from "@/app/slices/filterSlice";
import { CustomAlert } from "../components/custom/custom-alerts";

interface CocktailsSectionProps {
  data: any[];
  letter: string;
  isLoading: boolean;
  isError: boolean;
  onLetterChange?: (letter: string) => void;
}

export const CocktailsSection = ({
  data, 
  letter, 
  isLoading, 
  isError 
}: CocktailsSectionProps) => {
  const dispatch = useDispatch();

  // generate an array of letters from A to Z
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <>
      <CustomToggleGroup
        options={letters}
        value={letter}
        onChange={(value) => dispatch(setLetter(value))}
        itemWidth="w-16"
        wrap
      />
      {isLoading ? (
        <CustomAlert 
          title="Loading..." 
          description="Fetching cocktails for selected letter." 
          variant="default" 
        />
      ) : isError ? (
        // Show error alert
        <CustomAlert 
          title="Error" 
          description="Something went wrong while fetching data." 
          variant="destructive" 
        />
      ) : data?.length === 0 ? (
        // Show "no results" alert
        <CustomAlert 
          title="No Results" 
          description="No cocktails found for selected letter." 
          variant="default" 
        />
      ) : (
        // Show cocktails if no errors
        <CocktailCards data={data} />
      )}
    </>
  );
};
