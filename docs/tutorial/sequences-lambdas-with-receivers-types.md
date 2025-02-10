---
sidebar_position: 4
---

# Sequences, Lambdas with Receiver, Types

## Library Functions

### Under the Hood

- Lambdas can be inlined
- No performance overhead

### Useful library functions

- run
- let
- takeIf
- takeUnless
- repeat

#### run function

- runs the block of code (lambda) and returns the last expression as the result

```ts
val foo = run {
    println("calculating foo...")
    "foo"
}

```

#### let function

- allows to check the argument for being non-null, not only the receiver

```ts
fun getEmail(): Email?

val email = getEmail()
if(email != null) sendEmailTo(email)

email?.let { e -> sendEmailTo(e) }

// let can be used to introduce a new variable
getEmail()?.let { sendEmailTo(it) }
```

#### What is the type of it in the code below?

```ts
fun sendEmailTo(email: Email) { /*...*/ }
fun getEmail(): Email?

getEmail().let { sendEmailTo(it) }
```

- Answer: nullable Email `Email?`
- Thus, above is incorrect.
- Use this instead:

```ts
getEmail()?.let { sendEmailTo(it) }
```

- Thus, type of it is now `Email`

#### Another Example of let

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

// can be rewritten to
fun analyzeUserSession(session: Session){
    (session.user as? FacebookUser)?.let {
        println(it.accountId)
    }
}
```

#### takeIf function

- returns the receiver object if it satisfies the given predicate, otherwise returns `null`

```ts
issue.takeIf { it.status == FIXED }
person.patronymicName.takeIf(String::isNotEmpty)
```

#### What is the result of takeIf call below?

```ts
val number = 42
number.takeIf { it > 10 }
```

- Answer: `42`

#### takeUnless function

- returns the receiver object if it does not satisfy the given predicate, otherwise returns null

```ts
person.patronymicName.takenUnless(String?::isNullOrEmpty)
```

#### repeat function

- repeats an action for a given number of times

```ts
repeat(10) {
    println("Welcome!")
}
```

## The power of inline

### inline function

- compiler substitutes a body of the function instead of calling it

### Inling of run

```ts
inline fun <R> run(block: () -> R): R = block()

val name = "Kotlin"
run { println("Hi, $name!") }
```

#### Will the filter function be inlined in the bytecode if you call it from Java?

```ts
public static void foo(List<Integer> list) {
  List<Integer> positive =
    CollectionsKt.filter(list, element -> element > 0);
}
```

- Answer: No
- Inlining is the feature of the coding compiler.
- Whenever the compiler sees that the inline function is called, it will generate the body of the function instead of one call

### @InlineOnly

- Specifies that this function should not be called directly without inlining

## Kotlin Playground Exercise

- Write the code that the Kotlin compiler will generate while inlining the filter function (instead of calling it). Note that the compiler generates Java bytecode, but for simplicity, write the similar code in Kotlin. The simplified declaration of 'filter' is given below.

```ts
fun filterNonZero(list: List<Int>) = list.filter { it != 0 }

fun filterNonZeroGenerated(list: List<Int>): List<Int> {
    val destination = ArrayList<Int>()
    for(element in list){
        if(element != 0){
            destination.add(element)
        }
    }
    return destination
}

fun main(args: Array<String>) {
    val list = listOf(1, 2, 3)

    filterNonZero(list).toString() eq "[1, 2, 3]"
    filterNonZeroGenerated(list).toString() eq "[1, 2, 3]"
}

inline fun <T> Iterable<T>.filter(predicate: (T) -> Boolean): List<T> {
    val destination = ArrayList<T>()
    for (element in this) {
        if (predicate(element)) {
            destination.add(element)
        }
    }
    return destination
}

```

## Collections vs Sequences

- Extensions on collections are inlined

#### How many collections are created while running the code below?

```ts
val list = listOf(1, 2, -3)
val maxOddSquare = list
    .map { it * it }
    .filter { it % 2 == 1 }
    .max()
```

- Answer: 3
  - list creates one
  - map creates one
  - filter creates one

### Operations on Collections

- lambdas are inlined (no performance overhead)
- However, intermediate collections are created for chained calls

### Sequences

- Collections (eager) vs Sequences (Lazy)

### From List to Sequence

```ts
val list = listOf(1, 2, 3)

val seq = list.asSequence()
```

## More on Sequences

### Collections vs Sequences

- Collections (Horizontal Evaluation), for each step of the transformation the whole list is transformed until we reach the final step to get the result. This is more eager.
  - In other words, intermediate collections are created on chained calls
- Sequences (Vertical Evaluation), go from one index, transform that one index, down to the final step to get result. This is more lazy.
  - In other words, lambdas are not inlined.

#### Write the output after the evaluation of the last expression below

```ts
fun m(i: Int): Int {
  print("m$i ")
  return i
}

fun f(i: Int): Boolean {
  print("f$i ")
  return i % 2 == 0
}

val list = listOf(1, 2, 3, 4)
list.map(::m).filter(::f)  //m1 m2 m3 m4 f1 f2 f3 f4
list.asSequence().map(::m).filter(::f).toList() //?
```

- Answer: `m1 f1 m2 f2 m3 f3 m4 f4`

#### Nothing happens until the terminal operation is called

- Above, `toList()` in `list.asSequence().map(::m).filter(::f).toList()` is the terminal operation.
- Without `toList()`, then `list.asSequence().map(::m).filter(::f)` will return nothing.

#### Write the output after the evaluation of the last expression below

```ts
fun m(i: Int): Int {
  print("m$i ")
  return i
}

fun f(i: Int): Boolean {
  print("f$i ")
  return i % 2 == 0
}

val list = listOf(1, 2, 3, 4)
list.asSequence().map(::m).filter(::f).toList()
//m1 f1 m2 f2 m3 f3 m4 f4
list.asSequence().filter(::f).map(::m).toList() //?
```

- Answer: `f1 f2 m2 f3 f4 m4`

### Creating Sequences

```ts
interface Sequence<out T> {
    operator fun iterator(): Iterator<T>
}
```

### Generating a sequence

```ts
generateSequence { Random.nextInt() }

val seq = generateSequence {
    Random.nextInt(5).takeIf { it > 0 }
}
println(seq.toList())
```

### Reading Input

```ts
val input = generateSequence {
    readLine().takeIf { it != "exit" }
}
println(input.toList())
```

### Generating an infinite sequence

```ts
val numbers = generateSequence(0) { it + 1}
numbers.take(5).toList()

// to prevent integer overflow:
val numbers = generateSequence(BigInteger.ZERO) {
    it + BigInteger.ONE
}
```

#### How many times the phrase "Generating element..." will be printed?

```ts
val numbers = generateSequence(3) { n ->
  println("Generating element...")
  (n + 1).takeIf { it < 7 }
}
println(numbers.first())
```

- Answer: 0
  - We only ask for the first element
  - the first element of 3 is already given
- If you called `println(numbers.toList())`
  - then the answer is 4.

### yield

- Can generate elements in any convenient order
- Yield works lazily
- `yieldAll(list)` is an option

```ts
val numbers = sequence {
    var x = 0
    while(true) {
        yield(x++)
    }
}
numbers.take(5).toList() // [0, 1, 2, 3, 4]
```

#### How many times the phrases starting with yield will be printed?

```ts
fun mySequence() = buildSequence {
  println("yield one element")
  yield(1)
  println("yield a range")
  yieldAll(3..5)
  println("yield a list")
  yieldAll(listOf(7, 9))
}

println(mySequence()
  .map { it * it }
  .filter { it > 10 }
  .take(1))
```

- Answer: 0
  - No elements are yielded until the terminal operation (`mySequence()`) is called

### Library Functions

#### Write the name of the function that may replace the following call chain

```ts
people.filter { it.age < 21 }.size
```

- Answer: `count`

#### Write the name of the function that may replace the following call chain

```ts
people.sortedBy { it.age }.reversed()
```

- Answer: `sortedByDescending`

#### Write the name of the function that may replace the following call chain

```ts
people
  .map { person ->
    person.takeIf { it.isPublicProfile }?.name
  }
  .filterNotNull()
```

- Answer: `mapNotNull`

### mapNotNull

```ts
people.mapNotNull { it?.name }
```

#### Write the name of the function that may help to simplify the following code

```ts
if (person.age! in map) {
  map[person.age] = mutableListOf();
}
val group = map.getValue(person.age)
group += person;
```

- Answer: `getOrPut`

```ts
val group = map.getOrPut(person.age) { mutableListOf() }
group += person
```

#### Write the name of the function that may help to simplify the following code

```ts
val map = mutableMapOf<Int, MutableList<Person>>()
for (person in people) {
  if (person.age !in map) {
    map[person.age] = mutableListOf()
  }
  map.getValue(person.age) += person
}
```

- Answer: `groupBy`

#### Write the name of the function that performs groupBy for Sequences in a lazy way.

- Answer: `groupingBy`

#### Kotlin Playground: Fibonacci sequence

- Implement the function that builds a sequence of Fibonacci numbers using 'sequence' function. Use 'yield'.

```ts
fun fibonacci(): Sequence<Int> = sequence {
    var a = 0
    var b = 1

    yield(a) // Yield the first Fibonacci number
    yield(b) // Yield the second Fibonacci number

    while (true) {
        val next = a + b
        yield(next) // Yield the next Fibonacci number
        a = b
        b = next
    }
}

fun main(args: Array<String>) {
    println(fibonacci().take(4).toList().toString() == "[0, 1, 1, 2]") // should print true
    println(fibonacci().take(10).toList().toString() == "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]") // should print true
}

```

## Lambda with Receiver

### The `with` function

```ts
val sb = StringBuilder()
sb.appendln("Alphabet: ")
for(c in 'a'..'z'){
    sb.append(c)
}
sb.toString()
```

can be more efficient and rewritten as

```ts
val sb = StringBuilder()
with (sb) {
    appendln("Alphabet: ")
    for(c in 'a'..'z'){
        append(c)
    }
    toString()
}
```

- It is a lambda with an implicit `this`

#### What is the type of this?

```ts
val sb = StringBuilder()
with (sb) {
  this.appendln("Alphabet: ")
  for (c in 'a'..'z') {
    this.append(c)
  }
}
```

- Answer: `StringBuilder`

#### Complete buildString definition

```ts
inline fun buildString(
  builderAction: StringBuilder.() -> Unit
): String {
  val stringBuilder = StringBuilder()
  ...
  return stringBuilder.toString()
}
```

- Answer: `stringBuilder.builderAction()`

### More useful library functions

#### Find the implementation of the following function:

```ts
inline fun <T, R> T.run(block: T.() -> R): R
```

- Answer: `{ return this.block() }`

```ts
inline fun <T, R> T.let(block: (T) -> R): R
```

- Answer: `{ return block(this) }`

```ts
inline fun <T> T.apply(block: T.() -> Unit): T
```

- Answer: `{ this.block(); return this }`

```ts
inline fun <T> T.also(block: (T) -> Unit): T
```

- Answer: `{ block(this); return this }`

## Types

#### What will be printed?

```ts
println(arrayOf(1, 2) == arrayOf(1, 2));
```

- Answer: false

### Prefer Lists

- Use lists instead of arrays

### Kotlin type hierarchy

- `Unit`
- `Nothing`

### Unit instead of void

- Use `Unit` instead of `void`
  - No meaningful value is returned.
  - Thus, it is a type that allows only one value and thus can hold no information.
  - The function completes successfully

### Nothing

- `Nothing` means this function never returns, so it is different from Unit and void.
  - returns nothing and you could throw and Exception
  - Thus, it is a type that has no values
  - The function never completes

#### Which of the following expressions have Nothing type?

- Answer:
  - `throw IllegalStateException()`
  - `return`
  - `TODO("Needs to be done")`

#### Write the simplest expression of Nothing? type

- Answer: `null`

### Nullable Types

#### What happens while running the code below?

```ts
// Java
public class Session {
  public String getDescription() {
    return null;
  }
}
```

```ts
val session = Session()
val description = session.description
println(description.length)
```

- Answer: `NullPointerException is thrown`

#### What happens while running the code below?

```ts
// Java
public class Session {
  @Nullable
  String getDescription() {
    return null;
  }
}
```

```ts
val session = Session()
val description = session.description
println(description.length)
```

- Answer: `compilation error`
  - You cannot reference description which is a nullable String.
  - Need to do `description?.length`

#### What happens while running the code below?

```ts
// Java
public class Session {
  String getDescription() {
    return null;
  }
}
```

```ts
val session = Session()
val description: String? = session.description
println(description?.length)
```

- Answer: `null` is printed

#### What happens while running the code below?

```ts
// Java
public class Session {
  String getDescription() {
    return null;
  }
}
```

```ts
val session = Session()
val description: String = session.description
println(description.length)
```

- Answer: IllegalStateException is thrown
  - Thus, it is advantageous for debugging purposes to explicitly define types to see what caused errors.

### Collection Types

- read-only does not mean immutable

#### What happens when running the following code?

```ts
val mutableList = mutableListOf(1, 2, 3)  //#1
val list: List<Int> = mutableList         //#2
mutableList.add(4)                        //#3
println(list)                             //#4
```

- Answer: [1, 2, 3, 4] is printed
