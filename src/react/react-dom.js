const render = (vnode, container) => {
  // 在每次重新执行时清空render
  container.innerHTML = "";

  renderContainer(vnode, container);
};

// 当前的根节点
let currentRoot = null;
// 收集要删除的fiber
let deletions = null
const renderContainer = (vnode, container) => {
  wipRoot = {
    stateNode: container,
    props: { children: vnode },
  };
  nextUnitOfWork = wipRoot;
  deletions = []
};
/**
 * todo 将vnode转换为node
 * @param {*} vnode
 * @returns 返回处理后的真实dom
 */
function createNode(workInProgress) {
  let node = null;
  const { type, props } = workInProgress;
  // type为string则代表是一个原生节点
  if (typeof type === "string") {
    // 创建并处理原生标签
    node = document.createElement(type);
  }
  updateNode(node, {}, props);

  return node;
}

/**
 * todo 原生标签处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateHostComponent = (workInProgress) => {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }
  // 边界判断：没有children的元素不进行children处理比如<input/> <div></div>
  // console.log(workInProgress);
  if (workInProgress.props.children) {
    reconcileChildren(workInProgress, workInProgress.props.children);
  }
  // console.log('workInProgress', workInProgress);
};

/**
 * todo Fragment的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const createFragmentComponent = (vnode) => {
  let node = document.createDocumentFragment();
  const { props } = vnode;
  // 在jsx中使用map等循环返回的vnode是一个数组  需要特殊处理
  if (Array.isArray(vnode)) {
    vnode.forEach((child) => {
      renderContainer(child, node);
      // node.appendChild(childNode);
    });
  } else {
    // console.log(vnode);
    reconcileChildren(props.children, node);
  }
  return node;
};
/**
 * todo 类数组建的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateClassComponent = (workInProgress) => {
  const { type, props } = workInProgress;
  const instance = new type(props);
  const children = instance.render();
  reconcileChildren(workInProgress, children);
};
/**
 * todo 函数组建的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateFunctionComponent = (workInProgress) => {
  // hook开始的地方
  // 当前工作fiber赋值，因为hooks函数只可以用在函数组件中所以在这里赋值即可
  wipFiber = workInProgress;
  // 保存hooks的初始化
  wipFiber.hooks = [];
  // 当前工作的hook下标初始化赋值
  wipFiber.hookIndex = 0;
  const { type, props } = workInProgress;
  // 当是一个函数组件时  type就是这个函数组件本身
  // 执行函数，将props传入 得到的时函数执行后的vnode
  const children = type(props);
  // 使用reconcileChildren构建filber
  reconcileChildren(workInProgress, children);
};

/**
 * todo 处理元素上的属性
 * @param {*} node
 * @param {*} nextVal vnode的props
 */
const updateNode = (node, preVal, nextVal) => {

  Object.keys(preVal).forEach((k) => {
    if (k === "children") {
      if (
        typeof nextVal.children === "string" ||
        typeof nextVal.children === "number"
      ) {
        node.innerHTML = ''
      }
    } else {
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, preVal[k]);
      } else {
        if(!(k in nextVal)) {
          node[k] = ''
        }
      }
    }
  });
  // if(node) return;
  // console.log('node, nextVal', node, nextVal);
  // 过滤children之后将属性添加到dom上 // todo 这里只处理了作为属性的情况  没有处理类似style的东西
  Object.keys(nextVal).forEach((k) => {
    if (k === "children") {
      if (
        typeof nextVal.children === "string" ||
        typeof nextVal.children === "number"
      ) {
        // console.log(node, nextVal);
        node.innerHTML = nextVal.children
        // const textNode = document.createTextNode(nextVal.children);
        // node.appendChild(textNode);
      }
    } else {
      // todo 事件处理源码中是使用事件委托   在react17以前是委托于document，在react17之后委托于container（就是reactDom.render传入的第二个参数）
      if (k.slice(0, 2) === "on") {
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    }
  });
};

/**
 * todo children处理非string的情况
 * @param {*} children 节点的children
 * @param {*} node 节点
 */
const reconcileChildren = (workInProgress, children) => {
  if (
    !(workInProgress.props && typeof workInProgress.props.children !== "string")
  ) {
    return;
  }
  // console.log('children', children);
  // children不为string时有两种情况
  // 1.对象 一个元素的jsx对象
  // 2.数组  一个满是jsx对象的数组
  // 将children同意改成数组方便操作
  let newChildren = Array.isArray(children) ? children : [children];
  // 用一个变量来记录每一个遍历时的上一个fiber
  let previousNewFiber = null;

  // 在更新过程中就会存在 第一个老的子节点
  let oldFiber = workInProgress.base?.child;

  newChildren.forEach((child, index) => {
    // 创建fiber
    let newFiber = null;

    // 判断是否可以复用
    const same = child && oldFiber && child.type === oldFiber.type;
    if (same) {
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        sibling: null,
        return: workInProgress, // 父节点九点传入的workInProgress
        stateNode: oldFiber.stateNode,
        base: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (!same && child) {
      // 新增插入
      newFiber = {
        type: child.type,
        props: child.props,
        child: null,
        sibling: null,
        return: workInProgress, // 父节点九点传入的workInProgress
        stateNode: null,
        base: null,
        effectTag: "PLACEMENT",
      };
    }
    if (!same && oldFiber) {

      // todo 删除
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
    // newFiber = {
    //   type: child.type,
    //   props: child.props,
    //   child: null,
    //   sibling: null,
    //   return: workInProgress, // 父节点九点传入的workInProgress
    //   stateNode: null,
    //   base: null,
    // };
    // 在第一次时  当前newFiber就是当前节点的child
    if (oldFiber?.sibling) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      workInProgress.child = newFiber;
    } else {
      // 后续进入时previousNewFiber就赋予了值 可以将本次的fiber挂在上一次fiber的sibling上
      previousNewFiber.sibling = newFiber;
    }
    // previousNewFiber重新赋值
    previousNewFiber = newFiber;
  });
};
// fiber结构
// child 第一个子节点
// sibling 下一个兄弟节点
// return 父节点
// stateNone dom节点
// base 上一次的fiber  新老需要对比

function performUnitOfWork(workInProgress) {
  // 执行fiber
  const { type } = workInProgress;
  // 处理函数组件与类组件
  if (typeof type === "function") {
    type?.prototype?.isReactComponent
      ? updateClassComponent(workInProgress)
      : updateFunctionComponent(workInProgress);
  } else {
    updateHostComponent(workInProgress);
  }

  // 返回下一个fiber
  // 深度优先  先找child
  if (workInProgress.child) {
    return workInProgress.child;
  }
  // 没有父节点则寻找下一个兄弟节点
  let nextFiber = workInProgress;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 如果没有（表示此节点的兄弟节点以处理完毕）则继续向父节点寻找父节点的下一个兄弟节点
    nextFiber = nextFiber.return;
  }
  return null;
}

// 下一个fiber任务
let nextUnitOfWork = null;
// 容器根
let wipRoot = null;
function workLoop(IdleDeadline) {
  // console.log(IdleDeadline.timeRemaining(), wipRoot, nextUnitOfWork);
  // console.log(IdleDeadline);
  // 获取浏览器在这一帧还有多少空闲时间
  while (IdleDeadline.timeRemaining() > 1 && nextUnitOfWork) {
    // 执行fiber 返回下一个fiber
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // console.log("nextUnitOfWorknextUnitOfWorknextUnitOfWork", nextUnitOfWork);

    // commit
    commitRoot();
  } else {
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  deletions.forEach(commitWorker)
  commitWorker(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWorker(workInProgress) {
  // console.log('workInProgress', workInProgress);
  if (!workInProgress) {
    return;
  }
  let parentNodeFiber = workInProgress.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  const parentNode = parentNodeFiber.stateNode;
  // 提交自己
  if (workInProgress.stateNode && workInProgress.effectTag === "PLACEMENT") {
    parentNode.appendChild(workInProgress.stateNode);
  } else if (
    workInProgress.stateNode &&
    workInProgress.effectTag === "UPDATE"
  ) {
    // console.log(
    //   "workInProgress.stateNode, workInProgress.props",
    //   workInProgress.stateNode,
    //   workInProgress.props
    // );
    updateNode(
      workInProgress.stateNode,
      workInProgress.base.props,
      workInProgress.props
    );
  }else if (
    workInProgress.stateNode &&
    workInProgress.effectTag === "DELETION"
  ) {
    commitDeletion(workInProgress, parentNode)
  }
  // 提交子节点
  commitWorker(workInProgress.child);
  // 提交下一个兄弟节点
  commitWorker(workInProgress.sibling);
}
function commitDeletion(workInProgress, parentNode){
  if(workInProgress.stateNode){
    parentNode.removeChild(workInProgress.stateNode)
  }else {
    commitDeletion(workInProgress.child, parentNode)
  }
}

requestIdleCallback(workLoop);

// 正在工作的fiber
let wipFiber = null;
// hooks:{
// state 储存状态
// 更新队列
// }

export function useState(init) {
  // 一个函数组件可以有多个hooks，hookIndex是当前工作的hook下标指向  拿到老的hook
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex];
  // 判断是否存在  如果不存在则是初始化，存在则是更新
  const hook = oldHook
    ? {
        state: oldHook.state,
        queue: oldHook.queue,
      }
    : { state: init, queue: [] };
  hook.queue.forEach((action) => {
    // 源码中是批量更新，setState合并
    hook.state = action;
  });
  console.log("state", hook);

  const setInit = (newState) => {
    init = newState;
    hook.queue.push(newState);
    wipRoot = {
      // stateNode: currentRoot.stateNode
      ...currentRoot,
      base: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = []
  };
  wipFiber.hooks.push(hook);
  wipFiber.hookIndex++;
  return [hook.state, setInit];
}

const ReactDom = {
  render,
};
export default ReactDom;
