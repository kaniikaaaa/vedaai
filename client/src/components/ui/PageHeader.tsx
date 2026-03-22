interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-sm text-gray-500 ml-5">{subtitle}</p>
    </div>
  );
}
