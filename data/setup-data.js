db.records.find({}).forEach(function(element){
    element.birthdate = new ISODate(element.birthdate);
    var c = element.championships;
    var exp = 0;
    if (c.length === 1) {
        exp = 1;
    } else if (c.length > 1){
        exp = 1 + (c[c.length - 1].year - c[0].year);
    }
    element.experience = exp;
    db.records.save(element);
});
