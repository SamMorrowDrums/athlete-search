
db.records.createIndex({name: 1}, {background: true});
db.records.createIndex({birthdate: 1}, {background: true});
db.records.createIndex({"championship.year": 1}, {background: true});
db.records.createIndex({skills: 1}, {background: true});
db.records.createIndex({skills: 1, birthdate: 1}, {background: true});
db.records.createIndex({experience: 1}, {background: true});

db.categories.createIndex({name: 1}, {background: true, unique: true});
db.categories.createIndex({name: 1, skills: 1}, {background: true});
