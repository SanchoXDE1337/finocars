## [Heroku deployment](https://fastautocheck.herokuapp.com/).

## Как запустить проект локально

### Клонировать репозиторий

`$ git clone https://github.com/SanchoXDE1337/finocars.git`

(в данном git-репозитории отсутствует обученная модель, предсказывающая стоимость авто. Нужно скачать её по [ссылке](https://cloud.mail.ru/public/MUcd/CbkWd2QCv) разархивировать и переместить папку model в корневую директорию проекта. Убедитесь, что файлы находятся по пути 'finocars/model/имя_файла', например 'finocars/model/random_forest_regressor.joblib')

### Перейти в директорию проекта, создать виртуальное окружение и установить зависимости

`$ cd finocars/`

`$ python3 -m venv venv`

`$ source venv/bin/activate`

`$ pip install -r requirements.txt`

`$ deactivate`

### Перейти в директорию "client", установить зависимости и собрать react-приложение

`$ cd client/`

`$ npm i`

`$ npm run build`

### Запустить сервер

`$ npm run start-api`

### Открыть в браузере http://127.0.0.1:5000
