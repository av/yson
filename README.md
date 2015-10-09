![YSON](/assets/logo.png?raw=true "YSON")

**YSON** (YSON - Simple Object Notation) - is a really lightweight data interchange format. 


It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a JSON, which is completely language independent, but uses conventions that are familiar to programmers of the C-family of languages.

YSON is built on simple rule - to reduce the redundand syntax elements. It supports all possible data structures are supported by JSON itself. Inspired by awesome YAML and JADE syntaxes.

## Example

*YSON - __316__ Symbols*

```
name Luke Skywalker
height 1.72
hair_color Blond
birth_year 19 BBY
gender Male
homeworld http://swapi.co/api/planets/1/
films
  http://swapi.co/api/films/1/,
  http://swapi.co/api/films/2/,
  http://swapi.co/api/films/3/,
species
  http://swapi.co/api/species/1/,
father
  name Darth Vader
  height 2.02
  hair_color
```

*JSON - __437__ Symbols*

```JSON
{
  "name": "Luke Skywalker",
  "height": 1.72,
  "hair_color": "Blond",
  "birth_year": "19 BBY",
  "gender": "Male",
  "homeworld": "http://swapi.co/api/planets/1/",
  "films": [
    "http://swapi.co/api/films/1/",
    "http://swapi.co/api/films/2/",
    "http://swapi.co/api/films/3/"
  ],
  "species": [
    "http://swapi.co/api/species/1/"
  ],
  "father": {
    "name": "Darth Vader",
    "height": 2.02,
    "hair_color": null
  }
}
```

## Structures

![Object](assets/notations/object.svg?raw=true "Object")
![Object](https://cdn.rawgit.com/iamfrontender/yson/master/assets/notations/array.svg "Object")
![Object](https://cdn.rawgit.com/iamfrontender/yson/master/assets/notations/number.svg "Object")
![Object](https://cdn.rawgit.com/iamfrontender/yson/master/assets/notations/string.svg "Object")
![Object](https://cdn.rawgit.com/iamfrontender/yson/master/assets/notations/value.svg "Object")
