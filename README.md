# Data-Storytelling-Project

## Sources

For our project, we used NYC Open Data as our primary data source for our data on restaurants. This dataset included the insection data for the 

## Flask and Postgres Usage

By using flask as a server and Postgres as a database, we were able to classify the columns by data type and manipulate the data in order to get the needed information.

## Process


Data Overview:

Link: 

DOHMH New York City Restaurant Inspection Results

This comprehensive DOHMH dataset includes restaurant name, contact information, address, borough, zip code, as well as cuisine type, food rating, food safety letter grade, inspection date and violations.This amount of data provide many options for interactive visualizations


Formal site description:

The dataset contains every sustained or not yet adjudicated violation citation from every full or special program inspection conducted up to three years prior to the most recent inspection for restaurants and college cafeterias in an active status on the RECORD DATE (date of the data pull). When an inspection results in more than one violation, values for associated fields are repeated for each additional violation record. Establishments are uniquely identified by their CAMIS (record ID) number. Keep in mind that thousands of restaurants start business and go out of business every year; only restaurants in an active status are included in the dataset.
Records are also included for each restaurant that has applied for a permit but has not yet been inspected and for inspections resulting in no violations. Establishments with inspection date of 1/1/1900 are new establishments that have not yet received an inspection. Restaurants that received no violations are represented by a single row and coded as having no violations using the ACTION field.
Because this dataset is compiled from several large administrative data systems, it contains some illogical values that could be a result of data entry or transfer errors. Data may also be missing.
This dataset and the information on the Health Department’s Restaurant Grading website come from the same data source. The Health Department’s Restaurant Grading website is here

Proposal:

Create an app/user interface that allows users to visualize restaurant location and information based on their filtered criteria (e.g. food genre, neighborhood, rating, food safety grade, etc.)
D3 or Leaflet maps with available filters and markers on the restaurants meet filtered criteria. Restaurant information available on click or mouse-over
Interactive Maps filtered by:
Cuisine 
Score (#)
Grade (A, B, C, etc.)
Bar Charts:
Average score/grade by cuisine type
Average score/grade by borough
Filtered result table by:
Top rated restaurants by cuisine type
