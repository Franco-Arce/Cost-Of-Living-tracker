import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PurchasingPowerChart({ data }) {
    const sortedData = [...data].sort((a, b) => b.purchasing_power_index - a.purchasing_power_index);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl">
                    <p className="font-semibold text-white mb-2">{payload[0].payload.city}</p>
                    <p className="text-primary-400">
                        PPI: <span className="font-bold">{payload[0].value.toFixed(2)}</span>
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
                <h2 className="text-3xl font-bold text-white mb-2">💰 Purchasing Power Index by City</h2>
                <p className="text-white/60">Higher is better. It means local salary can buy more goods.</p>
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
                        dataKey="purchasing_power_index"
                        name="Purchasing Power Index"
                        fill="url(#colorPPI)"
                        radius={[0, 8, 8, 0]}
                    />
                    <defs>
                        <linearGradient id="colorPPI" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
}
