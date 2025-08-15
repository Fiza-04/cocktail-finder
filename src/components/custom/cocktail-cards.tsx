import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { toggleFavorite } from '../../app/slices/favoritesSlice'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from '../ui/card'
import { Badge } from '../ui/badge'
import { Toggle } from '../ui/toggle'
import { Heart } from 'lucide-react'
import { CocktailModal } from './cocktail-modal'

interface CocktailCardsProps {
  data: any
}

export const CocktailCards = ({ data }: CocktailCardsProps) => {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)

  const [selectedItem, setSelectedItem] = useState<any | null>(null)

  const handleToggle = (pressed: boolean, item: any) => {
    if (pressed) {
      dispatch(toggleFavorite(item))
    }
  }

  const openModal = (item: any) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  return (
    <div className="flex flex-wrap gap-6 w-full align-center justify-center">
      {data?.map((item: any) => {
        const isFavorite = favorites.some(fav => fav.idDrink === item.idDrink)
        return (
          <Card
            key={item.idDrink} 
            className="p-0 m-0 gap-0 w-64" 
            onClick={() => openModal(item)}
          >
            <img src={item.strDrinkThumb} alt={item.strDrink} className="w-full h-56 object-fit rounded-t-lg" />
            <CardContent className="p-3">
              <CardTitle className="text-lg font-semibold line-clamp-1">
                {item.strDrink}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500 line-clamp-2 h-8">
                {item.strInstructions}
              </CardDescription>
              <div className='flex'>
                <div className="flex flex-col w-[50%]">
                  <Badge
                    variant="secondary" 
                    className={`mt-3 rounded-sm ${item.strCategory === 'Cocktail' ? 'bg-blue-700' : item.strCategory === 'Other / Unknown' ? 'bg-red-600' : 'bg-green-500'} text-white`}
                  >
                    {item.strCategory}
                  </Badge>
                  <p className="mt-3 text-xs text-gray-500">Know more...</p>
                </div>
                <div className='w-[50%] flex items-end justify-end p-2'>
                  <Toggle
                    className='bg-gray-100 h-9 w-9 flex items-center justify-center rounded-full hover:bg-red-100'
                    onPressedChange={(pressed) => handleToggle(pressed, item)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart
                      size={24}
                      fill={isFavorite ? 'red' : 'none'}
                      color={isFavorite ? 'red' : 'gray'}
                      className='transition-all duration-200 hover:fill-red-500 hover:text-red-500'
                    />
                  </Toggle>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
       {selectedItem && (
          <CocktailModal open={true} onClose={closeModal} item={selectedItem} />
        )}
    </div>
  )
}