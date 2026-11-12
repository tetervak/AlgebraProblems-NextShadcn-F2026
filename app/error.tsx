"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-2 text-2xl font-bold text-destructive">
        Something went wrong!
      </h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        {error.message || "Failed to load algebra problems from the server."}
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
