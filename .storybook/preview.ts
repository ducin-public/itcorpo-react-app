import type { Preview } from "@storybook/react";

import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'UI',
          ['Typography', 'Forms', ['📚 Index'], 'Atoms', 'Molecules'], 
          'ITCORPO'
        ],
      },
    }
  },
};

export default preview;
