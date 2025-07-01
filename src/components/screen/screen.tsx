interface ScreenProps {
    children: React.ReactNode;
    className?: string;
}

const Screen = ({ children, className = "" }: ScreenProps) => {
    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${className}`}>
            {children}
        </div>
    );
};

export default Screen;