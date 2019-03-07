#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import numpy as np
import sys 

Title = sys.argv[1]
ShortPitch = sys.argv[2]
Description = sys.argv[3]
Tag = sys.argv[4]


Total = Title +' '+ ShortPitch + ' ' + Description + ' ' + ' '.join(Tag)

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction import text
from sklearn.externals import joblib
import pickle
stop_words = text.ENGLISH_STOP_WORDS.union(["nan"])
tv = TfidfVectorizer(decode_error="replace",ngram_range=(1,2),stop_words=stop_words,vocabulary=pickle.load(open("feature.pkl", "rb")))
res_feature = tv.fit_transform([Total])
logreg = joblib.load('final_1Model.sav')
res = logreg.predict_proba(res_feature)

print(res[0][1])
sys.stdout.flush()


# In[ ]:




