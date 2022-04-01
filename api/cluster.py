import imp
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
from sklearn.cluster import KMeans




filepath = Path('data/rating_data_js.csv')
df = pd.read_csv(filepath)


# inplace=true, alter the original df
# rating_with_label_df.drop('Unnamed: 0',axis=1,inplace=True)

data_df = df.pivot(columns='User_Id',index='Lesson_Id',values='Rating')

def elbow_plot(data):
    inertias = []
    for k in range(1,20):
        km = KMeans(k)
        km_model = km.fit(data)
        inertias.append(km_model.inertia_)
    plt.plot(range(1,20),inertias,'bx-')
    plt.show()
# from elbow plot, n=11
# elbow_plot(data_df)

def cluster(n,data):
    kmm = KMeans(n_clusters=n)
    datass = data.to_numpy()
    kmm.fit(datass)
    data['labels'] = kmm.labels_
    return data

def generate_label_df():
    filepath = Path('data/rating_with_label_lesson.csv')
    label_df = cluster(11,data_df)
    label_df.to_csv(filepath)

generate_label_df()


