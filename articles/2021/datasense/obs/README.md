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

// 批量设置属性。如果包含已经存在的，则会执行覆盖。
// 此示例分别设置名为 name 和 gender 的属性。
props.setProps({
    name: "Lily",
    gender: "female"
});

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

另外，还有批量属性变更事件注册 `onPropsChanged`，以及泛属性变更事件注册 `onAnyPropChanged`、`onAnyPropChanging` 和 `onAnyPropChangeFailed`。

也许你其实想要的只是一个订阅，这个事件注册的机制似乎也能行，但你就是想要订阅。好吧，那就订阅吧，订阅也支持，如下，非常简单，也很熟悉。

```typescript
props.subscribeProp("name", newValue => {
    console.info(newValue); // 获取新改动的值。
});
```

## 高级写操作

看完上述，或许你不禁要问，除了多提供几种模式，就这些？

不。再来介绍一些更人性化、更丰富多彩、更有趣的一些值设定操作。

- `Promise` 支持。
- 订阅者支持。
- 获取详细的设置结果。
- 自动化流程。

……

## 访问代理

## 高级事件与观察者模式

## 单一模型

---

Kingcean Tuan ([@kingcean](https://github.com/kingcean))

March 10th, [2021 AD](../../). 

Keywords:
js; observable; dataflow; object; prop; subscrption.

**See also**

- [Wiki of the observable props](https://github.com/compositejs/datasense/wiki/props)
- [Wiki of the observable value](https://github.com/compositejs/datasense/wiki/props)

(cc) Kingcean Tuan, 2021.
