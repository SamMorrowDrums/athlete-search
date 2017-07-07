#!/usr/bin/env python3
import sys
import json
import random
import datetime
from calendar import monthrange


class Sports_Data_Generator(object):
    """Generates sample data for testing schema and search

    """

    def __init__(self):
        """Returns new Data Generator"""
        self.names = []
        self.categories = []
        self.sports = set([])
        self.lookup_category = {}
        self.people = []

    def set_names_from_txt(self, fname):
        """Sets names property from lines in a text file"""
        self.names = self.file_to_array(fname)

    def set_sports_from_json(self, fname):
        """Sets sports_data property from a json file"""
        sports_data = self.file_to_object(fname)
        self.categories = list(sports_data.keys())
        self.category_list = [{"name": c, "skills": sports_data[c]}
                              for c in self.categories]
        self.sports = self.flatten_sports_dict(sports_data)
        self.lookup_category = self.get_sports_category_lookup(sports_data)

    def get_sports_category_lookup(self, d):
        out = {}
        for cat in self.categories:
            if not out.get(cat):
                out[cat] = None
            for subcat in d[cat]:
                if not out.get(subcat):
                    out[subcat] = [cat]
                else:
                    out[subcat].append(cat)
        return out

    def flatten_sports_dict(self, d):
        out = self.categories[:]
        for key in self.categories:
            out += d[key]
        return set(out)

    def get_random_name(self):
        return random.choice(self.names)

    def get_random_skills(self):
        n_skills = range(random.randrange(1, 10))
        sports = tuple(self.sports)
        return list(set([random.choice(sports) for n in n_skills]))

    def get_random_championships(self, birthdate, skills):
        current_year = datetime.datetime.now().year
        out = []
        for y in range(birthdate.year + 10, current_year):
            if random.random() > 0.5:
                skill = random.choice(skills)
                award = random.choice(
                    ["Cup", "Trophy", "Title", "Meet", "Competition"])
                out.append({
                    "name": skill + " " + award,
                    "year": y
                })
        return out

    def generate_random_people(self, n):
        self.people = []
        for i in range(n):
            name = self.get_random_name()
            skills = self.get_random_skills()
            birthdate = self.get_random_birthdate()
            championships = self.get_random_championships(birthdate, skills)
            self.people.append({
                "name": name,
                "skills": skills,
                "birthdate": birthdate.isoformat(' '),
                "championships": championships
            })

    @staticmethod
    def write_dict_to_json_file(fname, data):
        with open(fname, "w") as f:
            f.write(json.dumps(data, indent=4))

    @staticmethod
    def get_random_birthdate():
        current_year = datetime.datetime.now().year
        min_year = current_year - 40
        max_year = current_year - 13
        year = random.randrange(min_year, max_year)
        month = random.randrange(1, 13)
        month_limits = monthrange(year, month)
        day = random.randrange(month_limits[0] + 1, month_limits[1] + 1)
        return datetime.datetime(year, month, day)

    @staticmethod
    def file_to_array(fname):
        """Returns lines from provided filename as an array"""
        with open(fname, 'r') as f:
            content = f.readlines()
            content = [x.strip() for x in content]
        return content

    @staticmethod
    def file_to_object(fname):
        """Returns lines from provided filename as an array"""
        with open(fname, 'r') as f:
            data = json.load(f)
        return data


def main():
    n = 7000
    if sys.argv[1] is not None:
        n = int(sys.argv[1])
    dg = Sports_Data_Generator()
    dg.set_names_from_txt('./data/names.txt')
    dg.set_sports_from_json('./data/sports.json')
    dg.generate_random_people(n)
    dg.write_dict_to_json_file('./data/sample-people.json', dg.people)
    dg.write_dict_to_json_file('./data/sample-categories.json', dg.category_list)

if __name__ == '__main__':
    main()
