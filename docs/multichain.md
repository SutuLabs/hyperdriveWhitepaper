# 多链

## 区块链是什么

## 多链是什么

## PoST的多链

## 原生跨链

## 

## 问题

### 原生跨链方案

如何让另外目标链可以获得源链的信息，需要将目标链的区块信息（区块头）存储在源链，而这个同步过程就是依靠Oracle这个实体。
如何将Oracle变为去中心化的方案就是需要考虑的，已知的方案包括：
- 利用MPC让Oracle对于结论进行签名
- 利用BFT等共识方法让多个节点进行共识确认
- Optimistic方案，对于作恶的节点，slash其质押

### 如何防止51%攻击

- 