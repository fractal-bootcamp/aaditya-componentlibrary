import type { Meta, StoryObj } from '@storybook/react';

import SkeletonScreen from './SkeletonScreen';

const meta = {
  component: SkeletonScreen,
} satisfies Meta<typeof SkeletonScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};