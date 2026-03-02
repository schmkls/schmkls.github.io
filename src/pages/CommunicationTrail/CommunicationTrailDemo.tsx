import { useState } from "react";
import {
  Mail,
  Building2,
  Play,
  CheckCircle,
  LogIn,
  BarChart3,
  LifeBuoy,
  Mic,
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  X,
} from "lucide-react";
import { companies, customers, events } from "./seed";
import type { EventType, TimelineEvent } from "./types";

type View = { type: "start" } | { type: "customer"; customerId: string };

const eventConfig: Record<
  EventType,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  mail: { icon: Mail, color: "bg-blue-500" },
  "platform-created": { icon: Building2, color: "bg-purple-500" },
  "trial-started": { icon: Play, color: "bg-green-500" },
  "became-customer": { icon: CheckCircle, color: "bg-emerald-600" },
  "first-login": { icon: LogIn, color: "bg-sky-500" },
  "usage-stats": { icon: BarChart3, color: "bg-amber-500" },
  "support-mail": { icon: LifeBuoy, color: "bg-orange-500" },
  interview: { icon: Mic, color: "bg-violet-500" },
  "meeting-notes": { icon: FileText, color: "bg-slate-500" },
};

function MiniTimeline({
  customerEvents,
  expandedEventId,
  onEventClick,
}: {
  customerEvents: TimelineEvent[];
  expandedEventId: string | null;
  onEventClick: (eventId: string) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {customerEvents.map((event, i) => {
          const config = eventConfig[event.type];
          const Icon = config.icon;
          const isSelected = expandedEventId === event.id;
          return (
            <div key={event.id} className="flex items-center">
              {i > 0 && <div className="h-px w-2 bg-gray-300 sm:w-3" />}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event.id);
                }}
                className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-all sm:h-6 sm:w-6 ${config.color} ${isSelected ? "ring-2 ring-gray-900 ring-offset-1" : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"}`}
                title={`${event.title} — ${event.date}`}
              >
                <Icon className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventDetail({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) {
  const config = eventConfig[event.type];
  const Icon = config.icon;

  return (
    <div className="mt-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <div
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${config.color}`}
          >
            <Icon className="h-3 w-3 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-900">
              {event.title}
            </div>
            <div className="text-xs text-gray-500">{event.date}</div>
            {event.summary && (
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {event.summary}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="shrink-0 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function CustomerRow({
  customerName,
  customerEvents,
  onSelect,
}: {
  customerName: string;
  customerEvents: TimelineEvent[];
  onSelect: () => void;
}) {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const expandedEvent = expandedEventId
    ? (customerEvents.find((e) => e.id === expandedEventId) ?? null)
    : null;

  return (
    <div className="border-b border-gray-100 px-3 py-2.5 last:border-b-0 sm:px-4 sm:py-3">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
        <button
          onClick={onSelect}
          className="shrink-0 cursor-pointer text-left text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline sm:w-40"
        >
          {customerName}
        </button>
        <div className="overflow-x-auto">
          <MiniTimeline
            customerEvents={customerEvents}
            expandedEventId={expandedEventId}
            onEventClick={(eventId) =>
              setExpandedEventId((prev) => (prev === eventId ? null : eventId))
            }
          />
        </div>
      </div>
      {expandedEvent && (
        <EventDetail
          event={expandedEvent}
          onClose={() => setExpandedEventId(null)}
        />
      )}
    </div>
  );
}

const companyEventTypes: EventType[] = [
  "platform-created",
  "trial-started",
  "became-customer",
];

function CustomerTimeline({ customerId }: { customerId: string }) {
  const customerEvents = events.filter((e) =>
    e.id.startsWith(customerId + "-"),
  );
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const toggleEvent = (eventId: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  const hasExpandableContent = (event: TimelineEvent) =>
    event.mailThread ??
    event.transcript ??
    (event.type === "meeting-notes" && event.detail);

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
      <div className="mx-auto max-w-2xl">
        {customerEvents.map((event, i) => {
          const config = eventConfig[event.type];
          const Icon = config.icon;
          const isCompanyEvent = companyEventTypes.includes(event.type);
          const expandable = hasExpandableContent(event);
          const isExpanded = expandedEvents.has(event.id);
          const isLast = i === customerEvents.length - 1;

          return (
            <div key={event.id} className="flex gap-2.5 sm:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${config.color}`}
                >
                  <Icon className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                </div>
                {!isLast && <div className="w-px flex-1 bg-gray-200" />}
              </div>
              <div
                className={`mb-3 min-w-0 flex-1 rounded-lg border p-2.5 sm:mb-4 sm:p-3 ${
                  isCompanyEvent
                    ? "border-purple-200 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {event.title}
                    </div>
                    <div className="text-xs text-gray-500">{event.date}</div>
                    {isCompanyEvent && (
                      <span className="mt-1 inline-block rounded bg-purple-100 px-1.5 py-0.5 text-xs font-medium text-purple-700">
                        Company
                      </span>
                    )}
                  </div>
                </div>

                {event.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {event.summary}
                  </p>
                )}

                {event.type === "usage-stats" && event.detail && (
                  <div className="mt-2 rounded bg-amber-50 px-3 py-2 text-xs text-amber-900">
                    {event.detail}
                  </div>
                )}

                {event.links?.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {event.type === "meeting-notes" ? (
                      <FileText className="h-3 w-3" />
                    ) : (
                      <ExternalLink className="h-3 w-3" />
                    )}
                    {link.label}
                  </a>
                ))}

                {expandable && (
                  <button
                    onClick={() => toggleEvent(event.id)}
                    className="mt-2 flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronRight className="h-3 w-3" />
                        Show more
                      </>
                    )}
                  </button>
                )}

                {expandable && isExpanded && (
                  <div className="mt-2 text-xs leading-relaxed">
                    {event.mailThread?.map((msg, mi) => (
                      <div
                        key={mi}
                        className={`rounded-lg border border-gray-100 bg-gray-50 p-3 ${mi > 0 ? "mt-2" : ""}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 shrink-0 text-gray-400" />
                          <span className="font-semibold text-gray-900">
                            {msg.sender}
                          </span>
                        </div>
                        <div className="mt-0.5 pl-[18px] text-gray-500">
                          {msg.subject}
                        </div>
                        <p className="mt-2 border-t border-gray-100 pt-2 whitespace-pre-line text-gray-700">
                          {msg.body}
                        </p>
                      </div>
                    ))}
                    {event.transcript?.map((ex, ei) => (
                      <div key={ei} className={ei > 0 ? "mt-3" : ""}>
                        <div className="rounded-t-lg bg-violet-50 px-3 py-2">
                          <span className="font-semibold text-violet-700">
                            Q:
                          </span>{" "}
                          <span className="text-violet-900">{ex.question}</span>
                        </div>
                        <div className="rounded-b-lg border border-t-0 border-gray-100 bg-gray-50 px-3 py-2 text-gray-700">
                          <span className="font-semibold text-gray-500">
                            A:
                          </span>{" "}
                          {ex.answer}
                        </div>
                      </div>
                    ))}
                    {event.type === "meeting-notes" && event.detail && (
                      <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                        <p className="whitespace-pre-line text-gray-700">
                          {event.detail}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompanySection({
  companyId,
  companyName,
  expanded,
  onToggle,
  onSelectCustomer,
}: {
  companyId: string;
  companyName: string;
  expanded: boolean;
  onToggle: () => void;
  onSelectCustomer: (customerId: string) => void;
}) {
  const companyCustomers = customers.filter((c) => c.companyId === companyId);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
      >
        {expanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-gray-500" />
        )}
        <span className="text-sm font-semibold text-gray-900">
          {companyName}
        </span>
        <span className="text-xs text-gray-400">
          {companyCustomers.length} customers
        </span>
      </button>
      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50/50">
          {companyCustomers.map((customer) => {
            const customerEvents = events.filter((e) =>
              e.id.startsWith(customer.id + "-"),
            );
            return (
              <CustomerRow
                key={customer.id}
                customerName={customer.name}
                customerEvents={customerEvents}
                onSelect={() => onSelectCustomer(customer.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CommunicationTrailDemo() {
  const [view, setView] = useState<View>({ type: "start" });
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(
    new Set(),
  );

  const toggleCompany = (companyId: string) => {
    setExpandedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(companyId)) {
        next.delete(companyId);
      } else {
        next.add(companyId);
      }
      return next;
    });
  };

  if (view.type === "customer") {
    const customer = customers.find((c) => c.id === view.customerId);
    const company = companies.find((c) => c.id === customer?.companyId);
    return (
      <div className="flex h-full flex-col bg-gray-50">
        <div className="flex shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
          <button
            onClick={() => setView({ type: "start" })}
            className="cursor-pointer text-gray-500 transition-colors hover:text-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {customer?.name}
            </div>
            <div className="text-xs text-gray-500">{company?.name}</div>
          </div>
        </div>
        <CustomerTimeline customerId={view.customerId} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex shrink-0 items-center border-b border-gray-200 bg-white px-4 py-3">
        <span className="text-sm font-semibold tracking-wide text-gray-900">
          Communication Trail
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="mx-auto flex max-w-3xl flex-col gap-2.5 sm:gap-3">
          {companies.map((company) => (
            <CompanySection
              key={company.id}
              companyId={company.id}
              companyName={company.name}
              expanded={expandedCompanies.has(company.id)}
              onToggle={() => toggleCompany(company.id)}
              onSelectCustomer={(customerId) =>
                setView({ type: "customer", customerId })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
