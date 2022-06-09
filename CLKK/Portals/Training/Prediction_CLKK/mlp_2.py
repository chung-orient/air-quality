import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential
from keras.layers import Dense,Activation,Layer,Lambda

strength = pd.read_csv("Data/training_sets.csv")

##Checking for the scales of the data
data = strength.describe()
##The scales of the data are very different. So, we normalise or standardise the data

# Normalization function
def norm_func(i):
     x = (i-i.min())	/	(i.max()	-	i.min())
     return (x)
concrete = norm_func(strength)

def prep_model(hidden_dim):
    model = Sequential()
    for i in range(1,len(hidden_dim)-1):
        if (i==1):
            model.add(Dense(hidden_dim[i],input_dim=hidden_dim[0],kernel_initializer="normal",activation="relu"))
        else:
            model.add(Dense(hidden_dim[i],activation="relu"))
    model.add(Dense(hidden_dim[-1]))
    model.compile(loss="mean_squared_error",optimizer="adam",metrics = ["accuracy"])
    return (model)

predictors = concrete.iloc[:,0:5]
target = concrete.iloc[:,5]

##Partitioning the data
from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test = train_test_split(predictors,target,test_size = 0.25)

first_model = prep_model([5,50,1])
first_model.fit(np.array(x_train),np.array(y_train),epochs=900)
pred_train = first_model.predict(np.array(x_train))
pred_train = pd.Series([i[0] for i in pred_train])
rmse_value = np.sqrt(np.mean((pred_train-y_train)**2))#0.2905992907837768
np.corrcoef(pred_train,y_train) ##0.97436919

#Visualising
plt.plot(pred_train,y_train,"bo")
plt.show()

##Predicting on test data
pred_test = first_model.predict(np.array(x_test))
pred_test = pd.Series([i[0] for i in pred_test])
rmse_test = np.sqrt(np.mean((pred_test-y_test)**2))#0.2967129698522837
np.corrcoef(pred_test,y_test)#0.96421791

##Visualizing
plt.plot(pred_test,y_test,"bo")
plt.show()