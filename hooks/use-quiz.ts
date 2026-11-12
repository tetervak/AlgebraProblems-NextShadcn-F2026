import useSWR from "swr"

export interface Problem {
  id: number
  text: string
  answer: number
}

export interface Quiz {
  numberOfProblems: number
  problems: Problem[]
}

export const fetcher = async (url: string): Promise<Quiz> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch quiz data (${response.status}: ${response.statusText || "Server Error"})`
    )
  }
  return response.json()
}

export function useQuiz(numberOfProblems: number) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Quiz>(
    `http://localhost:8080/api/random-quiz?number-of-problems=${numberOfProblems}`,
    fetcher
  )

  return {
    quiz: data,
    isLoading,
    isValidating,
    isError: Boolean(error),
    error,
    mutate,
  }
}
