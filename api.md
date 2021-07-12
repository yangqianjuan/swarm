### 1. 节点列表

- path:'/api/node/list'

- method: 'get'

- query:{
  page?:number,
  pageSize?:number,
  ip?:string,
  ethereum?:string // 以太坊地址
  }

- response:{
  code:number,
  message:string,
  err?:string,
  result?: [{
  cashed : number,//已提取支票数量
  uncash :number,未提取支票数量
  peers : number, 连接的节点数
  status: number, // 节点状态:(0 : 未启动, 1: 启动)
  ip : string, //IP 地址
  timestamp : string, //时间戳
  depth : number,
  pubver:string,
  ethereum:string //以太坊地址
  version: string,//版本,
  chainid :any
  }]

### 2. 支票列表

- path:'/api/cheque/list'

- method: 'get'

- query:{
  page?:number,
  pageSize?:number,
  ip?:string,
  ethereum?:string // 以太坊地址
  }

- response:{
  code:number,
  message:string,
  err?:string,
  result?:[{
  code:number,
  message:string,
  err?:string,
  result?:{
  id:number,
  overlay:string, //覆盖地址
  ethereum :string,//以太坊地址
  ip:string, //ip
  received:[any], //收到的
  issued:[any], //发送的
  issued_total:number, 发送总数
  received_total:number, 接收总数
  timestamp:string,
  }]
  }

### 3. 节点详情

- path:'/api/node/detail'

- method: 'get'

- query:{
  ip:string,
  ethereum:string // 以太坊地址
  }

- response:{
  code:number,
  message:string,
  err?:string,
  result?:{
  cashed : number,//已提取支票数量
  uncash :number,未提取支票数量
  peers : number, 连接的节点数
  status: number, // 节点状态:(0 : 未启动, 1: 启动)
  ip : string, //IP 地址
  timestamp : string, //时间戳
  depth : number,
  pubver:string,
  ethereum:string, //以太坊地址
  version: string,//版本,
  chainid :any
  }
  }

### 4. 支票详情

- path:'/api/cheque/detail'

- method: 'get'

- query:{
  id:number
  }

- response:{
  code:number,
  message:string,
  err?:string,
  result?:{
  id:number,
  overlay:string, //覆盖地址
  ethereum :string,//以太坊地址
  ip:string, //ip
  received:[any], //收到的
  issued:[any], //发送的
  issued_total:number, 发送总数
  received_total:number, 接收总数
  timestamp:string,
  }
  }
