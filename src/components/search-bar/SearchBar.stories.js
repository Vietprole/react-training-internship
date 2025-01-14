import SearchBar from './SearchBar';

export default {
  title: 'SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    onChange: (value) => console.log(value),
  },
};

