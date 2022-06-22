import imp
from pathlib import Path
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import pearsonr
from engine import indexToLesson,prep_data






"""

Keyword arguments:
data -- pd train dataset
input -- client input data
Return: return_description
"""

def recom_engine(input,n):
    matrix,lessons,title_df,df = prep_data()
    data = df.pivot(index='User_Id', columns='Lesson_Id', values='Rating')
    matrix,lessons,title_df,df = prep_data()
    rating_data = data.to_numpy();
    corr_store = []
    for item in rating_data:
        corr = pearsonr(item,input)
        corr_store.append(corr[0])
    index_sort = np.argsort(np.array(corr_store).reshape(-1))
    most_like_user = index_sort[-1]
    most_like_user_rating = data.iloc[most_like_user]
    rating_sort = np.argsort(np.array(most_like_user_rating).reshape(-1))
    top_n = rating_sort[-n:]
    # recom id(array), title_df
    # return list
    top_n_lesson = indexToLesson(np.array(top_n+1),title_df)
    return top_n_lesson


def kRecom_engine(input,k,n):
    matrix,lessons,title_df,df = prep_data()
    data = df.pivot(index='User_Id', columns='Lesson_Id', values='Rating')
    matrix,lessons,title_df,df = prep_data()
    rating_data = data.to_numpy();
    corr_store = []
    for item in rating_data:
        corr = pearsonr(item,input)
        corr_store.append(corr[0])
    index_sort = np.argsort(np.array(corr_store).reshape(-1))
    most_like_user = index_sort[k:-1]
    most_like_user_rating = data.iloc[most_like_user].mean(axis=0)
    rating_sort = np.argsort(np.array(most_like_user_rating).reshape(-1))
    top_n = rating_sort[-n:]
    # recom id(array), title_df
    # return list
    top_n_lesson = indexToLesson(np.array(top_n+1),title_df)
    return top_n_lesson


