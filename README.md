## [Heroku deployment](https://fastautocheck.herokuapp.com/).

## Как запустить проект локально

(в данном git-репозитории отсутствует обученная модель, предсказывающая стоимость авто)

### Создать виртуальное окружение в директории проекта и установить зависимости 

```$ python3 -m venv venv```

```$ source venv/bin/activate```

```$ pip install -r requirements.txt```

```$ deactivate```

### Перейти в директорию "client", установить зависимости и собрать react-приложение

```$ cd client/```

```$ npm i```

```$ npm run build```

### Запустить сервер

```$ npm run start-api```

### Открыть в браузере http://127.0.0.1:5000
