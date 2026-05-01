type MobileFrameProps = {
  children: React.ReactNode;
};

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="border-device-frame bg-device-frame-screen relative flex h-[560px] w-[300px] flex-col overflow-hidden rounded-[2.5rem] border-[3px] shadow-2xl">
      <div className="text-device-frame-foreground flex shrink-0 justify-center p-2 text-xs">
        <span>9:41</span>
      </div>
      {children}
    </div>
  );
}
