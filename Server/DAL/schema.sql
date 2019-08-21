DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS candidates;

CREATE TABLE voters (
  id INTEGER PRIMARY KEY UNIQUE NOT NULL,
  is_voted BOOLEAN DEFAULT 1
);

CREATE TABLE candidates (
  id INTEGER PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL
);

insert into candidates(id, name) values
(1,"Benjamin Netanyahu"),
(2,"Benny Gantz"),
(3,"Aryeh Deri"),
(4,"Yaakov Litzman"),
(5,"Ayman Odeh"),
(6,"Avi Gabbay"),
(7,"Avigdor Lieberman"),
(8,"Rafi Peretz"),
(9,"Tamar Zandberg"),
(10,"Moshe Kahlon"),
(11,"Mansour Abbas");

CREATE TABLE votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  voter TEXT NOT NULL,
  candidate INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate) REFERENCES candidates (id)
);