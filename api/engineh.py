from cProfile import label
import imp
from os import X_OK
from pickletools import optimize
from re import A
from statistics import mode
from turtle import shape
from datasets import import_main_class
from matplotlib.pyplot import axis
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn import metrics
from sklearn.neural_network import MLPClassifier
from sqlalchemy import true
import tensorflow as tf
from sklearn.model_selection import KFold, train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt


filepath = Path('data/rating_with_label.csv')
filepath1 = Path('data/rating_with_label_lesson.csv')

data_df = pd.read_csv(filepath)
lesson_df = pd.read_csv(filepath1)


def gen_data_and_label(df):
    df_data = df.drop(['labels','User_Id'],axis=1)
    data = df_data.to_numpy()
    df_label = df['labels']
    label = df_label.to_numpy()
    return data,label

def gen_data_and_label_lesson(df):
    df_data = df.drop(['labels','Lesson_Id'],axis=1)
    data = df_data.to_numpy()
    df_label = df['labels']
    label = df_label.to_numpy()
    return data,label

X,y = gen_data_and_label(data_df)
# X,y = gen_data_and_label_lesson(lesson_df)


def dlengine(x,y,epoch):
    train_x,test_x,train_y,test_y = train_test_split(x,y,test_size=0.2)
    ## 899 57

    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(114, activation='relu'),
        tf.keras.layers.Dropout(0.1),
        tf.keras.layers.Dense(11)
    ])
    model.compile(optimizer='adam',loss=loss_fn,metrics=['accuracy'])
    model.fit(train_x,train_y,epochs=epoch)
    model.evaluate(test_x,  test_y, verbose=2)
    pred = model(test_x).numpy()
    #softmax to probability
    soft = tf.nn.softmax(pred).numpy()
    # argsort aceding order
    index = np.argsort(soft,axis=1)
    # get the last value of each row
    pred = index[:,-1]
    print(accuracy_score(test_y,pred))
dlengine(X,y,5)

def mlpengine(x,y,epoch):
    train_x,test_x,train_y,test_y = train_test_split(x,y,test_size=0.2)
    nn = MLPClassifier(activation='relu',hidden_layer_sizes=(10,10),alpha=0.01,max_iter=epoch)
    nn.fit(train_x,train_y)
    train_pred = nn.predict(train_x)
    test_pred = nn.predict(test_x)
    print(f'Training Accuracy is: {accuracy_score(train_y, train_pred)}')
    print(f'Test Accuracy is: {accuracy_score(test_y, test_pred)}')
    return train_pred, test_pred



def treeClassifierCV(x,y):
    train_x,test_x,train_y,test_y = train_test_split(x,y,test_size=0.2)
    kf = KFold(n_splits=3,random_state=63,shuffle=True)
    max_d = 20
    train_acc = [[] for _ in range(max_d)]
    val_acc = [[] for _ in range(max_d)]
    for d in range(max_d):
        df_model = DecisionTreeClassifier(max_depth=max_d+1)
        for train_idx,val_idx in kf.split(train_x):
            x_train,x_val = train_x[train_idx],train_x[val_idx]
            y_train,y_val = train_y[train_idx],train_y[val_idx]
            df_model.fit(x_train,y_train)
            val_pred = df_model.predict(x_val)
            train_pred = df_model.predict(x_train)
            train_acc[d].append(accuracy_score(y_train,train_pred))
            val_acc[d].append(accuracy_score(y_val,val_pred))
    train_acc_mean = np.mean(train_acc,axis=1)
    val_acc_mean = np.mean(val_acc,axis=1)
    plt.plot(range(20),train_acc_mean,label='train_acc')
    plt.plot(range(20),val_acc_mean,label='val_acc')
    plt.legend()
    plt.show()
    df_model = DecisionTreeClassifier(max_depth=3)
    df_model.fit(train_x,train_y)
    print(df_model.predict(test_x))
#treeClassifierCV(X,y)

