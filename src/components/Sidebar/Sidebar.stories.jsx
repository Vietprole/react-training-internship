import Sidebar from './Sidebar';
import AuthProvider from '../../contexts/AuthContext';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  tags: ['autodocs'],
};

export const Default = {
  args: {
  },
};
