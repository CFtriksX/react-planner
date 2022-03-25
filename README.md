# Flask-react-planner

*react-planner* is a [React][react] component which can be used to draw model buildings. Drag & drop from a catalog of customizable and ready-to-use objects, you can start from 2D wireframes and land on 3D models. As a developer you can provide your users with new objects by adding them to the catalog.

This repos use flask to save and load plans from a database.

[![npm][npm_label]][npm_link]
![javascript][js]
![react-version][react_version]

## Demo (Without Flask)

[Demo][demo]

[![react-planner][preview_image]][demo]

## Usage

Go in the api folder, create your virtual env and install the requirements:
```
$ python3.9 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```
In api.py, set your own URI then create your table in your database:
```
$ python create_table.py
```
Now deactivate your virtual, open two terminal and launch both react and flask:
```
$ deactivate
$ yarn start
$ yarn start-api
```

You can now use react-planner with a database !

## Docs

- [Create a Property](docs/HOW_TO_CREATE_A_PROPERTY.md)
- [Create a Catalog](docs/HOW_TO_CREATE_A_CATALOG.md)
- [Create a Catalog's Element](docs/HOW_TO_CREATE_AN_ELEMENT.md)

## Authors

- [chrvadala](https://github.com/chrvadala)
- [danilosalvati](https://github.com/danilosalvati)
- [enricomarino](https://github.com/enricomarino)
- [federicospini](https://github.com/federicospini)
- [alessiocarrafa](https://github.com/alessiocarrafa)
- [stefanoperrone](https://github.com/stefanoperrone)

Developed @ [CVDLAB][cvdlab]

## Contributing

 - [CFtriksX](https://github.com/CFtriksX)

## Contributors

 - [JikkuJose](https://github.com/JikkuJose)
 - [Yeri-Kim](https://github.com/Yeri-Kim)
 - [lucacastoro](https://github.com/lucacastoro)
 - [cbosse-skwirrel](https://github.com/cbosse-skwirrel)
 - [JaccoGoris](https://github.com/JaccoGoris)

## License

MIT

[react]: https://facebook.github.io/react/
[npm_label]: https://img.shields.io/npm/v/react-planner.svg?maxAge=2592000?style=plastic
[npm_link]: https://www.npmjs.com/package/react-planner
[js]: https://img.shields.io/badge/javascript-ES6-fbde34.svg
[react_version]: https://img.shields.io/badge/react%20version-16.0.0%20or%20later-61dafb.svg
[preview_image]: https://raw.githubusercontent.com/cvdlab/react-planner/master/preview.png
[demo]: https://cvdlab.github.io/react-planner
[cvdlab]: http://cvdlab.org/
