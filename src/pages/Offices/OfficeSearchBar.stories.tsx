import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { OfficeSearchBar } from './OfficeSearchBar';

const meta: Meta<typeof OfficeSearchBar> = {
  title: 'ITCORPO/Offices/SearchBar',
  component: OfficeSearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OfficeSearchBar>;

export const Default: Story = {
  args: {
    onSearchChange: action('search-change'),
    onCountriesChange: action('countries-change'),
    onAmenitiesChange: action('amenities-change'),
    selectedCountries: [],
    selectedAmenities: [],
    searchPhrase: '',
  },
};

export const WithFiltersSelected: Story = {
  args: {
    onSearchChange: action('search-change'),
    onCountriesChange: action('countries-change'),
    onAmenitiesChange: action('amenities-change'),
    selectedCountries: ['PL', 'DE'],
    selectedAmenities: ['1', '2'],
    searchPhrase: 'Warsaw',
  },
};
