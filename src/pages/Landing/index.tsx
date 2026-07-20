import { Link } from "react-router";
import { ideas } from "~/ideas";
import { DemoButton } from "~/components/DemoButton";

export default function Landing() {
  return (
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
          <p className="text-muted-foreground text-sm/relaxed italic">
            {idea.tagline}
          </p>
          {idea.demoComponent && (
            <DemoButton title={idea.title} className="relative z-10">
              <idea.demoComponent />
            </DemoButton>
          )}
        </div>
      ))}
    </div>
  );
}
