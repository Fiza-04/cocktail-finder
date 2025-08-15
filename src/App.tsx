import { useMemo, useState } from 'react'
import './App.css'
import { useGetCocktailByNameQuery, useGetCocktailByFirstLetterQuery } from './app/services/cocktail-api'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import { useDebounce } from './hooks/useDebounce'
import { useSyncFiltersWithUrl } from './hooks/useSyncWithURL'
import { FavoritesSection } from './sections/favorites-section'
import { ChartsSection } from './sections/charts-section'
import { CocktailsSection } from './sections/cocktails-section'
import { HeaderSection } from './sections/header-section'

function App() {
  const { letter, search } = useSelector((state: RootState) => state.filters)

  const [selectedSection, setSelectedSection] = useState<string>('Recipes')

  const debouncedSearch = useDebounce(search, 500)

  useSyncFiltersWithUrl(letter, debouncedSearch)

  // api calls
  const { 
    data:cocktailByName, 
    error:cocktailByNameError, 
    isLoading:cocktailByNameLoading 
  } = useGetCocktailByNameQuery(debouncedSearch, 
    {
      skip: debouncedSearch.length < 3, 
      refetchOnMountOrArgChange: false,
    })

  const { 
    data:cocktailByLetter, 
    error:cocktailByLetterError, 
    isLoading:cocktailByLetterLoading 
  } = useGetCocktailByFirstLetterQuery(letter, 
    {
      skip: debouncedSearch.length >= 3, 
      refetchOnMountOrArgChange: true,
    })
      
  const mergeResults = useMemo(() => {
    let combinedResults: any[] = [];
    if (debouncedSearch.length !== 0 && debouncedSearch.length >= 3) {
      combinedResults = [...(cocktailByName?.drinks || []), ...(cocktailByLetter?.drinks || [])];
    } else {
      combinedResults = [...(cocktailByLetter?.drinks || [])];
    }

    // to remove data with duplicate ids
    return Array.from(new Map(combinedResults.map(item => [item.idDrink, item])).values());
  }, [cocktailByName, cocktailByLetter, debouncedSearch]);

  // loading and error states
  const isLoading = cocktailByNameLoading || cocktailByLetterLoading
  const isError = !!cocktailByNameError || !!cocktailByLetterError

  return (
    <div className="flex flex-col min-h-screen w-full px-4 md:px-12 lg:px-16 py-8 space-y-6">
       <HeaderSection 
         selectedSection={selectedSection} 
         onSectionChange={setSelectedSection} 
       />

        {/* Content section */}
        <main className="flex-grow w-full space-y-6 overflow-y-auto">
          {
          selectedSection === 'Recipes' && (
            <CocktailsSection 
              data={mergeResults} 
              letter={letter} 
              isLoading={isLoading} 
              isError={!!isError} 
            />
          )}
          {
          selectedSection === 'Favorites' && (
            <FavoritesSection 
              isLoading={isLoading} 
              isError={!!isError}
            />
          )}
          {
          selectedSection === 'Charts' && (
            <ChartsSection 
              data={mergeResults} 
              letter={letter} 
              isLoading={isLoading} 
              isError={!!isError}
            />
          )}
        </main>
    </div>
  )
}

export default App
