remember that `./` refers to the current working directory.

Don't add new files unless absolutely necessary. When I ask you to use an existing file, search the codebase because most probably the file already exists.

# enums

Whenever enums are created, they should include uppercase values, not lowercase values.

# imports

When exporting things, always use named exports. Avoid default exports.

Where applicable, use `import type` instead of `import`.

# contract and entities

All entities loaded from backend are available in the `src/api/data-contracts.ts` file.

# client app code

The client code components should do neither `fetch` nor `axios` calls directly. They should always use an appropriate fetching service from the services directory.

When reusing existing react components, import them from `./src/components/generic` or `./src/components/forms`.

## component check

1. Make sure each component has props type defined, if any props are used. Check whether the component compiles.

## styling

Use tailwind.css to provide very nice styling. Make the website look really nice and modern. Go crazy about being modern. Use purple/indigo colors mainly.

If icons are needed, use `lucide-react`, it's already there.

Use existing typography, when possible: `./src/components/Typography`. If an important element of typography is missing, suggest adding it!

Remember that there's no `<Text>` component. Use `<Paragraph>` instead.

## storybook

Each non-global component (i.e. displaying entity list, entity details, a styled atom such as buttons, checkboxes, card etc) should have storybook stories defined:
- use the `ITCORPO/<ENTITY>/<VIEW>` or `ITCORPO/<Atoms | Molecules | Forms> | Organisms/<VIEW>`

Each component story, when requires callbacks, should either receive a meaningful callback from the parent, or provide the `action` from `@storybook/addon-actions`. You can use `MultiSelect.stories.tsx` as example of using actions addon, but you can also provide different APIs. Don't use console.log for this reason.

The stories should include the 'autodocs' feature from Storybook.

Whenever providing or updating storybook stories, always try to use domain-relevant examples (IT projects, technology, projects, budget etc) instead of generic words with no meaning.

## currencies

Whenever displaying currencies, use the function from `./src/utils/formatCurrency.ts`
