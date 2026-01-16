import { metricsService } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';

export default function KPICards({ data }) {
    const { t, translateCountry } = useLanguage();
    const avgPPI = metricsService.calculateAvgPPI(data);
    const avgHours = metricsService.calculateAvgHours(data);
    const highestPPI = metricsService.getHighestPPI(data);

    const metrics = [
        {
            label: t('avgPurchasingPower'),
            value: avgPPI.toFixed(1),
            unit: t('ppiUnit'),
            change: null,
            description: t('globalAverage')
        },
        {
            label: t('avgWorkHours'),
            value: avgHours.toFixed(1),
            unit: t('hoursUnit'),
            change: null,
            description: t('toEarnBasket')
        },
        {
            label: t('highestPPICity'),
            value: highestPPI ? highestPPI.city.replace(/-/g, ' ') : 'N/A',
            unit: highestPPI ? `${highestPPI.purchasing_power_index.toFixed(1)} ${t('ppiUnit')}` : '',
            change: null,
            description: highestPPI ? translateCountry(highestPPI.country) : ''
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="metric-card"
                >
                    <div className="text-left w-full">
                        <p className="stat-label mb-2">
                            {metric.label}
                        </p>
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className="stat-number">
                                {metric.value}
                            </p>
                            {metric.unit && (
                                <span className="text-sm text-slate-400 font-medium">
                                    {metric.unit}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500">
                            {metric.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
