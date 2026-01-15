import { metricsService } from '../services/api';

export default function KPICards({ data }) {
    const avgPPI = metricsService.calculateAvgPPI(data);
    const avgHours = metricsService.calculateAvgHours(data);
    const highestPPI = metricsService.getHighestPPI(data);

    const metrics = [
        {
            icon: '💰',
            label: 'Avg Purchasing Power Index',
            value: avgPPI.toFixed(2),
            color: 'from-emerald-500 to-teal-600'
        },
        {
            icon: '⏱️',
            label: 'Avg Hours to Earn Basket',
            value: `${avgHours.toFixed(1)} hrs`,
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: '🏆',
            label: 'Highest Purchasing Power',
            value: highestPPI ? `${highestPPI.city}` : 'N/A',
            subtitle: highestPPI ? highestPPI.country : '',
            color: 'from-purple-500 to-pink-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="metric-card group"
                >
                    <div className={`text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
                        {metric.icon}
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-white/60 mb-2 font-medium uppercase tracking-wide">
                            {metric.label}
                        </p>
                        <p className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                            {metric.value}
                        </p>
                        {metric.subtitle && (
                            <p className="text-sm text-white/50 mt-1">
                                {metric.subtitle}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
