"use client"

import { useState } from "react"

import { useQuiz } from "@/hooks/use-quiz"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function QuizPage() {
  const [numberOfProblems, setNumberOfProblems] = useState(5)
  const { quiz, isLoading, isValidating, isError, error, mutate } =
    useQuiz(numberOfProblems)

  return (
    <>
      <h1 className="mt-6 text-2xl font-bold text-blue-500">Problem List</h1>

      <div className="my-3 flex items-center gap-4">
        <Select
          value={String(numberOfProblems)}
          onValueChange={(value) => setNumberOfProblems(Number(value))}
        >
          <SelectTrigger className="w-48">
            {`${numberOfProblems} problems`}
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 15, 20].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} problems
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={() => void mutate()}
          disabled={isLoading || isValidating}
        >
          {isValidating ? "Loading..." : "New Problems"}
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 py-8 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <span>Loading problems...</span>
        </div>
      )}

      {isError && (
        <div className="my-4 max-w-md rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <p className="font-semibold">Failed to fetch problems</p>
          <p className="mt-1 text-sm text-destructive/80">
            {error?.message ??
              "An error occurred while fetching the quiz data."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => void mutate()}
          >
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !isError && quiz && (
        <Table className="max-w-md">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Answer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quiz.problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.id}</TableCell>
                <TableCell>{problem.text}</TableCell>
                <TableCell>{problem.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}
