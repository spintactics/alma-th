# Design Decisions

## UI Library: JsonForms
- **Why**: Schema-driven rendering simplifies the addition of new fields and validations.
- **Trade-offs**: Native file upload and textarea renderers were used for better customization.

## Styling
- **Why**: Tailwind CSS for utility-based styling.
- **Customizations**: Added CSS overrides for multi-select field colors.

## Project Structure
```bash
.
├── src/
│   ├── app/
│   │   ├── page.tsx             # Public Lead Form page
│   │   ├── leads/               # Internal Leads List page
│   │   ├── thank-you/           # Thank You page
│   │   └── api/
│   │       └── leads/
│   │           └── route.ts     # API route for handling lead submissions
│   ├── components/              # Reusable UI components
│   ├── schemas/                 # JSON schemas for forms
│   ├── styles/                  # Custom stylesheets
│   └── utils/                   # Utility functions. Authentication utility is here
├── package.json                 # Project metadata and dependencies
└── README.md                    # Documentation
└── docs/                        # Further Documentation on design decisions & system design
```



## Key Decisions
- I made country of citizenship required. This seems like a mandatory field, as different citizenships may be subject to different immigration restrictions
- Resume field was missing from the mocks. The natural place to put it was after the linkedin/website field, since both fields are about the user's qualifications
- In src/app/api/leads/route.ts , I commented out an alternate dataset to load into the /leads page

By default, /leads table uses the data you submit on the main form page, but if you want to shortcut test pagination, it's easier to switch the leads data in this file rather than generating all the user data yourself
- I implemented column sorting on the /leads page. I saw the arrows on the mock, and assumed that was a desired feature.

By default, all the columns are unsorted. However, upon clicking a column for the first time, it will sort the table by that column starting with ascending. Click that column again, it will be sorted descending.

The table can only sort on one column
- I named my git commits following Angular convention. It's a low effort task, that makes it much easier to integrate github with JIRA tickets.
- Best practices code organization

## Bonus Points
- Bonus: implement API routes using Next.js API. You can see it in src/app/api/leads/route.ts
- Bonus: Use JsonForms to implement the lead form in a configuration driven way
- Bonus: Use TypeScript for type safety
- Bonus: Implement form validation feedback
- Bonus: Document the [System Design](./system-design.md)
