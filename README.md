# MovieFinder

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8e1de41a8ef59dbd76bc4971fa1262509dbe6698

## Table of contents

=======
>>>>>>> master
* [General info](#general-info)
* [Technologies](#technologies)
* [Development Process](#development-process)

## General info

The purpose of this project is to provide users with an opportunity to explore movie data and make movie selections based on various parameters. To do this, we munged data from [OMDb](http://www.omdbapi.com/) and [The Movie DB](https://www.themoviedb.org/?language=en-US), and merged the data to a PostreSQL database. We then created an interactive quadrant chart, which displays movie selection based on user-chosen parameters. The user can then select a movie, and additional information about the movie is displayed.

## Technologies

### Languages Used

* Python
* Javascript
* CSS
* HTML
* SQL

### Data Extraction and Munging

* Jupyter notebook - version 4.1
* Pandas - version 0.23.4
* Numpy - version 1.15.4

### Database

* sqlite3 - version 3.26.0
* SQLAlchemy - version 1.2.15

### Data Rendering and Visualization

* Flask - version 1.0.2
* Jinja2 - version 2.10
* Javascript Packages:
  * Chart- version 7.3
  * Chart.js Plugin Data Labels- version 7.0
  * d3 - version 5
  * JQuery - version 3.4.1
  * Plotly - version 1.49.1
* HTML & CSS:
  * Bootstrap Customization- version 4.3.1
  * Bootswatch Lux- version 4.4.1
  * Popper.js- version 1.14.7

## Development Process

### Data Extraction

A python script was created to query The Move DB and  the OMDb API. The Movie DB allowed us to retireve a list of movies based on popularity, but did not provide us with as much information as OMDb, where we could only seach for movies by title. We ran the [OMDB.ipynb](../blob/master/OMDB.ipynb) file to retrieve a list of movies from The Movie DB, by popularity.  We used the "original title" data and created a loop to gather the data for each of the movie titles from OMDb. The data collected was exported to a CSV file. The CSV file was loaded in a PostgreSQL database using the [SQL_Load.ipynb](../blob/master/SQL_Load.ipynb)

### Data Munging


## Resources

* [OMDb](http://www.omdbapi.com/) Provides a variety of movie data including runtime, director, actors, genres, multiple rating scores, award information,and  movie poster.
* [The Movie DB](https://www.themoviedb.org/?language=en-US) Provides a variety of movie data including: popularity, revenue, and title.
* [Code Pen](https://codepen.io/patxipierce/pen/oyeNMj) Gauge code
* [Any Chart](https://www.anychart.com/) quadrant chart documentation
* [Chart.js](https://www.chartjs.org/) Chart js usage and documentation
<<<<<<< HEAD
=======
## Authors
Brendan Law, Billy Martinez, Melissa Mason, Jacqueline McBean-Blake, Keith Woodfin
>>>>>>> master
=======

>>>>>>> 8e1de41a8ef59dbd76bc4971fa1262509dbe6698
