import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

interface SkillLevel {
  name: string;
  value: number; // 0-100
}

interface CompetenceChartProps {
  skills: SkillLevel[];
  height?: number;
  width?: number;
  showLegend?: boolean;
  title?: string;
}

export const CompetenceRadarChart = ({
  skills,
  height = 400,
  width = 400,
  showLegend = true,
  title
}: CompetenceChartProps) => {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width={width} height={height}>
        <RadarChart outerRadius={150} data={skills}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            name="Competence Level"
            dataKey="value"
            stroke={'#9333EA'}
            fill={'#E9D5FF'}
            fillOpacity={0.5}
            onClick={(data) => console.log(data)}
          />
          {showLegend && <Legend />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Sample data for different hierarchy levels
export const generalSkills = [
  { name: 'Technical', value: 90 },
  { name: 'Management', value: 75 },
  { name: 'Marketing', value: 60 },
  { name: 'Communication', value: 85 },
  { name: 'Leadership', value: 70 },
  { name: 'Problem Solving', value: 95 }
];

export const technicalSkills = [
  { name: 'Frontend', value: 95 },
  { name: 'Backend', value: 85 },
  { name: 'Database', value: 75 },
  { name: 'DevOps', value: 70 },
  { name: 'QA', value: 80 },
  { name: 'Architecture', value: 85 }
];

export const expertiseSkills = [
  { name: 'React', value: 95 },
  { name: 'TypeScript', value: 90 },
  { name: 'Jest', value: 85 },
  { name: 'Redux', value: 80 },
  { name: 'Node.js', value: 85 },
  { name: 'Docker', value: 75 }
];
