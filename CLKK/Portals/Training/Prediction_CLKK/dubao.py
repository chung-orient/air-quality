import numpy as np
import pandas as pd
import keras
from  keras.models import Sequential
from keras.layers import Dense

concrete_data=pd.read_csv('data/training_sets.csv')
cols=concrete_data.columns
target=concrete_data['AQI']
n_cols=concrete_data.shape[1]
#data normalization
concrete_data_norm=(concrete_data-concrete_data.min())/(concrete_data.max()-concrete_data.min())
concrete_data_norm.head()

def regression_model():
    model = Sequential()
    model.add(Dense(10, activation='relu', input_shape=(n_cols,)))
    model.add(Dense(10, activation='relu'))
    model.add(Dense(10, activation='relu'))
    model.add(Dense(1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(concrete_data, target, test_size=0.30, random_state=42)
model=regression_model()
model.fit(X_train, y_train, epochs=100)
print(model.evaluate(X_test, y_test))
y_pred=model.predict(X_test, batch_size=50)
print(X_test)
print(X_test.shape)
print(y_pred)
from sklearn.metrics import mean_squared_error
msqr=mean_squared_error(y_test, y_pred)
print(' mean-squared-error: ', msqr)
# make a prediction
row = [46.87997, 9.49831, 747.55,13.2015,9.8967,13]
print(np.reshape(row, (1, 6)))
yhat = model.predict(np.reshape(row, (1, 6)))
print('Predicted: %.3f' % yhat)