### beestatus /beestatusraw [未处理的] 币状态

1. cashed 已提取支票数量

2. uncash 未提取支票数量

3. peers 连接的节点数
   number

4. status 节点状态
   enum{
   0 : 未启动
   1: 启动
   }
5. ip IP 地址
   string
6. timestamp 时间戳
   string
7. depth
   number
8. ethereum 以太坊地址
   string
9. version 版本

### chequestatus 支票状态

1. overlay 覆盖地址
2. ethereum 以太坊地址
3. ip
4. received 收到的
5. issued 发送的
6. issued_total 发送总数
7. received_total 接收总数
8. timestamp

### deploy 部署

1. wallet_addr 钱包地址
2. chainid 链地址
3. ip
4. deploytime 部署时间
5. state
6. port
7. comment

### vendor 供应商

1. name

### vps 虚拟机

1. ip
2. location 虚拟机地址
3. vendor
4. cost
5. create 创建时间
6. expire 过期时间
7. net_type
8. net_val
9. core_num
10. core_name
11. mem_g 内存
12. disk_g 磁盘
13. latitude
14. longitude
15. bee_num
16. state
17. comment

### vpsstatus / vpsstatusraw 虚拟机状态

1. ip
2. cpu
3. disk
4. netsent 网络发送
5. netrecv 网络接收
6. mem
