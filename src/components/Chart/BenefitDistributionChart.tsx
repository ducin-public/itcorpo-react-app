import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { H2 } from '../Typography/Headings';
import { styles, textStyle } from '../DesignLanguage/ColorVariants';

interface ChartTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

const ChartTile: React.FC<ChartTileProps> = ({ icon, label, value, className = '' }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <div className="text-xl font-semibold">{value}</div>
  </div>
);

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill={fill}
        onClick={console.log}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        onClick={console.log}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`some stuff ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

interface BenefitDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  width?: number;
  height?: number;
  totalBenefits?: number;
  plannedBenefits?: number;
  benefitTrend?: number;
}

export const BenefitDistributionChart: React.FC<BenefitDistributionChartProps> = ({
  data,
  width = 400,
  height = 400,
  totalBenefits = 0,
  plannedBenefits = 0,
  benefitTrend = 0
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full p-4">
      <H2 className="mb-6">Benefits Distribution</H2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ChartTile
          icon={<Target className={styles.ACCENT.text} />}
          label="Total Benefits"
          value={formatCurrency(totalBenefits)}
          className={styles.ACCENT.background}
        />
        <ChartTile
          icon={<Target className={styles.SUCCESS.text} />}
          label="Planned Benefits"
          value={formatCurrency(plannedBenefits)}
          className={styles.SUCCESS.background}
        />
        <ChartTile
          icon={benefitTrend >= 0 ? 
            <TrendingUp className={styles.SUCCESS.text} /> : 
            <TrendingDown className={styles.ALERT.text} />
          }
          label="Benefit Trend"
          value={`${benefitTrend > 0 ? '+' : ''}${benefitTrend}%`}
          className={benefitTrend >= 0 ? styles.SUCCESS.background : styles.ERROR.background}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4" style={{ width, height }}>
        <ResponsiveContainer width={width} height={height}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              fill={textStyle.ACCENT.hex}
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
