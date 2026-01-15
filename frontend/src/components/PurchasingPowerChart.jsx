import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getCountryFlag } from '../utils/countryUtils';

export default function PurchasingPowerChart({ data }) {
    const sortedData = [...data].sort((a, b) => b.purchasing_power_index - a.purchasing_power_index);

    // Vibrant gradient colors for bars
    const barColors = [
        '#8b5cf6', // violet
        '#a78bfa', // light violet
        '#c084fc', // lighter violet
        '#d946ef', // fuchsia
        '#e879f9', // light fuchsia
        '#f0abfc', // lighter fuchsia
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            const flag = getCountryFlag(item.country);

            return (
                <div className="bg-gradient-to-br from-slate-950/98 to-indigo-950/98 backdrop-blur-2xl border-2 border-violet-400/50 rounded-2xl p-5 shadow-2xl shadow-violet-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{flag}</span>
                        <div>
                            <p className="font-bold text-xl text-white">{item.city}</p>
                            <p className="text-violet-300/80 text-sm">{item.country}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-violet-200">
                            <span className="text-violet-400 font-semibold">PPI:</span>{' '}
                            <span className="font-bold text-2xl text-gradient">{payload[0].value.toFixed(2)}</span>
                        </p>
                        <p className="text-xs text-violet-300/60 italic">Higher is better</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="card-glass animate-fade-in-up relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-5xl">💎</span>
                        <h2 className="text-4xl font-black text-gradient">Purchasing Power Index</h2>
                    </div>
                    <p className="text-violet-200/80 text-lg">
                        Higher values mean local salaries can buy more goods.
                        <span className="text-violet-400 font-semibold"> Top performers lead in affordability.</span>
                    </p>
                </div>

                <ResponsiveContainer width="100%" height={700}>
                    <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                        <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                                <stop offset="50%" stopColor="#d946ef" stopOpacity={1} />
                                <stop offset="100%" stopColor="#f0abfc" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                        <XAxis
                            type="number"
                            stroke="rgba(196, 181, 253, 0.8)"
                            style={{ fontSize: '14px', fontWeight: '600' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="city"
                            stroke="rgba(196, 181, 253, 0.8)"
                            width={110}
                            style={{ fontSize: '13px', fontWeight: '500' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar
                            dataKey="purchasing_power_index"
                            name="Purchasing Power Index"
                            fill="url(#barGradient)"
                            radius={[0, 12, 12, 0]}
                            animationDuration={1000}
                        >
                            {sortedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColors[index % barColors.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
