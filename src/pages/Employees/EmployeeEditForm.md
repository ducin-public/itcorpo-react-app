# EmployeeEditForm Specification

## Form Layout
The form should be divided into logical sections for better user experience:
1. Identity Information
2. Employment Details
3. Contract Section
4. Company Internal Information
5. Personal Contact Information
6. Skills & Bio
7. Profile Image

## Field Specifications

### Identity Information Section
- First Name
  - Control: `TextInput`
  - Required: true
  - Validation: non-empty string

- Last Name
  - Control: `TextInput`
  - Required: true
  - Validation: non-empty string

- Nationality
  - Control: `CountrySelect`
  - Required: true
  - Options: ISO 3166-1 alpha-2 country codes

- Date of Birth
  - Control: `DatePicker`
  - Required: true
  - Format: ISO 8601
  - Validation: must be 18+ years old

- Age
  - Control: Auto-calculated from Date of Birth
  - Display only

### Employment Details Section
- Department
  - Control: `Dropdown`
  - Required: true
  - Options should be fetched from backend

- Title
  - Control: `TextInput`
  - Required: true
  - Example: "Senior Software Engineer"

- Office Location
  - Control: `Dropdown`
  - Required: true
  - Options should be fetched from backend

- Salary (EUR)
  - Control: `CurrencyInput`
  - Required: true
  - Currency: EUR fixed

### Contract Section

- Contract Type
  - Control: `Dropdown`
  - Required: true
  - Options: Based on ContractType enum

- Contract Start Date
  - Control: `DatePicker`
  - Required: true
  - Format: ISO 8601
  - additional for hiredAt

- Contract Expiration Date
  - Control: `DatePicker`
  - Required: false
  - Format: ISO 8601
  - Must be after Hired Date

### Company Internal Information Section

- Work Email
  - Control: `TextInput`
  - Required: true
  - Type: email
  - Validation: email format
  - suggested by the system after clicking a button

- Keycard ID
  - Control: `TextInput`
  - Required: true
  - suggested by the system after clicking a button

### Personal Contact Information Section

- Personal Email
  - Control: `TextInput`
  - Required: true
  - Type: email
  - Validation: email format

- Phone
  - Control: `PhoneInput`
  - Required: true
  - Validation: phone number format

- Bank Account
  - Control: `TextInput`
  - Required: true
  - for transferring salary

- Address
  - Street
    - Control: `TextInput`
    - Required: true

  - City
    - Control: `TextInput`
    - Required: true

  - Country
    - Control: `CountrySelect`
    - Required: true

### Skills & Bio Section

- Skills
  - Control: combination of TextInput + TagList + internal state
  - Required: true
  - Options should be fetched from backend
  - Allow multiple selections

- Bio
  - Control: `TextArea`
  - Required: false
  - Max length: TBD

### Profile Image Section
- Image URL
  - Control: `ImageUpload` or `TextInput`
  - Required: false
  - Validation: valid URL format if entered


## Validation Rules
1. All required fields must be filled
2. Email formats must be valid
3. Dates must be in ISO 8601 format
4. Office must have exactly 2 locations selected
5. Contract expiration date must be after hire date
6. Age must be automatically calculated and >= 18
7. Phone number must be in valid format

## Implementation details

- use components from: src/components/Forms
- use FormSection from src/components/Forms/FormSection.tsx to implement separate form sections
- feel free to apply a top-down approach and implement this form in multiple steps if it'd be easier

## Form Actions
- Save: Submit form if all validations pass
- Cancel: Return to previous page
- Reset: Clear all form fields
