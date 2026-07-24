import { Link } from "react-router";
import { sections, type Idea } from "~/ideas";
import { DemoButton } from "~/components/DemoButton";

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="group bg-muted flex flex-col rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <Link
        to={`/${idea.path}`}
        className="flex flex-1 flex-col gap-3 rounded-xl p-6"
      >
        <span className="text-foreground text-lg font-semibold group-hover:underline">
          {idea.title}
        </span>
        <p className="text-muted-foreground text-sm/relaxed italic">
          {idea.tagline}
        </p>
      </Link>
      {idea.demoComponent && (
        <DemoButton title={idea.title} className="mx-6 mb-6">
          <idea.demoComponent />
        </DemoButton>
      )}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12">
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-border h-px flex-1" />
            <h2 className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              {section.title}
            </h2>
            <div className="bg-border h-px flex-1" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.ideas.map((idea) => (
              <IdeaCard key={idea.path} idea={idea} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
