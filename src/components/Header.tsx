import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Check } from "lucide-react";
import { ideas } from "~/ideas";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "~/components/ui/command";

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const currentIndex = ideas.findIndex((idea) => `/${idea.path}` === pathname);
  const currentIdea = currentIndex >= 0 ? ideas[currentIndex] : null;
  const prevIdea =
    currentIndex >= 0
      ? ideas[(currentIndex - 1 + ideas.length) % ideas.length]
      : null;
  const nextIdea =
    currentIndex >= 0 ? ideas[(currentIndex + 1) % ideas.length] : null;

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-8">
        <div className="flex justify-start">
          {prevIdea ? (
            <Link
              to={`/${prevIdea.path}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest">{prevIdea.title}</span>
            </Link>
          ) : (
            <span className="pointer-events-none opacity-0 flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 rounded-md px-3 py-2 transition-colors hover:bg-primary/10 focus:outline-none group">
              <span className="text-sm uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                {currentIdea ? currentIdea.title : "Schmkls"}
              </span>
              <ChevronsUpDown className="h-3 w-3 text-muted-foreground opacity-50 group-hover:text-primary group-hover:opacity-100 transition-colors" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56" align="center">
            <Command>
              <CommandInput placeholder="Search ideas..." />
              <CommandList>
                <CommandEmpty>No ideas found.</CommandEmpty>
                {ideas.map((idea) => (
                  <CommandItem
                    key={idea.path}
                    value={idea.title}
                    onSelect={() => {
                      void navigate(`/${idea.path}`);
                      setOpen(false);
                    }}
                    className="m-1 hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary"
                  >
                    {idea.title}
                    <Check
                      className={cn(
                        "ml-auto text-primary",
                        `/${idea.path}` === pathname
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex justify-end">
          {nextIdea ? (
            <Link
              to={`/${nextIdea.path}`}
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="text-xs uppercase tracking-widest">{nextIdea.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="pointer-events-none opacity-0 flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
