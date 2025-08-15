import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { CocktailCards } from '../components/custom/cocktail-cards'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { clearFavorites } from '../app/slices/favoritesSlice'
import { CustomAlert } from '../components/custom/custom-alerts'

interface FavoritesSectionProps {
  isLoading: boolean
  isError: boolean
}

export const FavoritesSection = ({
  isLoading,
  isError
}: FavoritesSectionProps) => {
  
  const dispatch = useDispatch()
  // get list of favorites from redux store
  const favorites = useSelector((state: RootState) => state.favorites.items as any[])

  return (
    <div className="space-y-2">
      <div className='flex justify-between items-center'>
        <h2 className="text-lg md:text-2xl font-semibold pb-5">Favourites</h2>
        <Button 
          variant="outline" 
          className='bg-gray-100 hover:bg-red-700 hover:text-white' 
          onClick={() => dispatch(clearFavorites())}
        >
          <Trash2 size={20} /> <span className='text-sm md:text-md'>Clear All</span>
        </Button>
      </div>
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
      ) : 
      favorites.length > 0 ? 
      <CocktailCards data={favorites} /> : 
      <CustomAlert 
        title="No Favorites" 
        description="You have no favorite cocktails :(" 
        variant="default" 
      />}
    </div>
  )
}
