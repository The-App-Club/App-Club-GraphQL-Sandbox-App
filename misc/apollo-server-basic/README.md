## Stack
  - [Open Weather Map API](https://openweathermap.org/api)
  - [graphql-weather-api](https://github.com/konstantinmuenster/graphql-weather-api)

## Prepare

For running this project locally, you must register your own application at [Open Weather Map](https://openweathermap.org/api). Then, create an .env file and add the following variable: `KEY=<YOUR-APP-ID>`

## Queries

### getCityByName (`name` _required_, `country` _optional_, `config` _optional_)

IN

```graphql
query {
  getCityByName(name: "Tokyo") {
    id
    name
    country
    coord {
      lon
      lat
    }
    weather {
      summary {
        title
        description
        icon
      }
      temperature {
        actual
        feelsLike
        min
        max
      }
      wind {
        speed
        deg
      }
      clouds {
        all
        visibility
        humidity
      }
      timestamp
    }
  }
}
```

OUT

```json
{
  "data": {
    "getCityByName": {
      "id": "1850144",
      "name": "Tokyo",
      "country": "JP",
      "coord": {
        "lon": 139.6917,
        "lat": 35.6895
      },
      "weather": {
        "summary": {
          "title": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        },
        "temperature": {
          "actual": 276.21,
          "feelsLike": 273.59,
          "min": 272.62,
          "max": 278.46
        },
        "wind": {
          "speed": 2.68,
          "deg": 278
        },
        "clouds": {
          "all": 20,
          "visibility": 10000,
          "humidity": 26
        },
        "timestamp": 1641041065
      }
    }
  }
}
```

### getCityById (`id` _required_, , `config` _optional_)

IN

```graphql
query {
  getCityById(id: "1850144") {
    id
    name
    country
    coord {
      lon
      lat
    }
    weather {
      summary {
        title
        description
        icon
      }
      temperature {
        actual
        feelsLike
        min
        max
      }
      wind {
        speed
        deg
      }
      clouds {
        all
        visibility
        humidity
      }
      timestamp
    }
  }
}
```

OUT

```json
{
  "data": {
    "getCityById": [
      {
        "id": "1850144",
        "name": "Tokyo",
        "country": "JP",
        "coord": {
          "lon": 139.6917,
          "lat": 35.6895
        },
        "weather": {
          "summary": {
            "title": "Clouds",
            "description": "few clouds",
            "icon": "02n"
          },
          "temperature": {
            "actual": 276.23,
            "feelsLike": 275.14,
            "min": 272.62,
            "max": 278.46
          },
          "wind": {
            "speed": 1.34,
            "deg": 39
          },
          "clouds": {
            "all": 20,
            "visibility": 10000,
            "humidity": 27
          },
          "timestamp": 1641038952
        }
      }
    ]
  }
}
```
