import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis } from 'recharts';

export default function CostVsSalaryChart({ data }) {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-slate-900/95 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-xl">
                    <p className="font-semibold text-white mb-2">{item.city}, {item.country}</p>
                    <p className="text-blue-400">Basket Cost: <span className="font-bold">${item.basket_cost.toFixed(2)}</span></p>
                    <p className="text-green-400">Avg Salary: <span className="font-bold">${item.salary_avg_net.toFixed(2)}</span></p>
                    <p className="text-purple-400">PPI: <span className="font-bold">{item.purchasing_power_index.toFixed(2)}</span></p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="card-glass">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">⚖️ Cost of Living vs. Local Salary</h2>
                <p className="text-white/60">Are high costs matched by high salaries? Bubble size = Purchasing Power</p>
            </div>

            <ResponsiveContainer width="100%" height={600}>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        type="number"
                        dataKey="basket_cost"
                        name="Basket Cost (USD)"
                        stroke="rgba(255,255,255,0.6)"
                        label={{ value: 'Basket Cost (USD)', position: 'insideBottom', offset: -10, fill: 'rgba(255,255,255,0.6)' }}
                    />
                    <YAxis
                        type="number"
                        dataKey="salary_avg_net"
                        name="Avg Net Salary (USD)"
                        stroke="rgba(255,255,255,0.6)"
                        label={{ value: 'Avg Net Salary (USD)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }}
                    />
                    <ZAxis type="number" dataKey="purchasing_power_index" range={[50, 1000]} />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter
                        name="Cities"
                        data={data}
                        fill="#8b5cf6"
                        fillOpacity={0.7}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </section>
    );
}
