# 通用双向绑定库

双向绑定在部分流行的前端框架中大行其道、大放光彩、大用特用；而在另一些前端框架中，单向数据流可能更为推荐。或许，这两者也能很好的结合；又或许，总线模式或其它数据流才是更好的选择。

但我们今天还是来谈谈双向绑定相关的库吧。假设我们需要一个双向绑定库，与框架无关的双向绑定前端库，有什么推荐呢？

## 开始

```sh
npm i datasense
```

首先，需要在 dependencies 中加入 DataSense 库（本文以 v1.2.0 为例）。然后，在代码中引入以下类型。

```typescript
import { PropsController } from 'datasense';
```

这是一个统一管理观察者模式模型的类，如下初始化成对象后，即可用于管理相关的数据。

```typescript
let props = new PropsController();
```

这样，我们创建了一个双向绑定集成控制器，里面可以绑定一组具备观察者模式的变量。这个控制器，可以依据需要绑定到对应的组件成员上，或者作为模块的私有变量，或者作为库的 `export` 对象，将集成的一组模型在内部或外部进行提供出来，供业务层访问。

通过这个对象绑定的所有观察者模型（model），这些模型通过分别设定 key 进行管理，就像属性那样，包括读取、写入和监听变化等。以下为了方便，将这些观察者模型称为绑在该控制器上的属性，而 key 在此即称为属性名。

```typescript
// 检查是不是已经存在一个特定的属性。
// 此示例检查是否有一个名为 name 的属性。
console.info(`There ${props.hasProp("name") ? "isn't" : "is"} a name here.`);

// 设置属性。如果已经存在了，则会添加；否则执行添加。
// 此示例分别设置名为 name 和 gender 的属性。
props.setProp("name", "Kingcean");
props.setProp("gender", "male");

// 读取属性值。
// 此示例将名为 name 的属性值读取，并 log 出来。
console.info(props.getProp("name"));
```

以上只是基本的值的读写和检查。那么对变化的监听呢？其实很简单啦，如下。

```typescript
props.onPropChanged("name", ev => {
    console.info(ev.value); // 获取新改动的值。
});
```

其中，第1个参数为属性名；第2个参数是个回调，在这个回调里，入参 `ev` 是个对象，包含以下信息。

- `key` *(字符串)* 属性名。 
- `action` *(字符串枚举)* 变更实际动作，为 `add`（新增）、`remove`（删除）、`update`（替换）、`delta`（成员修改）、`none`（无变化）、`invalid`（操作失败)、`unknown`（未知）之一。
- `success` *(布尔值)* 修改是否成功。
- `value` *(字符串)* 修改后的值。
- `oldValue` *(字符串)* 修改前的值。
- `valueRequest` *(字符串)* 原本计划修改成的值。
- `error` *(不限定类型)* 出错信息。

因此可以看出，在注册的事件中，其实可以获得很多相关信息。

另外，细看一下这个成员方法名，叫做 `onPropChanged`，后面那个词用了完成式，即表示已变化，那么是不是还有个 `onPropChaning` 表示即将变化呢？嗯，还真有。其实不光如此，还有 `onPropChangeFailed`，用于修改失败的情形。什么，还有修改失败？后面会有介绍。总之，这3个成员方法，它们接受的参数和返回值都是类似的，只是时序和场景不同。

1. `onPropChanging`。
2. 属性实际变化。
3. `onPropChanged`（如果成功）或 `onPropChangeFailed`（如果失败）。

它们的返回值包含了一个 `dispose` 成员方法，无输入参数，若执行，则会销毁（取消）此事件注册。

也许你其实想要的只是一个订阅，这个事件注册的机制似乎也能行，但你就是想要订阅。好吧，那就订阅吧，订阅也支持，如下，非常简单，也很熟悉。

```typescript
props.subscribeProp("name", newValue => {
    console.info(newValue); // 获取新改动的值。
});
```

除此之外，你还可以通过调用 `getKeys()` 成员方法，获取所有已包含的属性名；以及可以通过调用 `forceUpdateProp(key)` 成员方法，来强制通知属性更新。

## 批量操作

如果需要设置一批属性，可以通过批量赋值的方式完成。

```typescript
// 批量设置属性。如果包含已经存在的，则会执行覆盖。
// 此示例分别设置名为 name 和 gender 的属性。
props.setProps({
    name: "Lily",
    gender: "female"
});
```

同样，注册变更事件也支持批量。当发生属性值变更，或者上述批量属性变更时，除了对应的事件会逐条被触发，如果注册有批量事件，那么也会被触发。

```typescript
props.onPropsChanged(ev => {
  for (let changeInfo in ev.changes) {
    console.info(changeInfo.key);
  }
});
```

该方法的名称与单条属性的值变更事件注册方法很类似，但需要注意其内名词为复数，且入参无属性名传入，且入参传入的回调函数中，其入参 `ev` 类型也不一样。该事件的触发规则如下。

- 当执行了单条属性赋值操作，该属性对应的值变更事件，以及本事件，均会被触发，但此事件回调入参信息里，其 `ev.changes` 属性（格式为数组）仅包含1条内容。
- 当执行了批量赋值操作，相关属性对应的值变更事件会逐条触发，本事件亦会触发，且此事件回调入参信息里，其 `ev.changes` 属性（格式为数组）会包含所有受影响的属性变更信息。

同样，订阅也支持批量订阅，如下。

```typescript
props.subscribeProps(ev => {
  for (let changeInfo in ev) {
    console.info(changeInfo.key);
  }
});
```

其回调入参为数组，与批量变更的注册回调里的 `ev.changes` 属性一致。

另外，还支持泛属性变更事件注册功能，对应有 `onAnyPropChanged` 成员方法、`onAnyPropChanging` 成员方法和 `onAnyPropChangeFailed` 成员方法，它们都不传入属性名，而回调的入参与 `onPropChanged` 的一致。

## 高级赋值

看完上述，或许你不禁要问，除了多提供几种模式，就这些？

不。

再来介绍一些更人性化、更丰富多彩、更有趣的一些值设定操作。

先来一组辅助方法吧。

- `Promise` 支持：如果需要 set 的属性，源自一个 `Promise` 的结果（例如通过 `fetch` API 获得），正常情况下，可以在 `then` 的回调里去触发 `setProp` 方法，但其实，还有更简单的方法，即直接调用 `setPromiseProp` 并传入属性名和该 `Promise` 对象即可。
- 订阅者支持：如果是一个来自 RxJs 的 `Observable` 对象或其它类似观察者模型，原本可通过其 `subscribe` 方法订阅其通知的，亦可用更简单的方式更新其内容，具体为，通过调用 `setSubscribeProp` 成员方法并传入属性名和该 `Observable` 或其它类似对象即可。
- 删除：可直接通过调用 `removeProp` 成员方法并传入属性名来执行。

通常，`setProp` 仅返回成功或失败，如果希望获得更多设置相关的细节，可以调用 `setPropForDetails` 成员方法，即可通过返回值获得变更状态，如同 `onPropChanged` 里的参数 `ev`。

说到 `onPropChanged`，不知大家是否还记得前面提到过，有可能更新失败？那么这个失败是怎么回事呢，这里我们来看看吧。其实，这个失败并不是指因为这个库的实现有问题导致的失败，而是因为允许对这些属性设定一个规格化和校验的附加函数，来对输入值进行约束。

- 规格化，是通过设置其属性 `formatter`，传入一个函数，接受属性名 `key` 和新值 `value`，并返回最终设置值（如无需改变则直接返回原 `value`）。
- 校验，是通过设置其属性 `validator`，传入一个函数，接受属性名 `key` 和新值 `value`，并返回布尔值，告知是否成功，如果否则会导致更新失败。

这样一来，我们可以在属性赋值层面，对结果进行统一把控，从而确保最终送到订阅者面前的最新结果，都是符合业务需求规范的。

在规范化赋值的道路上，不光有约束，还有自动化流程支持。例如，有个属性是整数，我们如果经常会对它进行自增操作，我们只能如下进行。

```typescript
let i = props.getProp("index");
props.setProp("index", i++);
```

如果这段代码在业务中，被大量用到，那么其实可以将其抽离出来复用，这样带来的另一个好处是，这也隐藏了许多内部实现细节。

```typescript
props.registerRequestHandler("increase", (acc, data) => {
  let i = props.getProp("index") || 0;
  if (typeof data === "undefined" || data === null) i++;
  else if (typeof data === "number") i += data;
  props.setProp("index", i);
});
```

这里的 `registerRequestHandler` 成员方法即是用来封装自动化流程的，其第1个参数为自动化流程名，第2个参数具体的执行函数，该函数的第1个入参为当前控制器的精简访问器，第2个参数为调用方实际传入的参数。

调用方可通过调用 `sendRequest` 成员方法，并传入自动化路程名和参数的方式，来使用。

```typescript
props.sendRequest("increase");
console.info(props.getProp("index")); // -> 1

props.sendRequest("increase", 9);
console.info(props.getProp("index")); // -> 10
```

## 访问代理

以上包含了读写属性的大多数操作，这些操作大多通过其成员方法执行。有时，为了简便，如果某处只需对其属性进行读写操作，也可以使用其代理，位于 `proxy` 只读属性中，这样便可以更为直观的访问了。

```typescript
let model = props.proxy;
model.name = "Lily";
console.info(`You will see Lily here - ${props.getProp("name")}.`)
```

对这个代理的属性直接赋值操作，都会反映到原模型，并触发该模型中已绑定的监听事件。

当然，如果你只是希望生成一个模型的副本，而不希望与原模型有绑定关系，那么调用其 `copyModel()` 采用方法即可。

```typescript
let modelCopy = props.copyModel();
modelCopy.name = "Kingcean";
console.info(`You will still see Lily here - ${props.getProp("name")}.`)
```

另外，还提供 `toJSON()` 成员方法，用于获得原始数据的 JSON 格式（序列化后的字符串）。

## 高级事件与观察者模式

如果你了解 DataSense 库里的事件（Events）托管相关功能，那么你应该清楚其中的 `on` 和 `fire` 等方法里的一些高级功能，这些能力在这里，也很大程度上都支持。例如，`onPropChanged` 等监听方法，其回调函数的入参列表中，除了第1个参数 `ev` 外，也支持第2个参数 `listenerController`，同时，该回调后面也支持传入参数 `thisArg`（用于指定回调所需绑定的 `this`）和 `options`（事件注册选项）。如下示例。

```typescript
props.onPropChanged("index", (ev, listenerController) => {
  // 你可以通过参数 listenerController 访问本次事件相关的信息，
  // 例如，你可以获得本轮触发的时间，和总的触发次数。
  let raiseCount = listenerController.count;
  let fireDateStr = listenerController.fireDate.toLocaleTimeString();
  console.info(`新值是${ev.value}，旧值是${ev.oldValue}，共被改过${raiseCount}次，本次修改时间为${fireDateStr}。`, ev);
}, null, {
  invalid: 3  // 执行3次后即本次注册的事件回调失效（取消绑定）。
});
```

在回调里的第2个参数 `listenerController` 里也可以获得触发变更时传入的额外信息，这些额外信息可以通过在调用 `setProp` 等系列方法带入，如下示例。

```typescript
props.setProp("name", "Kingcean", {
  source: "somewhere",
  message: "Just update name."
})
```

具体可参考*[高级事件](../events)*。

另外，如果需要仅将双向绑定集成控制器的观察者模型分发给业务方，而不希望包含设置属性的能力（但通过自动化流程来控制的除外），则可以创建一个观察者模型。

```typescript
let obs = props.createObservable();
```

该模型允许通过调用其成员方法 `dispose()` 进行销毁。销毁时，通过该对象注册的事件和订阅的回调，均会一并被销毁（取消），但通过其它地方注册的不会受此影响。此项特性非常有助于，在具有生命周期管理的组件内，对所有依赖注册的事件，进行简单有效的统一管理。但如果希望创建的这个对象，既希望拥有隔离的事件和回调的管理能力，又需要也有对属性直接赋值能力的，那么可以通过如下方式创建。

```typescript
let client = props.createClient();
```

……

## 单一模型

如果需要只针对其中一个属性创建单独的访问模型（即该模型的读写和监听只针对该属性），可以通过类似如下方式创建。对该对象的赋值操作会影响到原属性。

```typescript
// 创建原名为 name 的属性对应的对象模型。
let nameProp = props.createPropClient("name");
```

对应的观察者模式如下。

```typescript
let nameObs = props.createPropObservable("name");
```

或者也可以通过方式创建。

```typescript
let nameObs = nameProp.createObservable();
```

以上创建的对象，其对应的读取和注册等方法，均无需填入属性名，且这些方法的名称可能会略有不同，通常无 `Prop` 字样。

另外，其实不光可以通过 `PropsController` 对象，通过其中属性来创建，其实，还可以之间创建一个新的。首先，需要引入以下类型。

```typescript
import { ValueController } from 'datasense';
```

然后直接创建实例即可。

```typescript
let valueController = new ValueController();
```

其对应的观察者模式创建方式如下。

```typescript
let valueObs = nameProp.createObservable();
```

其具体功能和形态与上述单一属性的类似。

另外，关于单一模式下，如果希望将其值，绑定至另一个观察者模型，可以通过类似以下方法。一次只能绑定绑定一个。绑定后，对当前控制器进行值的设置，其影响范围如下。

- 当前值被成功改变；
- 监听的那个观察者模型不受影响；
- 当监听的那个观察者对象的值被改动，或者你像如下所示去强制同步，则会再次用监听的那个观察者模型的最新的值去覆盖当前的值。

```typescript
valueObs.observe(nameProp);
```

以上是单向数据绑定，如果你想在两个控制器间创建双向数据绑定，可以让它们相互监听对方。

```typescript
nameProp.observe(valueObs);
```

如果需要停止对该观察者的订阅同步，可以通过类似以下方式结束。

```typescript
valueObs.stopObserving();
```

可以通过 `isObserving()` 成员方法获取当下是否正在订阅同步中。

<!-- End -->
---

Kingcean Tuan ([@kingcean](https://github.com/kingcean))

March 3rd, [2021 AD](../../). 

Keywords:
js; observable; dataflow; object; prop; subscrption.

**See also**

- [Wiki of the observable value](https://github.com/compositejs/datasense/wiki/props)

(cc) Kingcean Tuan, 2021.
