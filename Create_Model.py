#!/usr/bin/env python
# coding: utf-8

# In[ ]:




import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.feature_extraction import text
df = pd.read_csv('./Desktop/test.csv')

df.fillna(' ')



df['total'] = df['Title']+' '+df['ShortPitch']+ ' '+df['Description']+' '+df['Tag']
stop_words = text.ENGLISH_STOP_WORDS.union(["nan"])


from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(df['total'].values.astype('U'), 
                                                    df['Win'], 
                                                    test_size=0.33 ,random_state=0)

from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer

logReg = LogisticRegression()

#this is for G ML
# logReg.predict = logReg.predict_proba

pipe = Pipeline([('tfidf',TfidfVectorizer(decode_error="replace",ngram_range=(1,2),
                                          stop_words=stop_words,
                                          )),
                 ('logReg',logReg)
                ])

pipe.fit(X_train,y_train)
pipe.score(X_test,y_test)
from sklearn.externals import joblib

joblib.dump(pipe,'model_final_fixpredict.joblib')

