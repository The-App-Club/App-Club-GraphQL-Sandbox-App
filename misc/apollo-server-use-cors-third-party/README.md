[apollo-server serverless](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)




## Deploy

```bash
$ time serverless deploy --aws-profile app-club-serverless
```

## Check After Deploy

### Pattern1

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://uf7qx33twf.execute-api.ap-northeast-1.amazonaws.com/dev/' \
  --data '{"query":"{ hello }"}'
```

### Pattern2

```bash
$ curl -X POST -H 'Content-Type: application/json' 'https://uf7qx33twf.execute-api.ap-northeast-1.amazonaws.com/dev/' -d '{"query": "{hello}"}'
{"data":{"hello":"Hello world!"}}
```

### Pattern3

```bash
$ curl -X POST -H 'Content-Type: application/json' 'https://uf7qx33twf.execute-api.ap-northeast-1.amazonaws.com/dev/' -d '@a.graphql'
{"data":{"hello":"Hello world!"}}
```

List

```bash
$ curl -X POST -H 'Content-Type: application/json' 'https://dsmo8z0e26.execute-api.us-east-1.amazonaws.com/dev/' -d '@b.graphql' | jq ''
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   918  100   834  100    84    600     60  0:00:01  0:00:01 --:--:--   659
{
  "data": {
    "getSampleList": [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      },
      {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
      }
    ]
  }
}
```