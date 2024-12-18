---
sidebar_position: 1
---

# Starting up with Kotlin

## From Java to Kotlin

- The Kotlin code is compiled to Java bytecode.
- Java to Kotlin converter tool is available in IntelliJ
- Adding a `data` modifier to a class automatically generates several methods for it:
  - `equals`
  - `hashCode`
  - `toString`
- Example of data class:
  ```ts
  data class Person(val name: String, val age: Int)
  ```
- No need to use `new` keyword in Kotlin
  - Example:
  ```ts
  val person = Person("Alice", 27)
  println(person.name)
  ```
- Kotlin syntax helps reduce redundancy.

  - Example of `updateWeather` function in Kotlin:

  ```ts
  fun updateWeather(degrees: Int){
      // Using Pair shortcut syntax
      val(description: String, color: Color) =
          if(degrees < 10){
              Pair("cold", BLUE)
          } else if( degrees < 25) {
              Pair("mild", ORANGE)
          } else {
              Pair("hot", RED)
          }
      ...
  }

  ```

  - Could simplify it further by removing the data types because Kotlin can infer it.

    ```ts
    fun updateWeather(degrees: Int){
      // Using Pair shortcut syntax
      val(description, color) =
          if(degrees < 10){
              Pair("cold", BLUE)
          } else if( degrees < 25) {
              Pair("mild", ORANGE)
          } else {
              Pair("hot", RED)
          }
      ...
    }
    ```

    - Could simplify it further by using `when` instead of `if`:

      ```ts
        fun updateWeather(degrees: Int){
            // Using Pair shortcut syntax and when clause
            val(description, color) = when {
                degrees < 10 -> Pair("cold", BLUE)
                degrees < 25 -> Pair("mild", ORANGE)
                else -> Pair("hot", RED)
            }
            ...
        }

      ```

    - Could alternatively use `to` instead of `Pair`:

      ```ts
        fun updateWeather(degrees: Int){
            // Using Pair shortcut syntax and when clause
            val(description, color) = when {
                degrees < 10 -> "cold" to BLUE
                degrees < 25 -> "mild" to ORANGE
                else -> "hot" to RED
            }
            ...
        }

      ```

- Does the automatic Java to Kotin Converter always produce the idiomatic Kotlin code?
  - No, it doesn't
  - The Java code likely will look very "Java" in the Kotlin version.
  - You need to be immersed in Kotlin syntax to recognize how to manually reduce redundancies or to use "prettier" Kotlin syntax.

## Basics

### "Hello, world" Example

- Hello World:

```ts
package intro

fun main() {
    val name = "Kotlin"
    println("Hello, $name!")
}
```

:::info

- The `main` function can go with or without arguments
  - Example with argument:
  ```ts
    fun main(args: Array<String>)
  ```

:::

- `main` with argument Example:

```ts
package intro

fun main(args: Array<String>){
    val name = if(args.size > 0) args[0] else "Kotlin"
    println("Hello, $name!")
}

```

:::note

- An `Array<String>` in kotlin is the same array as in java.
- In Kotlin, `if` `else` clauses are expressions which can be assigned to a variable or returned in a function as shown above.
- String templates utilize the `$` sign next to a variable name to insert a value inside a string literal.

:::

- String templates work for variables and functions:
  - `"String Text Here: $variable"`
  - `"String Text Here: ${functionCall(...)}"`
- What will be printed if no arguments are passed?
  ```ts
  fun main(args: Array<String>) {
      println("Hello, ${args.getOrNull(0)}!")
  }
  ```
  - `Hello, null!` will be printed
- What will be printed?

  ```ts
  fun foo(): String {
      println("Calculating foo...")
      return "foo"
  }

  fun main(args: Array<String>){
      println("First ${foo()}, second ${foo()}")
  }
  ```

  - This will be printed:

  ```
    Calculating foo...
    Calculating foo...
    First foo, second foo
  ```

### Variables

- An assigned-once and read-only variable will be denoted with `val`
  - This is similar to a `final` variable in java.
- A mutable variable will be denoted with `var`
- Types are inferred in Kotlin:
  - `val greeting: String = "Hi!"` does not need to explicitly say it is a String.
  - `val greeting = "Hi!"` knows it is a String type.
- Why doesn't the following code compile?
  ```ts
  var string = 1;
  string = "abc";
  ```
  - Because you can't assign a string literal to a variable of Int type.
- Is it possible to modify an object stored in val?
  - Yes
  - There are no additional constraints.
  - You can easily modify an object stored in `val` as in Java.
  - `val` is an immutable reference which doesn't say anything about the content that is stored.
- Example to demonstrate `val` is a read-only reference and not an object.
  ```ts
  val languages = mutableListOf("Java")
  languages.add("Kotlin")
  ```
- Why doesn't the following code compile?
  ```ts
  val list = listOf("Java")
  list.add("Kotlin")
  ```
  - Because you can't modify a read-only list.

:::tip

- Don't omit types
- Specify the types of a variable explicitly to improve clarity.

:::

### Functions

```ts

fun max(a: Int, b: Int): Int {
  return if(a > b) a else b
}

```

is equivalent to:

```ts

fun max(a: Int, b: Int) = if (a > b) a else b

```

- `Unit` is very similar to `void`
  - You don't really need to specify `Unit` as the return type if you don't want to.

```ts

fun displayMax(a: Int, b: Int): Unit {
  println(max(a,b))
}

```

- Is it possible to call a top-level function from Java? If yes, how?
  - You call it as a **static** function of the class, which name corresponds to the file name.

#### Calling a top-level function from Java

**MyFile.kt**

```ts
package intro

fun foo() = 0
```

**UsingFood.java**

```ts
package other;

import intro.MyFileKt;

public class UsingFoo {
  public static void main(String[] args){
    MyFileKt.foo();
  }
}
```

### Named & default arguments

- What will be printed?

```
println(
  listOf("a", "b", "c").joinToString(
    separator = "",
    prefix = "(",
    postfix = ")"
  )
);
```

- Output: `(abc)`

#### Default Values

```ts

fun displaySeperator(character: Char = '*', size: Int = 10){
  ...
}

```

- Could assign a value inside the function parameters to specify the default values.

#### Named arguments

- Suppose you only want to specify the second parameter and keep the first one at its current default value.

```ts

fun displaySeperator(character: Char = '*', size: Int = 10){
  ...
}

...

displaySepartor(size = 5)

```

- The output will be: `*****`

#### What will be printed?

```ts

fun displaySeperator(character: Char = '*', size: Int = 10){
  repeat(size) {
    print(character)
  }
}

displaySepartor(3, '5')

```

- Answer: the code won't compile.

## Control Structures

### Conditionals: if & when

- Ternary operator does not exist in Kotlin
- Just use the if expression
- Example:

```ts
val max = if(a > b) a else b
```

- when expression:

```ts
enum class Color {
  BLUE, ORANGE, RED
}

fun getDescription(color: Color): String =
  when(color){
    BLUE -> "cold"
    ORANGE -> "mild"
    RED -> "hot"
  }
```

- Checking multiple values at once Example:

```ts

fun respondToInput(input: String) = when(input) {
  // you can check mulitple values at once
  "y", "yes" -> "Good Outcome"
  "n", "no" -> "Bad Outcome"
  else -> "I don't understand you"
}

```

- Any expression can be used as a branch Condition
- Example:

```ts

fun mix(c1: Color, c2: Color) =
  when (setOf(c1, c2)) {
    setOf(RED, YELLOW) -> ORANGE
    setOf(YELLOW, BLUE) -> GREEN
    setOf(BLUE, VIOLET) -> INDIGO
    else -> throw Exception("Dirty color")
  }

```

- Checking types
- Example:

```ts
when(pet) {
  is Cat -> pet.meow()
  is Dog -> pet.woof()
}
```

- Capturing when subject in a variable
- Example:

```ts
when(val pet = getMyFavoritePet()) {
  is Cat -> pet.meow()
  is Dog -> pet.woof()
}
```

- You should always replace if with when?
  - False

### Loops

- While loops:

```ts
while(condition){
  ...
}
```

- Do-while loops:

```ts

do{
  ...
} while(condition)

```

- for loop:

```ts
val list = listOf("a", "b", "c")
for (s in list){
  print(s)
}
```

- Iterating over map

```ts
val map = mapOf (1 to "one", 2 to "two", 3 to "three")

for((key, value) in map){
  println("$key = $value")
}
```

- Iterating over range

```ts
// including upper bound
for (i in 1..9){
  print(i)
}

// excluding upper bound
for (i in 1 until 9){
  print(i)
}
```

- Iterating over String
- Example:
  - The output will be: `bcd`

```ts
for (ch in "abc") {
  print(ch + 1);
}
```

- Rewrite the following java code into Kotlin:

```ts
for(char c = '0'; c < '9'; c++){
  System.out.print(c);
}
```

- Kotlin version:

```ts
for(c in '0' until '9'){
  print(c)
}
```

### 'in' checks & ranges

- `in` could be used to check if an item belongs in something.
- Example: `c in 'a'..'z'`
  :::note
  Both the lower and upper bound is checked.
  :::
- Not `in` a range Example:
  ```ts
  c !in '0'..'9'
  ```
- `in` as `when`-condition Example:
  ```ts
  fun recognize(c: Char) = when(c) {
    in '0'..'9' -> "It's a digit!"
    in 'a'..'z', in 'A'..'Z' -> "It's a letter!"
    else -> "I don't know..."
  }
  ```
- What will be printed?

```ts
println("Kotin" in "Java".."Scala")
println("Kotlin" in setOf("Java", "Scala"))
```

- Answer: `true false`
  - First one checks in alphabetical order. So, a word that starts with the letter 'K' like "Kotlin" lies between the words "Java" and "Scala" in alphabetical order.

### Exceptions

- `throw` is an expression

```ts
val percentage =
  if(number in 0..100)
    number
  else
    throw IllegalArgumentException(
      "A percentage value must be" + "between 0 and 100: $number")
```

- `try` is an expression:

```ts
val number = try {
  Integer.parseInt(string)
} catch (e: NumberFormatException){
  return
}
```

- `@Throws` annotation

```ts
@Throws(IOException::class)
fun foo() {
  throw IOException()
}
```

- Is there any difference between calling foo and bar from Java?

```ts
fun foo() {
  throw IOException()
}

@Throws(IOException::class)
fun bar() {
  throw IOException()
}
```

- Answer: The code calling `bar` compiles, but the code calling `foo` doesn't compile.

## Extensions

### Extension Functions

- The time that the function extends is called a Receiver.
  - In the example below, `String` is the receiver of the `lastChar` function.
  - In the body of this function, we can access the receiver by this reference.
  - `this` refers to `String`.

```ts
fun String.lastChar() = this.get(this.length - 1)
```

:::info

`this` can actually be omitted, resulting in this alternative:

```ts
fun String.lastChar() = get(length - 1)
```

:::

:::note

- You need to import the extension function to use it.

```ts
import com.example.util.lastChar
val c: Char = "abc".lastChar()

```

:::

#### Calling Extension Functions from Java code

- Extension functions are like static functions in java
- Example java code:

```ts
import static StringExtensionKt.lastChar;
char c = lastChar("abc");
```

- How many arguments does the repeat function have if you call it from Java?

```ts
fun String.repeat(n: Int): String {
  val sb = StringBuilder(n * length) for (i in 1..n) {
    sb.append(this)
  }
  return sb.toString()
}
```

- Answer: **2**
- Is it possible to call a private member of String inside an extension function to String?

```ts
fun String.lastChar() = get(length - 1)
```

- Answer: **no**
  - You can't call a private member from a static function of another class in java.
  - Kotlin extension functions are regular static functions defined in a separate auxiliary class.
  - You cannot call private members from extensions.

### Examples from the Standard Library

- No Kotlin SDK
  - Just JDK + Extensions
    - Benefits:
      - small runtime jar
      - easy Java interop
- An example of an Extension function: `until`

  ```ts
  infix fun Int.until(to: Int): IntRange

  //to call it, two different syntaxes:
  1.until(10)
  1 until 10
  ```

#### Formatting multi-line strings

- Indentations can be caught in multi-line strings
  - The code below uses the `trimMargin` extension to address that.

```ts
val q = """To Code,
    | or not to code?..""".trimMargin()
```

- Thus, the output becomes:

```
To Code,
or not to code?..
```

- Conversion to numbers:
  - Example: `"123".toInt()`
  - `"1e-10".toDouble()`

#### Custom extension functions

- You can create your own extension functions:

```ts
fun <T> T.eq(other: T?): Boolean {
    return this == other
}

val a = "Hello"
val b = "Hello"
val c = "World"

println(a.eq(b)) // true
println(a.eq(c)) // false
```

- What is the type of `'a' to 1.0`?
  - Answer: `Pair<Char, Double>`
- Write `Sum` as an extension function.
- Answer:

```ts
fun List<Int>.sum(): Int {
  var total = 0
  for(i in this){
    total += i
  }
  return total
}

fun main(args: Array<String>){
  val ls = listOf(1, 2, 3)
  val output = ls.sum()
  println(output)
}
```

### Calling Extensions

- What will be printed?

```ts
open class Parent
class Child: Parent()

fun Parent.foo() = "parent"
fun Child.foo() = "child"

fun main(args: Array<String>) {
  val parent: Parent = Child()
  println(parent.foo())
}
```

- Answer: `parent`
- What will be printed?

```ts
fun String.get(index: Int) = '*'

fun main(args: Array<String>) {
  println("abc".get(1))
}
```

- Answer: `b`
