import pandas as pd
import numpy as np
from flask import Flask
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from sklearn.model_selection import KFold
from fuzzywuzzy import fuzz

#rating matrix, lesson name, rating df
# rating df: 1:Name, 2:Genre 3: lesson_id
def prep_data():
    les_idx = pd.to_numeric(np.linspace(1,57,57).tolist(),downcast='integer')
    title_df_data = pd.read_csv('C:/Users/Cam/Desktop/my-app/data/lesson_list.csv',dtype={'Name': 'str', 'Genre': 'str'})
    title_df_data['Lesson_Id'] = les_idx
    title_df = title_df_data.set_index('Lesson_Id')
    df = pd.read_csv('C:/Users/Cam/Desktop/my-app/data/rating_data_js.csv',dtype={'Lesson_Id': 'int32', 'User_Id': 'int32','Rating':'float32'})
    df_lesson_features = df.pivot(index='Lesson_Id',columns='User_Id',values='Rating')
    lesson_features_mat = csr_matrix(df_lesson_features)
    lesson_name = list(title_df.Name)
    return lesson_features_mat,lesson_name, title_df_data
    
# input n: number of recommend, idx: famous movie idx
def recommend(n,idx):
    df = pd.read_csv('C:/Users/Cam/Desktop/my-app/data/rating_data_js.csv')
    df_lesson_features = df.pivot(index='Lesson_Id',columns='User_Id',values='Rating')
    lesson_features_mat = csr_matrix(df_lesson_features)
    knn_model = NearestNeighbors(metric='cosine',algorithm='brute',n_neighbors=5,n_jobs=-1)
    knn_model.fit(lesson_features_mat)
    distance,index = knn_model.kneighbors(lesson_features_mat[idx],n_neighbors=n+1)
    return distance,index


# input: lessons: name list, fav_lesson: name of famous lesson, df: data
def matching(lessons,fav_lesson,df):
    match_store = []
    for index, lesson in enumerate(lessons):
        fuzz_ratio = fuzz.ratio(lesson,fav_lesson)
        if fuzz_ratio >= 60:
            indexx = df[df['Name']==lesson]
            match_store.append((lesson,indexx.index.values[0],fuzz_ratio))
    

    match_store = sorted(match_store,key=lambda x:x[2])[::-1]
   
    return match_store[0][1]


# input: array( recommend lesson_id): 1D
def indexToLesson(recom_id,data_df):
    store = []
    for i in range(len(recom_id)):
        for j in range(len(data_df)):
            if recom_id[i] == data_df.iloc[j][2]:
                store.append(data_df.iloc[j][0])
    return store

def engine(fav_lesson):
    matrix,lessons,df = prep_data()
    fav_lesson_idx = matching(lessons, fav_lesson, df)
    distance, idx = recommend(5, fav_lesson_idx)
    idxx = idx.reshape(-1)
    reco_lesson = indexToLesson(idxx, df)
    return reco_lesson


def select_best_k():
    kf = KFold(n_splits=10,random_state=33,shuffle=True)
    max_k = 40
    train_acc = [[] for _ in range(max_k)]
    val_acc = [[] for _ in range(max_k)]

