import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { styles } from '../DesignEnums/MessageType';

export interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

interface TreeProps {
  data: TreeNode[];
  level?: number;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
}

const TreeNodeComponent = ({ node, level }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-1 py-1 px-2 ${styles.ACCENT.backgroundHover} rounded-md ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <span className="w-4 h-4 flex-shrink-0">
          {hasChildren && (
            <ChevronRight 
              className={`w-4 h-4 transition-transform duration-200 ${styles.ACCENT.text} stroke-[2.5] ${
                isExpanded ? 'transform rotate-90' : ''
              }`}
            />
          )}
        </span>
        <span className="text-gray-700">{node.label}</span>
      </div>
      {isExpanded && hasChildren && (
        <Tree data={node.children} level={level + 1} />
      )}
    </div>
  );
};

export const Tree = ({ data, level = 0 }: TreeProps) => {
  return (
    <div className="font-sans">
      {data.map((node) => (
        <TreeNodeComponent key={node.id} node={node} level={level} />
      ))}
    </div>
  );
};
