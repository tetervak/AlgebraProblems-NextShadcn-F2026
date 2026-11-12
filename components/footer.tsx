type FooterProps = {
  course: string
  name?: string
}

export function Footer({ course, name }: FooterProps) {
  return (
    <footer className="container mx-auto mt-8 flex flex-col items-center border-t py-3 text-sm text-purple-600 italic">
      <div>{course}</div>
      <div>Sheridan College, {name ?? "Ontario"}</div>
    </footer>
  )
}
