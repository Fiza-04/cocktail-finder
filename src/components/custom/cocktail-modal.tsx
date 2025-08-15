import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"

interface CocktailModalProps {
  open: boolean
  onClose: () => void
  item: any
}

export const CocktailModal = ({ open, onClose, item }: CocktailModalProps) => {

  const ingredients: { ingredient: string, measure: string }[] = []

  // add ingredients and measures to the ingredients array if not null
  for (let i = 1; i <= 15; i++) {
    const ingredient = item[`strIngredient${i}`]?.trim()
    const measure = item[`strMeasure${i}`]?.trim()

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure === null ? '' : `${measure}` 
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-y-auto scrollbar-hide">
          <img src={item.strDrinkThumb} alt={item.strDrink} className="w-full h-72 object-cover rounded-lg" />
          <div className="flex flex-col md:flex-row md:justify-between">
            <DialogTitle className="mb-3 md:mb-0">{item.strDrink}</DialogTitle>
            <div className="flex gap-2">
              <Badge
                variant="secondary" 
                className={`py-1 px-2 rounded-sm ${item.strCategory === 'Cocktail' ? 'bg-blue-700' : item.strCategory === 'Other / Unknown' ? 'bg-red-600' : 'bg-green-500'} text-white`}
              >
                {item.strCategory}
              </Badge>
              <Badge
                variant="secondary" 
                className={`py-1 px-2 rounded-sm ${item.strAlcoholic === 'Alcoholic' ? 'bg-purple-500' : 'bg-yellow-500'} text-white`}
              >
                {item.strAlcoholic}
              </Badge>
            </div>
          </div>
          <DialogDescription>{item.strInstructions}</DialogDescription>
          <div className="flex gap-2">
            <span className="text-sm">Glass Type: </span>
            <Badge
              variant="secondary" 
              className={`py-1 px-2 rounded-sm bg-pink-500 text-white`}
            >
              {item.strGlass}
            </Badge>
          </div>
          <div className="flex">
            <p className="text-md pr-2">Ingredients:</p>
            <div className="flex flex-wrap pt-[3px] gap-2">
            {ingredients.map((ingredient, index) => (
              <p 
                key={index} 
                className="text-sm text-gray-500"
              >
                {ingredient.ingredient} ({ingredient.measure}),
              </p>
            ))}
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
