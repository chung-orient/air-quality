import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin\

def cost_function(X, y, theta):
    m = y.size
    error = np.dot(X, theta.T) - y
    cost = 1/(2*m) * np.dot(error.T, error)
    return cost, error

def gradient_descent(X, y, theta, alpha, iters):
    cost_array = np.zeros(iters)
    m = y.size
    for i in range(iters):
        cost, error = cost_function(X, y, theta)
        theta = theta - (alpha * (1/m) * np.dot(X.T, error))
        cost_array[i] = cost
    return theta, cost_array

def plotChart(iterations, cost_num):
    fig, ax = plt.subplots()
    ax.plot(np.arange(iterations), cost_num, 'r')
    ax.set_xlabel('Iterations')
    ax.set_ylabel('Cost')
    ax.set_title('Error vs Iterations')
    plt.style.use('fivethirtyeight')
    plt.show()

# Khai bao cong cua server
my_port = '8000'

# Doan ma khoi tao server
app = Flask(__name__)
CORS(app)

# Khai bao ham xu ly request index
@app.route('/')
@cross_origin()
def index():
    return "Welcome to flask API!"

# Khai bao ham xu ly request hello_word
@app.route('/du_bao', methods=['GET'])
@cross_origin()
def du_bao():
    # Lay staff id cua client gui len
    so2 = request.args.get('SO2',None)
    no2 = request.args.get('NO2',None)
    co = request.args.get('CO',None)
    pm10 = request.args.get('PM10',None)
    pm25 = request.args.get('PM25',None)
    # Tra ve cau chao Hello
    # Import data
    data_org = pd.read_csv('data/training_sets.csv')
    data = (data_org - data_org.min()) / (data_org.max() - data_org.min())
    # Extract data into X and y
    X = data[['SO2', 'NO2', 'CO', 'PM10', 'PM25']]
    y = data['AQI']

    # Normalize our features
    X = (X - X.mean()) / X.std()

    # Add a 1 column to the start to allow vectorized gradient descent
    X = np.c_[np.ones(X.shape[0]), X]

    # Set hyperparameters
    alpha = 0.01
    iterations = 1000

    # Initialize Theta Values to 0
    theta = np.zeros(X.shape[1])
    initial_cost, _ = cost_function(X, y, theta)

    print('With initial theta values of {0}, cost error is {1}'.format(theta, initial_cost))

    # Run Gradient Descent
    theta, cost_num = gradient_descent(X, y, theta, alpha, iterations)
    dudoan_fit = theta[0] + (float(so2) * theta[1]) + (float(no2) * theta[2]) + (float(co) * theta[3]) + (float(pm10) * theta[4]) + float(pm25) * \
                   theta[5]
    # print("kết quả dự đoán SO2=",SO2,", NO2=,",NO2,", CO=",CO,", PM-10=",PM10,", PM-2.5=",PM25,"  là:")
    # print(dudoan_fit)
    # # Display cost chart
    # plotChart(iterations, cost_num)
    #
    # final_cost, _ = cost_function(X, y, theta)
    #
    # print('With final theta values of {0}, cost error is {1}'.format(theta, final_cost))
    return str(dudoan_fit)

# Thuc thi server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0',port=my_port)