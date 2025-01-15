import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, Blocks } from 'lucide-react';

import { CompetenceRadarChart } from './CompetenceRadarChart';

const meta: Meta<typeof CompetenceRadarChart> = {
  title: 'ITCORPO/WIP-Charts/CompetenceRadarChart',
  component: CompetenceRadarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CompetenceRadarChart>;

export interface SkillNode {
  name: string;
  value: number;
  children?: SkillNode[];
}

const skillsHierarchy: SkillNode[] = [
  {
    name: 'Technical',
    value: 90,
    children: [
      {
        name: 'Frontend',
        value: 95,
        children: [
          { name: 'React', value: 95 },
          { name: 'TypeScript', value: 90 },
          { name: 'Redux', value: 85 },
          { name: 'Testing', value: 80 },
          { name: 'CSS/SCSS', value: 90 },
          { name: 'Performance', value: 85 }
        ]
      },
      {
        name: 'Backend',
        value: 85,
        children: [
          { name: 'Node.js', value: 90 },
          { name: 'Express', value: 85 },
          { name: 'GraphQL', value: 80 },
          { name: 'REST APIs', value: 90 },
          { name: 'Security', value: 85 }
        ]
      },
      {
        name: 'Database',
        value: 75,
        children: [
          { name: 'PostgreSQL', value: 85 },
          { name: 'MongoDB', value: 80 },
          { name: 'Redis', value: 75 },
          { name: 'SQL', value: 90 }
        ]
      },
      {
        name: 'DevOps',
        value: 70,
        children: [
          { name: 'Docker', value: 80 },
          { name: 'Kubernetes', value: 70 },
          { name: 'CI/CD', value: 85 },
          { name: 'AWS', value: 75 }
        ]
      },
      {
        name: 'QA',
        value: 80,
        children: [
          { name: 'Jest', value: 90 },
          { name: 'Cypress', value: 85 },
          { name: 'Testing Library', value: 85 },
          { name: 'E2E Testing', value: 80 }
        ]
      }
    ]
  },
  {
    name: 'Management',
    value: 75,
    children: [
      {
        name: 'Project Management',
        value: 80,
        children: [
          { name: 'Agile', value: 85 },
          { name: 'Scrum', value: 90 },
          { name: 'Kanban', value: 80 },
          { name: 'Risk Management', value: 75 }
        ]
      },
      {
        name: 'Team Leadership',
        value: 85,
        children: [
          { name: 'Mentoring', value: 90 },
          { name: 'Conflict Resolution', value: 80 },
          { name: 'Team Building', value: 85 },
          { name: 'Performance Reviews', value: 80 }
        ]
      }
    ]
  },
  {
    name: 'Marketing',
    value: 60,
    children: [
      {
        name: 'Digital Marketing',
        value: 65,
        children: [
          { name: 'SEO', value: 70 },
          { name: 'Social Media', value: 75 },
          { name: 'Content Marketing', value: 65 },
          { name: 'Analytics', value: 60 }
        ]
      },
      {
        name: 'Brand Management',
        value: 55,
        children: [
          { name: 'Brand Strategy', value: 60 },
          { name: 'Visual Design', value: 55 },
          { name: 'Market Research', value: 50 }
        ]
      }
    ]
  },
  {
    name: 'Communication',
    value: 85,
    children: [
      {
        name: 'Written',
        value: 90,
        children: [
          { name: 'Documentation', value: 95 },
          { name: 'Technical Writing', value: 90 },
          { name: 'Email Communication', value: 85 }
        ]
      },
      {
        name: 'Verbal',
        value: 80,
        children: [
          { name: 'Presentations', value: 85 },
          { name: 'Public Speaking', value: 75 },
          { name: 'Team Meetings', value: 90 }
        ]
      }
    ]
  }
];

export const Default: Story = {
  render: () => {
    const [skillPath, setSkillPath] = useState<string[]>([]);
    
    const getCurrentSkills = (): SkillNode[] => {
      let currentLevel = skillsHierarchy;
      for (const pathItem of skillPath) {
        const nextLevel = currentLevel.find(skill => skill.name === pathItem)?.children;
        if (!nextLevel) return currentLevel;
        currentLevel = nextLevel;
      }
      return currentLevel;
    };
  
    const handleSkillClick = (skillName: string) => {
      const currentSkills = getCurrentSkills();
      const clickedSkill = currentSkills.find(skill => skill.name === skillName);
      if (clickedSkill?.children) {
        setSkillPath([...skillPath, skillName]);
      }
    };
  
    const handleBackClick = () => {
      setSkillPath(skillPath.slice(0, -1));
    };
  
    const currentSkills = getCurrentSkills();
    const currentLevel = skillPath.length === 0 ? 'General' : 
      skillPath.length === 1 ? 'Technical' : 'Expertise';
  
    return (
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {skillPath.length > 0 && (
                <button
                  onClick={handleBackClick}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-600" />
                </button>
              )}
              <Blocks className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Competency Overview
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {skillPath.map((skill, index) => (
                    <React.Fragment key={skill}>
                      {index > 0 && <span className="text-gray-400">/</span>}
                      <span>{skill}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-1">
              {currentLevel} level skill assessment
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Current Level</p>
            <p className="text-lg font-semibold text-indigo-600">{currentLevel}</p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Average Proficiency</p>
            <p className="text-2xl font-bold text-slate-900">
              {Math.round(currentSkills.reduce((sum, skill) => sum + skill.value, 0) / currentSkills.length)}%
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Skills Count</p>
            <p className="text-2xl font-bold text-slate-900">{currentSkills.length}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600">Top Skill</p>
            <p className="text-2xl font-bold text-slate-900">
              {currentSkills.reduce((max, skill) => skill.value > max.value ? skill : max).name}
            </p>
          </div>
        </div>
  
        <div className="flex justify-center">
          <CompetenceRadarChart
            skills={currentSkills}
            height={500}
            width={800}
            showLegend={true}
            title={`${currentLevel} Skills Overview`}
          />
        </div>
  
        {currentSkills.some(skill => skill.children) && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Click on any skill to see detailed breakdown
          </div>
        )}
      </div>
    );
  }
};
