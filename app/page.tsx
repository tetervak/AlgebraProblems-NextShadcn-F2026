"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Problem {
  id: number
  text: string
  answer: number
}

interface Quiz {
  numberOfProblems: number
  problems: Problem[]
}

export default function QuizPage() {
  const [numberOfProblems, setNumberOfProblems] = useState(5)
  const [refresh, setRefresh] = useState(0)
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProblems() {
      try {
        const response = await fetch(
          `http://localhost:8080/random-quiz?number-of-problems=${numberOfProblems}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          if (!controller.signal.aborted) {
            console.error(new Error("Failed to fetch problems"))
          }
          return
        }

        const data: Quiz = await response.json()
        setQuiz(data)
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
        }
      }
    }

    void loadProblems()

    return () => controller.abort()
  }, [numberOfProblems, refresh])

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Algebra Quiz</h1>

      <div className="flex items-center gap-4">
        <Select
          value={String(numberOfProblems)}
          onValueChange={(value) => setNumberOfProblems(Number(value))}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 15, 20].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n} problems
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => setRefresh((n) => n + 1)}>New Problems</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Problem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quiz?.problems.map((problem) => (
            <TableRow key={problem.id}>
              <TableCell>{problem.id}</TableCell>
              <TableCell>{problem.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
