import { QueryClient } from '@tanstack/react-query'

// Create the Query Client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests 3 times
      retry: 3,
      // Refetch data on window focus
      refetchOnWindowFocus: false,
    },
  },
})