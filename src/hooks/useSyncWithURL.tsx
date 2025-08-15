import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../app/slices/filterSlice'

export function useSyncFiltersWithUrl(letter: string, search: string) {
  const dispatch = useDispatch()
  const isPopStateRef = useRef(false)

  // Initialize from URL and listen to popstate
  // set up a listener for browser back/forward button (popstate)
  useEffect(() => {
    const syncStateWithURL = () => {
      const params = new URLSearchParams(window.location.search)
      const letter = params.get('letter') || 'A'
      const search = params.get('search') || ''
      isPopStateRef.current = true
      dispatch(setFilters({ letter, search }))
    }

    syncStateWithURL()
    window.addEventListener('popstate', syncStateWithURL)
    return () => window.removeEventListener('popstate', syncStateWithURL)
  }, [dispatch])

  // Sync URL when letter and search changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (letter) params.set('letter', letter)
    if (search.length >= 3) params.set('search', search)

    if (isPopStateRef.current) {
      isPopStateRef.current = false
    } else {
      const newUrl = 
      params.toString() ? 
      `${window.location.pathname}?${params.toString()}` : 
      window.location.pathname
      window.history.pushState(null, '', newUrl)
    }
  }, [letter, search])
}
