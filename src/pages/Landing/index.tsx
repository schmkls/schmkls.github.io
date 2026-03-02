import { useState } from "react";
import { Link } from "react-router";
import { ideas } from "~/ideas";
import { DemoOverlay, type ActiveDemo } from "~/templates/Post";

export default function Landing() {
  const [activeDemo, setActiveDemo] = useState<ActiveDemo | null>(null);

  return (
    <>
      <div className="mx-auto grid max-w-4xl gap-4 px-4 py-12 sm:grid-cols-2">
        {ideas.map((idea) => (
          <div
            key={idea.path}
            className="group bg-muted relative flex flex-col gap-3 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <Link
              to={`/${idea.path}`}
              className="absolute inset-0 z-0 cursor-pointer rounded-xl"
            />
            <span className="text-foreground text-lg font-semibold group-hover:underline">
              {idea.title}
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed italic">
              {idea.tagline}
            </p>
            {idea.demoComponent && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const Demo = idea.demoComponent!;
                  setActiveDemo({
                    title: idea.title,
                    component: <Demo />,
                  });
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/85 relative z-10 cursor-pointer self-start rounded-lg px-5 py-2 text-sm font-medium transition-colors focus:outline-none"
              >
                Try the demo
              </button>
            )}
          </div>
        ))}
      </div>
      {activeDemo && (
        <DemoOverlay demo={activeDemo} onClose={() => setActiveDemo(null)} />
      )}
    </>
  );
}
