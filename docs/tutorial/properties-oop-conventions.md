---
sidebar_position: 3
---

# Properties, OOP, Conventions

## Properties

```ts
class Contact(
    val name: String,
    val address: String
)

// call the variable directly
contact.address
```

### Fields

- You can access field only inside accessors

```ts
class StateLogger {
    var state = false
        set(value) {
            println("state has changed: " + "$field -> $value")
            field = value
        }
}
```

- No mentioning of `field` in customer accessors

```ts
...

class StateLogger{
    private var boolState = false

    var state: State
        get() = if(boolState) ON else OFF
        ...
}
```

- You always use property instead of getter and setters
- Changing visibility of a setter

```ts
// change visibility of the setter but use its default implementation
class LengthCounter {
    var counter: Int = 0
        private set
}
```

### Property in interface

```ts
interface User {
    val nickname: String
}
```

- Which property is calculated on each access?

```ts
interface User {
  val nickname: String
}

class FacebookUser(val accountId: Int) : User {
  override val nickname = getFacebookName(accountId)
}

class SubscribingUser(val email: String) : User {
  override val nickname: String
    get() = email.substringBefore('@')
}
```

- Answer: `SubscribingUser.nickname`
- Open property can't be used in smart casts
- Thus, the below code is correct approach:

```ts
interface Session {
    val user: User
}

fun analyzeUserSession(session: Session){
    val user = session.user
    if(user is FacebookUser){
        println(user.accountId)
    }
}
```

### Extension Properties

```ts
val String.lastIndex: Int
    get() = this.length - 1

val String.indices: IntRange
    get() = 0..lastIndex
```

### Lazy Property

```ts
val lazyValue: String by lazy {
    println("computed")
    "Hello"
}

fun main(args: Array<String>){
    println(lazyValue)
    println(lazyValue)
}

// here is what is printed
// computed
// Hello
// Hello
```

### lateinit

- Use `lateinit` value as a value of a non-nullable type, so no need to use ternary `?` when referring to it anymore.
  - i.e. `myData?.foo` is not used. Just use `myData.foo`.

```ts
class KotlinActivity: Activity() {
    lateinit var myData: MyData

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)

        myData = intent.getParcelableExtra("MY_DATA")
    }
    ...myData.foo
}
```

:::warning

- lateinit variables cannot be `val`. It has to be `var`
- lateinit variables cannot be `null`
- lateinit variables cannot be primitive type

:::

## Object Oriented Programming

- Any declaration is `public` and `final` by default
- To make something non-final, mark it as `open`
- There is no package private visibility.
  - It's called `internal`

### Module

- a set of Kotlin files compiled together
  - Maven
  - Gradle

### Definitions

- `final` modifier means cannot be overridden.
- `open` modifier means can be overriden
- `abstract` modifier means must be overriden (can't have an implementation)
- `override` modifier means overrides a member in a superclass or interface (mandatory to do)
- `public` class member or top-level declaration is visible everywhere.
- `internal` class member or top-level declaration is visible in the module.
- `protected` class member is visible in the class and its subclasses
- `private` class member is visible in the class only
- `private` top-level declaration is visible in the same file.

### Constructors

```ts
class A

val a = A()
```

#### Concise primary constructor

```ts
class Person(val name: String, val age: Int)
```

#### Full primary constructor syntax

```ts
class Person(name: String){
    val name: String

    init {
        this.name = name
    }
}
```

is equivalent to:

```ts
class Person(val name: String)
```

#### Changing visibility of a constructor

```ts
class InternalComponent
internal constructor(name: String){
    ...
}
```

#### Secondary Constructors

```ts
class Rectangle(val height: Int, val width: Int){
    constructor(side: Int) : this(side, side) {...}
}
```

### Different syntax for inheritence

#### Same syntax for `extends` & `implements`

```ts
interface Base
class BaseImpl: Base

open class Parent
class Child: Parent()
```

#### What will be printed?

```ts
open class Parent {
    open val foo = 1
    init {
        println(foo)
    }
}

class Child: Parent() {
    override val foo = 2
}

fun main() {
    Child()
}
```

- Answer: 0

### Class Modifiers

#### enum Class

- represents enumeration

```ts
import Color.*

enum class Color{
    BLUE, ORANGE, RED
}

fun getDescription(color: Color) =
    when (color) {
        BLUE -> "cold"
        ORANGE -> "mild"
        RED -> "hot"
    }
```

#### enum class with Properties

```ts
enum class Color(val r: Int, val g: Int, val b: Int){
    BLUE(0, 0, 255), ORANGE(255, 165, 0), RED(255, 0, 0);

    fun rgb() = (r * 256 + g) * 256 + b
}

println(BLUE.r) // 0
println(BLUE.rgb()) //255
```

#### data modifier

- Generates useful methods:
  - `equals`
  - `hashCode`
  - `copy`
  - `toString`

#### What will be printed?

```ts
class Foo(val first: Int, val second: Int)
data class Bar(val first: Int, val second: Int)

val f1 = Foo(1, 2)
val f2 = Foo(1, 2)
println(f1 == f2)

val b1 = Bar(1, 2)
val b2 = Bar(1, 2)
println(b1 == b2)
```

- Answer: `false true`
- In the Foo, you are checking reference equality
- In the Bar, since it is a data class, you are comparing content so it's true.

#### Properties in primary constructor

```ts
data class User(val email: String){
    var nickname: String? = null
}

val user1 = User("voldemort@gmail.com")
user1.nickname = "Voldemort"

val user2 = User("voldemort@gmail.com")
user2.nickname = "Hello"

// user1 == user2 is true
// because only the email values are compared and not the nicknames
```

#### Sealed Class

- Restricts class hierarchy: all subclasses must be located in the same file

```ts
sealed class Expr
class Num(val value: Int): Expr()
class Sum(val left: Expr, val right: Expr): Expr()

fun eval(e: Expr): Int = when (e) {
    is Num -> e.value
    is Sum -> eval(e.left) + eval(e.right)
}
```

#### inner modifier

- The inner class stores a reference to an outer class.

```ts
class A {
    class B
    inner class C{
        ...this@A...
    }
}
```

### Class Delegation

```ts
class Controller(
    repository: Repository,
    logger: Logger
) : Repository by repository, Logger by logger
```

### Objects

`object = singleton`

#### object expressions

```ts
window.addMouseListener(
  object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) {
      // ...
    }
    override fun mouseEntered(e: MouseEvent) {
      // ...
    }
  }
)
```

- An object expression is not a singleton.
- A new instance of object expression is created for each call.
- `companion object`: special object inside a class
  - it could implement an interface
  - can be a receiver of extension function

#### No `static` keyword

- Declare "static" members:
  - at the top level
  - inside Objects
  - inside companion objects

#### Which line will not compile?

```ts
class C {
  companion object {
    @JvmStatic fun foo() {}
    fun bar() {}
  }
}
```

```
// Java
C.foo();           //#1
C.bar();           //#2
C.Companion.foo(); //#3
C.Companion.bar(); //#4
```

- Answer: line 2 because you try to access bar as a static function. By default, it cannot be accessed like that.
- Is it possible to declare an inner object?

```ts
class A {
  inner object B
}
```

- Answer: No. The compiler gives you an error because inner is not applicable to object.

#### Nested object

- This is allowed:

```ts
class A {
    object B
}
```

### Constants

- `const` for primitive types and String
- `@JvmField` eliminates accessors
  - exposes a Kotlin property as a field in Java

#### Compile time Constants

```ts
const val answer = 42
```

#### @JvmField

```ts
object A {
    @JvmField
    val prop = MyClass() //static field generated
}

class B {
    @JvmField
    val prop = MyClass() //regular field generated
}
```

- Which declaration will expose answer as static field?

```ts
// Answer:

@JvmField
val answer

const val answer = 42
```

- Which declaration(s) will inline the value of answer in the resulting bytecode?

```ts
object SuperComputer {
  val answer = 42
}
```

- Answer: `const val answer = 42`, the const achieves this.

- Which declaration(s) will expose a top-level property as static field when used from Java?

```ts
val answer = 42
```

- Answer:

```ts
// Answer:

@JvmField
val answer

const val answer = 42
```

### Generics

```ts
interface List<E>{
  fun get(index: Int): E
}

fun foo(ints:List<Int>) {...}

fun bar(strings: List<String>) {...}
```

#### Generic Functions

```ts
fun <T> List<T>.filter(predicate: (T) -> Boolean): List<T>
```

#### Nullable Generic Argument

```ts
fun <T> List<T>.firstOrNull(): T?

val ints = listOf(1, 2, 3)

val i: Int? = ints.firstOrNull()  // output: 1

val j: Int? = listOf<Int>().firstOrNull() // null

val k: Int? = listOf(null, 1).firstOrNull() //null
```

#### Can element be nullable in the example below?

```ts
fun <T> foo(list: List<T>) {
    for (element in list) {

    }
}
```

- Answer: yes. You can pass a list of nullable elements at an argument, so the element can be null.

#### Non-nullable upper bound

```ts
fun <T: Any> foo(list: List<T>){
  for(element in list){

  }
}
```

#### Comparable upper bound

```ts
fun<T: Comparable<T>> max(first: T, second: T): T {
  return if(first > second) first else second
}

max(1, 3) // output: 3
```

#### Using @JvmName

```ts
fun List<Int>.average(): Double {...}

// Modifies the file name under the hood and modifies the name of the function at the bytecode
@JvmName("averageOfDouble")
fun List<Double>.average(): Double {...}
```

- The two functions above are considered two different functions.
- In Java, you call the the second function as "averageOfDouble"

### OOP Design of Kotlin

- `public` is default and very permissive
- `final` is the most restrictive: no one can override this
  - enables smart casts
  - e.g. have a val that is a member in a cast
  - If it's `open`, you can't smart cast it.

## Conventions

### Operator Overloading

- `a + b`
- `a.plus(b)`

```ts
operator fun Point.plus(other: Point): Point {
  return Point(x + other.x, y + other.y)
}
```

#### Unary operations

- `-a` is the same as `a.unaryMinus()`

```ts
operator fun Point.unaryMinus() = Point(-x, -y)
```

#### Assignment Operations

```ts
a += b;
```

can be the same as

```ts
a = a.plus(b);
a.plusAssign(b);
```

#### What will be printed?

```ts
val list1 = listOf(1, 2, 3)
var list2 = list1
list2 += 4
println(list1)
println(list2)
```

- Answer:

```
[1, 2, 3]

[1, 2, 3, 4]
```

### Comparisons

- `a >= b` is about the same as `a.compareTo(b) >= 0`

### Equality Check

- `s1 == s2` is same as `s1.equals(s2)`

### Accessing Elements by index

- `x[a, b]` is same as `x.get(a, b)`
- `x[a, b] = c` is same as `x.set(a, b, c)`

#### Which function allows using the following syntax for your custom class?

```ts
val board : Board = ...
board[1, 2] = 'x'
```

- Answer:

```ts
operator fun Board.set(x: Any, y: Any, value: Char) { ... }
```

- You need the `operator` keyword to make this index work.

#### Which elements can be compared using comparison operations?

```
x < y
x >= y
```

- Answer:

  - `Strings`
  - elements implementing `Comparable` interface
  - elements that define member or extenson `operator` function `compareto` (with the right signature)

- Implement 'equals2' without using '==' so that it was equivalent to 'equals1'. You can call 'equals()' directly and use the reference equality operator '==='.

```ts
data class Value(val s: String)

fun equals1(v1: Value?, v2: Value?): Boolean {
    return v1 == v2
}

fun equals2(v1: Value?, v2: Value?): Boolean {
    if (v1 === v2) return true // Reference equality check
    if (v1 == null || v2 == null) return false // One is null and the other is not
    return v1.equals(v2) // Calls the equals() method
}

fun main(args: Array<String>) {
    println(equals1(Value("abc"), Value("abc")) == true) // should be true
    println(equals1(Value("abc"), null) == false) // should be false
    println(equals1(null, Value("abc")) == false) // should be false
    println(equals1(null, null) == true) // should be true

    println(equals2(Value("abc"), Value("abc")) == true) // should be true
    println(equals2(Value("abc"), null) == false) // should be false
    println(equals2(null, Value("abc")) == false) // should be false
    println(equals2(null, null) == true) // should be true
}

```

### Operator overloading (When not to use it)

- You cannot invent your own operator
- You cannot alter precedence of existing operators
- Only Allowed to overload a predefined set of operators
