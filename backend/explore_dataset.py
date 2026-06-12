import pandas as pd

df = pd.read_csv("../datasets/raw/ResumeDataSet.csv")

print("Dataset Shape:", df.shape)
print("Columns:", df.columns.tolist())
print("Categories:")
print(df["Category"].value_counts())

print("\nCategories:")
print(df["Category"].unique())

# print(df["Category"].value_counts())

print(df.isnull().sum())

df["Category"].value_counts()
