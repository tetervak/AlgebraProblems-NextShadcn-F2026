type FooterProps = {
  course: string,
  name?: string;
};

export function Footer({course, name}: FooterProps) {
    return (
        <footer className="container mx-auto flex flex-col items-center py-3 mt-8 border-t text-sm italic text-purple-600">
            <div>{course}</div>
            <div>Sheridan College, {name ?? 'Ontario'}</div>
        </footer>
    );
}