interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-2 mb-4">
      <div
        className="w-3 h-3 bg-[#4BC26D] rounded-full border-4 border-[#4BC26D66] flex-shrink-0"
        style={{ boxShadow: '0px 0px 8px rgba(75, 194, 109, 0.6), 0px 0px 16px rgba(75, 194, 109, 0.3), 0px 16px 48px rgba(0, 0, 0, 0.12)' }}
      />
      <div>
        <h1 className="text-xl font-bold text-[#303030] tracking-[-0.04em]">{title}</h1>
        <p className="text-sm text-[#5E5E5E8C] tracking-[-0.04em]">{subtitle}</p>
      </div>
    </div>
  );
}
