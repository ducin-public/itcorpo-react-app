DESIGN QUESTIONS

## Q: kto jest właścicielem typu definiującego klucz?
ProjectList:
```tsx
  const { data: response, isFetching } = useQuery({
    queryKey: ['projects', params],
    queryFn: () => getProjects(queryParams),
    placeholderData: (prev) => prev
  });
```
- src/pages/Projects/search/ProjectSearchParams.ts przechowuje stan i chciałby znać typ swojego własnego stanu
- src/api/ProjectQueries.ts chciałby znać typ klucza query jaki sam przechowuje
- ddodatkowo, react context definiujący search params zawiera zarówno search params w formie inputowej (pochodzącej bezpośrednio z kontrolek) jak i przetransformowaną wersję (zgodną z formatem API)... brzmi to tak jakby ta transformacja była na poziomie ProjectQueries - a nie w kontekście... 
- jeśli jeden będzie uywał typ od drugiego - to coupling, a jeśli zrobimy 2 osobne typy, to w przypadku modyfikacji mamy ryzyko, ze trzeba będzie aktualizować w obu miejscach... gdzie jest złoty środek?

## Struktura aplikacji

- osobny folder `store` albo `stores` - zły pomysł...
- lokalizacja powinna determinować zakres stosowania, zaś nazwa powinna odzwierciedlać odpowiedzialność. Nie bójmy się długich nazw.
  a jeśli śmiejesz się z długich nazw rodem z projektów javowych, to 2 sprawy:
  - lepiej zrobić risercz skąd to się wzięło, zamiast ignorancko wyśmiewać coś, co niekoniecznie się rozumie
  - w długich nazwach NIGDY nie chodziło o wpychanie tam nazw wzorców, bo te przecie widać z publicznego API (interfejsu). Nazwa "EmployeeAbstractFactoryBuilder" jest zgoła z dupy. Sensowna nazwa to prędzej "EmployeeLocalized___Creator?" w podejściu OOP lub "createLocalizedEmployee" w FP

- co jest lepszym designem propsów dla komponentu Overlay:
  - tak:
    ```tsx
    {isFetching && 
        <Spinner size='LARGE' layout='OVERLAY' />
    }
    ```
  - czy moze
    ```tsx
    <SpinnerOverlay size="LARGE" align='TOP' overlay={isFetching}>
      content
    </SpinnerOverlay>
    ```

- mutations:
```tsx
const deleteMutation = useMutation({
  mutationKey: ['employee', 'delete'],
  // FROM:
  // mutationFn: (employeeId: Employee['id']) => deleteEmployee({ employeeId }),
  // TO: 🔥
  mutationFn: ({ employeeId }: { employeeId: Employee['id'], name: string }) =>
    deleteEmployee({ employeeId }),
  // 🔥
  onSuccess: (_result, { employeeId, name }) => {
    queryClient.invalidateQueries({ queryKey: ['employees'] });
    queryClient.removeQueries({ queryKey: ['employees', employeeId] });
    addNotification('notice', `Employee ${name} deleted successfully`);
  },
  onError: (err) => {
    addNotification('error', `Failed to delete employee: ${err.message}`);
  }
});
```
pojawia się problem:
  - wstępnie celowałem, aby listing miał cała logikę, a dziecko było głupie i dostawało wszystko w propsach, w tym takze obsługę "onDelete" któ®a wywołuje mutację...
  - ale pojawił się problem, bo `useMutation` (przynajmniej w v5) obsługuje tak naprawdę single mutation; i jeśli chce się więcej tych mutacji (np. per item) to trzeba mieć ich wiele. A z racji ze to hook, to nie mozna w pętli - i trzeba "znieść" useMutation na poziom dziecka. Od tego zalezy overlay/spinner, oraz tam tez wylądowała logika.
  - no i pytanie się pojawia - na ile rodzic powinien trzymać całą logikę? Czy to rozwiązuje jakiś problem?
  - dodatkowo - jak juz wycialem to z komponentu do "warstwy query" - czy notifications powinno pozostac w query? Czy nie jest to logika UI? Sa plusy i minusy. Niby logika UI wiec w query to nie pasuje. Z dr5ugiej strony - czy te dwie rzeczy (usuwanie i ich notifykacje) nie sa scisle zwiazane (zmieniaja sie razem)? Jaka bylaby korzysc z rozdzielenia tego?
  ```tsx
  export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient();
    const { addNotification } = useNotifications();
    const deleteMutation = useMutation({
      mutationFn: deleteProject,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['projects', 'list'] });
        addNotification('notice', 'Project successfully deleted');
      },
      onError: (error) => {
        addNotification('error', `Failed to delete project: ${error}`);
      },
    });
    return deleteMutation;
  }
  ```

- MODULARNOŚĆ we frontendzie

- nawet CRUDy nie muszą być takie proste:
  - z jednej strony GET, POST, PUT, DELETE. Z drugiej strony - inne są `details` (department name, office details, projects etc. - read model), a inne są `edit` data (department id, office code, brak projektów). In.sł. będzie inny request i inny read model, aby tego nie komplikować.
    - Nie że zawsze - ale przy odpowiednim poziomie complexity może się to okazać korzystniejsze, niż trzymanie jednego modelu na zarówno detailsy jak i edycję
    - w efekcie mamy osobo:
      - `/employees/:id/details` (lub po prostu `employees/:id`)
      - `/employees/:id/edit`
    - no i jak się okaże, że trzeba czyścić query w przypadku edycji, to się robi grubo - bo po usunięciu encji jest tego całkiem sporo, po edycji, itp itd.
  - nie mówiąc o tym że także autocompleter wymaga tańszego searcha (bez joinów dla departamentów i biur) - wymagana jest lista {id, name} bo to wszystko czego potrzebuje autocompleter - ale np. dostarcza go błyskawicznie (bo jest to tańsze/keszowalne). Lub przynajmniej nieporównywalnie łatwiej to keszować. (u mnie: search-feed, nazwa - whatever)
    - no i ten sam problem - jak się zmieniają dane jakiejś encji, to nie tylko id/details i id/edit do wyczyszczenia - ale także listy oraz tenże search-feed.
  - long story short: czyszczenia kluczy (invalidate, remove etc) może być naprawdę sporo...
  - a i jeszcze kolejny temat, np. search-feed:
    - czy warto search-feed keszować po stronie frontu? Gdyby to omijało tanstack query (bo uznano że nie warto), to tak naprawdę lepiej ustanowić prostą regułę - całe HTTP idzie po tanstacku i - gdyby coś miało nie być keszowane - to gcTime: 0
- `fetch`:`!response.ok` - gdzie to powinno być?
- cały rozdział o RESTach i HTTP, ich semantyce, headerach, wersjonowaniu, może też optimistic lockach etc.
- keszowanie (paginacja, ...) client-side vs server-side
- keszowanie client-side - ryzyka:
  - keszowanie "zbyt wielu rzeczy" na froncie zwiększa ryzyko, że logikę czyszczenia kesza po stronie serwera i po stronie klienta trzeba będzie synchronizować. Przykładowo: dodaję pracownika (employee) do biura (office). W której to jest encji w bazie - frontendu nie powinno interesować. Dodatkowo, wygodny UX/UI to niekoniecznie płaska nakładka na bazę danych. Dodatkowo, zmiana schematy bazy pod spodem nie powinna wymuszać przebudowy UIa...
    - w efekcie: klient/UI będzie bazował na read modelach. I nie powinien zbyt dużo wiedzieć, jak co jest zamodelowane po stronie backendu.

- https://www.npmjs.com/package/@microsoft/api-extractor
