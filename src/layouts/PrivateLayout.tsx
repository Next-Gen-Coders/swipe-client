import BottomBar from "@/components/BottomBar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      {children}
      <BottomBar />
    </div>
  );
};

export default PrivateLayout;
