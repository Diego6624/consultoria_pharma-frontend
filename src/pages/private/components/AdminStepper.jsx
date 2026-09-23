import { Check } from "lucide-react";

export default function AdminStepper({ steps, currentStep }) {
  return (
    <nav aria-label="Progreso de configuración" className="mb-6">
      <ol className="flex w-full items-start">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;
          return (
            <li key={step.label} className="relative flex min-w-0 flex-1 justify-center">
              <div className="relative z-10 flex w-full flex-col items-center gap-2">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${completed || active ? "border-[#0DB3DE] bg-[#0DB3DE] text-white" : "border-slate-200 bg-white text-slate-400"}`}>
                  {completed ? <Check size={17} /> : index + 1}
                </div>
                <span className={`text-center text-xs font-medium ${active || completed ? "text-[#1F4C7F]" : "text-slate-400"}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && <div className={`absolute left-1/2 right-[-50%] top-4 z-0 h-0.5 transition-colors ${completed ? "bg-[#0DB3DE]" : "bg-slate-200"}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
