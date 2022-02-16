# React App with Context

## Overview

Component hierarchy. Component Product updates Header and popup inside Map using context.

```text
App
    - Header
    - Shop
        - Product
    - Map
        - MapContainer
            - Marker
                  - Popup
```

## Install and Start App

Run:

```sh
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Unit Tests

Execute tests in App.test.js. Simulates click event and counting items using getByTestId.

```sh
npm test
```
