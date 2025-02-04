export interface OfficeSearchFilters {
  searchPhrase: string;
  selectedCountries: string[];
  selectedAmenities: string[];
  amenitiesFiltering: 'ALL' | 'ANY';
}
