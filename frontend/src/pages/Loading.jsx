const Loading = ({ overlay = false }) => {
  return (
    <main className={`${overlay ? "fixed inset-0 z-100 bg-[#2e5a46]/85" : "min-h-screen bg-[#2e5a46]"} flex items-center justify-center text-[#f4e8c3]`}>
      <div className="flex flex-col items-center gap-5">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#f4e8c3]/20 border-t-[#efb53e]" />
        <p className="text-sm font-bold uppercase tracking-[0.25em]">Loading</p>
      </div>
    </main>
  );
};

export default Loading;
