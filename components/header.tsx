type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="container mx-auto mb-4 flex flex-wrap justify-center border-b py-3">
      <h1 className="text-3xl font-bold text-green-600">{title}</h1>
    </header>
  )
}
