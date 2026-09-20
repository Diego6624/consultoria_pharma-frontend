export default function AdminPageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-[#1F4C7F]">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      {actions ? <div className="flex w-full flex-wrap gap-2 md:w-auto">{actions}</div> : null}
    </div>
  );
}
