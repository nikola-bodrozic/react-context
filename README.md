# React App with Context

## Overview

Component hierarchy. 

```text
App
    - NotesList
    - UserContext
        - Header
        - AddUser
    - RenderExcel
    - MockingAxios
    - FormValidator
```

Component AddUser updates Header using context.

RenderExcel downloads Excel file, data is in the table.

MockingAxios shows how to mock axios call using MockAdapter

FormValidator use Google Invisible reCAPTCHA v2 and use basic validation min 2 chars

## Install and Start App

Run in react folder:

```sh
yarn
yarn start
```

Run in express folder:

```sh
yarn
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

