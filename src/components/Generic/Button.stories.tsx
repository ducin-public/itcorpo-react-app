import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";
import { MessageType } from "../DesignEnums/MessageType";
import { DesignFill, DesignSize } from "../DesignEnums/designEnums";
import { Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: action("button-clicked"),
    children: "Deploy Project",
    fill: "SOLID",
    messageType: "ACCENT",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Fills: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button fill="SOLID">Solid</Button>
      <Button fill="OUTLINED">Outlined</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="SMALL">Small Button</Button>
      <Button size="MEDIUM">Medium Button</Button>
      <Button size="LARGE">Large Button</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button messageType="DEFAULT">Default</Button>
      <Button messageType="SUCCESS">Success</Button>
      <Button messageType="WARNING">Warning</Button>
      <Button messageType="ALERT">Alert</Button>
      <Button messageType="UPDATE">Update</Button>
      <Button messageType="ACCENT">Accent</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: "Create New Project",
    fill: "OUTLINED",
    messageType: "DEFAULT",
    fullWidth: true,
  },
};

export const DisabledButton: Story = {
  args: {
    children: "Deploy to Production",
    fill: "SOLID",
    messageType: "ACCENT",
    disabled: true,
  },
};

export const ButtonWithIcon: Story = {
  render: () => (
    <Button
      onClick={action("button-clicked")}
      className="flex items-center space-x-2"
    >
      <Plus className="h-5 w-5" /><span>New Project</span>
    </Button>
  )
};

const labels: { [key in MessageType]: string } = {
  DEFAULT: "In Progress",
  SUCCESS: "Deployed",
  WARNING: "Review Required",
  ALERT: "Critical Bug",
  UPDATE: "Information",
  ACCENT: "Priority",
};
const sizes: DesignSize[] = ["SMALL", "MEDIUM", "LARGE"];
const fills: DesignFill[] = ["SOLID", "OUTLINED"];

export const AllCases: Story = {
  render: () => (
    <div className="space-y-4">
      {fills.map((fill) => (
        <div className="space-y-2">
          {sizes.map((size) => (
            <div className="flex gap-2">
              {Object.keys(labels).map((messageType) => (
                <Button
                  key={`${fill}-${size}-${messageType}`}
                  fill={fill}
                  size={size}
                  messageType={messageType as MessageType}
                >
                  {labels[messageType as MessageType]}
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
