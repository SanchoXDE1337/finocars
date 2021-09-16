import pandas as pd
import joblib
from flask import Flask
from flask import request

app = Flask(__name__ 
    ,static_folder='client/build',static_url_path='/')

@app.route('/')
def serve():
    return app.send_static_file('index.html')

@app.route('/api/price',methods = ['POST'])
def price():
    raw_data = pd.read_csv('./model/for_new_data.csv')
    rf = joblib.load("./model/random_forest.joblib")
    mms = joblib.load("./model/mms.joblib")

    request_data = request.get_json()

    for key in request_data:
            if key == 'year' or key == 'mileage' or key == 'engine_volume' or key == 'engine_power' or key ==  'owners_count':
                raw_data[key] = request_data[key]
            else:
                raw_data[request_data[key]] = 1

    #теперь нормализуем данные
    raw_data[['year','mileage', 'engine_volume', 'engine_power', 'owners_count']] = mms.transform(raw_data[['year','mileage', 'engine_volume', 'engine_power', 'owners_count']])

    #dataFrame готов, требуется лишь определить значение используя регрессор
    try:
        response_data = int(rf.predict(raw_data))
        return {'price': response_data}
    except:
        return {'price': 'Невозможно предсказать цену для выбранного автомобиля'}

if __name__ == '__main__':
    app.run(host='0.0.0.0')