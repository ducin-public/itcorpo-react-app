- [ ] text input vs multi select font size
- [ ] iconbutton typing issues (styles.constants) src/components/Generic/IconButton.tsx
emp search
- [ ] dept - single
- [ ] w ogóle nie są uywane filtry
projects
- [ ] status vs statuses

inputy - icon clear
form label nietypowo - switch, autocomplete, radio/grop, checkbox/group
przypadkowe `Math.random().toString(36).substr(2, 9)`
onChanged, onChange, handleChange

ten plik do oczyszczenia: src/pages/Benefits/BenefitSearchCriteria.ts
  - są tam jakieś niepotrzbene duplikaty

multiSelect przyjmuje jedną strukturę (słownik), a Dropdown drugą - ujednolicić


please add the FilteringChoice component (from src/components/Forms/FilteringChoice.tsx) to ProjectSearchBar (in src/pages/Projects/ProjectSearchBar.tsx) - it shhould be placed right after TextInput/Team Member.

the ProjectSearchFilters (src/pages/Projects/ProjectSearchFilters.ts) should also be extended with `teamMemberFiltering: ANY | ALL`. All communication ProjectList-src/pages/Projects/ProjectSearchBar.tsx should include the new control/property - and it should be passed to getProjects call in  useQuery. actually, all search criteria should be used to invoke getProjects.

it expects:
```ts
type Projects.GetProjects.RequestQuery = {
    projectName?: string;
    status?: ProjectStatus;
    teamMembers?: string;
    teamMembersFiltering?: "ANY" | "ALL";
    budgetFrom?: string;
    budgetTo?: string;
}
```
