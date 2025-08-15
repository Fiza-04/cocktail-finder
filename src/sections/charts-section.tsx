import { Charts } from "../components/custom/charts"
import { CustomAlert } from "../components/custom/custom-alerts"

interface ChartsSectionProps {
  data: any[] 
  letter: string
  isLoading: boolean
  isError: boolean
}

export const ChartsSection = ({ 
  data, 
  letter, 
  isLoading, 
  isError 
}: ChartsSectionProps) => {
   return (
    <div>
      <h2 
        className="text-lg md:text-2xl font-semibold pb-5"
      >
        Charts for Cocktails starting with '{letter}'
      </h2>
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
      ) : <Charts data={data} />}
    </div>  
   )
}