/* eslint-disable react/display-name */
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface GaugeProps {
  score: number; // 0–100
}

const RADIAN = Math.PI / 180;

// Convert percentage to angle
const getNeedleAngle = (score: number) => 180 * (score / 100);

// Render the needle inside the chart
const renderNeedle = (score: number) => ({
  cx,
  cy,
  outerRadius,
}: {
  cx?: number;
  cy?: number;
  outerRadius?: number;
}) => {
  if (cx == null || cy == null || outerRadius == null) return null;

  const angle = getNeedleAngle(score);
  const length = outerRadius * 0.9;
  const rad = RADIAN * angle;

  const x = cx + length * Math.cos(Math.PI - rad);
  const y = cy - length * Math.sin(Math.PI - rad);

  return (
    <g>
      <line x1={cx} y1={cy} x2={x} y2={y} stroke="#000" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={5} fill="#000" />
    </g>
  );
};

const getGaugeData = () => [
  { value: 33.3, color: '#992600' },
  { value: 33.3, color: '#fa3c00' },
  { value: 33.4, color: '#FFD2C2' },
];

export const DashboardHealthGauge: React.FC<GaugeProps> = ({ score }) => {
  const data = getGaugeData();

  return (
    <div style={{ width: '100%', height: 200 }}>
      <h3 className='border border-dark rounded p-2 my-2'>Dashboard Health: {score}/100</h3>
      <h3 className='bg-primary text-white rounded p-2 my-2 w-auto text-center'> {score>25?'FAIR':score>50?'GOOD':score>75?'EXCELLENT':'BAD'}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="85%"
            outerRadius="100%"
            innerRadius="65%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
            label={renderNeedle(score)} // ⬅️ Needle rendered here
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
