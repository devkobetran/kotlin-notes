---
sidebar_position: 2
---

# Nullability & Functional Programming

## Nullable types

- Make exceptions occur at compile time, rather than runtime.

```ts
// String only
val s1: String = "always not null"

// Allows String or null
val s2: String? = null
```

### Dealing with Nullable Types

```ts
val s: String?

if(s != null){
    s.length
}
```

is equivalent to

```ts
val s: String?

s?.length
```

### Nullability operators

```ts
// if s!= null, then return s.length
// else return null
val length: Int? = s?.length
```

```ts
// if s!= null, then return s.length
// else return 0
val length: Int = s?.length ?: 0
```

- What will be printed?

```ts
val a: Int? = null
val b: Int? = 1
val c: Int = 2

val s1 = (a ?: 0) + c
val s2 = (b ?: 0) + c
print("$s1$s2")
```

- Answer: `23`

### Making Null Pointer Exception Explicit

```ts
val s: String?

s!!
```

- This basically means:
  - If `s` is not null, give `s`
  - Else if `s` is null, then give a Null Pointer Exception.

:::tip

- Don't use Null Pointer Exception excessively.
- Don't use two NPEs within the same line. Otherwise, you won't know which one thrown the exception.

:::

- Which line(s) won't compile?

```ts
#1 fun isFoo1(n: Name) = n.value == "foo"
#2 fun isFoo2(n: Name?) = n.value == "foo"
#3 fun isFoo3(n: Name?) = n != null && n.value == "foo"
#4 fun isFoo4(n: Name?) = n?.value == "foo"

   fun main(args: Array<String>) {
#5   isFoo1(null)
#6   isFoo2(null)
#7   isFoo3(null)
#8   isFoo4(null)
   }
```

- Answer: #2 and #5
- What will be printed?

```ts
val x: Int? = 1
val y: Int = 2
val sum = x ?: 0 + y
println(sum)
```

- Answer: `1`

## Nullable types under the hood

- `@Nullable, @NotNull` annotations
- How many objects are created to store a value of a nullable String?
  - `val s: String?`
  - Answer: Only one object to store a String value

### List of nullable elements vs nullable List

- `List<Int?>`
  - Every element might be either `null` or `Int`
- `List<Int>?`
  - The whole list might be either `null` or `Int`

```fun foo(list1: List<Int?>, list2: List<Int>?) {
#1  list1.size
#2  list2.size

#3  val i: Int =
#4    list1.get(0)
#5  val j: Int =
#6    list2.get(0)
  }
```

- Line 2: `list2?.size`
- Line 3: `val i: Int?`
- Line 5: `val j: Int? =`
- Line 6: `list2?.get(0)`

### Safe Casts

- Type cast: `as`

```ts
if (any is String){
   val s = any as String
   s.toUpperCase()
}
```

- Could be shorten to:

```ts
if (any is String){
   any.toUpperCase()
}
```

- Could use `as?` as well:

```ts
(any as ?String)?.toUpperCase();
```

- `foo as? Type` can be either:
  - `foo as Type`
  - `null`

## Functional Programming

### Lambdas

- Example:

```ts
button.addActionListener { println("Hi")}
```

- Allows collections to be written in a functional style

```ts
employees.filter { it.city == City.PRAGUE }
  .map{ it.age }
  .average()
```

- Lambda Syntax

```ts
{ x: Int, y: Int -> x + y}
```

- Passing Lambda as an argument

```ts
list.any({i: Int -> i > 0})
```

- When lambda is the last argument, it can be outside the parentheses.

```ts
list.any() {i: Int -> i > 0}
```

- If parentheses are empty, it can be omitted.

```ts
list.any {i: Int -> i > 0}
```

- `it` denotes the argument if it's the only one

```ts
list.any {it > 0}
```

- Multi-line lambda is allowed where the last expression is the result

```ts
list.any {
  println("processing $it")
  it > 0
}
```

- Destructuring declarations syntax instead

```ts
map.mapValues { entry -> "${entry.key} -> ${entry.value}!"}
```

- Another way:

```ts
map.mapValues { (key, value) -> "$key -> $value!" }
```

- If one parameter is not used, you can omit that parameter name:

```ts
map.mapValues { (_, value) -> "$value!" }
```

### Common Operations on collections

#### Filter

```ts
.filter { it % 2 == 0}
```

- input: `1, 2, 3, 4 ...`
- output: `2, 4, ...`

#### Map

```ts
.map { it * it }
```

- input: `1, 2, 3, 4`
- output: `1, 4, 9, 16`
- output size is the same as input size.

#### any

- if at least one element satisfies the condition, then return true.

#### all

- all elements satisfies the condition, then return true.

#### none

- none of the elements satisfies the condition, then return true.

#### find

- finds the element and returns the element if it satisfies the condition

#### firstOrNull

- returns the first element found if it satisfies the condition, or null if otherwise.

#### count

- returns a counter of the number of elements that satisfies the condition.

#### partition

- returns the list of elements that satisfy the condition and another list of the ones that failed the condition.

#### groupby

- returns collections sorted by the condition to group by

#### associateBy

- returns one element of the mapped value from the condition.

:::warning

- duplicates are removed, so make sure the key is unique in your condition to prevent data loss.

:::

#### associate

- use associate to build a map based on a list.
- first part is the key and second part is the value

```ts
.associate { `a` + it to 10 * it }
```

- input: `1, 2, 3, 4 ...`
- output: `a -> 10, b -> 20, c -> 30, d -> 40`

#### zip

- returns a combination of two collections
- input: `1, 2, 3, 4, ...`
- second input: `a, b, c, d, ...`
- output:

```
[1, a], [2, b], [3, c], [4, d], ...
```

#### zipWithNext

- returns a collection containing pairs of first and next element
- input: `1, 2, 3, 4, ...`
- output: `[1, 2], [2, 3], [3, 4], ...`

#### flatten

- combines a list of lists into one collection
- input: `[a, b, c], [d, e], [f, g, h, i]`
- output: `[a, b, c, d, e, f, g, h, i]`

### Function Types

```ts
val sum: (Int, Int) -> Int = { x: Int, y: Int -> x + y }
// is equivalent to
val sum = { x: Int, y: Int -> x + y }

val result: Int = sum(1, 2)
```

- The type of the function sum is: `(Int, Int) -> Int`
- The type of result is `Int`

#### Passing a variable of function type as an argument

```ts
val isEven = { i: Int -> i % 2 == 0 }

val list = listOf(1, 2, 3, 4)
list.any(isEven)
list.filter(isEven)
```

#### Calling lambda directly

- Preferred way:

```ts
run { println("hey!") }
```

- Another way but ugly syntax:

```ts
{ println("hey!") }()
```

#### Function types and nullability

```ts
() -> Int?

//vs.

(() -> Int)?
```

- Which lines won't compile?

```
#1 val f1: () -> Int? = null
#2 val f2: () -> Int? = { null }
#3 val f3: (() -> Int)? = null
#4 val f4: (() -> Int)? = { null }
```

- Answer: lines 1, 4

- `() -> Int?` means the return type is nullable, not the whole type itself
- `(() -> Int)?` means the whole type is nullable (the variable is nullable)
- In line 2, `{null}` means a lambda without arguments that always returns null
- In line 3, `f3` is either a lambda returning `Int` or `null` reference

#### Working with a nullable function type

```ts
val f: (() -> Int)? = null

if( f != null){
  f()
}

f?.invoke()
```

### Member references

```ts
class Person(val name: String, val age: Int)
people.maxBy { it.age }
people.maxBy(Person::age)
```

#### You can store lambda in a variable

```ts
val isEven: (Int) -> Boolean = { i: int -> i % 2 == 0 }
```

- You cannot store a function in a variable such as `val predicate = isEven`

#### Use function reference instead

```ts
fun isEven(i: Int): Boolean = i % 2 == 0
val predicate = ::isEven
// same as
val predicate = { i: int -> isEven(i) }
```

#### Member references

```ts
val action = { person: Person, message: String ->
  sendEmail(person, message)
}

val action = ::sendEmail
```

#### Passing function reference as an argument

```ts
fun isEven(i: Int): Boolean = i % 2 == 0

val list = listOf(1, 2, 3, 4)
list.any(::isEven)
list.filter(::isEven)
```

#### Bound & non-bound references

```ts
class Person(val name: String, val age: Int){
  fun isOlder(ageLimit: Int) = age > ageLimit
}

val agePredicate = Person::isOlder

val alice = Person("Alice", 29)
agePredicate(alice, 21)
```

#### Non-Bound Reference: the corresponding lambda

- Called on any object of a given type

```ts
class Person(val name: String, val age: Int){
  fun isOlder(ageLimit: Int) = age > ageLimit
}

val agePredicate = (Person, Int) -> Boolean = { person, ageLimit -> person.isOlder(ageLimit) }

val alice = Person("Alice", 29)
agePredicate(alice, 21)
```

#### Bound Reference

- Stores the object on which the member can delay to be called

```ts
class Person(val name: String, val age: Int){
  fun isOlder(ageLimit: Int) = age > ageLimit
}

val alice = Person("Alice", 29)
val agePredicate: (Int) -> Boolean = alice::isOlder
agePredicate(21)
```

#### Bound to this reference

```ts
class Person(val name: String, val age: Int){
  fun isOlder(ageLimit: Int) = age > ageLimit

  fun getAgePredicate() = this::isOlder
}
```

#### Question

- What is the type of `::isOlder` here?

```ts
class Person(val name: String, val age: Int) {
  fun isOlder(ageLimit: Int) = age > ageLimit
  fun getAgePredicate() = ::isOlder
}
```

- Answer: `(Int) -> Boolean`
- Is `::isEven` a bound reference?

```ts
fun isEven(i: Int): Boolean = i % 2 == 0

val list = listOf(1, 2, 3, 4)
list.any(::isEven)
list.filter(::isEven)
```

- Answer: no

### return from Lambda

- What will be printed?

```ts
fun duplicateNonZero(list: List<Int>): List<Int> {
  return list.flatMap l@ {
    if (it == 0) return@l listOf()
    listOf(it, it)
  }
}
println(duplicateNonZero(listOf(3, 0, 5)))
```

- Answer: `[]`
