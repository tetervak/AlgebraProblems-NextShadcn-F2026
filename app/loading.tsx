export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="text-lg font-medium text-muted-foreground">
        Loading algebra problems...
      </p>
    </div>
  )
}
