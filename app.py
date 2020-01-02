#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.automap import automap_base
import psycopg2
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config2 import pwrd


# In[ ]:


app = Flask(__name__)


# In[ ]:


#connect to local database and create engine
DB_URL = "postgresql+psycopg2://postgres:"+ pwrd + "@localhost:5432/movie_finder"
engine = create_engine(DB_URL)


# In[ ]:


#create engine connection
conn = engine.connect()


# In[ ]:


app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['DEBUG'] = True


# In[ ]:


db = SQLAlchemy(app)


# In[ ]:


# reflect an existing database into a new model
Base = automap_base()


# In[ ]:


# reflect the tables
Base.prepare(db.engine, reflect=True)


# In[ ]:


# Save references to the table
movies = Base.classes.movies


# In[ ]:


#return homepage
@app.route("/")
def index():
    return render_template("index.html")


# In[ ]:


@app.route("/movies/<genre>")
def movie_genre(genre):
    """Return the MetaData for a given sample."""
    sel = [
        movies.Title,
        movies.BoxOffice,
        movies.Genre,
        movies.Runtime,
        movies.imdbVotes,
        movies.IMDB,
        movies.Rotten_Tomatoes,
        movies.Metacritic,
        movies.Wins,
        movies.Nominations
    ]

    results = db.session.query(*sel).filter(movies.Genre.contains(genre)).all()

    # Create a list of dictionaries from the filter results and jsonify
    movie_list = []
    for result in results:
        movie_dict = {}
        movie_dict["Title"] = result[0]
        movie_dict["BoxOffice"] = result[1]
        movie_dict["Genre"] = result[2]
        movie_dict["Runtime"] = result[3]
        movie_dict["imdbVotes"] = result[4]
        movie_dict["IMDB"] = result[5]
        movie_dict["Rotten_Tomatoes"] = result[6]
        movie_dict["Metacritic"] = result[7]
        movie_dict["Wins"] = result[8]
        movie_dict["Nominations"] = result[9]
        movie_list.append(movie_dict)
        
    return jsonify(movie_list)


# In[ ]:


@app.route("/selection/<film>")
def movie(film):
    sel =[       
        movies.Title,
        movies.Poster,
        movies.Rated,
        movies.Year,
        movies.Genre,
        movies.Director,
        movies.Actors,
        movies.Plot,
        movies.BoxOffice,
        movies.Runtime,
        movies.imdbVotes,
        movies.IMDB,
        movies.Rotten_Tomatoes,
        movies.Metacritic,
        movies.Wins,
        movies.Nominations
        ]
    
    results = db.session.query(*sel).filter(movies.Title == film).all()
    
    movie_dict = {}
    for result in results:
        movie_dict["Title"] = result[0]
        movie_dict["Poster"] = result[1]
        movie_dict["Rated"] = result[2]
        movie_dict["Year"] = result[3]
        movie_dict["Genre"] = result[4]
        movie_dict["Director"] = result[5]
        movie_dict["Actors"] = result[6]
        movie_dict["Plot"] = result[7]
        movie_dict["BoxOffice"] = result[8]
        movie_dict["Runtime"] = result[9]
        movie_dict["imdbVotes"] = result[10]
        movie_dict["IMDB"] = result[11]
        movie_dict["Rotten_Tomatoes"] = result[12]
        movie_dict["Metacritic"] = result[13]
        movie_dict["Wins"] = result[14]
        movie_dict["Nominations"] = result[15]
    
    return jsonify(movie_dict)


# In[ ]:


if __name__ == "__main__":
    app.run()


# In[ ]:




