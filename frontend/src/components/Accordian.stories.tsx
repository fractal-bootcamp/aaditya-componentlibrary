import type { Meta, StoryObj } from '@storybook/react';

import Accordian from './Accordian';

const meta = {
  component: Accordian,
} satisfies Meta<typeof Accordian>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};