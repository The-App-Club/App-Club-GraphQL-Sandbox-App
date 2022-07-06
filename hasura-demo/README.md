```bash
$ time node index.js | jq
{
  "demo": [
    {
      "created_at": "2022-03-15T13:33:06.016862+00:00",
      "id": 1,
      "title": "カーボーイ・ビバップ",
      "updated_at": "2022-03-15T13:33:06.016862+00:00"
    },
    {
      "created_at": "2022-03-15T13:34:19.0598+00:00",
      "id": 2,
      "title": "CowBoy・Bebop",
      "updated_at": "2022-03-15T13:34:19.0598+00:00"
    }
  ]
}

real    0m0.745s
user    0m0.307s
sys     0m0.058s
```