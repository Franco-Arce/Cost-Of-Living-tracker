import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HoursToEarnChart({ data }) {
    const sortedData = [...data].sort((a, b) => a.hours_to_earn_basket - b.hours_to_earn_basket);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl">
                    <p className="font-semibold text-white mb-2">{payload[0].payload.city}</p>
                    <p className="text-orange-400">
                        Hours: <span className="font-bold">{payload[0].value.toFixed(1)}</span>
                    </p>
                    <p className="text-white/60 text-sm mt-1">{payload[0].payload.country}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="card-glass">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">⏱️ Work Hours Needed to Buy Basic Basket</h2>
                <p className="text-white/60">Lower is better. Shows how many hours of average wage are needed.</p>
            </div>

            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={sortedData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.6)" />
                    <YAxis
                        type="category"
                        dataKey="city"
                        stroke="rgba(255,255,255,0.6)"
                        width={90}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="hours_to_earn_basket"
                        name="Hours to Earn Basket"
                        fill="url(#colorHours)"
                        radius={[0, 8, 8, 0]}
                    />
                    <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}
