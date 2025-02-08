const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative flex h-full w-full flex-col">{children}</div>;
};

export default PublicLayout;
