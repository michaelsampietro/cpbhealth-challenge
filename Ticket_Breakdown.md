# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1 - Add a new field to store a custom agent id on `Agents` table and update our models/schemas
#### Description:
A new field must be added in the `Agents` table in our database to display that information in the reports generated.

#### Implementation details:
- Basically, we'll need to have a new field on the table `Agents` named `customAgentId` that will be used to store a custom agent id.
- Since we can't be sure about the type of this id (uuid, numeric, guid, string, etc) create the column with type `VARCHAR(MAX)` (I'm assuming we use some kind of SQL database).

#### Important reminders:
- Please, update our documentation/schemas/diagrams with the new field.
- Also, update our models in backend to include this new information as well.

#### Time estimation:
3-6 hours.

## Ticket 2 - Update `getShiftsByFacility` to return the custom id
#### Description:
Instead of returning the `Agent` metadata with the internal id, return the field `customAgentId` (created in Ticket 1). 
If the `customAgentId` is not provided, return the "regular" id field as a fallback.

#### Important reminders:
- Please update the function/API documentation to reflect this new change.
- Update our test suits to test this new scenario.

#### Time estimation:
2-4 hours.

## Ticket 3 - Update `generateReport` to generate the PDF with the custom id
#### Description:
On the generated PDF, display the field `customAgentId` (created in Ticket 1) instead of displaying the id.
If the `customAgentId` is not provided, return the "regular" id field as a fallback.

#### Important reminders:
- Please update the function/API documentation to reflect this new change.
- Update our test suits to test this new scenario.

#### Time estimation:
2-4 hours.

## Ticket 4 - Update Agent APIs to work with custom id
#### Description:
On our fetch, create and update API for the `Agent` model, please return/store the new information.

#### Implementation details:
- On our GET api for the Agent, please return the `customAgentId` so that the front-end can display this field when needed.
- On our POST api for the Agent, please read the `customAgentId` field on the payload to store this information on database.
- On our PUT/PATCH api for the Agent, please read the `customAgentId` field on the payload to update this information on database.

#### Important reminders:
- Please, update our API documentation with the new fields
- Please, update our test suits.

#### Time estimation:
6-8 hours

## Ticket 5 - Allow user to inform a custom id
#### Description:
Allow users to inform a custom id when editing or creating an agent.

#### Implementation details:
- On our `Agent` form, please add a new field to populate the column `customAgentId` in our database.
- Add this new field to the body of our POST/PUT/PATCH requests to send this information to back-end.
- Display the `customAgentId` on the agent details screen.

#### Reminders:
- Please, update our test suits.

#### Time estimation:
4-6 hours.
