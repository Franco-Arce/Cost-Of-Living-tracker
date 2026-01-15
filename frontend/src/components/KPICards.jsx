import { metricsService } from '../services/api';
import { getCountryFlag } from '../utils/countryUtils';

export default function KPICards({ data }) {
    const avgPPI = metricsService.calculateAvgPPI(data);
    const avgHours = metricsService.calculateAvgHours(data);
    const highestPPI = metricsService.getHighestPPI(data);

    const metrics = [
        {
            icon: '💎',
            label: 'Average Purchasing Power',
            value: avgPPI.toFixed(2),
            subtitle: 'Global Index',
            gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
            glowColor: 'emerald',
            description: 'Higher means better buying power'
        },
        {
            icon: '⏰',
            label: 'Average Work Hours',
            value: `${avgHours.toFixed(1)}`,
            subtitle: 'To Earn Basket',
            gradient: 'from-blue-500 via-indigo-500 to-purple-500',
            glowColor: 'blue',
            description: 'Lower is better for workers'
        },
        {
            icon: '🏆',
            label: 'Best City',
            value: highestPPI ? `${highestPPI.city}` : 'N/A',
            subtitle: highestPPI ? `${getCountryFlag(highestPPI.country)} ${highestPPI.country}` : '',
            gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
            glowColor: 'violet',
            description: 'Highest purchasing power'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="metric-card card-3d group relative"
                    style={{
                        animation: `fade-in-up ${0.5 + index * 0.2}s ease-out`
                    }}
                >
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl`}></div>

                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}></div>

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon with float animation */}
                        <div className="text-7xl mb-4 transform group-hover:scale-125 transition-all duration-500 animate-float drop-shadow-2xl">
                            {metric.icon}
                        </div>

                        {/* Label */}
                        <p className="text-sm text-violet-300/80 mb-2 font-bold uppercase tracking-wider">
                            {metric.label}
                        </p>

                        {/* Value with gradient */}
                        <p className={`text-5xl font-black bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent mb-2 drop-shadow-lg`}>
                            {metric.value}
                        </p>

                        {/* Subtitle */}
                        {metric.subtitle && (
                            <p className="text-base text-white/70 font-medium mb-3">
                                {metric.subtitle}
                            </p>
                        )}

                        {/* Description */}
                        <p className="text-xs text-violet-300/60 italic">
                            {metric.description}
                        </p>
                    </div>

                    {/* Corner accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${metric.gradient} opacity-10 rounded-bl-full`}></div>
                    <div className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${metric.gradient} opacity-10 rounded-tr-full`}></div>
                </div>
            ))}
        </div>
    );
}
