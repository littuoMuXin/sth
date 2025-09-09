# 高级事件

订阅和触发事件想必都是家常便饭，在 JS 开发中，相信大家都用过 node.js 的 `events` 库吧，或至少是类似的。这里给大家介绍一个更为高级的事件托管服务，它能提供更详尽的时机、可用性、频率等的控制，以及诸如统一代理、上下文存储、溯源等增强功能。

## 开始

```sh
npm i datasense
```

首先，需要在 dependencies 中加入 DataSense 库（本文以 v1.2.0 为例）。然后，在代码中引入以下类型。

```typescript
import { EventController } from 'datasense';
```

随后，便可以创建一个或多个事件控制器，每个事件控制器均可管理多个事件服务，这些事件控制器可以依据需要绑定到对应的组件成员上，或者库的 `export` 对象上。创建事件控制器的方法非常简单，只需初始对应实例即可，如下。

```typescript
let events = new EventController();
```

如同大家熟知的 `on` 和 `emit` 一样，`EventController` 在监听和触发事件方面，也是非常简单。

```typescript
events.on("click", ev => {
  console.info("Clicked!", ev);
});
```

其中，成员方法 `on` 的第1个参数为事件名，是一个可根据业务随意自定义的字符串；而第2个参数自然就是一个回调啦。该方法会返回一个对象，包含 `dispose()` 方法，执行后即解除此事件注册。

```typescript
let evRegResult = events.on("click", ev => {
  console.info("Clicked!", ev);
});

// 当需要解除上述事件注册时，可以执行其销毁方法。
evRegResult.Dispose();
```

如果你需要触发其上的某个事件，直接 `fire` 即可，并传入该事件名和对应的参数。

```typescript
events.fire("click", { // ev
  // 这是一个对象，包含你想包含的内容。
  // 他们将作为前面一段代码中的 ev 参数。
});
```

就是这么简单！

当然，如果就只有这么简单，那我们为何还需要这样一个库？

## 监听

让我们一点点来看看它到底还有什么能耐吧，先从监听开始 。

如果我告诉你，它还有 `once` 用于一次性监听，那似乎也提不起你什么兴趣。如果我又告诉你，在成员方法 `on` 中，其实还大有乾坤，或许你还可以来了解一下，说不定会逐步打动你的内心。

试着在 `on` 的第2个参数，也就是那个回调中，给回调那个方法的入参，在加个参数（如下示例中的 `listenerController`）看看？

```typescript
events.on("click", (ev, listenerController) => {
  if (!listenerController) throw "没有这个参数！";
});
```

运行后发现，没有抛出异常，也就是说：原来这个参数是有值的！而且细看会发现，它是个对象，其内的属性和方法如下。

- `key` *(字符串)* 事件名。
- `originalKey` *(字符串)* 原始事件名。
- `count` *(整数)* 事件触发次数。
- `fireDate` *(时间)* 本次触发的时间。
- `latestFireDate` *(时间)* 上次触发的时间。
- `lastFireDate` *(时间)* 最后一次（含本次）触发的时间。
- `registerDate` *(时间)* 本事件的注册时间。
- `arg` *(不限定类型)* 额外的参数。
- `message` *(字符串)* 额外的消息。
- `source` *(字符串)* 自定义触发源。
- `additon` *(不限定类型)* 额外的信息。

另外还有几个方法，我们稍后再介绍。以上内容可能有一点多，有一些也比较类似，以及可能大家会疑惑这有什么用呢？我们来举个简单一点的例子吧：我们希望输出事件触发的具体时间，并在触发了 3 次后，取消订阅。这里可能会用到它里面的一个我还没提及的 `dispose()` 成员方法，这个方法可以销毁（去除）该注册的事件。

```typescript
events.on("click", (ev, listenerController) => {
  // 你可以通过参数 listenerController 访问本次事件相关的信息，
  // 例如，你可以获得本轮触发的时间。
  console.info(`Clicked at ${listenerController.fireDate.toLocaleTimeString()}!`, ev);

  // 这些信息当然不局限于 log 出来，也包括可以做一些正事。
  // 例如，执行3次后，我们就执行销毁操作，即去除该事件。
  if (listenerController.count > 3)
    listener.dispose();
});
```

## 回调选项

除了上述回调入参可以增加一些访问能力外，`on` 成员方法本身也支持不只这 2 个参数，它的完整参数列表如下。

0. `key` *(字符串)* 事件名。
1. `h` *(函数)* 回调。
2. `thisArg` *(对象)* 回调所需绑定的 `this`。
3. `options` *(对象)* 选项。
4. `disposableArray` *(对象)* 需要绑定的销毁列表对象，值需要是此库的 `DisposableArray` 对象。

其中，`thisArg` 很好理解，大家在许多地方都有用过，关键是那个 `options`（选项）是个什么。其实，这个主要是用于控制本次注册的事件，需要在什么场合下才生效，以及执行的时机点是什么，因为有些时候，我们可能会有如下要求。

- 需要一个事件只执行某些指定次数，当然也可以用前例来实现，但这里有更解耦、更简单、更清晰的方法。
- 事件触发的预期时间并不是事件抛出的时候，可能需要延迟，更有甚者，还需要考虑去抖或截流。

而这个参数就是为了满足这些需求的。其类型为对象，具体属性如下，全部为选填。

- `invalid` *(整数 \| 布尔值 \| 函数)* 当为数字时，可以设定执行多少次后本次注册的事件即失效（解除事件）；当为布尔值时，表明是否当下立即失效；当为函数时，入参会是事件的参数 `ev`，并期待一个布尔值的返回值，用于描述是否随即失效。
- `invalidForNextTime` *(布尔值)* 当为 `true` 时，本次触发仍然会被执行，但随后即失效（接触事件）；否则为 `false` 或空，默认值。
- `arg` *(不限定类型)* 需要每次执行时额外传入的参数。
- `delay` *(整数 \| 布尔值)* 用于设定事件执行的延迟。如果为数字，则为延迟执行的毫秒数；如果为 `true`，则为当前线程内容执行完后便即刻执行；如果为 `false` 或为空，则为立即执行。
- `mergeMode` *(字符串枚举)*，当多次触发时，可以限定以一定规则进行合并或跳过处理，值仅限 `debounce`（去抖）、`mono`（限流）和 `none`（每次都会执行）中的一个，或为空（相当于 `none`）。
- `span` *(整数)* 设定一个毫秒数，如果两次执行间隔超出该值，则重置状态，即后续的执行不再因 `mergeMode` 设定而受上一次执行的影响，并重新开始记录并触发 `mergeMode`，除非再下一次的执行间隔又超过了该值。
- `minCount` *(整数)* 在上述 `span` 建个内，所需达到的最小执行次数限制，如果没超过该值，则不会触发事件的执行。
- `maxCount` *(整数)* 类似 `minCount`，但限制的是最大执行次数，即超过后不再执行。

简单看来，前2个属性用于限定事件何时失效（自动解除绑定），后5个属性用于限定是否要延迟、去抖、截流等。我们来举几个例子吧，先看一个限定执行次数的，以下示例和前面那个示例（只执行3次即销毁）是等效的。

```typescript
events.on("click", (ev, listenerController) => {
  console.info(`Clicked at ${listenerController.fireDate.toLocaleTimeString()}!`, ev);
}, null, {
  invalid: 3  // 执行3次后即本次注册的事件回调失效（取消绑定）。
});
```

再来一个示例，如下，我们限定某一事件会在等待 0.5s 后执行，如果期间又触发了执行，则抛弃上一次的执行，并重置等待。此场景很常见吧？没错，搜索框里的去抖！

```typescript
events.on("click", (ev, listenerController) => {
  // 执行某操作。
}, null, {
  delay: 500,  // 延迟 500ms。
  mergeMode: "debounce"  // 只会响应延迟期间最后一次触发。
});
```

都说了去抖，那截流呢？

```typescript
events.on("click", (ev, listenerController) => {
  // 执行某操作。
}, null, {
  span: 30000,  // 30s 后重置，即本选项设定的有效期为 30s。
  maxCount: 1 // 有效期内只能触发 1 次。
});
```

再演示一下模拟双击操作吧：通过在一个较短的有效期（由 `span` 指定）设定 `minCount` 和 `maxCount` 都为 `2` 的方式，限定事件（通常为点击事件）被触发 2 次才执行，从而模拟了双击。暴击其实也是类似，只是最小值会设定的比较高，最大值可能不设。

```typescript
events.on("click", (ev, listenerController) => {
  // 执行某操作。
}, null, {
  span: 300,  // 0.3s 为有效期，过了有效期重新计算。
  minCount: 2,  // 有效期内需至少触发 2 次才执行。
  maxCount: 2  // 有效期内触发超过 2 次时不再执行。
});
```

## 上下文临时存储

有时候，我们在注册的事件回调里，会需要临时存储一些数据，这些数据可能会在后续触发时读取甚至修改。通常，我们可以设定一个外部对象，然后将这些数据存储在这些对象上。这个场景可能非常的业务化，但好消息是，在这个事件控制器里，特别针对此做了支持，使得你可以存储许多这样的变量，并分别给定一个名称，随后即可在任意时候读取它们的最新值，或是进行修改或删除，而且用起来非常简单，如下示例。

```typescript
events.on("click", (ev, listenerController) => {
  // 假设我们需要读取一个被命名为 latestValue 的变量。
  // 读取前，如果需要，也可以先判断是否有。如果没有，直接获取会返回 undefined。
  if (listenerController.hasStoreData("latestValue"))
    console.info("Latest event argument.", listenerController.getStoreData("latestValue"));

  // 可以在任意时候进行变量的存储，下次即刻读取到。
  listenerController.setStoreData("latestValue", ev);

  // 也可以删除。
  listenerController.removeStoreData("latestValue");
});
```

当然，这些内容不会和其它事件进行共享。

## 触发

以上都是如何注册事件，但注册的事件需要有人触发才会被执行啊，因此我们再来看看事件都是如何触发的。哦，对，前面已经介绍过了，调用 `fire` 成员方法，所以我们这里主要是介绍一些额外的功能。可能你已经想到了，肯定是这个方法除了事件名和事件参数 ev 以外，还有别的参数嘛。对的！具体如下。

0. `key` *(字符串)* 事件名。
1. `ev` *(字符串)* 事件传入参数。
2. `message` *(字符串 \| 对象)* 当为字符串时，表示消息，该消息会作为 `on` 方法里回调第 2 个入参的 `message` 属性（即前述示例中的 `listenerController.message`）返回；当为对象时，此参数表示选项。
3. `delay` *(整数 \| 布尔值)* 用于设定事件触发的延迟。和监听选项里的延迟不同的是，监听选项的延迟适用于事件触发后延迟执行，而此处用于设定何时触发，即如果两者皆设置，则会出现延迟叠加现象。如果为数字，则为延迟执行的毫秒数；如果为 `true`，则为当前线程内容执行完后便即刻执行；如果为 `false` 或为空，则为立即执行。

其中，当参数 `message` 为对象时，如上所属，即为触发选项，其属性如下，皆为选填。

- `message` *(字符串)* 额外的消息，将传递至 `listenerController.message` 以供回调读取。
- `source` *(字符串)* 自定义触发源，可用于表达该事件触发是由哪方面引起的，例如是用户交互事件还是编程事件等等，可自定义具体值，将传递至 `listenerController.source` 以供回调读取。
- `addition` *(不限定类型)* 额外的信息，用于存放可能需要的更多数据内容，将传递至 `listenerController.addition` 以供回调读取。

如下示例，延迟 0.2s 后触发 click 事件，并包含一些附加信息。

```typescript
events.fire("click", { // ev
  // 这是一个对象，包含你想包含的内容。
  // 他们将作为前面一段代码中的 ev 参数。
}, {
  source: "somewhere",
  message: "Hello!",
  addition: {
    name: "abc",
    value: "defg"
  }
}, 200);
```

## 监听者模式

有的时候，我们可能希望某些事件的触发是掌握在触发源处，而不希望暴露给需要监听的地方，因为监听者只需监听，这也就意味着，我们不希望将完整的 `EventController` 实例暴露出来。那么，这可怎么办呢？简单！如下。

```typescript
let eventObs = events.createObservable();
```

这么一来，`eventObs` 对象只含注册事件能力，而无事件触发能力（即无 `fire` 等方法）。

甚至不光如此，这样生成的对象，还拥有一项非常有利于模块化管理的好处，那就是：通过调用其 `dispose()` 成员方法，可以随时销毁它，销毁后，通过该对象注册的所有事件也会被一并销毁。而此对象的销毁，并不会导致原始的事件控制器整体无效。此项特性非常有助于，在具有生命周期管理的组件内，对所有依赖注册的事件，进行简单有效的统一管理。

有时使用者有自己的规范，这些规范中，事件名（`key` 值）可能与目标事件名不一样，这也没关系，可以通过 `createMappedObservable(mapKey)` 成员方法，来创建一个具有事件名映射的注册机。

另外，还可以针对单一事件（即指定的 `key`）生成只读的注册机。

```typescript
let clickEventObs = events.createSingleObservable("click");
```

需要留意的是，其对应的 `on` 方法，没有第一个参数 `key`，因为一定是 `click`（示例）。如果希望创建的单一事件托管服务，并不只是包含事件注册，也希望包含触发，那么可以调用 `createSingle(key)` 成员方法实现。

## 订阅

另外，如果你熟悉观察者模式里的订阅，也可以采用标准订阅的方式，来获取事件，而不是通过注册。

```typescript
events.subscribeSingle("click", ev => {
  // 执行你希望执行的操作。
});
```

对于只含事件注册能力的实例，也是支持的。

```typescript
eventObs.subscribeSingle("click", ev => {
  // 执行你希望执行的操作。
});
```

对于单一事件注册机，也是类似，但方法名和参数列表略有不同。

```typescript
clickEventObs.subscribe(ev => {
  // 执行你希望执行的操作。
});
```

所有通过订阅返回的对象，都支持通过 `dispose()` 方法，来取消订阅。并且，如同大多数方法，订阅方法后面也支持再增加一个 `thisArg` 参数，来指定回调的 `this` 绑定。

## 与 DOM 集成

这些功能，想在 DOM 事件中使用？没关系，可以使用类似如下的辅助方法搞定！

```typescript
let element = document.getByElement("#someone");
let obs = EventObservable.createForElement(element, "click");
obs.on(ev => {
    // Do something.
});
```

怎么样，是不是很方便？

<!-- End -->
---

Kingcean Tuan ([@kingcean](https://github.com/kingcean))

March 1st, [2021 AD](../../). 

Keywords:
js; event; dataflow; task; observable; message.

**See also**

- [Wiki of the events](https://github.com/compositejs/datasense/wiki/event)

(cc) Kingcean Tuan, 2021.
