- [ ] wszystko do query options
- [ ] ExpandableSearchBar.ExpandedContent -> ExpandableSearchBar.ExpandedContentLine
- [ ] src/pages/Projects/ProjectSearchBar.tsx button choice inline label


emp search
- [ ] dept - single
projects
- [ ] status vs statuses
-------------
- [ ] bug in phone, repro: type manually
- [ ] iconbutton typing issues (styles.constants) src/components/Generic/IconButton.tsx

-------------
IT CORPO react app
TODO:
- [ ] divider
- [ ] avatar i patient avatar
- [ ] tooltip
- [ ] entry - kolory skopane
- [ ] date picker :/

            <div className="col-span-2">
                <DateRangePicker
                label="Active Period"
                startDate={criteria.activePeriod?.from}
                endDate={criteria.activePeriod?.to}
                onStartDateChange={(date) => handleChange({ 
                    activePeriod: { ...criteria.activePeriod, from: date } 
                })}
                onEndDateChange={(date) => handleChange({ 
                    activePeriod: { ...criteria.activePeriod, to: date } 
                })}
                />
            </div>
-------------

please add the FilteringChoice component (from src/components/Forms/FilteringChoice.tsx) to ProjectSearchBar (in src/pages/Projects/ProjectSearchBar.tsx) - it should be placed right after TextInput/Team Member.

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
