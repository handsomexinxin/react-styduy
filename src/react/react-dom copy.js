const render = (vnode, container) => {
  // 在每次重新执行时清空render
  container.innerHTML = ''
  renderContainer(vnode, container)
};
const renderContainer = (vnode, container) => {
  // 将vnode变为node
  // 将vonode =》 node
  console.log(vnode);
  const node = createNode(vnode);
  // node挂载
  console.log(node);
  // 将转换后的node挂载到传入的容器中
  container.appendChild(node);
};
/**
 * todo 将vnode转换为node
 * @param {*} vnode 
 * @returns 返回处理后的真实dom
 */
function createNode(vnode) {
  let node = null;
  const { type } = vnode;
  // type为string则代表是一个原生节点
  if (typeof type === "string") {
    // 创建并处理原生标签
    node = updateHostComponent(vnode);
    // 函数组建的处理情况
  } else if (typeof type === "function") {
    // isReactComponent是用来标记是否是类组件的属性
    // 因为函数组件的prototype是null所以需要多判断一下
    node = type?.prototype?.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  }else{
    node = createFragmentComponent(vnode)
  }

  return node;
}
/**
 * todo Fragment的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
 const createFragmentComponent = (vnode) =>{
  let node = document.createDocumentFragment()
  const { props } = vnode;
  // 在jsx中使用map等循环返回的vnode是一个数组  需要特殊处理
  if (Array.isArray(vnode)) {
    vnode.forEach(child => {
      renderContainer(child, node)
      // node.appendChild(childNode);
    })
  }else {
    console.log(vnode);
    reconcileChildren(props.children, node)
  }
  return node;
}
/**
 * todo 类数组建的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateClassComponent = (vnode) =>{
  const { type, props } = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  const node = createNode(vvnode);
  return node;
}
/**
 * todo 函数组建的处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateFunctionComponent = (vnode) => {
  const { type, props } = vnode;
  // 当是一个函数组件时  type就是这个函数组件本身
  // 执行函数，将props传入 得到的时函数执行后的vnode
  const vvnode = type(props);
  const node = createNode(vvnode);
  return node;
};

/**
 * todo 原生标签处理
 * @param {*} vnode
 * @returns 处理之后的真实节点
 */
const updateHostComponent = (vnode) => {
  const { type, props } = vnode;
  // 在props中除了children剩下的都是dom的属性
  let node = document.createElement(type);

  // children为string的时候dom中只有文本
  if (typeof props.children === "string" || typeof props.children === "number") {
    let childText = document.createTextNode(props.children);
    node.appendChild(childText);
  } else {
    // 处理非string的情况
    reconcileChildren(props.children, node);
  }
  // 更新dom属性
  updateNode(node, props);


  return node;
};
/**
 * todo 处理元素上的属性
 * @param {*} node
 * @param {*} nextVa vnode的props
 */
const updateNode = (node, nextVa) => {
  // 过滤children之后将属性添加到dom上 // todo 这里只处理了作为属性的情况  没有处理类似style的东西
  Object.keys(nextVa)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = nextVa[k];
    });
};

/**
 * todo children处理非string的情况
 * @param {*} children 节点的children
 * @param {*} node 节点
 */
const reconcileChildren = (children, node) => {
  // children不为string时有两种情况
  // 1.对象 一个元素的jsx对象
  // 2.数组  一个满是jsx对象的数组
  if (Array.isArray(children)) {
    children.forEach((child) => {
      renderContainer(child, node);
    });
  } else {
    renderContainer(children, node);
  }
};

const ReactDom = {
  render,
};
export default ReactDom;
