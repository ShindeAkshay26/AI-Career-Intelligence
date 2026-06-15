def generate_roadmap(missing_skills):

    roadmap = {
        "Week 1": [],
        "Week 2": [],
        "Week 3": [],
        "Week 4": []
    }

    for skill in missing_skills:

        if skill in ["Machine Learning"]:
            roadmap["Week 1"].append(skill)

        elif skill in ["Deep Learning"]:
            roadmap["Week 2"].append(skill)

        elif skill in ["Transformers"]:
            roadmap["Week 3"].append(skill)

        else:
            roadmap["Week 4"].append(skill)

    return roadmap