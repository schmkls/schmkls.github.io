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
    <header className="border-border bg-background sticky top-0 z-10 border-b">
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
        <div className="flex justify-start">
          {prevIdea ? (
            <Link
              to={`/${prevIdea.path}`}
              className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span className="hidden text-xs tracking-widest uppercase sm:inline">
                {prevIdea.title}
              </span>
            </Link>
          ) : (
            <span className="pointer-events-none flex items-center gap-2 opacity-0">
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="hover:bg-primary/10 group flex items-center gap-1 rounded-md px-3 py-2 transition-colors focus:outline-none">
              <span className="group-hover:text-primary text-sm tracking-wider uppercase transition-colors sm:text-2xl sm:tracking-widest">
                {currentIdea ? currentIdea.title : "Schmkls"}
              </span>
              <ChevronsUpDown className="text-muted-foreground group-hover:text-primary h-3 w-3 opacity-50 transition-colors group-hover:opacity-100" />
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
                    className="hover:bg-primary/10 hover:text-primary data-[selected=true]:bg-primary/10 data-[selected=true]:text-primary m-1"
                  >
                    {idea.title}
                    <Check
                      className={cn(
                        "text-primary ml-auto",
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
              className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors"
            >
              <span className="hidden text-xs tracking-widest uppercase sm:inline">
                {nextIdea.title}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : (
            <span className="pointer-events-none flex items-center gap-2 opacity-0">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
