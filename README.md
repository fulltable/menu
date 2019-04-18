# menu

> The menu module for OpenTabs FEC. The menu module has a default menu, as well as lets the user choose different menus to be displayed on screen (e.g. breakfast, lunch). The menu shows two columns, each having different items. Each item shows its name, description, and
price. The menu has a button to collapse and expand at the bottom.

## Related Projects

  - https://github.com/opentabs/sidebar
  - https://github.com/opentabs/reservation-calendar
  - https://github.com/opentabs/reviews
  - https://github.com/opentabs/photo-carousel

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> TBD

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

CRUD API

POST - /api/restaurants

GET - /api/restaurants/:id/menus/:menu

UPDATE - /api/restaurants/:id

DELETE - /api/restaurants/:id/menus/:menu

