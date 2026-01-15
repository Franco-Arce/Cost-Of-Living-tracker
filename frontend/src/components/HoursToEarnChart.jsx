import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getCountryFlag } from '../utils/countryUtils';

export default function HoursToEarnChart({ data }) {
    const sortedData = [...data].sort((a, b) => a.hours_to_earn_basket - b.hours_to_earn_basket);

    // Gradient from green (good) to red (bad)
    const getBarColor = (hours) => {
        if (hours < 10) return '#10b981'; // emerald
        if (hours < 20) return '#06b6d4'; // cyan
        if (hours < 30) return '#f59e0b'; // amber
        if (hours < 40) return '#f97316'; // orange
        return '#ef4444'; // red
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            const flag = getCountryFlag(item.country);
            const hours = payload[0].value;

            return (
                <div className="bg-gradient-to-br from-slate-950/98 to-indigo-950/98 backdrop-blur-2xl border-2 border-orange-400/50 rounded-2xl p-5 shadow-2xl shadow-orange-500/30">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{flag}</span>
                        <div>
                            <p className="font-bold text-xl text-white">{item.city}</p>
                            <p className="text-orange-300/80 text-sm">{item.country}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-orange-200">
                            <span className="text-orange-400 font-semibold">Work Hours:</span>{' '}
                            <span className="font-bold text-2xl text-gradient">{hours.toFixed(1)} hrs</span>
                        </p>
                        <p className="text-xs text-orange-300/60 italic">
                            {hours < 15 ? '✨ Excellent!' : hours < 25 ? '👍 Good' : hours < 35 ? '⚠️ Fair' : '😰 Challenging'}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="card-glass animate-fade-in-up relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-5xl">⏰</span>
                        <h2 className="text-4xl font-black text-gradient">Work Hours to Earn Basket</h2>
                    </div>
                    <p className="text-violet-200/80 text-lg">
                        How many hours of average wage needed to buy a standard basket of goods.
                        <span className="text-emerald-400 font-semibold"> Lower is better for workers.</span>
                    </p>
                </div>

                <ResponsiveContainer width="100%" height={700}>
                    <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 120, bottom: 5 }}>
                        <defs>
                            <linearGradient id="hoursGradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                <stop offset="50%" stopColor="#f59e0b" stopOpacity={1} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(245, 158, 11, 0.2)" />
                        <XAxis
                            type="number"
                            stroke="rgba(251, 191, 36, 0.8)"
                            style={{ fontSize: '14px', fontWeight: '600' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="city"
                            stroke="rgba(251, 191, 36, 0.8)"
                            width={110}
                            style={{ fontSize: '13px', fontWeight: '500' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar
                            dataKey="hours_to_earn_basket"
                            name="Hours to Earn Basket"
                            radius={[0, 12, 12, 0]}
                            animationDuration={1000}
                        >
                            {sortedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarColor(entry.hours_to_earn_basket)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
