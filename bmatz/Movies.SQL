CREATE TABLE Movies (
	popularity VARCHAR(30) NOT NULL
	,vote_count INT NOT NULL
	,video boolean
	,poster_path VARCHAR(60)
	,ID INT NOT NULL
	,adult boolean
	,backdrop_path VARCHAR(100)
	,original_language VARCHAR(10)
	,original_title VARCHAR(60)
	,genre_ids VARCHAR(60)
	,title VARCHAR(60)
	,vote_average FLOAT
	,overview VARCHAR(60)
	,release_date DATE NOT NULL
	,CONSTRAINT pk_Movies PRIMARY KEY (ID)
);
