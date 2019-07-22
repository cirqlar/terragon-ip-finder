# IP Finder

This is a simple API with one endpoint which returns location data for an IP address.

## Requirments

This requires Nodejs and Redis to function, as well as an [ipstack](https://ipstack.com/) API key.

## How to Use

To get started, clone the repository

```bash
git clone git@github.com:cirqlar/terragon-ip-finder.git
```

Install dependencies

```bash
npm install
```

Set your API key (and other environent variables) in a .env file (See [.env.example](/.env.example)) and start the server.

```bash
npm start
```

Alternatively, you can set your API key (and other environent variables) in the terminal

```bash
API_KEY=YOUR_API_KEY npm start
```

### Environment Variables

API_KEY: Your [ipstack](https://ipstack.com/) API key

PORT: The port on which the server will listen _default: 3000_

LIFETIME: How long (in seconds) before keys in the cache expire _default: 300_

## Interacting with the API

The API has a single get endpoint

```
{base_url}/IP_ADDRESS
```

The returned location data would be a JSON object with the following keys:

- ip
- continent
- country
- state
- latitude
- longitude

Empty values return `null`

Example:

```json
{
  "ip": "185.199.111.153",
  "continent": "North America",
  "country": "United States",
  "state": null,
  "latitude": 37.751,
  "longitude": -97.822
}
```

In the event an invalid IP address is queried, a response code 400 (Bad Request) is returned with this JSON object

```json
{
  "status": 400,
  "message": "The IP Address IP_ADDRESS is invalid"
}
```

Any other issues will return the code 500 (Internal Server Error)

```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```
