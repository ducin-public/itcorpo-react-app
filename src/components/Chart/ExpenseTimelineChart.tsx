import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { format } from 'date-fns';
import { textStyle } from '../DesignLanguage';
import { formatCurrency } from '../../contexts/CurrencyContext';
import { ProjectStatus } from '../../contract-types/data-contracts';

export type ExpenseBar = {
  date: string;
  amount: number;
  title: string;
  status: ProjectStatus
}

interface ExpenseTimelineChartProps {
  data: ExpenseBar[];
  height?: number;
}

const statusColors: Record<ProjectStatus, string> = {
  ACTIVE: textStyle.ACCENT.hex, // '#9333EA',
  COMPLETED: textStyle.UPDATE.hex, // '#2563EB',
  ON_HOLD: textStyle.SUCCESS.hex, // '#16A34A',
  PLANNING: textStyle.WARNING.hex, // '#EA580C',
};

const chartColors = {
    // slate-700
    text: '#374151',
    // slate-400
    grid: '#9CA3AF',
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-4 shadow-lg border rounded-lg transition-all duration-200 ease-in-out">
        <p className="text-lg font-semibold mb-1">{data.title}</p>
        <p className="text-sm text-gray-600 mb-2">{format(new Date(data.date), 'PPP')}</p>
        <p className="text-xl font-bold mb-2">{formatCurrency(data.amount)}</p>
        <div 
          className="text-sm px-2 py-1 rounded-full text-white text-center"
          style={{ backgroundColor: statusColors[data.status as Status] }}
        >
          {data.status}
        </div>
      </div>
    );
  }
  return null;
};

interface CustomBarProps {
    fill: string
    x: number
    y: number
    width: number
    height: number
    status: ProjectStatus
}

const CustomBar = ({ x, y, width, height, status }: CustomBarProps) => {
  return (
    <g>
      <defs>
        <linearGradient id={`gradient-${status}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={statusColors[status]} stopOpacity={1} />
          <stop offset="95%" stopColor={statusColors[status]} stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient-${status})`}
        rx={4}
        ry={4}
        className="transition-all duration-300 ease-in-out hover:opacity-80"
      />
    </g>
  );
};

const CustomLabel = (props: any) => {
  const { x, y, value } = props;
  return (
    <text
      x={x + props.width / 2}
      y={y - 10}
      fill={chartColors.text}
      textAnchor="middle"
      fontSize="12"
      className="font-medium"
    >
      {formatCurrency(value)}
    </text>
  );
};

export const ExpenseTimelineChart = ({
  data,
  height = 400,
}: ExpenseTimelineChartProps) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          className="transition-all duration-300 ease-in-out"
        >
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={chartColors.grid}
            className="opacity-30"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), 'MMM d')}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
            tickLine={{ stroke: chartColors.grid }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            stroke={chartColors.text}
            tick={{ fill: chartColors.text }}
            tickLine={{ stroke: chartColors.grid }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Bar
            dataKey="amount"
            name="Expense Amount"
            minPointSize={5}
            maxBarSize={60}
            shape={(props) => <CustomBar {...props} status={props.payload.status} />}
            animationDuration={1500}
            animationBegin={0}
            className="cursor-pointer"
          >
            <LabelList
              dataKey="amount"
              content={CustomLabel}
              position="top"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};