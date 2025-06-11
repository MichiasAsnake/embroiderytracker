interface StatisticsCardProps {
  title: string;
  value: number;
  icon: string;
}

export default function StatisticsCard({
  title,
  value,
  icon,
}: StatisticsCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
