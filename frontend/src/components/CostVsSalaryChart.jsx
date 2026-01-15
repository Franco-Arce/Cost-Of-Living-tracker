import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { getCountryFlag } from '../utils/countryUtils';

export default function CostVsSalaryChart({ data }) {
    // Color palette for scatter points
    const colors = ['#8b5cf6', '#d946ef', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            const flag = getCountryFlag(item.country);

            return (
                <div className="bg-gradient-to-br from-slate-950/98 to-indigo-950/98 backdrop-blur-2xl border-2 border-cyan-400/50 rounded-2xl p-5 shadow-2xl shadow-cyan-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{flag}</span>
                        <div>
                            <p className="font-bold text-xl text-white">{item.city}</p>
                            <p className="text-cyan-300/80 text-sm">{item.country}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-cyan-200">
                            <span className="text-cyan-400 font-semibold">Basket Cost:</span>{' '}
                            <span className="font-bold text-lg">${item.basket_cost.toFixed(2)}</span>
                        </p>
                        <p className="text-emerald-200">
                            <span className="text-emerald-400 font-semibold">Avg Salary:</span>{' '}
                            <span className="font-bold text-lg">${item.salary_avg_net.toFixed(2)}</span>
                        </p>
                        <p className="text-violet-200">
                            <span className="text-violet-400 font-semibold">PPI:</span>{' '}
                            <span className="font-bold text-lg text-gradient">{item.purchasing_power_index.toFixed(2)}</span>
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
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-3">
                        <span className="text-5xl">⚖️</span>
                        <h2 className="text-4xl font-black text-gradient-alt">Cost vs. Salary Balance</h2>
                    </div>
                    <p className="text-violet-200/80 text-lg">
                        Explore the relationship between living costs and salaries.
                        <span className="text-cyan-400 font-semibold"> Bubble size represents purchasing power.</span>
                    </p>
                </div>

                <ResponsiveContainer width="100%" height={700}>
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 60 }}>
                        <defs>
                            <linearGradient id="scatterGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.2)" />
                        <XAxis
                            type="number"
                            dataKey="basket_cost"
                            name="Basket Cost (USD)"
                            stroke="rgba(103, 232, 249, 0.8)"
                            label={{
                                value: 'Basket Cost (USD)',
                                position: 'insideBottom',
                                offset: -15,
                                fill: 'rgba(103, 232, 249, 0.9)',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}
                            style={{ fontSize: '13px', fontWeight: '600' }}
                        />
                        <YAxis
                            type="number"
                            dataKey="salary_avg_net"
                            name="Avg Net Salary (USD)"
                            stroke="rgba(103, 232, 249, 0.8)"
                            label={{
                                value: 'Avg Net Salary (USD)',
                                angle: -90,
                                position: 'insideLeft',
                                fill: 'rgba(103, 232, 249, 0.9)',
                                fontSize: 14,
                                fontWeight: 'bold'
                            }}
                            style={{ fontSize: '13px', fontWeight: '600' }}
                        />
                        <ZAxis type="number" dataKey="purchasing_power_index" range={[100, 1500]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(139, 92, 246, 0.5)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Scatter
                            name="Cities"
                            data={data}
                            fill="url(#scatterGradient)"
                            animationDuration={1200}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
