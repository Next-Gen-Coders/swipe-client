const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full w-full relative">
            {children}
        </div>
    )
}

export default PublicLayout
