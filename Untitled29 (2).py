#!/usr/bin/env python
# coding: utf-8

# In[76]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
df = pd.read_csv('./Desktop/test.csv')

df.fillna(' ')


# In[102]:


df[df["Win"]==0].info()


# In[78]:


from sklearn.feature_extraction.text import TfidfVectorizer



df['total'] = df['Title']+' '+df['ShortPitch']+ ' '+df['Description']+' '+df['Tag']


# In[125]:


from sklearn.feature_extraction import text

stop_words = text.ENGLISH_STOP_WORDS.union(["nan"])
tv = TfidfVectorizer(ngram_range=(1,2),max_features=300,stop_words=stop_words)
X = tv.fit_transform(df['total'].values.astype('U'))
df_tmp = pd.DataFrame(X.toarray(), columns = tv.get_feature_names())
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, df['Win'], test_size=0.33 ,random_state=0)


# In[126]:


from sklearn.linear_model import LogisticRegression
logreg = LogisticRegression()
logreg.fit(X_train, y_train)
print('Accuracy of Lasso classifier on training set: {:.2f}'
     .format(logreg.score(X_train, y_train)))
print('Accuracy of Lasso classifier on test set: {:.2f}'
     .format(logreg.score(X_test, y_test)))


# In[85]:


features = tv.get_feature_names()


# In[86]:


def top_tfidf_feats(row, features, top_n=25):
    ''' Get top n tfidf values in row and return them with their corresponding feature names.'''
    topn_ids = np.argsort(row)[::-1][:top_n]
    top_feats = [(features[i], row[i]) for i in topn_ids]
    df = pd.DataFrame(top_feats)
    df.columns = ['feature', 'tfidf']
    return df


# In[ ]:





# In[87]:


def top_feats_in_doc(Xtr, features, row_id, top_n=25):
    ''' Top tfidf features in specific document (matrix row) '''
    row = np.squeeze(Xtr[row_id].toarray())
    return top_tfidf_feats(row, features, top_n)


# In[88]:


def top_mean_feats(Xtr, features, grp_ids=None, min_tfidf=0.1, top_n=25):
    ''' Return the top n features that on average are most important amongst documents in rows
        indentified by indices in grp_ids. '''
    if grp_ids:
        D = Xtr[grp_ids].toarray()
    else:
        D = Xtr.toarray()

    D[D < min_tfidf] = 0
    tfidf_means = np.mean(D, axis=0)
    return top_tfidf_feats(tfidf_means, features, top_n)


# In[89]:


def top_feats_by_class(Xtr, y, features, min_tfidf=0.1, top_n=25):
    ''' Return a list of dfs, where each df holds top_n features and their mean tfidf value
        calculated across documents with the same class label. '''
    dfs = []
    labels = np.unique(y)
    for label in labels:
        ids = np.where(y==label)
        feats_df = top_mean_feats(Xtr, features, ids, min_tfidf=min_tfidf, top_n=top_n)
        feats_df.label = label
        dfs.append(feats_df)
    return dfs


# In[90]:


def plot_tfidf_classfeats_h(dfs):
    ''' Plot the data frames returned by the function plot_tfidf_classfeats(). '''
    fig = plt.figure(figsize=(12, 9), facecolor="w")
    x = np.arange(len(dfs[0]))
    for i, df in enumerate(dfs):
        ax = fig.add_subplot(1, len(dfs), i+1)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        ax.set_frame_on(False)
        ax.get_xaxis().tick_bottom()
        ax.get_yaxis().tick_left()
        ax.set_xlabel("Mean Tf-Idf Score", labelpad=16, fontsize=14)
        ax.set_title("label = " + str(df.label), fontsize=16)
        ax.ticklabel_format(axis='x', style='sci', scilimits=(-2,2))
        ax.barh(x, df.tfidf, align='center', color='#3F5D7D')
        ax.set_yticks(x)
        ax.set_ylim([-1, x[-1]+1])
        yticks = ax.set_yticklabels(df.feature)
        plt.subplots_adjust(bottom=0.09, right=0.97, left=0.15, top=0.95, wspace=0.52)
    plt.show()


# In[91]:


plot_tfidf_classfeats_h(top_feats_by_class(X_train,y_train,features))


# In[119]:


maxx = -float('inf')
index = 0
for i in logreg.predict_proba(X_test):
    if i[1] > maxx:
        index = i
        maxx = i[1]
print(maxx)
print(index)


# In[111]:


from sklearn.metrics import confusion_matrix
y_actu = y_test
y_pred = logreg.predict(X_test)
confusion_matrix(y_actu, y_pred)


# In[124]:


X_test[0]


# In[ ]:




