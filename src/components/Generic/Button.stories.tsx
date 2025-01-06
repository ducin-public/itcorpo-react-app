import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Plus } from "lucide-react";

import { Button } from "./Button";
import { VariantType, DesignFill, DesignSize } from "../DesignLanguage";

const meta: Meta<typeof Button> = {
  title: "UI/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: action("button-clicked"),
    children: "Deploy Project",
    fill: "SOLID",
    variant: "ACCENT",
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
      <Button variant="DEFAULT">Default</Button>
      <Button variant="SUCCESS">Success</Button>
      <Button variant="WARNING">Warning</Button>
      <Button variant="ALERT">Alert</Button>
      <Button variant="UPDATE">Update</Button>
      <Button variant="ACCENT">Accent</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    children: "Create New Project",
    fill: "OUTLINED",
    variant: "DEFAULT",
    fullWidth: true,
  },
};

export const DisabledButton: Story = {
  args: {
    children: "Deploy to Production",
    fill: "SOLID",
    variant: "ACCENT",
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

const labels: { [key in VariantType]: string } = {
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
              {Object.keys(labels).map((variant) => (
                <Button
                  key={`${fill}-${size}-${variant}`}
                  fill={fill}
                  size={size}
                  variant={variant as VariantType}
                >
                  {labels[variant as VariantType]}
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
