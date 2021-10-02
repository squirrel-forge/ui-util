### @squirrel-forge/util Documentation

> [Back to Readme](../../README.md)

# Javascript / Number

## Table of contents

 - [convertBytes()](#convertBytes)
 - [gcd()](#gcd)
 - [isEven()](#isEven)
 - [isFloat()](#isFloat)
 - [leadingZeros()](#leadingZeros)
 - [rand()](#rand)
 - [round()](#round)

---

### convertBytes

convertBytes - Convert a byte number to another unit

#### Description

```javascript
convertBytes( bytes, decimals = 2, style = 1024, obj = false, forceUnit = null ) : string | Object
```

Converts a byte number to an auto fitting or defined size unit and returns a string or optionally an object with separated values.

#### Parameters
Parameter     | Type    | Default | Description
------------- | ------- |:-------:| ---
**bytes**     | Number  |    -    | Number of bytes
**decimals**  | Number  |    2    | How many decimals to display
**style**     | Number  |   1024  | Calculate bytes with 1024 or with 1000
**obj**       | Boolean |  false  | Whether to return an object with values
**forceUnit** | String  |   null  | Force conversion to a specific unit, must fit to style

#### Return Values
Type/Value | Description
---------- | ---
**String** | Converted unit string 'X.X unit'
**Object** | Value object { value : Number, unit : String }

#### Examples

```javascript
convertBytes( 1048576 ) // 1.00 mib
```

---

### gcd

gcd - Get the common denominator

#### Description

```javascript
gcd( a, b ) : number
```

Get the common denominator of two numbers.

#### Parameters
Parameter | Type   | Default | Description
--------- | ------ |:-------:| ---
**a**     | Number |    -    | Any integer
**b**     | Number |    -    | Any integer

#### Return Values
Type/Value | Description
---------- | ---
**Number** | The common denominator

#### Examples

```javascript
gcd( 165, 425 ) // 5 
```

---

### isEven

isEven - Check for even number

#### Description

```javascript
isEven( num ) : boolean
```

Check if a number is an even number.

#### Parameters
Parameter | Type   | Default | Description
--------- | ------ |:-------:| ---
**num**   | Number |    -    | Number to check

#### Return Values
Type/Value  | Description
----------- | ---
**Boolean** | True if the number is even

#### Examples

```javascript
isEven( 28 ) // true
isEven( 3 ) // false
```

---

### isFloat

isFloat - Check for a float value

#### Description

```javascript
isFloat( num ) : boolean
```

Check if a number is a flaot value. 

#### Parameters
Parameter | Type   | Default | Description
--------- | ------ |:-------:| ---
**num**   | Number |    -    | Number to check

#### Return Values
Type/Value  | Description
----------- | ---
**Boolean** | True if the number is a float

#### Examples

```javascript
isFloat( 1.2 ) // true
isFloat( 2 ) // false
```

---

### leadingZeros

leadingZeros - Return a number with leading zeros

#### Description

```javascript
leadingZeros( num, length = 2 ) : string
```

Convert a number to a string with a fixed length with leading zeros. 

#### Parameters
Parameter  | Type   | Default | Description
---------- | ------ |:-------:| ---
**num**    | Number |    -    | Number to prefix
**length** | Number |    2    | Expected result string

#### Return Values
Type/Value | Description
---------- | ---
**String** | Number string with leading zeros

#### Examples

```javascript
leadingZeros( 2 ) // '02'
```

---

### rand

rand - Random integer

#### Description

```javascript
rand( min, max ) : number
```

Get random integer.

#### Parameters
Parameter | Type   | Default | Description
--------- | ------ |:-------:| ---
**min**   | Number |    -    | Minimum value
**max**   | Number |    -    | Maximum value

#### Return Values
Type/Value | Description
---------- | ---
**Number** | Integer

#### Examples

```javascript
rand( 0, 10 ) // (1|2|3|4|5|6|7|8|9|10)
```

---

### round

round - Round value

#### Description

```javascript
round( value, decimals = 2 ) : number
```

Round value to specific decimals, default 2.

#### Parameters
Parameter    | Type   | Default | Description
------------ | ------ |:-------:| ---
**value**    | Number |    -    | Number to round
**decimals** | Number |    -    | Number of decimals

#### Return Values
Type/Value | Description
---------- | ---
**Number** | Rounded float value

#### Examples

```javascript
round( 4.5678 ) // 4.57
```
