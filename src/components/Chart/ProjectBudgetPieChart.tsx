import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CircleDollarSign } from 'lucide-react';

interface ProjectBudgetPieChartProps {
  data: {
    projectName: string;
    budget: number;
    spent: number;
    status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  }[];
  height?: number;
  width?: number;
  innerRadius?: number;
  colorScheme?: 'default' | 'monochrome' | 'categorical';
  customColors?: string[];
  showLabels?: boolean;
  labelType?: 'percentage' | 'value' | 'both';
  labelPosition?: 'inside' | 'outside';
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  onSliceClick?: (data: { projectName: string; budget: number }) => void;
  animate?: boolean;
  animationDuration?: number;
}

const DEFAULT_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#EC4899', // Pink
];

const STATUS_COLORS = {
  ACTIVE: '#22C55E',
  COMPLETED: '#3B82F6',
  ON_HOLD: '#F59E0B',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentageSpent = ((data.spent / data.budget) * 100).toFixed(1);
    
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border">
        <p className="font-semibold text-lg mb-2">{data.projectName}</p>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Budget: <span className="font-semibold text-gray-900">
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0
              }).format(data.budget)}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Spent: <span className="font-semibold text-gray-900">
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0
              }).format(data.spent)}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Progress: <span className="font-semibold text-gray-900">{percentageSpent}%</span>
          </p>
          <div 
            className="mt-2 text-sm px-2 py-1 rounded-full text-white text-center"
            style={{ backgroundColor: STATUS_COLORS[data.status] }}
          >
            {data.status}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const ProjectBudgetPieChart = ({
  data,
  height = 400,
  innerRadius = 85,
  showLegend = true,
  legendPosition = 'right',
  animate = true,
  animationDuration = 1000,
}: ProjectBudgetPieChartProps) => {
  const chartData = data.map(item => ({
    ...item,
    value: item.spent,
  }));

  const totalBudget = data.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const percentageSpent = ((totalSpent / totalBudget) * 100).toFixed(1);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <CircleDollarSign className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Project Budgets</h2>
          </div>
          <p className="text-gray-600">Budget allocation and spending across projects</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Budget</p>
          <p className="text-2xl font-bold text-gray-900">
            {new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: 'GBP',
              minimumFractionDigits: 0
            }).format(totalBudget)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {percentageSpent}% Spent
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={Math.min(height / 2 - 20, 180)}
            paddingAngle={2}
            dataKey="value"
            animationDuration={animationDuration}
            animationBegin={0}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={entry.projectName}
                fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                className="transition-opacity duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              layout={legendPosition === 'left' || legendPosition === 'right' ? 'vertical' : 'horizontal'}
              align="center"
              verticalAlign={legendPosition === 'top' ? 'top' : 'bottom'}
              iconType="circle"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};