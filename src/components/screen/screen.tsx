interface ScreenProps {
    children: React.ReactNode;
    className?: string;
}

export function Screen(props: ScreenProps) {
    const { children, className } = props

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${className}`}>
            {children}
        </div>
    );
};