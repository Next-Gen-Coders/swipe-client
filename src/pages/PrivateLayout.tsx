import BottomBar from "@/components/BottomBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full w-full relative">
            {children}
            <BottomBar />
        </div>
    )
}

export default AppLayout
