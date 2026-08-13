import { useMemo } from 'react'
import { useAppStore } from './useAppStore'
import { calculateProjections } from '../lib/financeEngine'

export function useFinanceData() {
  const store = useAppStore()
  
  // Memoize the complex calculations so they only run when inputs change
  const results = useMemo(() => calculateProjections(store), [store])

  return results
}
