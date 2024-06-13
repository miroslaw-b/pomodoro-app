import { componentWrapperDecorator, Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div class="mat-typography mat-app-background">${story}</div>`,
    ),
  ],
};

export default preview;
