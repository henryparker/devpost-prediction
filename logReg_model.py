#!/usr/bin/env python
# coding: utf-8

# In[24]:


import pandas as pd

df = pd.read_csv('./Desktop/test.csv')

df.fillna(' ')


# In[25]:


df.info()


# In[26]:


from sklearn.feature_extraction.text import TfidfVectorizer

df['total'] = df['Title']+' '+df['ShortPitch']+ ' '+df['Description']+' '+df['Tag']


# In[34]:


tv = TfidfVectorizer(ngram_range=(1,2))
X = tv.fit_transform(df['total'].values.astype('U'))

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, df['Win'], test_size=0.33 ,random_state=0)


# In[35]:


from sklearn.linear_model import LogisticRegression
logreg = LogisticRegression(C=1e5)
logreg.fit(X_train, y_train)
print('Accuracy of Lasso classifier on training set: {:.2f}'
     .format(logreg.score(X_train, y_train)))
print('Accuracy of Lasso classifier on test set: {:.2f}'
     .format(logreg.score(X_test, y_test)))


# In[ ]:




