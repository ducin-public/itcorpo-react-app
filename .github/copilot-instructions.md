Whenever in doubt, ask. We'll get better results if you ask me when facing a non-obvious problem. In such case suggest various solutions along with their pros and cons.

remember that `./` refers to the current working directory.

Don't add new files unless absolutely necessary. When I ask you to use an existing file, search the codebase because most probably the file already exists.

# enums

Whenever enums are created, they should include uppercase values, not lowercase values.

# imports

When exporting things, always use named exports. Avoid default exports.

Where applicable, use `import type` instead of `import`.

# contract and entities

All entities loaded from backend are available in the `src/contract-types/data-contracts.ts` file.

# client app code

The client code components should do neither `fetch` nor `axios` calls directly. They should always use an appropriate fetching service from the services directory.

When reusing existing react components, import them from `./src/components/generic` or `./src/components/forms`.

## component check

1. Make sure each component has props type defined, if any props are used. Check whether the component compiles.

## styling

Use tailwind.css to provide very nice styling. Make the website look really nice and modern. Go crazy about being modern.

For emphasizing colors and certain pieces of UI, use colors defined in `src/components/DesignEnums/MessageType.tsx`, e.g.
```
className={`block text-sm font-medium ${styles.ACCENT.text} mb-1`
```
It's okay hardcode tailwind color classes in html for colors from white-gray-black palette. However anything from shades of purple, red, green, blue etc - should rather be used in `MessageType.tsx`. If a palette is missing, suggest adding it, but consistently throughout the whole `MessageType.tsx` file. Use `MessageType` docs for when to use which type of message.

If icons are needed, use `lucide-react`, it's already there.

Use existing typography, when possible: `./src/components/Typography/*`. If an important element of typography is missing, suggest adding it!

## form controls

Form controls (TextInput, Autocompleter, Dropdown, MultiSelect etc.) should have total height of 40px. Adjust internal styling and/or use `styleConstants.CONTROL_MIN_HEIGHT` to meet this requirement.

### form control props

- events: follow the `on<Event>` name for props: `onChange`, `onUpdate` etc.
- internal event handlers: if the callback received via props (e.g. `onChange`) has to be wrapped internally, follow the `handle<Event>` name for the internal implementation: `handleChange`, `handleUpdate` etc.
- if a form control accepts multiple choices (e.g. Dropdown, MultiSelect, etc.) follow the `options` name for the prop that defines the available choices. I.e. **not** `values`, not `items` etc.
- avoid `value` or `values` for prop names, as they are too ambiguous - suggest more precise names instead
- form controls should usually accept following props:
  - `disabled?: boolean`
  - `error?: string`

### form control stories

Each form control should have its separate stories file, providing the `meta: Meta` definition, including:
- title
- components
- parameters/layout: centered
- tags: autodocs
- args:
  - label
  - value/values/etc. with empty value
  - callback (onChange, onSelect, etc) with action from `'@storybook/addon-actions'`

Each form control should provide following stories in the following order:
- Default - relying on all `args` in `meta` story declaration, either no `value` or empty string or empty array (whatever is needed)
- WithValue - pass `value` explicitly
- WithPlaceholder - only if component have `placeholder` prop
- WithError - pass `error` explicitly
- Disabled - pass `disabled` explicitly
- DisabledWithValue - pass both `disabled` and `value` explicitly
- CustomRendering - pass custom `className` explicitly - change colors, widget size, font size and whatever can be changed

But don't enforce creating stories if they make no sense, e.g. if a component doesn't have a `placeholder` prop, don't create illogical WithPlaceholder story.

## storybook

Each non-global component (i.e. displaying entity list, entity details, a styled atom such as buttons, checkboxes, card etc) should have storybook stories defined:
- use onre of the following paths:
  - `ITCORPO/<ENTITY>/<VIEW>`
  - `ITCORPO/<Atoms | Molecules | Forms>`
  - `Organisms/<VIEW>`

Each component story, when requires callbacks, should either receive a meaningful callback from the parent, or provide the `action` from `@storybook/addon-actions`. You can use `MultiSelect.stories.tsx` as example of using actions addon, but you can also provide different APIs. Don't use console.log for this reason.

The stories should include the 'autodocs' feature from Storybook.

Whenever providing or updating storybook stories, always try to use domain-relevant examples (IT projects, technology, projects, budget etc) instead of generic words with no meaning.

## currencies

Whenever displaying currencies, use the function from `./src/utils/formatCurrency.ts`
