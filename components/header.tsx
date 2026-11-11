type HeaderProps = {
    title: string;
}

export function Header({title}: HeaderProps) {
    return (
        <header className="container mx-auto flex flex-wrap justify-center py-3 mb-4 border-b">
            <h1 className="text-3xl font-bold text-green-600">{title}</h1>
        </header>
    )
}