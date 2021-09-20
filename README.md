<p align="center">
  <img src="logo.jpg" />
</p>

# Скрипт для обработки данных с QR кодов для Экзитпола 2021

## Исспользование

1. Экспортировать ответы с Google формы с формате `.csv`
2. Заменить содержимое файла `data.cvs` на скачанные данные
3. Заменить содержимое файла `RandomNumberList` на ваш список PIN кодов
4. Запустить скрипт

```shell
$ cd exitpoll
$ cat data.csv | ./qr-code-data-clean.awk > result.csv
```

Очищенные резульитаты находятся в файле `result.csv`.