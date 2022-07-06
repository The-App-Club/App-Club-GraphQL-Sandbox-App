[serverless-express-rest-api](https://www.serverless.com/blog/serverless-express-rest-api/)

```bash
$ curl -X GET -L https://ru8c5nfs94.execute-api.ap-northeast-1.amazonaws.com/dev | awk 4
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    12  100    12    0     0    162      0 --:--:-- --:--:-- --:--:--   162
Hello World!
```


```bash
$ curl -X POST -L 'https://ru8c5nfs94.execute-api.ap-northeast-1.amazonaws.com/dev/cool' -d '{"message": "hogehoge"}' | awk 4
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    46  100    23  100    23    242    242 --:--:-- --:--:-- --:--:--   484
{"message": "hogehoge"}
```