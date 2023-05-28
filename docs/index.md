---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Hyperdrive 白皮书"
  text: ""
  tagline: 基于零知识证明的区块链互操作协议
  actions:
    - theme: brand
      text: 系统结构
      link: /hyperdrive/architecture
    - theme: alt
      text: 经济模型
      link: /business/tokenomic

features:
  - title: Hyperdrive
    details: 基于零知识证明的跨链方案，亦可称为区块链的互操作协议，允许将代币(Token)或信息从一条区块链，转移到另外一条链上
  - title: zkHyperspace
    details: 存储相关集成链的共识信息，并及时发现和避免风险。它支持轻松地扩展到更多区块链，并且默认情况下，只需要信任zkHyperspace的签名过程和所在链的xStation合约即可
  - title: zkReducer
    details: zkHyperspace的一个扩展组件，可以通过自定义规则从源链中拉取信息到zkHyperspace，并支持类Map-Reduce的大数据操作
---
