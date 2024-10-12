import type { Meta, StoryObj } from '@storybook/react';

import FileUploader from './FileUploader';

const meta = {
  component: FileUploader,
} satisfies Meta<typeof FileUploader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};