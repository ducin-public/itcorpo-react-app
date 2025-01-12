import { Meta, StoryObj } from '@storybook/react';

import { H1, H2, H3, H4 } from './Headings';
import { Text } from './Text';
import { Blockquote } from './Blockquote';
import { Paragraph } from './Paragraph';
import { A } from './A';
import { FlexText } from './FlexText';

const meta: Meta = {
  title: 'UI/Typography',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Typography: StoryObj = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
      </div>

      <div className="space-y-4">
        <Paragraph size="LARGE">
          Large Paragraph: Our enterprise software development team specializes in building scalable solutions using cutting-edge technologies and cloud-native architectures.
        </Paragraph>
        <Paragraph>
          Medium Paragraph (default): We manage over 200 active projects across different technology stacks, from legacy system modernization to greenfield cloud applications.
        </Paragraph>
        <Paragraph size="SMALL">
          Small Paragraph: <A href="#">View our technology stack</A> to learn about our expertise in React, Node.js, and cloud platforms.
        </Paragraph>
      </div>

      <FlexText>
        <H1>FlexText Heading1</H1>
        <Text size="SMALL">(Small text)</Text>
      </FlexText>

      <FlexText>
        <H2>FlexText Heading2</H2>
        <Text size="SMALL">(Small text)</Text>
      </FlexText>

      <div className="space-y-2">
        <div>Status DEFAULT: <Text size="SMALL">Operation pending</Text></div>
        <div>Status ACCENT: <Text size="SMALL" variant="ACCENT">Operation accented</Text></div>
        <div>Status SUCCESS: <Text size="SMALL" variant="SUCCESS">Operation successful</Text></div>
        <div>Status ALERT: <Text size="SMALL" variant="ALERT">Operation failed</Text></div>
        <div>Status WARNING: <Text size="SMALL" variant="WARNING">Operation warning</Text></div>
        <div>Status UPDATE: <Text size="SMALL" variant="UPDATE">Operation update</Text></div>
      </div>
      <div className="space-y-2">
        <div>Status DEFAULT: <Text size="MEDIUM">Operation pending</Text></div>
        <div>Status ACCENT: <Text size="MEDIUM" variant="ACCENT">Operation accented</Text></div>
        <div>Status SUCCESS: <Text size="MEDIUM" variant="SUCCESS">Operation successful</Text></div>
        <div>Status ALERT: <Text size="MEDIUM" variant="ALERT">Operation failed</Text></div>
        <div>Status WARNING: <Text size="MEDIUM" variant="WARNING">Operation warning</Text></div>
        <div>Status UPDATE: <Text size="MEDIUM" variant="UPDATE">Operation update</Text></div>
      </div>
      <div className="space-y-2">
        <div>Status DEFAULT: <Text size="LARGE">Operation pending</Text></div>
        <div>Status ACCENT: <Text size="LARGE" variant="ACCENT">Operation accented</Text></div>
        <div>Status SUCCESS: <Text size="LARGE" variant="SUCCESS">Operation successful</Text></div>
        <div>Status ALERT: <Text size="LARGE" variant="ALERT">Operation failed</Text></div>
        <div>Status WARNING: <Text size="LARGE" variant="WARNING">Operation warning</Text></div>
        <div>Status UPDATE: <Text size="LARGE" variant="UPDATE">Operation update</Text></div>
      </div>

      <Blockquote>
        "Code is like humor. When you have to explain it, it's bad." - Cory House
      </Blockquote>
    </div>
  ),
};

export const Links: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <div>
        <A href="#" size="SMALL">Small link</A>
      </div>
      <div>
        <A href="#">Medium link (default)</A>
      </div>
      <div>
        <A href="#" size="LARGE">Large link</A>
      </div>
      <div>
        <Paragraph size="MEDIUM">
          This is a paragraph with an embedded <A href="#">link</A> inside it.
        </Paragraph>
      </div>
    </div>
  ),
};

export const Link: StoryObj = {
  render: () => (
    <A href="#" size="MEDIUM">Default link</A>
  ),
};

export const LinkInContext: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <H2>Project Documentation</H2>
      <Paragraph>
        Check out our <A href="#">deployment guidelines</A> for infrastructure setup instructions.
      </Paragraph>
      <Blockquote>
        Visit the <A href="#">API documentation</A> for detailed endpoint specifications.
      </Blockquote>
    </div>
  ),
};
