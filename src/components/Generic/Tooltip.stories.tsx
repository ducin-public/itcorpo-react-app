import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Tooltip, TooltipDirection, TooltipSize } from './Tooltip';
import * as RUITooltip from "@radix-ui/react-tooltip";
import { PlusIcon } from 'lucide-react';

const meta = {
  title: 'UI/Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const AllDirections: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Object.values(TooltipDirection).map((direction) => (
        <Tooltip key={direction} content={`${direction} tooltip`} direction={direction}>
          <Button>{direction}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {Object.values(TooltipSize).map((size) => (
        <Tooltip
          key={size}
          content="This is a sample tooltip content that demonstrates different widths based on the size prop"
          size={size}
        >
          <Button>{size} Tooltip</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const DifferentSides: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithLongContent: Story = {
  args: {
    content: 'This is a very long tooltip content that will wrap to multiple lines when necessary.',
    children: <Button>Hover for long content</Button>,
  },
};

export const TooltipDemo = () => {
	return (
		<RUITooltip.Provider>
			<RUITooltip.Root>
				<RUITooltip.Trigger asChild>
					<button className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
						<PlusIcon />
					</button>
				</RUITooltip.Trigger>
				<RUITooltip.Portal>
					<RUITooltip.Content
						className="select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none text-violet11 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
						sideOffset={5}
					>
						Add to library
						<RUITooltip.Arrow className="fill-white" />
					</RUITooltip.Content>
				</RUITooltip.Portal>
			</RUITooltip.Root>
		</RUITooltip.Provider>
	);
};