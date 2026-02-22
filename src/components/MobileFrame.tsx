type MobileFrameProps = {
  children: React.ReactNode;
};

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="relative flex h-[560px] w-[300px] flex-col overflow-hidden rounded-[2.5rem] border-[3px] border-zinc-800 bg-white shadow-2xl dark:border-zinc-600 dark:bg-zinc-900">
      <div className="flex shrink-0 justify-center p-2 text-xs text-zinc-400">
        <span>9:41</span>
      </div>
      {children}
    </div>
  );
}
